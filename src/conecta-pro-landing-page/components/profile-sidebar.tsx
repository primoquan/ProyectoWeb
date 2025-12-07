import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MessageCircle, Briefcase, Share2, Facebook, Instagram, Linkedin } from "lucide-react"

interface Professional {
  schedule: string
  responseTime: string
  completedProjects: number
}

interface ProfileSidebarProps {
  professional: Professional
}

export function ProfileSidebar({ professional }: ProfileSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Quick Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Información Rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Horario de Atención</p>
              <p className="text-sm text-muted-foreground">{professional.schedule}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Tiempo de Respuesta</p>
              <p className="text-sm text-muted-foreground">{professional.responseTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Proyectos Completados</p>
              <p className="text-sm text-muted-foreground">{professional.completedProjects}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Compartir Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Copiar Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="border-[#2E7D32] bg-[#2E7D32]/5">
        <CardContent className="pt-6 text-center">
          <p className="mb-4 text-sm text-muted-foreground">¿Listo para contactar a este profesional?</p>
          <Button className="w-full bg-[#2E7D32] hover:bg-[#2E7D32]/90">Enviar Mensaje</Button>
        </CardContent>
      </Card>
    </div>
  )
}
