import { CalendarDays, CircleUserIcon, MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

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
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
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
