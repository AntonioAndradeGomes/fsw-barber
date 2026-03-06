import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import quickSearchOptions from "./_constants/search"
import BookingItem from "./_components/booking-item"
import BarberShopList from "./_components/barbershop-list"

const Home = async () => {
    const barbershops = await db.barbershop.findMany()
    const popularBarberShops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    })

    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá, Antonio Andrade!</h2>
                <p>Sexta-feira, 20 de fevereiro.</p>
                <div className="mt-6 flex items-center gap-2">
                    <Input placeholder="Faça sua busca..."></Input>
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            key={option.title}
                            className="gap-2"
                            variant="secondary"
                        >
                            <Image
                                src={option.imageUrl}
                                width={16}
                                height={16}
                                alt={option.title}
                            />
                            {option.title}
                        </Button>
                    ))}
                </div>

                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        src="/banner-01.png"
                        alt="Banner: agende nos melhores com FSW Barber"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                <BookingItem />

                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Recomendados
                </h2>
                <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
                <BarberShopList items={popularBarberShops} title="Populares" />
            </div>
            <footer>
                <Card>
                    <CardContent className="px-5 py-6">
                        <p className="text-sm text-gray-400">
                            © 2026 Copyright{" "}
                            <span className="font-bold">FWS Barber</span>
                        </p>
                    </CardContent>
                </Card>
            </footer>
        </div>
    )
}

export default Home
