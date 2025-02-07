import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign } from "lucide-react"

interface JobListingProps {
    companyName: string
    companyLogo: string
    jobTitle: string
    location: string
    salary: string
    postedDate: string
    isRemote: boolean
}

export default function JobListingCard({
    companyName,
    companyLogo,
    jobTitle,
    location,
    salary,
    postedDate,
    isRemote,
}: JobListingProps) {
    return (
        <Card className="h-full">
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={companyLogo || "/placeholder.svg"}
                        alt={`${companyName} logo`}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{jobTitle}</h2>
                        <p className="text-sm text-muted-foreground">{companyName}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {salary}
                    </div>
                    {isRemote && <Badge variant="secondary">Remote</Badge>}
                </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {postedDate}
            </CardFooter>
        </Card>
    )
}

