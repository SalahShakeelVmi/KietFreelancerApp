

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head,Link,router } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';

const Index = ({auth,payments}) => {
    const [searchValue, setSearchValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const {dropdownOpen, setDropdownOpen} = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleOpenModal = (project) => {
        setItemToDelete(project);
         setIsModalOpen(true);
      };
      
      const handleCloseModal = () => {
         setIsModalOpen(false);
      };
      
       const handleDeleteProject = () => {  
              router.delete(route('payments.destroy',itemToDelete),{
                  preserveScroll: true
              })   
              handleCloseModal();
          };
    
        

    const toggleDropdown = () => {
        setDropdownOpen((prevOpen) => !prevOpen);
    };

    const search =(value)=>{
        setSearchValue(value);
        router.visit(route('payments.index',{
            searchFilter:"searchFilter",
            search:value
        }), {
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


      const statusFilter = (value)=>{
          router.visit(route('payments.index',{
            statusFilter:"statusFilter",
            status:value
            }), {
            preserveState: true,
            replace: true
          })
      }

  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title='Index'/>

        <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="p-4">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this payment?</p>
                    <div className="space-x-4 mt-4">
                        <DangerButton onClick={handleDeleteProject}>Confirm</DangerButton>
                        <PrimaryButton onClick={handleCloseModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>
   

        <section class="p-3 sm:p-5">
    <div class="mx-auto">
       
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input value={searchValue} onChange={handleSearchChange} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    
                    <select onChange={e=>statusFilter(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'>
                        <option value={'all'}>All</option>
                        <option value={1}>Received</option>
                        <option value={0}>Not Recived</option>
                    </select>
               
                </div>
            </div>
          
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Sr. No</th>
                            <th scope="col" class="px-4 py-3">Invoice</th>
                            <th scope="col" class="px-4 py-3">Category</th>
                            <th scope="col" class="px-4 py-3">Project Title</th>
                            <th scope="col" class="px-4 py-3">Sender Name</th>
                            <th scope="col" class="px-4 py-3">Sender Email</th>
                            <th scope="col" class="px-4 py-3">Amount</th>
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">Received At</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.data.map((payment,index) => (
                           <tr class="border-b dark:border-gray-700">
                           <th scope="row" class="px-4 py-3">{index+1}</th>
                           <th scope="row" class="px-4 py-3">
                           <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                           {payment.invoice_id}
                           </span>
                           
                            </th>
                           <td class="px-4 py-3">
                           <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              {payment.projects.projectcategory.category_name}
                           </span>
                           
                            </td>
                           <td class="px-4 py-3">{payment.projects.project_title}</td>
                           <td class="px-4 py-3">{payment.projects.customers.name}</td>
                           <td class="px-4 py-3">{payment.projects.customers.email}</td>
                           <td class="px-4 py-3">Rs.
                                <NumericFormat
                                    value={ payment.amount}
                                    thousandsGroupStyle="lakh"
                                    thousandSeparator=","
                                    displayType="text"

                                    /></td>
                           <td class="px-4 py-3">
                            {payment.status ? (
                                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Received
                                </span>
                            ):
                            
                            (
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                    Not Received
                                </span>
                            )
                            
                            }
                           </td>
                           <td class="px-4 py-3">
                            {payment.created_at == payment.updated_at ? (
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                Not Received
                            </span>
                            ):(
                              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            { moment(new Date(payment.updated_at)).fromNow() }
                          </span>
                              
                            )}
                           
                            </td>
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
                                        
                                 
                                        <Dropdown.Link onClick={(e) =>{ e.preventDefault(); handleOpenModal(payment)}} >Delete</Dropdown.Link>


                                       
                                        
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
                { payments && payments.links.map((item,index) => (
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
                            index == payments.links.length - 1
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

    </AuthenticatedLayout>
  )
}

export default Index