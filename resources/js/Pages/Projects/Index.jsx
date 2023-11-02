

import React, { useState, useEffect } from 'react'
import { Link, Head, router } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import RoundedHoverButton from '@/Components/RoundedHoverButton'
import moment from 'moment';
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { NumericFormat } from 'react-number-format';
const Index = ({ auth, projects }) => {

    const [searchValue, setSearchValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const {dropdownOpen, setDropdownOpen} = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [readItem, setReadItem] = useState(null);
    const [readModel, setReadModel] = useState(false);

    const handleOpenReadModel = (item) => {
        setReadItem(item);
        openReadModel();
    };

    const openReadModel = () => {
        setReadModel(true);
    }
    const closeReadModel = () => {
        setReadModel(false);
    }


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

      
  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
};



const handleOpenModal = (project) => {
    setReadModel(false);
    setItemToDelete(project);
     setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
     setIsModalOpen(false);
  };
  
   const handleDeleteProject = () => {  
          router.delete(route('projects.destroy',itemToDelete),{
              preserveScroll: true
          })   
          handleCloseModal();
      };

  return (
    <Authenticated user={auth.user}>
        <Head title="Projects"/>


        <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="p-4">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this project?</p>
                    <div className="space-x-4 mt-4">
                        <DangerButton onClick={handleDeleteProject}>Confirm</DangerButton>
                        <PrimaryButton onClick={handleCloseModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>



            {/* Reading Model */}
            {readModel && (

                    <div id="readProductModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex">
                    <div class="relative p-4 w-full max-w-xl h-full md:h-auto">
                    
                        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            
                                <div class="flex justify-between mb-4 rounded-t sm:mb-5">
                                    <div class="text-lg text-gray-900 md:text-xl dark:text-white">
                                        <h3 class="font-semibold ">
                                         Project Title: {readItem.project_title}
                                        </h3>
                                        <h2 class="font-semibold ">
                                         Project Category: {readItem.projectcategory.category_name}
                                        </h2>
                                        <h2 class="font-semibold ">
                                         Delivery At: {
                                         moment(new Date(readItem.delivery_datetime)).format('MMMM Do YYYY, h:mm:ss a')
                                         }

                                        </h2>
                                        <p class="font-bold">
                                            Rs: <NumericFormat
  value={ readItem.price}
  thousandsGroupStyle="lakh"
  thousandSeparator=","
  displayType="text"

/>
                                        </p>
                                    </div>
                                    <div>
                                        <button type="button" onClick={closeReadModel} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                </div>
                                <dl>
                                    <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                                    <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{ readItem.description }</dd>
                           
                                </dl>
                                <div class="flex justify-between items-center">

                                    <DangerButton onClick={(e)=>{e.preventDefault(); handleOpenModal(readItem) }}> <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg> Delete</DangerButton>
                                               
                                   
                                </div>
                        </div>
                    </div>
                    </div>
                
            )}

           

            {/* End Reading Model */}
        

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
               
            </div>
          
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Sr.No</th>
                            <th scope="col" class="px-4 py-3">Project Category</th>
                            <th scope="col" class="px-4 py-3">Project Title</th>
                            <th scope="col" class="px-4 py-3">Price</th>
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">Delivery DateTime</th>
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
                                <td class="px-4 py-3">Rs.
                                <NumericFormat
                                    value={ project.price}
                                    thousandsGroupStyle="lakh"
                                    thousandSeparator=","
                                    displayType="text"

                                    />
                                </td>
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
                                <td class="px-4 py-3">
                                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{ moment(new Date(project.delivery_datetime)).format('MMMM Do YYYY, h:mm:ss a') }</span>
                                    </td>
                                <td class="px-4 py-3">{ moment(new Date(project.created_at)).fromNow() }</td>
                                <td class="px-4 py-3 flex items-center justify-end">
                                    <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            id="apple-imac-27-dropdown-button"                                            
                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                            type="button"
                                            onClick={toggleDropdown}
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        
                                        <Dropdown.Link onClick={(e)=>{e.preventDefault(); handleOpenReadModel(project) }}  >View</Dropdown.Link>
                                        <Dropdown.Link onClick={(e) => { e.preventDefault(); handleOpenModal(project) } } >Delete</Dropdown.Link>
                                        
                                       
                                        
                                    </Dropdown.Content>
                                </Dropdown>
                            </td>
                            </tr>

                        ))}
                      
                    </tbody>
                </table>
           
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