import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
    searchParams: {
        title?: string
        service?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title
                    ? {
                          name: {
                              contains: searchParams?.title,
                              mode: "insensitive",
                          },
                      }
                    : {},
                searchParams.service
                    ? {
                          service: {
                              some: {
                                  name: {
                                      contains: searchParams.service,
                                      mode: "insensitive",
                                  },
                              },
                          },
                      }
                    : {},
            ],
        },
    })

    return (
        <div>
            <Header />
            <div className="my-6 block px-5 md:hidden">
                <Search />
            </div>
            <div className="px-5 pb-8 sm:px-8 md:px-12 lg:px-16 xl:px-32">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 md:text-xl md:text-white">
                    Resultados para &quot;
                    {searchParams?.title || searchParams?.service}
                    &quot;
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {barbershops.map((barbershop) => (
                        <BarberShopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BarbershopsPage
