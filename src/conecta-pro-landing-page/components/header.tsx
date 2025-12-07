"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">CP</span>
            </div>
            <span className="text-xl font-bold text-foreground">ConectaPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="#inicio"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Cómo Funciona
            </Link>
            <Link
              href="#categorias"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Categorías
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="#inicio"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="#como-funciona"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cómo Funciona
              </Link>
              <Link
                href="#categorias"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorías
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" size="sm" className="w-full">
                  Iniciar Sesión
                </Button>
                <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
