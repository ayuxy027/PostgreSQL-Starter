import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import HealthPage from './pages/Health'
import DocsPage from './pages/Docs'

const App = () => {
  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-stone-100">
      <header className="border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-stone-900">SQLite Template</span>
          </div>
          <nav className="flex gap-8 text-sm md:text-base font-medium text-stone-500">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-stone-900' : 'hover:text-stone-900'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/health"
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-stone-900' : 'hover:text-stone-900'}`
              }
            >
              Health
            </NavLink>
            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-stone-900' : 'hover:text-stone-900'}`
              }
            >
              Docs
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-8 py-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App