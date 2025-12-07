"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export function ClientRegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validation
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.email.includes("@")) newErrors.email = "Email inválido"
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("[v0] Client registration:", formData)
      // Handle successful registration
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre completo */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre completo</Label>
        <Input
          id="nombre"
          type="text"
          placeholder="Juan Pérez"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className={errors.nombre ? "border-destructive" : ""}
        />
        {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@ejemplo.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono</Label>
        <div className="flex gap-2">
          <Input type="text" value="+502" disabled className="w-20 bg-muted" />
          <Input
            id="telefono"
            type="tel"
            placeholder="1234-5678"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className={`flex-1 ${errors.telefono ? "border-destructive" : ""}`}
          />
        </div>
        {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={errors.password ? "border-destructive" : ""}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      {/* Confirmar contraseña */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={errors.confirmPassword ? "border-destructive" : ""}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      {/* Términos y condiciones */}
      <div className="flex items-start gap-2">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
        />
        <label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
          Acepto los{" "}
          <a href="/terminos" className="text-[#1976D2] hover:underline">
            términos y condiciones
          </a>{" "}
          y la{" "}
          <a href="/privacidad" className="text-[#1976D2] hover:underline">
            política de privacidad
          </a>
        </label>
      </div>
      {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}

      {/* Submit button */}
      <Button type="submit" className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white" size="lg">
        Registrarse Gratis
      </Button>
    </form>
  )
}
