

import React from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, Head, useForm, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import CustomerNavbar from '@/Components/CustomerNavbar';
const Order = ({ auth,projectCategories }) => {
    const {flash} = usePage().props;

    useEffect(() => {
        if (flash.message) {
            console.log(flash.message);
          toast.success(flash.message);
        }
        else if(flash.error){
          toast.error(flash.error);
        }
      }, [flash.message,flash.error]);

    const { data, setData, post, processing, errors, reset } = useForm({
     
        projectcategoryid: '',
        price: '',
        project_title: '',
        description: '',
        delivery_datetime: '',
    })
    const currentDate = new Date().toISOString().slice(0, 16);

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value
        })
      }

      const onSubmit=(e)=> {
        e.preventDefault();
        post(route('projects.store'),data, {
          preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        })
      
      }
  return (
    <>
    <Head title="Welcome" />
    <ToastContainer />
    <CustomerNavbar auth={auth}/>
<div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center">
               

               <div className="w-2/3 mx-auto p-6 lg:p-8">
                   
                  
                   <div className="mt-16 lg:mt-0">
                       <div className="grid grid-cols-1 md:grid-cols-1 gap-12 lg:gap-12 p-12">
                           <div className="scale-100 p-12 min-w-full bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                               <div class="w-full">
                                  

                                   <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                       Make Your Order
                                   </h2>

                                   <form onSubmit={onSubmit} className='mt-8'>
                                           <div class="grid gap-4 sm:grid-cols-4 sm:gap-4">
                                               

                                             

                                               <div class="sm:col-span-8">
                                               <InputLabel for="category" value="Category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                                                   
                                                       <select onChange={onHandleChange} name='projectcategoryid' value={data.projectcategoryid} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                       <option value='' selected disabled >Select Category</option>
                                                        {projectCategories.map((category) => (

                                                            
                                                           <option key={category.id} value={category.id}>{category.category_name}</option>     
                                                           ))}
                                                       </select>
                                                       <InputError message={errors.projectcategoryid} className="mt-2" />
                                               </div>

                                               <div class="sm:col-span-8">

                                                    <InputLabel for="price" value="Amount (Rs)" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                                                   <TextInput onChange={onHandleChange} name="price" value={data.price} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type amount" required=""/>
                                                   <InputError message={errors.price} className="mt-2" />
                                               </div> 

                                               <div class="sm:col-span-8">

                                               <InputLabel for="title" value="Project Title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                                                   <TextInput onChange={onHandleChange} name="project_title" value={data.project_title} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type project title" required=""/>
                                                   <InputError message={errors.project_title} className="mt-2" />

                   
                                               </div>

                                               
                                           <div class="sm:col-span-8">

<InputLabel for="delivery_datetime" value="Delivery Datetime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
   <TextInput  min={currentDate} onChange={onHandleChange} name="delivery_datetime" value={data.delivery_datetime} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type delivery datetime" required=""/>
   <InputError message={errors.delivery_datetime} className="mt-2" />


</div>
                                              
                                               <div class="sm:col-span-8">
                                               <InputLabel for="description" value="Description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                                           
                                                   <textarea onChange={onHandleChange} name='description' value={data.description} id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                                                   <InputError message={errors.description} className="mt-2" />

                                               </div>
                                           </div>


                                           {/* <div class="sm:col-span-8 mt-5">

                                        <InputLabel for="file" value="Project File" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                                        <TextInput onChange={onHandleChange} name="file" value={data.file} type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  required=""/>
                                        <InputError message={errors.file} className="mt-2" />
                                        </div>  */}


                                       

                                         
                                           <PrimaryButton disabled={processing} className='mt-4' type="submit">Make Order</PrimaryButton>
                                       </form>

                                   
                               </div>
                           </div>
                       </div>
                   </div>

                
                   
               </div>

               
           </div>

           <footer class="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
 <p class="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
     &copy; 2023 <a href="/" class="hover:underline">KietFreelancerApplication™</a>. All rights reserved.
 </p>

</footer>
</>
  )
}

export default Order