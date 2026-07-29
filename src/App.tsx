import { BrowserRouter, Route, Routes } from 'react-router'
import Quiz from './components/features/quiz/Quiz'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import type { ReactNode } from 'react'

export default function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="quiz"
            element={<Quiz />}
          />
          <Route
            path="menu"
            element={<MenuPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
