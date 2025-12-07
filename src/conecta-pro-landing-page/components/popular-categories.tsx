import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Zap, Scale, Stethoscope, Building2, Calculator } from "lucide-react"

const categories = [
  {
    icon: Wrench,
    name: "Plomero",
    count: "120+ profesionales",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    name: "Electricista",
    count: "95+ profesionales",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Scale,
    name: "Abogado",
    count: "200+ profesionales",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Stethoscope,
    name: "Doctor",
    count: "150+ profesionales",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Building2,
    name: "Arquitecto",
    count: "80+ profesionales",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calculator,
    name: "Contador",
    count: "110+ profesionales",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
]

export function PopularCategories() {
  return (
    <section id="categorias" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Categorías Populares
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Encuentra el profesional que necesitas en estas categorías destacadas
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={index}
                className="group cursor-pointer border-border transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${category.bgColor} transition-transform group-hover:scale-110`}
                    >
                      <Icon className={`h-7 w-7 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{category.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
