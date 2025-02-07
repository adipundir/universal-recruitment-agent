"use client"

export default function Opening() {
    const params = useParams()
    console.log("Params", params)
    return (
        <main className="container mx-auto py-8">
            <JobListing
                companyName="Coinbase"
                companyLogo="/placeholder.svg?height=64&width=64"
                jobTitle="Software Engineer, Frontend - Consumer Products"
                location="United States"
                salary="$152.4K/yr - $179.3K/yr"
                postedDate="2 days ago"
                employmentType="Full-time"
                applicantCount={100}
                description="At Coinbase, our mission is to increase economic freedom in the world. We're seeking a frontend engineer to join our team to build out the next generation of crypto-forward products and features."
                requirements={[
                    "2+ years of experience in developing web apps",
                    "Experience with React and modern JS frameworks",
                    "Familiarity with front-end architecture best practices",
                    "Experience collaborating with designers and product managers",
                ]}
                isAccepting={true}
            />
        </main>
    )
}

import JobListing from '@/components/JobListingExpanded'
import { useParams } from 'next/navigation'

