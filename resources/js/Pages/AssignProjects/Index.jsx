

import React, { useState, useEffect } from 'react'
import { Link, Head, router } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import RoundedHoverButton from '@/Components/RoundedHoverButton';

const Index = ({auth,users}) => {

  const [searchValue, setSearchValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const search =(value)=>{
    setSearchValue(value);
    router.visit(route('project-users.search',{search:value}), {
      preserveState: true,
      replace: true
    })
  }

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    // Clear any previous typing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a new timeout to trigger the search after 3 seconds of inactivity
    setTypingTimeout(
      setTimeout(() => {
        search(newValue); // Call the search function after 3 seconds of inactivity
      }, 1000)
    );
  };

  return (
    <Authenticated user={auth.user}>
        <Head title="Index" />
       
        {/* <Kanban /> */}

        <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
       
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                  
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input  value={searchValue} onChange={handleSearchChange} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
               
                </div>
               
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Full Name</th>
                            <th scope="col" class="px-4 py-3">Role</th>

                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.data.map((user,index) => (
                        <tr class="border-b dark:border-gray-700">
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                        <td class="px-4 py-3">{user.role}</td>
                        <td class="px-4 py-3 flex items-center justify-end">
                            <RoundedHoverButton onClick={() => {router.visit(route('project-users.create',user.id))}} svg_icon={
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill='currentColor'><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                            } />
                        </td>
                        </tr>
                        ))}

                       
                       
                    </tbody>
                </table>
            </div>
            <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  
                </span>
                <ul class="inline-flex items-stretch -space-x-px">
                { users && users.links.map((item,index) => (
                    <li>
                    <Link
                        active={item.active}
                        href={item.url}
                        dangerouslySetInnerHTML={{
                            __html: item.label,
                        }}
                        className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            index == 0 ? "rounded-l-lg" : ""
                        } ${
                            index == users.links.length - 1
                                ? "rounded-r-lg"
                                : ""
                        } ${
                            item.active
                                ? "text-blue-600 bg-blue-100"
                                : "bg-white text-gray-500"
                        }`}
                    ></Link>
                </li>
                ))}
                </ul>



              
            </nav>
        </div>
    </div>
    </section>
      
    </Authenticated>
    
  )
}

export default Index