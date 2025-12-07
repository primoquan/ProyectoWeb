"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Phone, MessageCircle, Heart } from "lucide-react"

interface Professional {
  id: number
  name: string
  category: string
  location: string
  experience: number
  rating: number
  reviews: number
  verified: boolean
  image: string
  phone: string
  whatsapp: string
}

interface ProfileHeroProps {
  professional: Professional
}

export function ProfileHero({ professional }: ProfileHeroProps) {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={professional.image || "/placeholder.svg"}
              alt={professional.name}
              width={200}
              height={200}
              className="rounded-lg object-cover shadow-lg"
            />
            {professional.verified && (
              <Badge className="absolute -right-2 -top-2 bg-[#2E7D32] px-3 py-1 text-white hover:bg-[#2E7D32]/90">
                Verificado
              </Badge>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="mb-2 text-3xl font-bold">{professional.name}</h1>
              <p className="mb-3 text-xl text-muted-foreground">{professional.category}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{professional.location}</span>
                </div>
                <div className="font-medium">{professional.experience} años de experiencia</div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(professional.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : star - 0.5 <= professional.rating
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-bold">{professional.rating}</span>
              <span className="text-muted-foreground">({professional.reviews} reseñas)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#2E7D32] hover:bg-[#2E7D32]/90">
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </Button>
              <Button className="bg-[#25D366] hover:bg-[#25D366]/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="secondary" className="bg-[#1976D2] text-white hover:bg-[#1976D2]/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Agregar a Favoritos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
