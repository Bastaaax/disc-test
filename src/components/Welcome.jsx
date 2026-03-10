import { useState } from 'react'
import { motion } from 'framer-motion'
import { profiles } from '../data/profiles'

const profileOrder = ['D', 'I', 'S', 'C']

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Welcome({ onStart }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!firstName.trim()) newErrors.firstName = 'Le prénom est requis'
    if (!lastName.trim()) newErrors.lastName = 'Le nom est requis'
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      onStart({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-amber-400 via-green-500 to-blue-500 bg-clip-text text-transparent mb-3">
          Test DISC
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-2">
          Découvre ton profil comportemental
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-6">
          en 25 questions
        </p>
        <div className="text-left text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-10 space-y-2 bg-white/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 p-5">
          <p>
            <strong className="text-slate-700 dark:text-slate-300">Qu’est-ce que le DISC ?</strong> C’est un modèle de personnalité qui décrit quatre styles comportementaux : <strong>D</strong>ominant (décision, action), <strong>I</strong>nfluent (relation, enthousiasme), <strong>S</strong>table (harmonie, fidélité) et <strong>C</strong>onsciencieux (rigueur, analyse). Le test ne dure que quelques minutes et t’aide à mieux te connaître et à adapter ta communication avec les autres.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl w-full mb-12"
      >
        {profileOrder.map((key) => {
          const p = profiles[key]
          return (
            <motion.div
              key={key}
              variants={item}
              className="rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-sm p-4 text-center transition hover:border-slate-300 dark:hover:border-white/20 bg-white/60 dark:bg-transparent"
              style={{ backgroundColor: `${p.color}12` }}
            >
              <span className="text-2xl md:text-3xl block mb-2" role="img" aria-hidden>{p.emoji}</span>
              <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base" style={{ color: p.color }}>
                {p.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{p.keywords[0]}</p>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-sm bg-white dark:bg-slate-800/50 p-6 md:p-8 space-y-4 shadow-lg dark:shadow-none">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              placeholder="Votre prénom"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              placeholder="Votre nom"
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email <span className="text-slate-400 dark:text-slate-500">(optionnel)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              placeholder="ton@email.com"
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-4 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-amber-400 via-green-400 to-blue-500 hover:opacity-90 transition shadow-lg"
          >
            Commencer le test →
          </button>
        </form>
      </motion.div>
    </div>
  )
}
