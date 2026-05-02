import { StarIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const AssessmentItem = () => {
    return (
        <>
            <div className="flex items-center gap-2 md:hidden">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 (499 avaliações)</p>
            </div>
            <Card className="hidden md:block">
                <CardContent className="flex flex-col items-center gap-2 p-3">
                    <div className="flex items-center gap-2">
                        <StarIcon
                            className="fill-primary text-primary"
                            size={20}
                        />
                        <p className="text-xl">5,0</p>
                    </div>
                    <p className="text-xs">499 avaliações</p>
                </CardContent>
            </Card>
        </>
    )
}

export default AssessmentItem
