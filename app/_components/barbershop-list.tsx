"use client"

import { Barbershop } from "@/generated/prisma/client"
import BarbershopItem from "./barbershop-item"
import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRef, useState, UIEvent } from "react"

interface BarberShopListProps {
    items: Barbershop[]
    title: string
}

const BarberShopList = ({ items, title }: BarberShopListProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const [scrollAt, setScrollAt] = useState<"start" | "middle" | "end">(
        "start",
    )

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget
        const scrollLeft = target.scrollLeft
        const maxScrollLeft = target.scrollWidth - target.clientWidth
        if (scrollLeft <= 0) {
            setScrollAt("start")
        } else if (scrollLeft >= maxScrollLeft) {
            setScrollAt("end")
        } else {
            setScrollAt("middle")
        }
    }

    const handleSetScroll = (scroll: number) => {
        const currentScrollLeft = scrollRef.current?.scrollLeft || 0
        scrollRef.current?.scrollTo({
            behavior: "smooth",
            left: currentScrollLeft + scroll,
        })
    }

    return (
        <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                {title}
            </h2>
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden"
                    onScroll={handleScroll}
                >
                    {items.map((item) => (
                        <BarbershopItem key={item.id} barbershop={item} />
                    ))}
                </div>

                <Button
                    disabled={scrollAt === "start"}
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full ring-0 transition-opacity focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:opacity-0"
                    onClick={() => handleSetScroll(-170)}
                >
                    <ChevronLeftIcon size={32} />
                </Button>

                <Button
                    disabled={scrollAt === "end"}
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full ring-0 transition-opacity focus:outline-none focus-visible:outline-none focus-visible:ring-0 disabled:opacity-0"
                    onClick={() => handleSetScroll(170)}
                >
                    <ChevronRightIcon size={32} />
                </Button>
            </div>
        </>
    )
}

export default BarberShopList
