

import { Link } from '@inertiajs/react'
import React from 'react'
import PrimaryButton from './PrimaryButton'


const CustomerNavbar = ({auth}) => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link href="/" class="flex items-center">
      <img src="https://cdn.icon-icons.com/icons2/2648/PNG/512/logo_freelancer_com_icon_160826.png" class="h-8 mr-3" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kiet Freelancer</span>
  </Link>
  <div class="flex md:order-2">
        {auth.user  ? (
            
            auth.user.role !== 'customer' ? (
                <Link href={route('dashboard')}>
                  <PrimaryButton>Dashboard</PrimaryButton>
                </Link>
              ) : (
                <>
                  <Link href={route('logout')} method="post" as="button">
                  <PrimaryButton>Logout</PrimaryButton>
                </Link>
                </>
              )
      
        ) : (
            <>
                <Link href={route('login')} className='px-4'>

                    <PrimaryButton>Login</PrimaryButton>
    
                </Link>
            <Link href={route('register')}>

                <PrimaryButton>Register As Freelancer</PrimaryButton>
    
                </Link>
            </>
        )}
       
  </div>
 
  </div>
</nav>
  )
}

export default CustomerNavbar