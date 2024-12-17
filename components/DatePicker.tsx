"use client"

import * as React from "react"
import { format } from "date-fns"
import {pl} from 'date-fns/locale'
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/UI/button"
import { Calendar } from "@/components/UI/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP", { locale: pl }) : <span>Data rozpoczęcia sprzedazy</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          locale={pl}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
