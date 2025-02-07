import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign } from "lucide-react"
import { JobListing } from "@/constants/types"

export default function JobListingExpanded({
    companyName,
    companyLogo,
    jobTitle,
    location,
    salary,
    postedDate,
    employmentType,
    applicantCount,
    description,
    requirements,
}: JobListing) {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={companyLogo || "/placeholder.svg"}
                        alt={`${companyName} logo`}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{jobTitle}</h1>
                        <p className="text-gray-600">{companyName}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                    </div>
                    <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {salary}
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {postedDate}
                    </div>
                    {employmentType && <Badge variant="secondary">employmentType</Badge>}
                </div>

                <p className="text-sm text-gray-500 mb-4">Over {applicantCount} applicants</p>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">About the job</h2>
                    <p className="text-gray-700">{description}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4">
                    <Button>Easy Apply</Button>
                    <Button variant="outline">Save</Button>
                </div>
            </div>
        </div>
    )
}

