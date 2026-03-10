import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { profiles } from '../data/profiles'

export default function ProfileModal({ profileKey, onClose }) {
  if (!profileKey) return null
  const p = profiles[profileKey]

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        aria-modal="true"
        role="dialog"
        aria-labelledby="profile-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 shadow-2xl"
          style={{ borderColor: `${p.color}40` }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-800/95 backdrop-blur" style={{ backgroundColor: `${p.color}15` }}>
            <h2 id="profile-modal-title" className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span role="img" aria-hidden>{p.emoji}</span>
              {p.name}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-600 dark:text-slate-300 text-sm">{p.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {p.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${p.color}25`, color: p.color }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{p.description}</p>
            <div>
              <h4 className="text-slate-800 dark:text-slate-200 font-semibold mb-1 flex items-center gap-2">✅ Forces</h4>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-0.5">
                {p.strengths.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-slate-800 dark:text-slate-200 font-semibold mb-1 flex items-center gap-2">⚠️ Points de vigilance</h4>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-0.5">
                {p.weaknesses.map((w) => (
                  <li key={w}>• {w}</li>
                ))}
              </ul>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong className="text-slate-700 dark:text-slate-300">Style de communication :</strong> {p.communication}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong className="text-slate-700 dark:text-slate-300">Conseil d'interaction :</strong> {p.interact_tip}
            </p>
          </div>
        </motion.div>
      </motion.div>
  )
}
