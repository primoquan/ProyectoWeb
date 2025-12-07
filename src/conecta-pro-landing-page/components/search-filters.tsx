"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

interface SearchFiltersProps {
  onApplyFilters: (filters: {
    category: string
    department: string
    municipality: string
    rating: number
    verifiedOnly: boolean
  }) => void
}

export function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const [category, setCategory] = useState("")
  const [department, setDepartment] = useState("")
  const [municipality, setMunicipality] = useState("")
  const [rating, setRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const handleApply = () => {
    onApplyFilters({
      category,
      department,
      municipality,
      rating,
      verifiedOnly,
    })
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Filtros</h2>

      <div className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Categoría</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Plomero">Plomero</SelectItem>
              <SelectItem value="Electricista">Electricista</SelectItem>
              <SelectItem value="Abogado">Abogado</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Carpintero">Carpintero</SelectItem>
              <SelectItem value="Arquitecto">Arquitecto</SelectItem>
              <SelectItem value="Contador">Contador</SelectItem>
              <SelectItem value="Mecánico">Mecánico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department">Departamento</Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Seleccionar departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Guatemala">Guatemala</SelectItem>
              <SelectItem value="Sacatepéquez">Sacatepéquez</SelectItem>
              <SelectItem value="Escuintla">Escuintla</SelectItem>
              <SelectItem value="Quetzaltenango">Quetzaltenango</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Municipality */}
        <div className="space-y-2">
          <Label htmlFor="municipality">Municipio</Label>
          <Select value={municipality} onValueChange={setMunicipality}>
            <SelectTrigger id="municipality">
              <SelectValue placeholder="Seleccionar municipio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mixco">Mixco</SelectItem>
              <SelectItem value="Villa Nueva">Villa Nueva</SelectItem>
              <SelectItem value="Guatemala">Guatemala</SelectItem>
              <SelectItem value="Antigua">Antigua Guatemala</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label>Calificación mínima</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star === rating ? 0 : star)}
                className="transition-colors hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Verified only */}
        <div className="flex items-center space-x-2">
          <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={(checked) => setVerifiedOnly(!!checked)} />
          <Label htmlFor="verified" className="cursor-pointer text-sm font-normal">
            Solo profesionales verificados
          </Label>
        </div>

        {/* Apply button */}
        <Button onClick={handleApply} className="w-full">
          Aplicar Filtros
        </Button>
      </div>
    </Card>
  )
}
