


import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link,router } from '@inertiajs/react';
import Workspace from '@/Components/Workspace';
import RoundedHoverButton from '@/Components/RoundedHoverButton';
const Edit = ({auth,project}) => {
  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title="Edit" />
   

          
<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <RoundedHoverButton onClick={() => { router.visit(route('dashboard')) }} svg_icon={
        <svg height="50px" id="Layer_1" fill='currentColor' version="1.1" viewBox="0 0 512 512" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>
      } />
        <h1 class="mb-4 py-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Workspace Of {project.project_title}</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here you can change status of your project</p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Workspace project={project}/>
       
        </div>
    </div>
</section>

    
 

    </AuthenticatedLayout>
  )
}

export default Edit