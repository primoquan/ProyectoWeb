import { Phone, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const contacts = [
  {
    name: "María López",
    type: "WhatsApp",
    time: "Hace 2 horas",
    icon: MessageCircle,
  },
  {
    name: "Carlos Gómez",
    type: "Llamada",
    time: "Ayer",
    icon: Phone,
  },
  {
    name: "Ana Martínez",
    type: "WhatsApp",
    time: "Hace 3 horas",
    icon: MessageCircle,
  },
  {
    name: "Pedro Ramírez",
    type: "Llamada",
    time: "Hace 1 día",
    icon: Phone,
  },
  {
    name: "Lucía Hernández",
    type: "WhatsApp",
    time: "Hace 5 horas",
    icon: MessageCircle,
  },
]

export function RecentContacts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contactos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Nombre Cliente</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Tipo Contacto</th>
                  <th className="text-left text-sm font-medium text-muted-foreground pb-3">Fecha</th>
                  <th className="text-right text-sm font-medium text-muted-foreground pb-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm font-medium">{contact.name}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="gap-1 bg-primary/5 border-primary/20">
                        <contact.icon className="h-3 w-3" />
                        {contact.type}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{contact.time}</td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/dashboard/contactos"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Ver todos los contactos →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
