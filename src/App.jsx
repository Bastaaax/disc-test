import { useDisc } from './hooks/useDisc'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz'
import Results from './components/Results'

export default function App() {
  const disc = useDisc()

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
        <ThemeToggle />
        {disc.currentStep === 'welcome' && <Welcome onStart={disc.startQuiz} />}
        {disc.currentStep === 'quiz' && (
          <Quiz
            answers={disc.answers}
            currentQuestion={disc.currentQuestion}
            onAnswer={disc.answerQuestion}
            onNext={disc.nextQuestion}
            onPrev={disc.prevQuestion}
            onSubmit={disc.calculateResults}
          />
        )}
        {disc.currentStep === 'results' && (
          <Results results={disc.results} isSaving={disc.isSaving} onReset={disc.resetQuiz} />
        )}
      </div>
    </ThemeProvider>
  )
}
