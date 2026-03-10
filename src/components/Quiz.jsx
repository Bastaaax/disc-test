import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '../data/questions'

const slideVariants = {
  enter: () => ({ x: 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: () => ({ x: -80, opacity: 0 })
}

export default function Quiz({
  answers,
  currentQuestion,
  onAnswer,
  onNext,
  onPrev,
  onSubmit
}) {
  const question = questions[currentQuestion]
  const selectedLetter = answers[currentQuestion]
  const isLastQuestion = currentQuestion === 24
  const progress = ((currentQuestion + 1) / 25) * 100

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 md:py-8 pt-16 max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
          Question {currentQuestion + 1} / 25
        </p>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
        Quelle affirmation te correspond le mieux ?
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <div className="space-y-3">
            {question.answers.map((opt) => {
              const isSelected = selectedLetter === opt.letter
              return (
                <motion.button
                  key={opt.letter}
                  type="button"
                  onClick={() => onAnswer(currentQuestion, opt.letter)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition
                    ${isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/20 ring-2 ring-amber-500/50 dark:border-amber-500/80'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-700/70'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                    ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}`}
                  >
                    {opt.letter}
                  </span>
                  <span className="text-slate-800 dark:text-slate-100">{opt.text}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentQuestion === 0}
          className="px-5 py-3 rounded-xl font-medium border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700/50 transition"
        >
          ← Précédent
        </button>
        {!isLastQuestion ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedLetter}
            className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-green-500 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            Suivant →
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!selectedLetter}
            className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            Voir mes résultats
          </button>
        )}
      </div>
    </div>
  )
}
