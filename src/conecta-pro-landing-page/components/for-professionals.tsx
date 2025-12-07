import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const benefits = [
  "Aumenta tu visibilidad y consigue más clientes",
  "Perfil profesional verificado con calificaciones",
  "Recibe solicitudes directamente de clientes interesados",
  "Gestiona tu agenda y disponibilidad fácilmente",
  "Sin costos de inscripción, solo paga por resultados",
]

export function ForProfessionals() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                ¿Eres profesional? Únete a ConectaPro
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Expande tu negocio y conecta con miles de clientes potenciales en toda Guatemala
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Registrarse como Profesional
                </Button>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="relative flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-muted shadow-2xl">
                <img
                  src="/professional-guatemalan-worker-with-tools-smiling.jpg"
                  alt="Profesional guatemalteco"
                  className="h-full w-full object-cover"
                />
                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border/50 bg-card/95 p-4 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">1,000+</div>
                      <div className="text-xs text-muted-foreground">Profesionales</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">50K+</div>
                      <div className="text-xs text-muted-foreground">Usuarios</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8★</div>
                      <div className="text-xs text-muted-foreground">Calificación</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
