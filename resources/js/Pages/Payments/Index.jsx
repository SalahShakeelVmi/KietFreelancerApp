

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Index = ({auth}) => {
  return (
    <AuthenticatedLayout user={auth.user}>
        <Head title='Index'/>
    <div>Index</div>
    </AuthenticatedLayout>
  )
}

export default Index