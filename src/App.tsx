import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/features/home/HeroSection'
import { DestinationsSection } from '@/features/destinations/DestinationsSection'
import { ChatWidget } from '@/features/chatbot/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DestinationsSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
