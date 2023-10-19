import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
const Drawer = ({user,onClose}) => {
   const {data, setData, put, processing, errors, reset} = useForm({
       username: user.name,
       email: user.email,
   })

   const onHandleChange = (e) => {
       const { name, value } = e.target;
       setData({
           ...data,
           [name]: value
       })
   }

   const onUpdate =(e)=>{
        e.preventDefault();
       put(route('users.update',user.id),{
           preserveScroll: true,
           onSuccess:()=>{
            onClose();
           }
       })
      
   }

  return (
    <div id="drawer-contact" class="bg-white fixed h-screen left-0 overflow-y-auto p-4 top-0 transition-transform w-80 z-40" tabindex="-1" aria-labelledby="drawer-contact-label">
    <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
</svg>
        Edit Admin</h5>
    <button onClick={onClose} type="button"  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span class="sr-only">Close menu</span>
    </button>
    <form onSubmit={onUpdate} class="mb-6">
        <div class="mb-6">

        <InputLabel for="name" value="Your Full Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
        <TextInput type="text"  name="username" value={data.username} onChange={onHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        <InputError message={errors.username} className="mt-2" />

           
        </div>
        <div class="mb-6">

        <InputLabel for="email" value="Your Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
        <TextInput type="email" name="email" value={data.email} placeholder="xyz@gmail.com" onChange={onHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        <InputError message={errors.email} className="mt-2" />

        </div>
       
        <PrimaryButton disabled={processing} >Update</PrimaryButton>
       
    </form>
   
    </div>
  )
}

export default Drawer