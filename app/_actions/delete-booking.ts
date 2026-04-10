"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

export const deleteBooking = async (bookingId: string) => {
    const user = await getServerSession(authOptions)
    if (!user) {
        throw new Error("Usuário não autenticado")
    }
    await db.booking.delete({
        where: {
            id: bookingId,
            userId: user.user.id,
        },
    })
    revalidatePath("/bookings")
}
