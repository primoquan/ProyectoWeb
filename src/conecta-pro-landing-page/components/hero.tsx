"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function Hero() {
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Encuentra Profesionales Confiables en Guatemala
              </h1>
              <p className="text-pretty text-lg text-muted-foreground sm:text-xl">
                Conecta con plomeros, electricistas, abogados, doctores y más profesionales verificados en tu zona
              </p>

              {/* Search Bar */}
              <div className="mt-8 space-y-3">
                <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-lg sm:flex-row">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plomero">Plomero</SelectItem>
                      <SelectItem value="electricista">Electricista</SelectItem>
                      <SelectItem value="abogado">Abogado</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="arquitecto">Arquitecto</SelectItem>
                      <SelectItem value="contador">Contador</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guatemala">Ciudad de Guatemala</SelectItem>
                      <SelectItem value="antigua">Antigua Guatemala</SelectItem>
                      <SelectItem value="quetzaltenango">Quetzaltenango</SelectItem>
                      <SelectItem value="escuintla">Escuintla</SelectItem>
                      <SelectItem value="coban">Cobán</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar Profesionales
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-2xl bg-muted shadow-2xl">
              <img
                src="/guatemalan-professionals-team-working-together.jpg"
                alt="Profesionales guatemaltecos"
                className="h-full w-full object-cover"
              />
              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
    </section>
  )
}
