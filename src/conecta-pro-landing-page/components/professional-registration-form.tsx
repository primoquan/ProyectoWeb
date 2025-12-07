"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

const CATEGORIAS = [
  "Plomería",
  "Electricidad",
  "Abogacía",
  "Medicina",
  "Carpintería",
  "Albañilería",
  "Jardinería",
  "Limpieza",
]

const DEPARTAMENTOS = [
  "Guatemala",
  "Alta Verapaz",
  "Baja Verapaz",
  "Chimaltenango",
  "Chiquimula",
  "El Progreso",
  "Escuintla",
  "Huehuetenango",
  "Izabal",
  "Jalapa",
  "Jutiapa",
  "Petén",
  "Quetzaltenango",
  "Quiché",
  "Retalhuleu",
  "Sacatepéquez",
  "San Marcos",
  "Santa Rosa",
  "Sololá",
  "Suchitepéquez",
  "Totonicapán",
  "Zacapa",
]

const MUNICIPIOS_GUATEMALA = [
  "Guatemala",
  "Mixco",
  "Villa Nueva",
  "San Miguel Petapa",
  "Villa Canales",
  "Fraijanes",
  "Amatitlán",
  "San Juan Sacatepéquez",
  "Chinautla",
  "San Pedro Ayampuc",
]

export function ProfessionalRegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    whatsapp: "",
    categoria: "",
    experiencia: "",
    departamento: "",
    municipio: "",
    descripcion: "",
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
    if (!formData.categoria) newErrors.categoria = "Selecciona una categoría"
    if (!formData.experiencia) newErrors.experiencia = "Indica años de experiencia"
    if (!formData.departamento) newErrors.departamento = "Selecciona un departamento"
    if (!formData.municipio) newErrors.municipio = "Selecciona un municipio"
    if (formData.descripcion.length > 500) {
      newErrors.descripcion = "Máximo 500 caracteres"
    }
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("[v0] Professional registration:", formData)
      // Handle successful registration
    }
  }

  return (
    <div className="space-y-6">
      {/* Benefits Box */}
      <div className="bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-lg p-4 space-y-2">
        <h3 className="font-semibold text-[#2E7D32] mb-3">Beneficios del Plan Profesional</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            <span>Perfil profesional personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            <span>Aparece en búsquedas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            <span>Recibe contactos de clientes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            <span>Sistema de reseñas</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre completo */}
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Juan Pérez López"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className={errors.nombre ? "border-destructive" : ""}
          />
          {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
        </div>

        {/* Email profesional */}
        <div className="space-y-2">
          <Label htmlFor="email">Email profesional</Label>
          <Input
            id="email"
            type="email"
            placeholder="juan.perez@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Teléfono y WhatsApp */}
        <div className="grid md:grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
            <div className="flex gap-2">
              <Input type="text" value="+502" disabled className="w-20 bg-muted" />
              <Input
                id="whatsapp"
                type="tel"
                placeholder="1234-5678"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Categoría y Experiencia */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría/Profesión</Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => setFormData({ ...formData, categoria: value })}
            >
              <SelectTrigger className={errors.categoria ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoria && <p className="text-sm text-destructive">{errors.categoria}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experiencia">Años de experiencia</Label>
            <Input
              id="experiencia"
              type="number"
              min="0"
              max="50"
              placeholder="5"
              value={formData.experiencia}
              onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
              className={errors.experiencia ? "border-destructive" : ""}
            />
            {errors.experiencia && <p className="text-sm text-destructive">{errors.experiencia}</p>}
          </div>
        </div>

        {/* Departamento y Municipio */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select
              value={formData.departamento}
              onValueChange={(value) => setFormData({ ...formData, departamento: value })}
            >
              <SelectTrigger className={errors.departamento ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecciona departamento" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTAMENTOS.map((dep) => (
                  <SelectItem key={dep} value={dep}>
                    {dep}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.departamento && <p className="text-sm text-destructive">{errors.departamento}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipio">Municipio</Label>
            <Select
              value={formData.municipio}
              onValueChange={(value) => setFormData({ ...formData, municipio: value })}
            >
              <SelectTrigger className={errors.municipio ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecciona municipio" />
              </SelectTrigger>
              <SelectContent>
                {MUNICIPIOS_GUATEMALA.map((mun) => (
                  <SelectItem key={mun} value={mun}>
                    {mun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.municipio && <p className="text-sm text-destructive">{errors.municipio}</p>}
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <Label htmlFor="descripcion">Breve descripción</Label>
          <Textarea
            id="descripcion"
            placeholder="Cuéntanos sobre tu experiencia, servicios que ofreces, certificaciones..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className={`min-h-24 ${errors.descripcion ? "border-destructive" : ""}`}
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{errors.descripcion || ""}</span>
            <span>{formData.descripcion.length}/500</span>
          </div>
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
            <a href="/terminos" className="text-[#2E7D32] hover:underline">
              términos y condiciones
            </a>{" "}
            y la{" "}
            <a href="/privacidad" className="text-[#2E7D32] hover:underline">
              política de privacidad
            </a>
          </label>
        </div>
        {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}

        {/* Submit button */}
        <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white" size="lg">
          Registrarse - Q99/mes
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Cancela cuando quieras. Sin contratos de largo plazo.
        </p>
      </form>
    </div>
  )
}
