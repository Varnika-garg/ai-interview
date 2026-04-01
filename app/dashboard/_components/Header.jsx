"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'

function Header() {
  const path = usePathname()
  const router = useRouter()

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-small'>
      
      <Image src={'/logo.svg'} width={60} height={40} alt='logo'/>

      <ul className='hidden md:flex gap-6'>
        
        <li
          onClick={() => router.push('/dashboard')}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:text-primary hover:font-bold ${
            path === '/dashboard' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          Dashboard
        </li>

       <li
  onClick={() => router.push('/how-it-works')}
  className={`cursor-pointer ${path === '/how-it-works' ? 'text-blue-600 font-bold' : ''}`}
>
  How it Works?
</li>

      </ul>

      <UserButton/>
    </div>
  )
}

export default Header