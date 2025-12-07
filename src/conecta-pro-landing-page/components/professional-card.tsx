import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Star, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Professional {
  id: number
  name: string
  category: string
  location: string
  experience: number
  rating: number
  reviews: number
  verified: boolean
  specialties: string[]
  image: string
  phone: string
  whatsapp: string
}

interface ProfessionalCardProps {
  professional: Professional
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="flex-1 p-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative mb-4">
            <Image
              src={professional.image || "/placeholder.svg"}
              alt={professional.name}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            {professional.verified && (
              <Badge className="absolute -right-2 -top-2 bg-[#2E7D32] text-white hover:bg-[#2E7D32]/90">
                Verificado
              </Badge>
            )}
          </div>

          {/* Name and Category */}
          <h3 className="mb-1 text-lg font-semibold">{professional.name}</h3>
          <p className="mb-2 text-sm text-muted-foreground">{professional.category}</p>

          {/* Location */}
          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{professional.location}</span>
          </div>

          {/* Experience */}
          <p className="mb-3 text-sm font-medium">{professional.experience} años de experiencia</p>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{professional.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({professional.reviews} reseñas)</span>
          </div>

          {/* Specialties */}
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {professional.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t p-4">
        <Button className="w-full bg-[#1976D2] hover:bg-[#1976D2]/90">Ver Perfil</Button>
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Phone className="mr-1 h-4 w-4" />
            Llamar
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <MessageCircle className="mr-1 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
