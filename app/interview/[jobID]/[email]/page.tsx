"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import isInterviewScheduled from "@/UtilityFunctions/isInterviewScheduled"
import { Button } from '@/components/ui/button'
import Lottie from "lottie-react"
import animationData from "@/public/cross-animation.json"

const InterviewPage = () => {
    const params = useParams()
    const [isAllowed, setIsAllowed] = useState(false)

    const isAllowedCheck = async () => {
        const allowed = await isInterviewScheduled(params.jobID, params.email)
        setIsAllowed(allowed)
        console.log("isallowed", allowed)
    }

    useEffect(() => {
        isAllowedCheck()
    }, [])

    return (
        <div className='mt-24 w-full min-h-[100vh] max-h-[100vh]'>
            {isAllowed ? (
                <div>Interview Content Here</div>
            ) : (
                    <div className="flex flex-col items-center justify-center p-6 w-full h-full">
                        <h2 className="text-2xl font-bold mb-4">Your interview is not scheduled yet ❌</h2>
                    </div>
            )}
        </div>
    )
}

export default InterviewPage