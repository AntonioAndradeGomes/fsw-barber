"use client"
import { CalendarDays, MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

const Header = () => {
    const { data } = useSession()
    const handleLoginWithGoogleClick = () =>
        signIn("google", { prompt: "select_account" })
    return (
        <header>
            <Card>
                <CardContent className="flex flex-row items-center justify-between px-5 py-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="FSW Barber"
                            height={18}
                            width={120}
                        />
                    </Link>

                    <div className="block sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline">
                                    <MenuIcon />
                                </Button>
                            </SheetTrigger>
                            <SidebarSheet />
                        </Sheet>
                    </div>

                    <div className="hidden sm:block">
                        <nav className="flex gap-4">
                            <Button className="gap-2" variant="ghost">
                                <CalendarDays /> Agendamento
                            </Button>
                            {data?.user ? (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={data?.user?.image ?? ""}
                                        />
                                    </Avatar>

                                    <p className="font-bold">
                                        {data.user.name}
                                    </p>
                                </div>
                            ) : (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2">
                                            <Image
                                                src="/google.svg"
                                                width={18}
                                                height={18}
                                                alt="Login com o Google"
                                            />
                                            Login com o Google
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[90%]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Faça login na plataforma.
                                            </DialogTitle>
                                            <DialogDescription>
                                                Conecte-se usando sua conta do
                                                Google.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <Button
                                            variant="outline"
                                            className="gap-1 font-bold"
                                            onClick={handleLoginWithGoogleClick}
                                        >
                                            <Image
                                                src="/google.svg"
                                                width={18}
                                                height={18}
                                                alt="Login com o Google"
                                            />
                                            Login com o Google
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </nav>
                    </div>
                </CardContent>
            </Card>
        </header>
    )
}

export default Header
