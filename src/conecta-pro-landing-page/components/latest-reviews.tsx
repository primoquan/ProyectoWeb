import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const reviews = [
  {
    name: "María López",
    rating: 5,
    comment: "Excelente trabajo, muy profesional y puntual. Lo recomiendo ampliamente.",
    time: "Hace 2 días",
    avatar: "/avatar-1.jpg",
    initials: "ML",
  },
  {
    name: "Carlos Gómez",
    rating: 4,
    comment: "Buen servicio, resolvió el problema rápidamente.",
    time: "Hace 5 días",
    avatar: "/avatar-2.jpg",
    initials: "CG",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    comment: "Muy satisfecha con el trabajo realizado. Muy recomendado.",
    time: "Hace 1 semana",
    avatar: "/avatar-3.jpg",
    initials: "AM",
  },
]

export function LatestReviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas Reseñas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback>{review.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <span className="text-xs text-muted-foreground">{review.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              </div>
              {index < reviews.length - 1 && <div className="border-b border-border pt-2" />}
            </div>
          ))}

          <Link
            href="/dashboard/resenas"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todas las reseñas →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
