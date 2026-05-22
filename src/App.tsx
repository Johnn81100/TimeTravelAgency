import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/features/home/HomePage'
import { DestinationPage } from '@/features/destinations/DestinationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
