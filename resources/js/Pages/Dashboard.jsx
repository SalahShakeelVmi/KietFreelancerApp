import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,router } from '@inertiajs/react';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import RoundedHoverButton from '@/Components/RoundedHoverButton';
export default function Dashboard({ auth,count_customer,count_freelancer,count_project,freelancer_assign_projects,get_earned_amount }) {
    const totalPrice = freelancer_assign_projects.reduce((accumulator, project) => {
        return accumulator + parseFloat(project.price)*50/100;
      }, 0);


      const [isOpenModel, setOpenModel] = useState(false);
      const [id, setId] = useState('');
      const [status, setStatus] = useState('');
      

      const openModal = (projectid,projectstatus) => {
        setOpenModel(true);
        setId(projectid);
        setStatus(projectstatus);
      }
      const closeOpenModal = () => {
        setOpenModel(false);
      }

      const updateStatus = () => {
        router.delete(route('project-users.freelancer.delete',id),{
            status,
            preserveScroll: true
        })
        closeOpenModal();
      }


      const [searchText, setSearchText] = useState('');
      const filteredProjects = freelancer_assign_projects.filter((project) =>
        project.project_title.toLowerCase().includes(searchText.toLowerCase())
      );
    
      const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />


            <Modal show={isOpenModel} onClose={closeOpenModal}>
                <div className="p-4">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to delete this project?</p>
                    <div className="space-x-4 mt-4">
                        <DangerButton onClick={updateStatus}>Confirm</DangerButton>
                        <PrimaryButton onClick={closeOpenModal}>Close</PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* {auth.user.role === "admin" && 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        } */}

            
{auth.user.role === "freelancer" && 
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome To Kiet Freelancer</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here you can manage your projects and you can also manage your profile. </p>
       
<form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative py-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"    value={searchText}
        onChange={handleSearchInputChange} id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Your Projects..." required/>
       
    </div>
</form>

    </div>
</section>
}


           
            {auth.user.role === "admin" && 
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-items-center">
                  <div class="max-w-sm p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <svg class="feather feather-users" fill="none" height="100" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Customers</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{ count_customer }</p>
                     
                  </div>
                  

                  <div class="max-w-sm p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <svg class="feather feather-users" fill="none" height="100" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Freelancers</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{ count_freelancer }</p>
                     
                  </div>

                  <div class="max-w-sm p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                  <path d="M 5 4 C 3.3544268 4 2 5.3555411 2 7 L 2 16 L 2 26 L 2 43 C 2 44.644459 3.3544268 46 5 46 L 45 46 C 46.645063 46 48 44.645063 48 43 L 48 26 L 48 16 L 48 11 C 48 9.3549372 46.645063 8 45 8 L 18 8 C 18.08657 8 17.96899 8.000364 17.724609 7.71875 C 17.480227 7.437136 17.179419 6.9699412 16.865234 6.46875 C 16.55105 5.9675588 16.221777 5.4327899 15.806641 4.9628906 C 15.391504 4.4929914 14.818754 4 14 4 L 5 4 z M 5 6 L 14 6 C 13.93925 6 14.06114 6.00701 14.308594 6.2871094 C 14.556051 6.5672101 14.857231 7.0324412 15.169922 7.53125 C 15.482613 8.0300588 15.806429 8.562864 16.212891 9.03125 C 16.619352 9.499636 17.178927 10 18 10 L 45 10 C 45.562937 10 46 10.437063 46 11 L 46 13.1875 C 45.685108 13.07394 45.351843 13 45 13 L 5 13 C 4.6481575 13 4.3148915 13.07394 4 13.1875 L 4 7 C 4 6.4364589 4.4355732 6 5 6 z M 5 15 L 45 15 C 45.56503 15 46 15.43497 46 16 L 46 26 L 46 43 C 46 43.562937 45.562937 44 45 44 L 5 44 C 4.4355732 44 4 43.563541 4 43 L 4 26 L 4 16 C 4 15.43497 4.4349698 15 5 15 z"></path>
                  </svg>
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Total Projects</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{ count_project }</p>
                     
                  </div>
              </div>
          </div>
        
            
            }
          

          {auth.user.role === "freelancer" && 
          <section class="bg-white dark:bg-gray-900 py-3 sm:py-5">
  <div class="px-4 mx-auto max-w-screen-2xl lg:px-10">
      <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div class="flex items-center flex-1 space-x-4">
                  <h5>
                      <span class="text-gray-500">All Projects: </span>
                      <span class="dark:text-white">{freelancer_assign_projects.length}</span>
                  </h5>
                  <h5>
                      <span class="text-gray-500">Total Amount:</span>
                      <span class="dark:text-white">Rs.
                      <NumericFormat
  value={ totalPrice.toFixed(2)}
  thousandsGroupStyle="lakh"
  thousandSeparator=","
  displayType="text"

/>
                      </span>
                
                  </h5>

                  <h5>
                      <span class="text-gray-500">Total Earned Amount:</span>
                      <span class="dark:text-white">Rs.
                      <NumericFormat
  value={ get_earned_amount*50/100 }
  thousandsGroupStyle="lakh"
  thousandSeparator=","
  displayType="text"

/>
                      </span>
                
                  </h5>
              </div>
             
          </div>
          <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                      <th scope="col" class="px-4 py-3">Sr.No</th>
                          <th scope="col" class="px-4 py-3">Project</th>
                          <th scope="col" class="px-4 py-3">Category</th>
                          <th scope="col" class="px-4 py-3">Status</th>
                          <th scope="col" class="px-4 py-3">Your Status</th>
                          <th scope="col" class="px-4 py-3">Delete Assign Task</th>
                         
                          <th scope="col" class="px-4 py-3">Amount</th>
                          <th scope="col" class="px-4 py-3">DeadLine</th>
                          <th scope="col" class="px-4 py-3">Created At</th>
                          <th scope="col" class="px-4 py-3">WorkSpace</th>
                      </tr>
                  </thead>
                  <tbody>
                       
                  {filteredProjects.map((project, index) => (
                      <tr  class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
 <td class="px-4 py-2">
                              <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{index+1}</span>
                          </td>
                        
                         
                          <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {project.project_title}
                          </th>
                          <td class="px-4 py-2">
                          
                              <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">  {project.projectcategory.category_name}</span>
                             
                          </td>
                          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <div class="flex items-center">
                                  <div class={`inline-block w-4 h-4 mr-2 bg-${ project.status === 1 ? 'green' : 'red' }-700 rounded-full`}></div>
                                  {project.status === 1 ? 'Active' : 'Inactive'}
                              </div>
                          </td>

                          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          { project.freelancer_status === "pending" && (
                  <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                   {project.freelancer_status}
                 </span>
                )}

{ project.freelancer_status === "completed" && (
                 <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                   {project.freelancer_status}
                 </span>
                )}

{ project.freelancer_status === "progress" && (
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"> 
                  {project.freelancer_status}
                 </span>
                )}

{ project.freelancer_status === null && (
                  <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  No Status
                 </span>
                )}
                            </td>
                         

                          <td class="px-4 py-2">
                          <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" 
                                    class="sr-only peer"
                                    checked = {project.assign}
                                    onChange={(e)=>{
                                        e.preventDefault();
                                         const newstatus = !project.assign;
                                        // updateStatus(project.id,newstatus);
                                        openModal(project.id,newstatus);
                                    }}
                                   
                                />
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                          </td>

                         
                        
                          <td class="px-4 py-2">RS.  
                          <NumericFormat
  value={ project.price*50/100}
  thousandsGroupStyle="lakh"
  thousandSeparator=","
  displayType="text"

/>
                           </td>
                           <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{moment(new Date(project.delivery_datetime)).format('MMMM Do YYYY, h:mm:ss a')}</span>
                           </td>
                         
                          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{moment(new Date(project.updated_at)).fromNow()}</td>
                         
                          <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link href={route('workspace.edit',project.id)}>
                            <RoundedHoverButton svg_icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" fill='currentColor' height="15" viewBox="0 0 12.7 12.7" id="list"><path fill-rule="evenodd" d="M6 3C4.355 3 3 4.355 3 6l-.004 26.004c0 1.335 2.002 1.335 2.002 0L5 6c0-.571.429-1 1-1h28c.571 0 1 .429 1 1v18c-.02 1.352 2.02 1.352 2 0V6c0-1.645-1.355-3-3-3zm6 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.9.002c-1.303.09-1.21 2.034.096 2H28c1.305-.028 1.305-1.972 0-2H15.996a1.018 1.018 0 0 0-.096 0zM12 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm16.11 0c-.037 0-.074 0-.11.004H15.996a1.018 1.018 0 0 0-.096 0c-1.226.152-1.14 1.958.096 1.992H28c1.373.121 1.488-1.967.11-1.996zm-12.114 5.998c-1.305.028-1.305 1.972 0 2H28c1.362.03 1.362-2.03 0-2zM12 23a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.996 0c-1.362-.03-1.362 2.03 0 2h10.002c1.362.03 1.362-2.03 0-2zM12 35a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3.9 0c-1.334.064-1.239 2.066.096 2.002h8.002c1.335 0 1.335-2.002 0-2.002h-8.002a1.018 1.018 0 0 0-.096 0zm-11.914.982a1 1 0 0 0-.99 1.02L3 42c0 1.645 1.355 3 3 3h20c1.352.02 1.352-2.02 0-2H6c-.571 0-1-.429-1-1l-.002-4.998a1 1 0 0 0-1.012-1.02zm32.016-8.984c-4.959 0-8.998 4.041-8.998 9s4.04 9.006 8.998 9.006c4.959 0 8.998-4.047 8.998-9.006 0-4.959-4.04-9-8.998-9zm0 2.002A6.982 6.982 0 0 1 43 35.998a6.987 6.987 0 0 1-6.998 7.004 6.987 6.987 0 0 1-6.998-7.004A6.982 6.982 0 0 1 36.002 29zm3.158 3.875a1 1 0 0 0-.685.303l-3.536 3.535-1.41-1.416a1.002 1.002 0 1 0-1.418 1.416l2.12 2.119a1 1 0 0 0 1.415 0l4.247-4.238a1 1 0 0 0-.733-1.719z"  font-family="sans-serif" font-weight="400"  transform="scale(.26458)"></path></svg>
                            } />
                            </Link>
                          </td>
                         
                      </tr>

                  ))}
                    
                  </tbody>
              </table>
          </div>
      
      </div>
  </div>
</section>
}
           
          

            
        </AuthenticatedLayout>
    );
}
