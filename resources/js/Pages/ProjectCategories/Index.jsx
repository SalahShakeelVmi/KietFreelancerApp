

import React, { useState } from 'react'
import { Head, Link, router, useForm } from '@inertiajs/react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import RoundedHoverButton from '@/Components/RoundedHoverButton'
import PrimaryButton from '@/Components/PrimaryButton'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
const Index = ({auth, projectCategories}) => {

  const [isCreateModel, setCreateModel] = useState(false);
  const {dropdownOpen, setDropdownOpen} = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [getEditData, setEditData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isEdit, setIsEdit] = useState(false);


  const { data, setData, post, processing, errors, reset } = useForm({
    category_name: '',
  });

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
};

const handleOpenModal = (category) => {
  setItemToDelete(category);
   setIsModalOpen(true);
};

const handleCloseModal = () => {
   setIsModalOpen(false);
};

 const handleDeleteCategory = () => {  
        router.delete(route('project-categories.destroy',itemToDelete),{
            preserveScroll: true
        })   
        handleCloseModal();
    };

  const openCreateModel = () => {
    setCreateModel(true);
  }
  const closeCreateModel = () => {
    setIsEdit(false);
    setCreateModel(false);
    reset();
    setData({
      category_name: ''
    })
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('project-categories.store'),data, {
      preserveScroll: true,
    })

  }


  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Select all items
      setSelectedItem(projectCategories.data.map((item) => item.id));
     
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
      router.delete(route('project-categories.destroy', { project_category: itemId }), {
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

  const handleCloseBulkModal = () => {
    setIsBulkModalOpen(false);
};


const editData=(category) => {
  setIsEdit(true);
  setEditData(category);
  setCreateModel(true);
  data.category_name=category.category_name;
}

const onUpdate = (e) => {
  e.preventDefault();
  post(route('project-categories.update',getEditData.id),getEditData);

}


const search =(value)=>{
  setSearchValue(value);
  router.visit(route('project-categories.search',{search:value}), {
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
      <Head title='Project Categories' />

      <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="p-4">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this category?</p>
                    <div className="space-x-4 mt-4">
                        <DangerButton onClick={handleDeleteCategory}>Confirm</DangerButton>
                        <PrimaryButton onClick={handleCloseModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>

            <Modal show={isBulkModalOpen} onClose={handleCloseBulkModal}>
                <div className="p-4">
                <h2>Confirmation</h2>
                <p>`Are you sure you want to delete {selectedItem.length} selected categories?`</p>
                <div className="space-x-4 mt-4">
                    <DangerButton onClick={bulkDelete}>Confirm</DangerButton>
                    <PrimaryButton onClick={handleCloseBulkModal}>Close</PrimaryButton>
                </div>
                </div>
          </Modal>


      {/* Create Model */}
        {isCreateModel && 
          <div id="authentication-modal" tabindex="-1"  class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
              <div class="relative w-full max-w-md max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button onClick={closeCreateModel} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                     
                      <div class="px-6 py-6 lg:px-8">
                          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> {isEdit ? ' Edit Project Category' : ' Create Project Category'}</h3>
                          <form class="space-y-6"  onSubmit={ isEdit ? onUpdate : onSubmit} >
                              <div>
                               
                                  <InputLabel value="Your Category Name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' for="category_name"/>
                                  <TextInput name="category_name" onChange={onHandleChange} value={data.category_name} id="category_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  placeholder="Enter Category Name" required />
                                  <InputError  className="mt-2" message={errors.category_name} />
                              </div>
                            
                        
                              <PrimaryButton disabled={processing} className='justify-center w-full' >
                                  {isEdit ? 'Update' : 'Create'}
                              </PrimaryButton>
                          </form>
                      </div>
                  </div>
              </div>
          </div> 
        }




      {/* End of Create Model */}

    
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
                            <input type="text" id="simple-search" value={searchValue} onChange={handleSearchChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                   
                </div>
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  
                      <RoundedHoverButton onClick={openCreateModel} svg_icon={<svg class="feather feather-plus" fill="none" height="15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="15" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                      }/>

                  {selectedItem.length > 0 && (
                     <RoundedHoverButton onClick={BulkModelDelete} svg_icon={<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor"  x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                     <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                     </svg>
                 }/>
                    
                    )}
                   
                  
                      
                    
                </div>
                  
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
                        <th scope="col" class="px-4 py-3">Sr.No</th>
                            <th scope="col" class="px-4 py-3">Product name</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {projectCategories.data.map((projectCategory, index) => (
                          <tr key={index} class="border-b dark:border-gray-700">

                          <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input value={projectCategory.id} onChange={() =>{ toggleItemSelection(projectCategory.id);  }} checked={isItemSelected(projectCategory.id)} id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>

                          <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1}</th>
                            
  
                              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{projectCategory.category_name}</th>
                            
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
                                        
                                        <Dropdown.Link onClick={(e) =>{ e.preventDefault(); editData(projectCategory)}} >Edit</Dropdown.Link>
                                        <Dropdown.Link onClick={(e) =>{ e.preventDefault(); handleOpenModal(projectCategory)}} >Delete</Dropdown.Link>
                                        
                                       
                                        
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
                    { projectCategories && projectCategories.links.map((item,index) => (
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
                                index == projectCategories.links.length - 1
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