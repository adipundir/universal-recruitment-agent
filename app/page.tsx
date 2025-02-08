import { GradientHeading } from '@/components/ui/gradient-heading'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4 h-[100vh] justify-center'>
      <GradientHeading
        variant="default"
        size="xxxl"
        weight="bold"
        className="mb-2"
      >
        UNIVERSAL
      </GradientHeading>
      <GradientHeading
        variant="default"
        size="xxxl"
        weight="bold"
        className="mb-2"
      >
        RECRUITMENT
      </GradientHeading>
      <GradientHeading
        variant="default"
        size="xxxl"
        weight="bold"
        className="mb-2"
      >
        AGENT✨
      </GradientHeading>
      <GradientHeading
        variant="default"
        size="lg"
        weight="thin"
        className="mb-2 italic"
      >
        Reducing Hiring cost by 80%
      </GradientHeading>
    </div>
  )
}

export default page