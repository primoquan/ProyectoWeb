import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { PopularCategories } from "@/components/popular-categories"
import { ForProfessionals } from "@/components/for-professionals"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <PopularCategories />
        <ForProfessionals />
      </main>
      <Footer />
    </div>
  )
}
