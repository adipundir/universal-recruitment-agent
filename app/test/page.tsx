"use client"
import { Button } from '@/components/ui/button'
import { UploadJobOpeningToSecretVault } from '@/UtilityFunctions/UploadJobOpeningToSecretVault.js'
import updateSVRecord  from '@/UtilityFunctions/UpdateSVRecord.js'
import React from 'react'
import transformObject from '@/UtilityFunctions/TransformRecord'

const page = () => {

  const handleUpload = async () => {
    const jobOpenings = [
      {
        "recruiterEmail": { "$allot": "recruiter@example.com" },
        "companyName": { "$allot": "Tech Innovators Inc." },
        "companyLogo": { "$allot": "https://example.com/logo.png" },
        "jobTitle": { "$allot": "Software Engineer Intern" },
        "location": { "$allot": "San Francisco, CA" },
        "salary": { "$allot": "$30,000 - $40,000" },
        "postedDate": { "$allot": "2025-02-09" },
        "employmentType": { "$allot": "Part-time" },
        "description": { "$allot": "We are looking for a skilled Software Engineer Interns to join our team." },
        "requirements": [
          { "$allot": "Proficiency in JavaScript and React" },
          { "$allot": "Experience with cloud platforms like AWS" },
          { "$allot": "Strong problem-solving skills" }
        ],
        "isAccepting": { "$allot": "true" },
        "hasPaid": { "$allot": "true" },
        "candidates": [
          { 
            "candidateEmail": { "$allot": "applicant1@example.com" },
            "candidateResume": { "$allot": "Complete resume in text" },
            "interviewScheduled": { "$allot": "2025-02-15" },
            "resumeScore": { "$allot": "85" },
            "interviewScores": {
              "knowledge": { "$allot": "90" },
              "truthfulness": { "$allot": "80" },
              "communication": { "$allot": "85" },
              "confidence": { "$allot": "88" },
              "problemSolving": { "$allot": "87" },
              "jobFit": { "$allot": "89" },
              "adaptability": { "$allot": "86" },
              "culturalFit": { "$allot": "84" }
            },
            "overallScore": { "$allot": "86" },
            "feedback": { "$allot": "Strong candidate with great problem-solving skills." },
            "interviewDate": { "$allot": "2025-02-15" },
            "verdict": { "$allot": "Hired" }
          }
        ]
      },
      {
        "recruiterEmail": { "$allot": "hr@startupx.com" },
        "companyName": { "$allot": "Startup X" },
        "companyLogo": { "$allot": "https://example.com/startupx-logo.png" },
        "jobTitle": { "$allot": "Product Manager" },
        "location": { "$allot": "New York, NY" },
        "salary": { "$allot": "$110,000 - $140,000" },
        "postedDate": { "$allot": "2025-02-08" },
        "employmentType": { "$allot": "Full-time" },
        "description": { "$allot": "Looking for an experienced Product Manager to drive our product vision." },
        "requirements": [
          { "$allot": "5+ years of experience in product management" },
          { "$allot": "Strong leadership and communication skills" },
          { "$allot": "Experience with Agile methodologies" }
        ],
        "isAccepting": { "$allot": "true" },
        "hasPaid": { "$allot": "false" },
        "candidates": []
      }
    ]
    
    
    UploadJobOpeningToSecretVault(jobOpenings)
  }
  
  const handleUpdate = async () => {
    const newRecord = {
      "recruiterEmail": { "$allot": "abcd@1234.com" },
      "companyName": { "$allot": "Startup Z" },
      "companyLogo": { "$allot": "https://example.com/startupx-logo.png" },
      "jobTitle": { "$allot": "Product Manager" },
      "location": { "$allot": "New York, NY" },
      "salary": { "$allot": "$110,000 - $140,000" },
      "postedDate": { "$allot": "2025-02-08" },
      "employmentType": { "$allot": "Full-time" },
      "description": { "$allot": "Looking for an experienced Product Manager to drive our product vision." },
      "requirements": [
        { "$allot": "5+ years of experience in product management" },
        { "$allot": "Strong leadership and communication skills" },
        { "$allot": "Experience with Agile methodologies" }
      ],
      "isAccepting": { "$allot": "true" },
      "hasPaid": { "$allot": "false" },
      "candidates": []
    }
    updateSVRecord(newRecord,"da7c3071-6ab0-4e81-bae0-e5945c98964e")
  }

  const transFormRecord = () => {
    const transformedJobPosting = transformObject();
  }

  return (
    <div>
      <Button className='mt-32' onClick={handleUpload}>Upload</Button>
      <Button className='mt-32' onClick={handleUpdate}>Update</Button>
      <Button className='mt-32' onClick={transFormRecord}>Transform</Button>
    </div>

  )
}

export default page