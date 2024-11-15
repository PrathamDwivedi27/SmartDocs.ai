import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WorkspaceHeader = ({fileName}) => {
  return (
    <div className='p-4 flex justify-between shadow-md items-center'>
      <Image src="/logo.svg" alt="logo" width={140} height={100} />
      <h2 className='font-bold ml-[-80px]'>{fileName}</h2>
      <div className='flex gap-2 items-center'>
        <Button >Save</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default WorkspaceHeader
