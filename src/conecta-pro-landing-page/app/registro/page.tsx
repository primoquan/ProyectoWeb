"use client"

import { useState } from "react"
import Link from "next/link"
import { RegistrationHeader } from "@/components/registration-header"
import { ClientRegistrationForm } from "@/components/client-registration-form"
import { ProfessionalRegistrationForm } from "@/components/professional-registration-form"

export default function RegistroPage() {
  const [userType, setUserType] = useState<"cliente" | "profesional">("cliente")

  return (
    <div className="min-h-screen bg-muted/30">
      <RegistrationHeader />

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-balance">Únete a ConectaPro</h1>

          {/* User Type Tabs */}
          <div className="flex gap-2 mb-8 bg-muted rounded-lg p-1">
            <button
              onClick={() => setUserType("cliente")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                userType === "cliente"
                  ? "bg-[#1976D2] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Soy Cliente
            </button>
            <button
              onClick={() => setUserType("profesional")}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                userType === "profesional"
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Soy Profesional
            </button>
          </div>

          {/* Conditional Form Rendering */}
          {userType === "cliente" ? <ClientRegistrationForm /> : <ProfessionalRegistrationForm />}

          {/* Help Link */}
          <div className="mt-6 text-center">
            <Link href="/ayuda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ¿Necesitas ayuda?
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
