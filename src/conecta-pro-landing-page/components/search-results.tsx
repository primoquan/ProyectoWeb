"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchResultsProps {
  totalResults: number
  location: string
  sortBy: string
  onSortChange: (value: string) => void
}

export function SearchResults({ totalResults, location, sortBy, onSortChange }: SearchResultsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{totalResults} profesionales encontrados</h1>
        <p className="text-sm text-muted-foreground">en {location}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Ordenar por:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Mejor calificación</SelectItem>
            <SelectItem value="distance">Más cercanos</SelectItem>
            <SelectItem value="reviews">Más reseñas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
