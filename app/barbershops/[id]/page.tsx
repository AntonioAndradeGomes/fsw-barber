import AssessmentItem from "@/app/_components/assessment-item"
import Header from "@/app/_components/header"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Avatar } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { AvatarImage } from "@radix-ui/react-avatar"
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            service: true,
        },
    })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div>
            <div className="hidden md:block">
                <Header />
            </div>

            <div className="md:flex md:gap-6 md:px-12 md:py-8 lg:gap-8 lg:px-16 lg:py-10 xl:gap-10 xl:px-24 2xl:px-32">
                <div className="md:flex-[758]">
                    <div className="relative h-[250px] w-full md:h-[485px]">
                        <Image
                            alt={barbershop!.name}
                            src={barbershop!.imageUrl}
                            fill
                            className="object-cover"
                        />
                        <div className="block md:hidden">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute left-4 top-4"
                                asChild
                            >
                                <Link href={"/"}>
                                    <ChevronLeftIcon size={32} />
                                </Link>
                            </Button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute right-4 top-4"
                                    >
                                        <MenuIcon size={32} />
                                    </Button>
                                </SheetTrigger>
                                <SidebarSheet />
                            </Sheet>
                        </div>
                    </div>
                    <div className="mt-3 px-5 md:mt-5 md:flex md:items-center md:justify-between md:px-0">
                        <div>
                            <h1 className="mb-3 text-xl font-bold">
                                {barbershop?.name}
                            </h1>
                            <div className="mb-2 flex items-center gap-2">
                                <MapPinIcon
                                    className="text-primary"
                                    size={18}
                                />
                                <p className="text-sm">{barbershop?.address}</p>
                            </div>
                        </div>
                        <AssessmentItem />
                    </div>
                    <div className="mt-5 space-y-3 border-b border-t border-solid p-5 md:hidden">
                        <h2 className="text-xs font-bold uppercase text-gray-400">
                            Sobre nós
                        </h2>
                        <p className="text-justify text-sm">
                            {barbershop?.description}
                        </p>
                    </div>
                    <div className="mt-3 border-b border-solid px-5 pb-5 md:border-none md:px-0 md:pb-0">
                        <h2 className="pb-3 text-xs font-bold uppercase text-gray-400">
                            Serviços
                        </h2>
                        <div className="space-y-3 min-[966px]:grid min-[966px]:grid-cols-2 min-[966px]:gap-3 min-[966px]:space-y-0">
                            {barbershop.service.map((item) => (
                                <ServiceItem
                                    key={item.id}
                                    service={JSON.parse(JSON.stringify(item))}
                                    barbershop={JSON.parse(
                                        JSON.stringify(barbershop),
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 p-5 md:hidden">
                        {barbershop.phones.map((item) => (
                            <PhoneItem key={item} phone={item} />
                        ))}
                    </div>
                </div>
                <Card className="hidden self-start md:block md:flex-[386]">
                    <CardContent>
                        <div className="relative mt-6 flex h-[180px] w-full items-end">
                            <Image
                                alt={`Mapa da barbearia ${barbershop?.name}`}
                                src="/map.png"
                                fill
                                className="rounded-xl object-cover"
                            />
                            <Card className="z-50 mx-5 mb-3 w-full">
                                <CardContent className="flex items-center gap-3 px-5 py-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={barbershop.imageUrl}
                                        />
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold">
                                            {barbershop?.name}
                                        </h3>
                                        <p className="text-xs">
                                            {barbershop?.address}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="gap-3 space-y-2 pb-5 pt-5">
                            <h2 className="text-xs font-bold uppercase text-gray-400">
                                Sobre nós
                            </h2>
                            <p className="text-justify text-sm">
                                {barbershop?.description}
                            </p>
                        </div>
                        <div className="space-y-3 border-b border-t border-solid pb-5 pt-5">
                            {barbershop.phones.map((item) => (
                                <PhoneItem key={item} phone={item} />
                            ))}
                        </div>

                        <div className="space-y-3 border-b border-solid pb-5 pt-5">
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Segunda-Feira
                                </p>
                                <p className="text-sm font-normal text-white">
                                    Fechado
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Terça-Feira
                                </p>
                                <p className="text-sm font-normal text-white">
                                    08:00-19:00
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Quart-Feira
                                </p>
                                <p className="text-sm font-normal text-white">
                                    08:00-19:00
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Quinta-Feira
                                </p>
                                <p className="text-sm font-normal text-white">
                                    08:00-19:00
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Sexta-Feira
                                </p>
                                <p className="text-sm font-normal text-white">
                                    08:00-19:00
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Sábado
                                </p>
                                <p className="text-sm font-normal text-white">
                                    08:00-19:00
                                </p>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <p className="text-sm font-normal text-gray-400">
                                    Domingo
                                </p>
                                <p className="text-sm font-normal text-white">
                                    Fechado
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex h-16 flex-row items-center justify-between">
                            <p className="text-sm font-normal text-white">
                                Em parceria com
                            </p>
                            <Image
                                src="/logo.png"
                                alt="FSW Barber"
                                height={18}
                                width={120}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default BarbershopPage
