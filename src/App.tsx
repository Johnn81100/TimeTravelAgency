import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/features/home/HeroSection'
import { DestinationsSection } from '@/features/destinations/DestinationsSection'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DestinationsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
