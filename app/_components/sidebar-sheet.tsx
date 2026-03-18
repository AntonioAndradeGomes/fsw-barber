"use client"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import quickSearchOptions from "../_constants/search"
import Image from "next/image"
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
    const { data } = useSession()
    const handleLoginWithGoogleClick = () =>
        signIn("google", { prompt: "select_account" })
    const handleLogoutClick = () => signOut()
    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={data?.user?.image ?? ""} />
                    </Avatar>
                    <div>
                        <p className="font-bold">{data.user.name}</p>
                        <p className="text-xs">{data.user.email}</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
                    <h2 className="font-bold">Olá, faça seu login!</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="icon">
                                <LogInIcon />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%]">
                            <DialogHeader>
                                <DialogTitle>
                                    Faça login na plataforma.
                                </DialogTitle>
                                <DialogDescription>
                                    Conecte-se usando sua conta do Google.
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
                </div>
            )}
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

                <Button className="justify-start gap-2" variant="ghost">
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
                    onClick={handleLogoutClick}
                >
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    )
}

export default SidebarSheet
