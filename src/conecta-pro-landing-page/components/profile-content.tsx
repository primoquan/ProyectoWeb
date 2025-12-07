"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, Globe, MapPin, Award, Star, ZoomIn } from "lucide-react"
import Image from "next/image"

interface Review {
  id: number
  clientName: string
  rating: number
  date: string
  comment: string
  avatar: string
}

interface Professional {
  description: string
  specialties: string[]
  certifications: string[]
  email: string
  phone: string
  website: string
  location: string
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  reviews: number
  reviewsList: Review[]
  gallery: string[]
}

interface ProfileContentProps {
  professional: Professional
}

export function ProfileContent({ professional }: ProfileContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const totalReviews = professional.reviews

  return (
    <>
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="about">Sobre mí</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas ({professional.reviews})</TabsTrigger>
          <TabsTrigger value="gallery">Galería</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{professional.description}</p>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="px-3 py-1 text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professional.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-[#2E7D32]" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{professional.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{professional.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a href={`https://${professional.website}`} className="text-[#1976D2] hover:underline">
                    {professional.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Area Map */}
          <Card>
            <CardHeader>
              <CardTitle>Área de Cobertura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
                <MapPin className="h-8 w-8 text-[#2E7D32]" />
                <div>
                  <p className="font-medium">Zona de cobertura principal</p>
                  <p className="text-sm text-muted-foreground">{professional.location} y alrededores</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          {/* Rating Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Calificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = professional.ratingBreakdown[rating as keyof typeof professional.ratingBreakdown]
                  const percentage = (count / totalReviews) * 100
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex w-20 items-center gap-1">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={percentage} className="flex-1" />
                      <span className="w-12 text-right text-sm text-muted-foreground">{count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {professional.reviewsList.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{review.clientName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leave Review Button */}
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <p className="mb-4 text-muted-foreground">¿Has trabajado con este profesional?</p>
              <Button className="bg-[#1976D2] hover:bg-[#1976D2]/90">Dejar una Reseña</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Galería de Trabajos Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {professional.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Trabajo ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Imagen ampliada"
              width={1200}
              height={900}
              className="h-auto max-h-[90vh] w-auto rounded-lg object-contain"
            />
            <Button
              variant="ghost"
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
