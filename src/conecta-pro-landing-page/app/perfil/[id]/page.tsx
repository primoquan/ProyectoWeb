import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileHero } from "@/components/profile-hero"
import { ProfileContent } from "@/components/profile-content"
import { ProfileSidebar } from "@/components/profile-sidebar"

export default function ProfessionalProfile() {
  // Mock data for Juan Pérez
  const professional = {
    id: 1,
    name: "Juan Pérez",
    category: "Plomero",
    location: "Mixco, Guatemala",
    experience: 8,
    rating: 4.7,
    reviews: 23,
    verified: true,
    image: "/professional-plumber.png",
    phone: "+502 1234-5678",
    whatsapp: "+502 1234-5678",
    email: "juan.perez@example.com",
    website: "www.jperezplomeria.com",
    description:
      "Soy un plomero profesional con 8 años de experiencia en instalación y reparación de sistemas de plomería residencial y comercial. Me especializo en soluciones rápidas y eficientes, siempre con garantía de calidad. Mi compromiso es brindar un servicio excepcional a cada cliente.",
    specialties: [
      "Instalación de tuberías",
      "Reparación de fugas",
      "Destapado de drenajes",
      "Instalación de calentadores",
      "Reparación de grifos",
      "Mantenimiento preventivo",
    ],
    certifications: [
      "Certificación en Instalaciones Sanitarias",
      "Curso de Sistemas de Agua Caliente",
      "Certificación en Plomería Comercial",
    ],
    schedule: "Lunes a Sábado, 7:00 AM - 6:00 PM",
    responseTime: "Menos de 2 horas",
    completedProjects: 156,
    ratingBreakdown: {
      5: 18,
      4: 4,
      3: 1,
      2: 0,
      1: 0,
    },
    reviewsList: [
      {
        id: 1,
        clientName: "María González",
        rating: 5,
        date: "15 de enero, 2025",
        comment:
          "Excelente servicio. Juan llegó puntual, identificó el problema rápidamente y lo solucionó de manera profesional. Muy recomendado.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        clientName: "Carlos Ramírez",
        rating: 5,
        date: "8 de enero, 2025",
        comment:
          "Juan es muy profesional y conocedor de su trabajo. Reparó una fuga en mi baño y el trabajo quedó perfecto. Precios justos y buen servicio.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        clientName: "Ana López",
        rating: 4,
        date: "2 de enero, 2025",
        comment:
          "Buen trabajo. Resolvió el problema del drenaje. Solo tardó un poco más de lo esperado, pero el resultado fue bueno.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    gallery: [
      "/plumbing-installation-work.jpg",
      "/pipe-repair-work.jpg",
      "/bathroom-plumbing.jpg",
      "/kitchen-sink-installation.jpg",
      "/water-heater-installation.jpg",
      "/drain-cleaning-work.jpg",
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <ProfileHero professional={professional} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProfileContent professional={professional} />
            </div>
            <div className="lg:col-span-1">
              <ProfileSidebar professional={professional} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
