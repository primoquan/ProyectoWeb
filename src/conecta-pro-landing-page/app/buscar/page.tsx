"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"
import { ProfessionalCard } from "@/components/professional-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for professionals
const mockProfessionals = [
  {
    id: 1,
    name: "Carlos Méndez",
    category: "Plomero",
    location: "Mixco, Guatemala",
    experience: 8,
    rating: 4.7,
    reviews: 23,
    verified: true,
    specialties: ["Reparaciones", "Instalaciones", "Emergencias"],
    image: "/professional-plumber.png",
    phone: "+502 1234-5678",
    whatsapp: "+502 1234-5678",
  },
  {
    id: 2,
    name: "María González",
    category: "Electricista",
    location: "Guatemala, Guatemala",
    experience: 12,
    rating: 4.9,
    reviews: 45,
    verified: true,
    specialties: ["Instalaciones", "Paneles Solares", "Mantenimiento"],
    image: "/professional-electrician-woman.png",
    phone: "+502 2345-6789",
    whatsapp: "+502 2345-6789",
  },
  {
    id: 3,
    name: "José Ramírez",
    category: "Abogado",
    location: "Mixco, Guatemala",
    experience: 15,
    rating: 4.8,
    reviews: 67,
    verified: true,
    specialties: ["Civil", "Laboral", "Familia"],
    image: "/professional-lawyer.png",
    phone: "+502 3456-7890",
    whatsapp: "+502 3456-7890",
  },
  {
    id: 4,
    name: "Ana Pérez",
    category: "Doctor",
    location: "Guatemala, Guatemala",
    experience: 10,
    rating: 4.6,
    reviews: 34,
    verified: false,
    specialties: ["Medicina General", "Pediatría"],
    image: "/professional-doctor-woman.jpg",
    phone: "+502 4567-8901",
    whatsapp: "+502 4567-8901",
  },
  {
    id: 5,
    name: "Roberto López",
    category: "Carpintero",
    location: "Mixco, Guatemala",
    experience: 6,
    rating: 4.5,
    reviews: 18,
    verified: true,
    specialties: ["Muebles", "Puertas", "Ventanas"],
    image: "/professional-carpenter.jpg",
    phone: "+502 5678-9012",
    whatsapp: "+502 5678-9012",
  },
  {
    id: 6,
    name: "Laura Morales",
    category: "Arquitecto",
    location: "Guatemala, Guatemala",
    experience: 9,
    rating: 4.8,
    reviews: 29,
    verified: true,
    specialties: ["Diseño", "Remodelación", "Proyectos"],
    image: "/professional-architect-woman.jpg",
    phone: "+502 6789-0123",
    whatsapp: "+502 6789-0123",
  },
  {
    id: 7,
    name: "Pedro Castillo",
    category: "Plomero",
    location: "Villa Nueva, Guatemala",
    experience: 5,
    rating: 4.4,
    reviews: 12,
    verified: false,
    specialties: ["Reparaciones", "Drenajes"],
    image: "/professional-plumber-young.jpg",
    phone: "+502 7890-1234",
    whatsapp: "+502 7890-1234",
  },
  {
    id: 8,
    name: "Carmen Flores",
    category: "Contador",
    location: "Mixco, Guatemala",
    experience: 14,
    rating: 4.9,
    reviews: 56,
    verified: true,
    specialties: ["Impuestos", "Auditoría", "Finanzas"],
    image: "/professional-accountant-woman.jpg",
    phone: "+502 8901-2345",
    whatsapp: "+502 8901-2345",
  },
  {
    id: 9,
    name: "Miguel Herrera",
    category: "Electricista",
    location: "Guatemala, Guatemala",
    experience: 7,
    rating: 4.6,
    reviews: 21,
    verified: true,
    specialties: ["Cableado", "Iluminación", "Emergencias"],
    image: "/professional-electrician.png",
    phone: "+502 9012-3456",
    whatsapp: "+502 9012-3456",
  },
]

export default function SearchPage() {
  const [filters, setFilters] = useState({
    category: "",
    department: "",
    municipality: "",
    rating: 0,
    verifiedOnly: false,
  })
  const [sortBy, setSortBy] = useState("rating")
  const [currentPage, setCurrentPage] = useState(1)

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // Filter professionals based on current filters
  const filteredProfessionals = mockProfessionals.filter((prof) => {
    if (filters.category && prof.category !== filters.category) return false
    if (filters.verifiedOnly && !prof.verified) return false
    if (filters.rating && prof.rating < filters.rating) return false
    return true
  })

  // Sort professionals
  if (sortBy === "rating") {
    filteredProfessionals.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "reviews") {
    filteredProfessionals.sort((a, b) => b.reviews - a.reviews)
  }

  const professionalsPerPage = 9
  const totalPages = Math.ceil(filteredProfessionals.length / professionalsPerPage)
  const startIndex = (currentPage - 1) * professionalsPerPage
  const currentProfessionals = filteredProfessionals.slice(startIndex, startIndex + professionalsPerPage)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar with filters */}
            <aside className="w-full lg:w-64 lg:shrink-0">
              <SearchFilters onApplyFilters={handleApplyFilters} />
            </aside>

            {/* Main content area */}
            <div className="flex-1">
              <SearchResults
                totalResults={filteredProfessionals.length}
                location="Mixco, Guatemala"
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {/* Professional cards grid */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentProfessionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                          }}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page)
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
