

import React, { useState, useEffect } from 'react'
import { Link, Head, router } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import RoundedHoverButton from '@/Components/RoundedHoverButton'

const Index = ({ auth, projects }) => {

    const [searchValue, setSearchValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const updateStatus = (id,status) => {
     
        router.put(route('projects.update-status',id),{
            status,
            preserveScroll: true
        })
    }


    const search =(value)=>{
        setSearchValue(value);
        router.visit(route('projects.search',{search:value}), {
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
        <Head title="Projects"/>
        

        <section class="p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
    
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input value={searchValue} onChange={handleSearchChange} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                   
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <RoundedHoverButton  svg_icon={<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor"  x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                     <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                     </svg>
                 }/>
                   
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Sr.No</th>
                            <th scope="col" class="px-4 py-3">Project Category</th>
                            <th scope="col" class="px-4 py-3">Project Title</th>
                            <th scope="col" class="px-4 py-3">Price</th>
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">Created at</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project, index) => (
                            
                       
                            <tr class="border-b dark:border-gray-700">
                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                                <td class="px-4 py-3">{project.projectcategory.category_name}</td>
                                <td class="px-4 py-3">{project.project_title}</td>
                                <td class="px-4 py-3">Rs {project.price}</td>
                                <td class="px-4 py-3">
                                
                                <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" 
                                    class="sr-only peer"
                                    checked = {project.status}
                                    onChange={(e)=>{
                                        e.preventDefault();
                                        const newstatus = !project.status;
                                        updateStatus(project.id,newstatus);
                                    }}
                                   
                                />
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
    
                                </td>
                                <td class="px-4 py-3">{project.created_at}</td>
                                <td class="px-4 py-3 flex items-center justify-end">
                                    <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                    <div id="apple-imac-27-dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                            </li>
                                            <li>
                                                <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                        </div>
                                    </div>
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
                { projects && projects.links.map((item,index) => (
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
                            index == projects.links.length - 1
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