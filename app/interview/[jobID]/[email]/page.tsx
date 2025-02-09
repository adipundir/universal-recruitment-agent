"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import isInterviewScheduled from "@/UtilityFunctions/isInterviewScheduled"
import { useChat } from "ai/react"
import { Chat } from '@/components/ui/chat'
import { toast } from "sonner"
import getInterviewContext from "@/UtilityFunctions/GetInterviewContext"

const InterviewPage = () => {
    const { jobID, email } = useParams(); // Get the email from URL params
    const decodedEmail = decodeURIComponent(email as string); // Decode the email
    console.log(decodedEmail)

    const [isAllowed, setIsAllowed] = useState(false)
    const [context, setContext] = useState<{ jobID: any, email: any }>({ jobID, email : decodedEmail })

    const InitialiseInterview = async () => {
        const allowed = await isInterviewScheduled(jobID, decodedEmail)
        setIsAllowed(allowed)
        console.log("isallowed", allowed)
    }

    useEffect(() => {
        InitialiseInterview()
    }, [jobID,decodedEmail])

    useEffect(() => {

    },[context])

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
        append
    } = useChat({
        api: "/api/universal-recruitment-agent",
        body: context,
        streamProtocol: "text",
        onError: (error: Error) => {
            console.log("Error", error)
            toast.error("There Was a problem Generating a Response")
        },
        initialMessages: [{
            id: "1",
            role: 'assistant',
            content: `Hi, Contratulations for being shortlisted for an interview. could you please Introduce yourself?`,
            parts: []
        }]
    })

    return (
        <div className='w-full min-h-[100vh] max-h-[100vh]'>
            {isAllowed && context? (
                <div className="flex pt-32 pb-16 min-h-[100vh] max-h-[100vh] w-full px-48 text-xl">
                    <Chat
                        className="grow"
                        messages={messages}
                        handleSubmit={handleSubmit}
                        input={input}
                        handleInputChange={handleInputChange}
                        isGenerating={isLoading}
                        stop={stop}
                        append={append}
                        suggestions={[
                            "Which Tech Stack is most populer in India amoung age group 20-25?",
                            "Is this the right time to launch a NextJS course for Indian audience?",
                            "Which city in India should we hire skilled React Native Developers from?"
                        ]}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-6 w-full h-full">
                    <h2 className="text-2xl font-bold mb-4">Your interview is not scheduled yet ❌</h2>
                </div>
            )}
        </div>
    )
}

export default InterviewPage