import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '@/features/home/HomePage'
import { DestinationPage } from '@/features/destinations/DestinationPage'
import { ChatWidget } from '@/features/chatbot/ChatWidget'
import { QuizModal } from '@/features/quiz/QuizModal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatWidget />
      <QuizModal />
    </BrowserRouter>
  )
}

export default App
