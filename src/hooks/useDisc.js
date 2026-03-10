import { useState, useCallback, useEffect } from 'react'
import { scoringKey } from '../data/scoringKey'
import { supabase } from '../lib/supabase'

export function useDisc() {
  const [currentStep, setCurrentStep] = useState('welcome') // 'welcome' | 'quiz' | 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({}) // { lotIndex: 'A'|'B'|'C'|'D' }
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' })
  const [results, setResults] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Au chargement : si l’URL contient des résultats partagés, afficher directement la page résultats
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const d = params.get('d')
    const i = params.get('i')
    const s = params.get('s')
    const c = params.get('c')
    const dominant = params.get('dominant')
    const secondary = params.get('secondary')
    if (d == null || i == null || s == null || c == null || !dominant || !secondary) return
    const scoreD = parseInt(d, 10)
    const scoreI = parseInt(i, 10)
    const scoreS = parseInt(s, 10)
    const scoreC = parseInt(c, 10)
    if ([scoreD, scoreI, scoreS, scoreC].some((n) => isNaN(n))) return
    const total = scoreD + scoreI + scoreS + scoreC
    if (total === 0) return
    if (!['D', 'I', 'S', 'C'].includes(dominant) || !['D', 'I', 'S', 'C'].includes(secondary)) return
    const percentages = {
      D: ((scoreD / total) * 100).toFixed(1),
      I: ((scoreI / total) * 100).toFixed(1),
      S: ((scoreS / total) * 100).toFixed(1),
      C: ((scoreC / total) * 100).toFixed(1),
    }
    setResults({
      scores: { D: scoreD, I: scoreI, S: scoreS, C: scoreC },
      percentages,
      dominantProfile: dominant,
      secondaryProfile: secondary,
      userInfo: { firstName: '', lastName: '', email: '' },
    })
    setCurrentStep('results')
  }, [])

  const startQuiz = useCallback((info) => {
    setUserInfo(info)
    setCurrentStep('quiz')
    setCurrentQuestion(0)
  }, [])

  const answerQuestion = useCallback((lotIndex, letter) => {
    setAnswers(prev => ({ ...prev, [lotIndex]: letter }))
  }, [])

  const nextQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.min(prev + 1, 24))
  }, [])

  const prevQuestion = useCallback(() => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0))
  }, [])

  const calculateResults = useCallback(async () => {
    // Calcul des scores
    let scores = { D: 0, I: 0, S: 0, C: 0 }

    scoringKey.forEach((key, index) => {
      const userAnswer = answers[index]
      if (userAnswer) {
        Object.entries(key).forEach(([profile, letter]) => {
          if (letter === userAnswer) {
            scores[profile]++
          }
        })
      }
    })

    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    const percentages = {
      D: total > 0 ? ((scores.D / total) * 100).toFixed(1) : 0,
      I: total > 0 ? ((scores.I / total) * 100).toFixed(1) : 0,
      S: total > 0 ? ((scores.S / total) * 100).toFixed(1) : 0,
      C: total > 0 ? ((scores.C / total) * 100).toFixed(1) : 0,
    }

    // Tri par score décroissant
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const dominantProfile = sorted[0][0]
    const secondaryProfile = sorted[1][0]

    const resultsData = {
      scores,
      percentages,
      dominantProfile,
      secondaryProfile,
      userInfo
    }

    setResults(resultsData)

    // Sauvegarde Supabase (si configuré)
    setIsSaving(true)
    if (supabase) {
      try {
        const { error } = await supabase.from('disc_results').insert({
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email || null,
          score_d: scores.D,
          score_i: scores.I,
          score_s: scores.S,
          score_c: scores.C,
          dominant_profile: dominantProfile,
          secondary_profile: secondaryProfile,
          answers: answers,
          percentage_d: parseFloat(percentages.D),
          percentage_i: parseFloat(percentages.I),
          percentage_s: parseFloat(percentages.S),
          percentage_c: parseFloat(percentages.C),
        })
        if (error) console.error('Supabase error:', error)
      } catch (err) {
        console.error('Failed to save results:', err)
      }
    }
    setIsSaving(false)

    setCurrentStep('results')
  }, [answers, userInfo])

  const resetQuiz = useCallback(() => {
    setCurrentStep('welcome')
    setCurrentQuestion(0)
    setAnswers({})
    setUserInfo({ firstName: '', lastName: '', email: '' })
    setResults(null)
  }, [])

  return {
    currentStep, currentQuestion, answers, userInfo, results, isSaving,
    startQuiz, answerQuestion, nextQuestion, prevQuestion, calculateResults, resetQuiz
  }
}
