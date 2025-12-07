import Link from "next/link"
import { Briefcase } from "lucide-react"

export function RegistrationHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-[#2E7D32]" />
          <span className="text-2xl font-bold">ConectaPro</span>
        </Link>

        <Link href="/iniciar-sesion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ¿Ya tienes cuenta? <span className="font-medium text-foreground">Inicia sesión</span>
        </Link>
      </div>
    </header>
  )
}
