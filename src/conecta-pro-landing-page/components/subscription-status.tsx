"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function SubscriptionStatus() {
  const [autoRenew, setAutoRenew] = useState(true)

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Estado de Suscripción
          </CardTitle>
          <Badge className="bg-primary text-primary-foreground">Activa</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tu suscripción está activa hasta el <strong>1 de Enero, 2025</strong>
          </p>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Checkbox
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={(checked) => setAutoRenew(checked as boolean)}
              />
              <Label htmlFor="auto-renew" className="text-sm cursor-pointer">
                Renovación automática activada
              </Label>
            </div>

            <Button variant="outline">Renovar Ahora</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
