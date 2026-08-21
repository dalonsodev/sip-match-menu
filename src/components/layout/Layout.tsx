import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'
import type { ReactNode } from 'react'

export default function Layout(): ReactNode {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng)
  }

  return (
    <div className="site-wrapper">
      <Navbar changeLanguage={changeLanguage} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
