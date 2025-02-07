"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import JobListingCard from "@/components/JobListingCard"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import CreateJobListing from "@/components/CreateJobListing"
import { useState } from "react"

// This would typically come from an API or database
const jobListings = [
    {
        id: 1,
        companyName: "Coinbase",
        companyLogo: "/placeholder.svg?height=48&width=48",
        jobTitle: "Software Engineer, Frontend",
        location: "United States",
        salary: "$152K - $179K",
        postedDate: "2 days ago",
        isRemote: true,
    },
    {
        id: 2,
        companyName: "Vercel",
        companyLogo: "/placeholder.svg?height=48&width=48",
        jobTitle: "Senior Product Designer",
        location: "San Francisco, CA",
        salary: "$130K - $160K",
        postedDate: "1 week ago",
        isRemote: true,
    },
    {
        id: 3,
        companyName: "Stripe",
        companyLogo: "/placeholder.svg?height=48&width=48",
        jobTitle: "Full Stack Developer",
        location: "New York, NY",
        salary: "$140K - $180K",
        postedDate: "3 days ago",
        isRemote: false,
    },
    {
        id: 4,
        companyName: "Stripe",
        companyLogo: "/placeholder.svg?height=48&width=48",
        jobTitle: "Full Stack Developer",
        location: "New York, NY",
        salary: "$140K - $180K",
        postedDate: "3 days ago",
        isRemote: false,
    },
    // Add more job listings as needed
]

export default function Home() {
    const [addOpeningDialogOpen, setAddOpeningDialogOpen] = useState<boolean>(false)
    const [isLoading, setisLoading] = useState<boolean>(false)
    return (
        <>
            <div className="pt-24 container min-h-[100vh] mx-auto py-8 flex flex-col gap-8">
                {jobListings?.length > 0 && <div>
                    <div className="text-4xl flex justify-between items-center sm:text-5xl md:text-6xl font-bold mb-8 text-black dark:text-white">
                        <p>Job Listings ✨</p>
                        <Dialog open={addOpeningDialogOpen} onOpenChange={setAddOpeningDialogOpen}>
                            <DialogTrigger><Button disabled={isLoading} className="font-bold">
                                {isLoading ? "Loading..." : <div className="flex items-center justify-center"> <PlusCircle className="mr-2 h-4 w-4" /> Add Job Opening</div> }
                            </Button></DialogTrigger>
                            <DialogContent className="overflow-y-scroll px-6 py-8 max-h-[80vh]">
                                <DialogHeader>
                                    <DialogTitle>New Job Opening Details</DialogTitle>
                                    {/* <DialogDescription>
                                        Fill the details for the new Job opening
                                    </DialogDescription> */}
                                </DialogHeader>
                                <CreateJobListing />
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>}
                
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobListings.map((job) => (
                            <JobListingCard key={job.id} {...job} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

