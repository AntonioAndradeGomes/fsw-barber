import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import quickSearchOptions from "./_constants/search"
import BookingItem from "./_components/booking-item"
import BarberShopList from "./_components/barbershop-list"
import Search from "./_components/search"
import Link from "next/link"

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
            {/*<div className="relative h-auto w-full md:h-[463px]">
                <Image
                    src="/frame-image.jpg"
                    alt="Banner FSW Barber"
                    fill
                    className="hidden object-cover brightness-75 saturate-0 md:block"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/70 to-transparent md:block" />
                <div className="relative px-5 py-5 md:absolute md:inset-0 md:flex md:items-center md:gap-12 lg:gap-24 lg:px-24">
                    <div className="flex-[4]">
                        <h2 className="text-xl font-bold">
                            Olá, Antonio Andrade!
                        </h2>
                        <p>Sexta-feira, 20 de fevereiro.</p>
                        <div className="mt-6 flex items-center gap-2">
                            <Input placeholder="Faça sua busca..."></Input>
                            <Button>
                                <SearchIcon />
                            </Button>
                        </div>

                        <div className="mt-6 flex gap-3 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
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

                        <div className="relative mt-6 h-[150px] w-full md:hidden">
                            <Image
                                src="/banner-01.png"
                                alt="Banner: agende nos melhores com FSW Barber"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <BookingItem />
                    </div>

                    <div className="flex-[6] overflow-hidden">
                        <BarberShopList
                            items={barbershops}
                            title="Recomendados"
                        />
                    </div>
                </div>
            </div>*/}

            <div className="p-5">
                <h2 className="text-xl font-bold">Olá, Antonio Andrade!</h2>
                <p>Sexta-feira, 20 de fevereiro.</p>
                <div className="mt-5">
                    <Search />
                </div>

                <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            key={option.title}
                            className="gap-2"
                            variant="secondary"
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image
                                    src={option.imageUrl}
                                    width={16}
                                    height={16}
                                    alt={option.title}
                                />
                                {option.title}
                            </Link>
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
            </div>
            <div className="px-5 pb-5">
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
        </div>
    )
}

export default Home
