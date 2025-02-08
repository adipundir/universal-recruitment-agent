"use client"
import { Button } from '@/components/ui/button'
import { UploadJobOpeningToSecretVault } from '@/UtilityFunctions/UploadJobOpeningToSecretVault.js'
import React from 'react'

const page = () => {

  const handleUpload = async () => {
    const jobOpenings = [
      {
        openingId: { $allot: "JOB-2024-004" },
        recruiterId: { $allot: "REC-112" },
        companyName: { $allot: "Polygon Labs" },
        companyLogo: { $allot: "https://polygon.com/logo.png" },
        jobTitle: { $allot: "ZK Proof Engineer" },
        location: { $allot: "Dubai, UAE (On-site)" },
        salary: { $allot: "$160,000 - $210,000" },
        postedDate: { $allot: "2024-02-08T09:00:00Z" },
        employmentType: { $allot: "Full-time" },
        description: {
          $allot: "Join Polygon Labs' ZK division to develop and implement cutting-edge zero-knowledge proof systems. You'll be working on scaling solutions that will help bring Web3 to millions of users worldwide."
        },
        requirements: [
          { $allot: "PhD in Computer Science, Mathematics, or related field" },
          { $allot: "Deep expertise in zero-knowledge proof systems (SNARK, STARK)" },
          { $allot: "Experience with Rust and C++" },
          { $allot: "Understanding of modern cryptographic primitives" },
          { $allot: "Published research in cryptography or zero-knowledge proofs is a plus" }
        ],
        isAccepting: { $allot: true }
      }
    ];

    UploadJobOpeningToSecretVault(jobOpenings)
  }
  return (
      <Button className='mt-32' onClick={handleUpload}>Click</Button>
  )
}

export default page