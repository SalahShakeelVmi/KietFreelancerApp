import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'

const Create = ({auth}) => {

    const {data, setData, post, processing, errors, reset} = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

   

    const submit = (e) => {
        e.preventDefault()
        post(route('users.store'),  data, {
            preserveScroll: true
        })
    }

  return (
    <Authenticated user={auth.user}>
        <Head title='Create'/>

        
        <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
               

               <div className="w-2/3 mx-auto p-6 lg:p-8">
                   
                  
                   <div className="mt-16 lg:mt-0">
                       <div className="grid grid-cols-1 md:grid-cols-1 gap-12 lg:gap-12 p-12">
                           <div className="scale-100 p-12 min-w-full bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                               <div class="w-full">
                                  

                                   <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                       Create New Admin
                                   </h2>

                                   <form onSubmit={submit}>
                                    
                                   <div class="mb-6">
                                            <InputLabel for="name" value="Your Full Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
                                            <TextInput type="text"  name="username" value={data.username} onChange={onHandleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                                            <InputError message={errors.username} className="mt-2" />
                                    </div>
                                    <div class="mb-6">
                                            <InputLabel for="email" value="Your Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
                                            <TextInput type="email" name="email" value={data.email} placeholder="xyz@gmail.com" onChange={onHandleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                                            <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div class="mb-6">
                                    <InputLabel for="password" value="Your Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
                                            <TextInput type="password" name="password" value={data.password} placeholder="********" onChange={onHandleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                                            <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div class="mb-6">
                                            <InputLabel for="password_confirmation" value="Repeat Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />                             
                                            <TextInput type="password"  name="password_confirmation" value={data.password_confirmation} placeholder="********" onChange={onHandleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                    <div class="flex items-start mb-6">
                                        <div class="flex items-center h-5">
                                        <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                                        </div>
                                        <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                                    </div>
                                    <PrimaryButton disabled={processing} type="submit">Register new account</PrimaryButton>
                                    </form>

                                   
                               </div>
                           </div>
                       </div>
                   </div>

                
                   
               </div>

               
           </div>

  


            
           
    </Authenticated>
 
  )
}

export default Create