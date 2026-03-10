import { useState, useCallback } from 'react'
import { scoringKey } from '../data/scoringKey'
import { supabase } from '../lib/supabase'

export function useDisc() {
  const [currentStep, setCurrentStep] = useState('welcome') // 'welcome' | 'quiz' | 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({}) // { lotIndex: 'A'|'B'|'C'|'D' }
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' })
  const [results, setResults] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

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
