import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, Head, useForm, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import CustomerNavbar from '@/Components/CustomerNavbar';

export default function Welcome({ auth }) {


    

    return (
        <>
            <Head title="Welcome" />
            <ToastContainer />
<CustomerNavbar auth={auth}/>


<section class=" bg-[url('https://mymodernmet.com/wp/wp-content/uploads/2017/06/starting-a-freelance-business-1.jpg')] bg-gray-600 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome To Kiet Freelancer System</h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Connect, Collaborate, Create: The Freelance Way</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            
            <Link href={route('order.index')}>
            <PrimaryButton className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg'>
                Make Order
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </PrimaryButton>
            </Link>
        </div>
    </div>
</section>


<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <a href="#" class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
               
                Design
            </a>
            <h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Unlock Your Potential with Freelance Flexibility</h1>
            <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Are you tired of the 9-to-5 grind and yearning for a more flexible way to work? Look no further! Our Freelance Flexibility platform empowers you to take control of your career, allowing you to work on your terms, when and where you want.</p>
           
        </div>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                <a href="#" class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                    
                    Development
                </a>
                <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Elevate Your Development Career with Freelance Expertise</h2>
                <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.</p>
              
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                <a href="#" class="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                
                    Payment
                </a>
                <h2 class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Simplify Payments in the Freelance World</h2>
                <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">In the ever-evolving freelance landscape, ensuring that you get paid seamlessly and securely for your hard work is paramount. Say goodbye to the payment hassles and complications that often come with freelancing. Our Freelance Payment Simplified platform is here to make your financial transactions smooth and worry-free.</p>
              
            </div>
        </div>
    </div>
</section>



            <footer class="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased">
  <p class="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
      &copy; 2023 <a href="/" class="hover:underline">KietFreelancerApplication™</a>. All rights reserved.
  </p>
 
</footer>

            

        
        </>
    );
}
