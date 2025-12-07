import { Eye, Phone, Star, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Vistas del Perfil",
    value: "187",
    icon: Eye,
    color: "text-primary",
  },
  {
    label: "Contactos Recibidos",
    value: "42",
    icon: Phone,
    color: "text-secondary",
  },
  {
    label: "Calificación Promedio",
    value: "4.7",
    icon: Star,
    color: "text-yellow-500",
    suffix: "⭐",
  },
  {
    label: "Total Reseñas",
    value: "23",
    icon: MessageSquare,
    color: "text-primary",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">
                  {stat.value}
                  {stat.suffix && <span className="ml-1 text-2xl">{stat.suffix}</span>}
                </p>
              </div>
              <div className={`${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
