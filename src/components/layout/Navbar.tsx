import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import logo from '../../assets/sipmatch-logo.svg'
import type { ReactNode } from 'react'

interface NavbarProps {
  changeLanguage: (lng: string) => void
}

export default function Navbar({ changeLanguage }: NavbarProps): ReactNode {
  const { t, i18n } = useTranslation()

  const currentLanguage = i18n.language.split('-')[0]
  const nextLanguage = currentLanguage === 'es' ? 'en' : 'es'
  const flagIcon = nextLanguage === 'es' ? '🇪🇸' : '🇬🇧'

  return (
    <header className="header">
      <div className="nav-language">
        <button
          className="btn-language"
          onClick={() => changeLanguage(nextLanguage)}
          aria-label={t('a11y.languageFlag')}
        >
          {flagIcon}
        </button>
      </div>
      <Link to="/">
        <img
          className="logo-header"
          src={logo}
          alt="SipMatch"
        />
      </Link>
      <nav className="nav-links">
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          to="/quiz"
        >
          {t('nav.quiz')}
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          to="/menu"
        >
          {t('nav.menu')}
        </NavLink>
      </nav>
    </header>
  )
}
