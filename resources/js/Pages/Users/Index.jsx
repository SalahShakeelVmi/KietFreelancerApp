import React, { useState, useEffect } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import DangerButton from '@/Components/DangerButton'
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import Drawer from '@/Components/Drawer'

const Index = ({auth, users}) => {

    const updateStatus = (id,status) => {
        router.put(route('users.update-status',id),{
            status,
            preserveScroll: true
        })
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    
    const [editData, setEditData] = useState([]);

    const handleOpenModal = (user) => {
       setItemToDelete(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseBulkModal = () => {
        setIsBulkModalOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prevOpen) => !prevOpen);
    };

   
    const handleDeleteUser = () => {  
        router.delete(route('users.destroy',itemToDelete),{
            preserveScroll: true
        })   
        handleCloseModal();
    };


    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
          // Select all items
          setSelectedItem(users.data.map((item) => item.id));
         
        } else {
          // Deselect all items
          setSelectedItem([]);
        }
      };
      const isItemSelected = (itemId) => selectedItem.includes(itemId);
      const toggleItemSelection = (itemId) => {
        if (isItemSelected(itemId)) {
            
          setSelectedItem(selectedItem.filter((id) => id !== itemId));
        } else {
          setSelectedItem([...selectedItem, itemId]);
        }
      };

      const bulkDelete = () => {
        // Send a request to delete selected items
        const promises = selectedItem.map((itemId) =>
          router.delete(route('users.destroy', { user: itemId }), {
            preserveScroll: true,
          })
        );
      
        Promise.all(promises)
          .then(() => {
            // Clear selected items after successful deletion
            setSelectedItem([]);
            setIsBulkModalOpen(false);
           
          })
          .catch((error) => {

            setIsBulkModalOpen(false);
          
          });
      };

      const BulkModelDelete = () => {
        setIsBulkModalOpen(true);
      };


      const [isDrawerOpen, setIsDrawerOpen] = useState(false);

      const openDrawer = (user) => {
        setEditData(user);
        setIsDrawerOpen(true);
      };
    
      const closeDrawer = () => {
        setIsDrawerOpen(false);
      };

      const search =(value)=>{
        setSearchValue(value);
        router.visit(route('users.index',{search:value}), {
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



    const roleFilter = (role)=>{
        router.visit(route('users.role-filter',{role}),{
            preserveState: true,
            replace: true
        })
   
    }

  return (
    <Authenticated user={auth.user}>
        <Head title="Users" />

        <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="p-4">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this user?</p>
                    <div className="space-x-4 mt-4">
                        <DangerButton onClick={handleDeleteUser}>Confirm</DangerButton>
                        <PrimaryButton onClick={handleCloseModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>

            <Modal show={isBulkModalOpen} onClose={handleCloseBulkModal}>
                <div className="p-4">
                <h2>Confirmation</h2>
                <p>`Are you sure you want to delete {selectedItem.length} selected users?`</p>
                <div className="space-x-4 mt-4">
                    <DangerButton onClick={bulkDelete}>Confirm</DangerButton>
                    <PrimaryButton onClick={handleCloseBulkModal}>Close</PrimaryButton>
                </div>
                </div>
          </Modal>

          {isDrawerOpen && <Drawer user={editData} onClose={closeDrawer} />}


           
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
                            <input type="text" onChange={handleSearchChange} value={searchValue} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                   
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Link href={route('users.create')}>
                        <PrimaryButton>
                            Add Admin
                        </PrimaryButton>
                    </Link>

                    <select name='role' onChange={(e)=>roleFilter(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value={'all'}>All</option>
                        <option value={'customer'}>Customer</option>
                        <option value={'admin'}>Admin</option>
                        <option value={'freelancer'}>Freelancer</option>
                    </select>
                  
                    {selectedItem.length > 0 && (
                        <DangerButton className='ml-2' onClick={BulkModelDelete} >Delete Selected</DangerButton>
                    )}
                       
                    
                </div>
            </div>
           
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input onChange={toggleSelectAll} checked={selectAll} id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-4 py-3">Username</th>
                            <th scope="col" class="px-4 py-3">Email</th>
                            <th scope="col" class="px-4 py-3">Role</th>
                            <th scope="col" class="px-4 py-3">Status</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.data.map((user,index) => (

                            <tr class="border-b dark:border-gray-700">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input value={user.id} onChange={() =>{ toggleItemSelection(user.id);  }} checked={isItemSelected(user.id)} id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>

                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                            <td class="px-4 py-3">{user.email}</td>
                            <td class="px-4 py-3">{user.role}</td>
                            <td class="px-4 py-3">
                                
                            <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" 
                                class="sr-only peer"
                                checked = {user.status}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    const newstatus = !user.status;
                                    updateStatus(user.id,newstatus);
                                }}
                            />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>

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
                                        
                                        <Dropdown.Link onClick={(e) =>{ e.preventDefault(); openDrawer(user)}}>Edit</Dropdown.Link>
                                        <Dropdown.Link onClick={(e) =>{ e.preventDefault(); handleOpenModal(user)}}>Delete</Dropdown.Link>
                                        
                                       
                                        
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