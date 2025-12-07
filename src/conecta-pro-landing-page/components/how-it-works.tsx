import { Search, Star, Phone } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Busca",
    description: "Encuentra profesionales en tu zona por categoría y ubicación",
  },
  {
    icon: Star,
    title: "Compara",
    description: "Revisa perfiles, calificaciones y reseñas de otros usuarios",
  },
  {
    icon: Phone,
    title: "Contacta",
    description: "Comunícate directamente con el profesional de tu elección",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Cómo Funciona</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Tres pasos simples para conectar con profesionales confiables
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="group relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Icon className="h-10 w-10" />
                    {/* Step Number */}
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-pretty text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector Line (hidden on last item on desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-0.5 w-full -translate-x-1/2 bg-border lg:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
