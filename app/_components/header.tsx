import {
    CalendarDays,
    CalendarIcon,
    CircleUserIcon,
    HomeIcon,
    LogOutIcon,
    MenuIcon,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import quickSearchOptions from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <Card>
                <CardContent className="flex flex-row items-center justify-between px-5 py-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
                    <Image
                        src="/logo.png"
                        alt="FSW Barber"
                        height={18}
                        width={120}
                    />
                    <div className="block sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline">
                                    <MenuIcon />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        Menu
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex items-center gap-3 border-b border-solid py-5">
                                    <Avatar>
                                        <AvatarImage src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">
                                            Antonio Andrade
                                        </p>
                                        <p className="text-xs">
                                            gomesmax1997@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 border-b border-solid py-5">
                                    <SheetClose asChild>
                                        <Button
                                            className="justify-start gap-2"
                                            variant="ghost"
                                            asChild
                                        >
                                            <Link href={"/"}>
                                                <HomeIcon size={18} />
                                                Início
                                            </Link>
                                        </Button>
                                    </SheetClose>

                                    <Button
                                        className="justify-start gap-2"
                                        variant="ghost"
                                    >
                                        <CalendarIcon size={18} />
                                        Agendamentos
                                    </Button>
                                </div>

                                <div className="flex flex-col gap-1 border-b border-solid py-5">
                                    {quickSearchOptions.map((item) => (
                                        <Button
                                            className="justify-start gap-2"
                                            variant="ghost"
                                            key={item.title}
                                        >
                                            <Image
                                                src={item.imageUrl}
                                                height={18}
                                                width={18}
                                                alt={item.title}
                                            />
                                            {item.title}
                                        </Button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-1 py-5">
                                    <Button
                                        className="justify-start gap-2"
                                        variant="ghost"
                                    >
                                        <LogOutIcon size={18} />
                                        Sair da conta
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden sm:block">
                        <nav className="flex gap-4">
                            <Button className="gap-2" variant="ghost">
                                <CalendarDays /> Agendamento
                            </Button>
                            <Button className="gap-2">
                                <CircleUserIcon />
                                Perfil
                            </Button>
                        </nav>
                    </div>
                </CardContent>
            </Card>
        </header>
    )
}

export default Header
