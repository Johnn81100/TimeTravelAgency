import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/features/home/HeroSection'
import { DestinationsSection } from '@/features/destinations/DestinationsSection'
import { ChatWidget } from '@/features/chatbot/ChatWidget'

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-6 py-2 text-primary/30">
      <div className="h-px flex-1 bg-border" />
      <span className="text-sm tracking-widest">✦ ✦ ✦</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SectionDivider />
        <DestinationsSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
