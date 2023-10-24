
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Create = ({auth}) => {
  return (
    <Authenticated user={auth.user}>
        <Head title="Create" />
    <div>Create</div>
    </Authenticated>
  )
}

export default Create