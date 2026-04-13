import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

const Bookings = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        //todo: mostar pop-up de login
        return notFound()
    }

    const confirmedBookings = await getConfirmedBookings()

    const concluedBookings = await getConcludedBookings()

    return (
        <>
            <Header />
            <div className="space-y-3 p-5">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                {confirmedBookings.length === 0 &&
                    concluedBookings.length === 0 && (
                        <p className="text-sm text-gray-400">
                            Você não tem agendamentos em aberto ou concluídos.
                        </p>
                    )}
                {confirmedBookings.length > 0 && (
                    <>
                        {" "}
                        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                            Confirmados
                        </h2>
                        {confirmedBookings.map((booking) => (
                            <BookingItem
                                key={booking.id}
                                booking={JSON.parse(JSON.stringify(booking))}
                            />
                        ))}
                    </>
                )}
                {concluedBookings.length > 0 && (
                    <>
                        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
                            Finalizados
                        </h2>
                        {concluedBookings.map((booking) => (
                            <BookingItem
                                key={booking.id}
                                booking={JSON.parse(JSON.stringify(booking))}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Bookings
