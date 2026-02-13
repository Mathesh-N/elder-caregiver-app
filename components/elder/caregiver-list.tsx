"use client"

import { Phone, Mail, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CAREGIVERS } from "@/lib/mock-data"

export function CaregiverList() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Caregivers</h2>
        <p className="text-muted-foreground mt-1">
          Your trusted care team
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CAREGIVERS.map((cg) => (
          <Card key={cg.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 p-4">
                <Avatar className="h-14 w-14 text-lg">
                  <AvatarFallback
                    className={`font-bold ${
                      cg.available
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cg.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg text-foreground truncate">
                      {cg.name}
                    </p>
                    {cg.available && (
                      <span className="h-2.5 w-2.5 bg-success shrink-0" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{cg.role}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < cg.rating
                            ? "fill-warning text-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                    onClick={() =>
                      (window.location.href = `tel:${cg.phone.replace(/\s/g, "")}`)
                    }
                    aria-label={`Call ${cg.name}`}
                  >
                    <Phone className="h-5 w-5 text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                    onClick={() =>
                      (window.location.href = `mailto:${cg.email}`)
                    }
                    aria-label={`Email ${cg.name}`}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
