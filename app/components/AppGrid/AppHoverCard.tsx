"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ReactNode } from "react"
import { Info } from "lucide-react" // Optional: adds a small info icon

interface InfoTitleProps {
    title: string;
    description: ReactNode;
    className?: string;
}

export function InfoTitle({ title, description, className = "" }: InfoTitleProps) {
    return (
        <HoverCard openDelay={100} closeDelay={100} >
            <HoverCardTrigger asChild>
                <div className={`flex items-center gap-2 cursor-help w-fit group ${className}`}>
                    <h2 className="text-lg font-semibold text-gray-800 border-gray-300 group-hover:border-gray-500 transition-colors">
                        {title}
                    </h2>
                    <Info className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 shadow-xl border-border bg-popover p-4">
                <div className="space-y-2">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}