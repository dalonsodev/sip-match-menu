import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { FaMartiniGlassEmpty } from 'react-icons/fa6'

export default function NotFound(): ReactNode {
  const { t } = useTranslation()

  return (
    <div className="not-found-wrapper">
      <FaMartiniGlassEmpty className="not-found-icon" />
      <p>{t('menu.no-results')}</p>
    </div>
  )
}
