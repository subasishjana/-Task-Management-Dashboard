import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="header">
      <h1>Task Dashboard</h1>
      <button onClick={toggleTheme} className="theme-btn">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
