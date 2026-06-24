import { useTranslation } from 'react-i18next'
import logo from '../../assets/sipmatch-logo.svg'
import type { ReactNode } from 'react'

export default function Footer(): ReactNode {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <p>{t('footer.text-copy')}</p>
      <img className="logo-footer" src={logo} alt="SipMatch" />
    </footer>
  )
}
