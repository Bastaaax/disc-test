import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts'
import { profiles } from '../data/profiles'
import ProfileModal from './ProfileModal'

const profileOrder = ['D', 'I', 'S', 'C']

export default function Results({ results, isSaving, onReset }) {
  const [modalProfile, setModalProfile] = useState(null)

  if (!results) return null

  const { scores, percentages, dominantProfile, secondaryProfile, userInfo } = results
  const dominant = profiles[dominantProfile]
  const secondary = profiles[secondaryProfile]

  const radarData = profileOrder.map((key) => ({
    subject: profiles[key].name,
    value: scores[key],
    fullMark: 25
  }))

  const radarDataMulti = profileOrder.map((key) => {
    const point = { subject: profiles[key].name }
    profileOrder.forEach((k) => { point[k] = k === key ? scores[k] : 0 })
    return point
  })

  const barData = profileOrder.map((key) => ({
    name: profiles[key].shortName,
    score: scores[key],
    pct: parseFloat(percentages[key]),
    color: profiles[key].color
  }))

  const otherProfiles = profileOrder.filter((k) => k !== dominantProfile && k !== secondaryProfile)

  const handleShare = () => {
    const params = new URLSearchParams({
      d: scores.D,
      i: scores.I,
      s: scores.S,
      c: scores.C,
      dominant: dominantProfile,
      secondary: secondaryProfile
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    navigator.clipboard.writeText(url).then(() => alert('Lien copié dans le presse-papier !'))
  }

  const chartTextColor = '#475569'
  const chartGridColor = 'rgba(148, 163, 184, 0.35)'

  return (
    <div className="min-h-screen py-8 px-4 pt-16 max-w-4xl mx-auto">
      {/* Header résultats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-amber-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Tes résultats DISC
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          {userInfo.firstName}, voici ton profil.
        </p>
        {isSaving && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">Sauvegarde en cours...</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-sm p-6 mb-10 text-center bg-white/80 dark:bg-transparent"
        style={{ backgroundColor: `${dominant.color}18`, borderColor: `${dominant.color}40` }}
      >
        <span className="text-4xl block mb-2" role="img" aria-hidden>{dominant.emoji}</span>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{dominant.name}</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-1">{dominant.tagline}</p>
        <p className="text-xl font-semibold mt-2" style={{ color: dominant.color }}>
          Score : {scores[dominantProfile]} / 25 ({percentages[dominantProfile]} %)
        </p>
      </motion.div>

      {/* Graphiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6 mb-10"
      >
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 p-4 shadow-sm">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold mb-2 text-center">Ton profil en radar</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-3">
            Chaque couleur = un profil. Plus la zone est grande vers un pôle, plus ce trait est marqué chez toi.
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarDataMulti}>
                <PolarGrid stroke={chartGridColor} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: chartTextColor, fontSize: 11, fontWeight: 500 }}
                  tickLine={{ stroke: chartGridColor }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 25]}
                  tick={{ fill: chartTextColor, fontSize: 10 }}
                  tickCount={6}
                />
                {profileOrder.map((key) => (
                  <Radar
                    key={key}
                    name={profiles[key].name}
                    dataKey={key}
                    stroke={profiles[key].color}
                    fill={profiles[key].color}
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => (value ? [`${value} / 25`, 'Score'] : null)}
                  labelStyle={{ color: '#0f172a' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 p-4 shadow-sm">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold mb-4 text-center">Scores par profil</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={barData} margin={{ left: 10, right: 20 }}>
                <XAxis type="number" domain={[0, 25]} tick={{ fill: chartTextColor, fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: chartTextColor, fontSize: 13 }} width={28} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value, name, props) => [`${value} (${props.payload.pct} %)`, 'Score']}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Profil dominant */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 p-6 md:p-8 mb-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <span role="img" aria-hidden>{dominant.emoji}</span>
          Votre profil dominant : {dominant.name}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {dominant.keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${dominant.color}25`, color: dominant.color }}
            >
              {kw}
            </span>
          ))}
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-6">{dominant.description}</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-slate-800 dark:text-slate-200 font-semibold mb-2 flex items-center gap-2">✅ Forces</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
              {dominant.strengths.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-800 dark:text-slate-200 font-semibold mb-2 flex items-center gap-2">⚠️ Points de vigilance</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
              {dominant.weaknesses.map((w) => (
                <li key={w}>• {w}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p><strong className="text-slate-700 dark:text-slate-200">Style de communication :</strong> {dominant.communication}</p>
          <p><strong className="text-slate-700 dark:text-slate-200">Environnement idéal :</strong> {dominant.ideal_environment}</p>
          <p><strong className="text-slate-700 dark:text-slate-200">Motivation :</strong> {dominant.motivation}</p>
          <p><strong className="text-slate-700 dark:text-slate-200">Sous pression :</strong> {dominant.under_pressure}</p>
          <p className="text-slate-700 dark:text-slate-200 mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50">
            <strong>Conseil d'interaction :</strong> {dominant.interact_tip}
          </p>
        </div>
      </motion.section>

      {/* Profil secondaire - cliquable */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-slate-200 dark:border-white/10 p-6 mb-8 cursor-pointer hover:ring-2 hover:ring-offset-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white/80 dark:bg-transparent"
        style={{ backgroundColor: `${secondary.color}12`, borderColor: `${secondary.color}40` }}
        onClick={() => setModalProfile(secondaryProfile)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalProfile(secondaryProfile)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <span role="img" aria-hidden>{secondary.emoji}</span>
              Profil secondaire : {secondary.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{secondary.description}</p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              <strong>Conseil :</strong> {secondary.interact_tip}
            </p>
          </div>
          <span className="text-slate-400 dark:text-slate-500 text-sm">Clique pour en savoir plus</span>
        </div>
      </motion.section>

      {/* Les autres profils - cartes cliquables */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Découvrir les autres profils</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Clique sur une carte pour afficher la fiche complète du profil.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {otherProfiles.map((key) => {
            const p = profiles[key]
            return (
              <button
                key={key}
                type="button"
                onClick={() => setModalProfile(key)}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 p-4 text-left shadow-sm hover:shadow-md hover:ring-2 hover:ring-offset-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ ['--ring-color']: p.color }}
              >
                <span className="text-2xl block mb-2" role="img" aria-hidden>{p.emoji}</span>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100" style={{ color: p.color }}>{p.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{p.tagline}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">Cliquer pour en savoir plus →</p>
              </button>
            )
          })}
        </div>
      </motion.section>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-3 rounded-xl font-semibold border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition"
        >
          Recommencer le test
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500/90 to-blue-500/90 text-white hover:opacity-90 transition"
        >
          Partager mes résultats
        </button>
      </motion.div>

      <AnimatePresence>
        {modalProfile && (
          <ProfileModal
            key={modalProfile}
            profileKey={modalProfile}
            onClose={() => setModalProfile(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
