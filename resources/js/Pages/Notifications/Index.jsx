import React from 'react'
import CustomerNavbar from '@/Components/CustomerNavbar'
import { Head,Link } from '@inertiajs/react'
import moment from 'moment';
const Index = ({auth,notifications}) => {
  return (
    <>
    <Head title='Index'/>
    <CustomerNavbar auth={auth}/>

   

        
    <div class="flex items-center justify-center mt-10 ">
        <div class="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-2/3">
        <ol class="relative border-s border-gray-200 dark:border-gray-700">     

        {notifications.map((notification)=>(
             <li class="mb-10 ms-6">  

            {notification.status === 0 ? (
                <span class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-red-900">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 64 64" id="clock"><g fill="#134563"><path d="M31.9 54.9C19.3 54.9 9 44.6 9 32 9 19.4 19.3 9.1 31.9 9.1c12.6 0 22.9 10.3 22.9 22.9.1 12.6-10.2 22.9-22.9 22.9zm0-43.4c-11.3 0-20.4 9.2-20.4 20.4s9.2 20.4 20.4 20.4 20.4-9.2 20.4-20.4-9.1-20.4-20.4-20.4z"></path><path d="m39.1 43.7-8.5-8.5V19.7h2.7v14.4l7.7 7.7-1.9 1.9"></path></g></svg>
                </span>
            ):(
             <span class="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path></svg>
                </span>
                )}
            

             <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{notification.invoice_id} - {notification.projects.project_title}
           
           { notification.status === 1 ? (
               <span class=" ml-3 text-xs bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Sended
               </span>
           ):(
           <span class="  ml-3 text-xs bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Not Sended
           </span>
           )
        
        }
            
                
                </h3>
             <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {moment(new Date(notification.updated_at)).fromNow()}
             </time>

             { notification.status === 1 ? (
             <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg class="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
         <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
         <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
     </svg> Download ZIP</a>)
     
    :(
        <a href={route('payments.edit',notification)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
           <svg xmlns="http://www.w3.org/2000/svg" class="me-2.5" width="30" height="25" viewBox="0 0 120 90" id="payment"><g fill="none" fill-rule="evenodd"><path fill="#2C97DE" d="M111.999 0H8C3.582 0 0 3.59 0 8.008v59.984C0 72.415 3.591 76 8.001 76H112c4.419 0 8.001-3.59 8.001-8.008V8.008C120 3.585 116.409 0 111.999 0Z"></path><g fill="#FFF"><path d="m95.95 40.419.002.053c.26 6.662 9.375 2.972 10.155 2.474l.72 4.85c-.961.748-3.611 1.819-7.818 1.819-6.953 0-9.983-4.416-9.983-11.37 0-6.955 3.86-11.37 9.201-11.37 7.038 0 9.273 5.152 9.273 10.506v3.038H95.95zm-.049-4.206c.134-2.399.71-4.598 2.607-4.598 2.207 0 2.502 3.297 2.401 4.564l.053.034h-5.06zm-21.02-6.787c1.727-1.743 3.583-2.551 5.405-2.551 6.049 0 7.319 5.635 7.319 11.477 0 6.112-2.959 11.263-9.237 11.263-1.287 0-2.29-.208-2.985-.542v7.029l-6.892 1.14V27.231h6.04l.35 2.195zm.472 4.108c1.867-1.577 5.263-3.208 5.263 4.359 0 7.239-3.362 6.946-5.233 6.048v-8.799c0-.584-.011-1.12-.03-1.608zm-13.115-8.37a3.7 3.7 0 0 0 3.695-3.707 3.7 3.7 0 0 0-3.695-3.707 3.7 3.7 0 0 0-3.695 3.707 3.7 3.7 0 0 0 3.695 3.707zm-3.553 2.067h7.106v21.956h-7.106V27.231zm-13.57 0h6.039l.386 2.639s1.122-3.71 5.511-2.716v6.421c-3.985-.38-5.045 1.304-5.045 1.567v14.045h-6.892V27.231zM42.77 49.103v-5.476c-2.938.698-3.98.249-3.98-2.224v-8.935h3.593l.812-5.167H38.79v-6.343l-5.968.998-.853 5.345-2.132.327-.734 4.84h2.866v10.375c-.074 5.25 3.186 7.935 10.8 6.26ZM22.045 43.618c.75-2.074-2.142-2.679-3.803-3.343-4.998-2-5.156-3.574-5.39-6.67-.232-3.095 1.56-4.884 3.706-5.916 3.333-1.6 9.795-.39 11.1.729l-.729 5.188c-6.674-2.88-7.425-1.164-7.581-.564-.623 2.402 6.773 2.453 8.654 6.35.996 2.062 1.153 5.58-.894 7.763-4.417 4.71-13.347 1.41-14.537.56l.853-5.283c.975.964 7.872 3.26 8.621 1.186Z"></path></g></g>
           </svg> Pay Now</a>
    )}
         </li>
        ))}
           
         

        </ol>
        </div>

        </div>



      

    </>
  )
}

export default Index