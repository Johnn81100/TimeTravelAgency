import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { HomePage } from '@/features/home/HomePage'
import { DestinationPage } from '@/features/destinations/DestinationPage'
import { ChatWidget } from '@/features/chatbot/ChatWidget'
import { QuizModal } from '@/features/quiz/QuizModal'
import { PageTransition } from '@/components/layout/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/destination/:id"
          element={
            <PageTransition>
              <DestinationPage />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <ChatWidget />
      <QuizModal />
      <Analytics />
    </BrowserRouter>
  )
}

export default App
