import { GradientHeading } from '@/components/ui/gradient-heading'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4'>
          <GradientHeading
              variant="default"
              size="xxl"
              weight="bold"
              className="mb-2"
          >
              UNIVERSAL
          </GradientHeading>
          <GradientHeading
              variant="default"
              size="xxl"
              weight="bold"
              className="mb-2"
          >
              RECRUITMENT
          </GradientHeading>
          <GradientHeading
              variant="default"
              size="xxl"
              weight="bold"
              className="mb-2"
          >
              GRADIENT
          </GradientHeading>
    </div>
  )
}

export default page