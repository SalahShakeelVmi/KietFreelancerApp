

import DangerButton from '@/Components/DangerButton';
import { Head,Link,router } from '@inertiajs/react'
import React from 'react'
import { NumericFormat } from 'react-number-format';
import html2canvas from 'html2canvas';
import RoundedHoverButton from '@/Components/RoundedHoverButton';
const Show = ({auth,payment}) => {
    const generatePDF = () => {
        const downloadButton = document.querySelector("#downloadButton");
        const backBtn = document.querySelector("#backBtn");
      
        // Hide the download button temporarily
        downloadButton.style.display = 'none';
        backBtn.style.display = 'none';
      
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use a CORS proxy server
      
        html2canvas(document.querySelector("#capture"), {
          allowTaint: true,
          useCORS: true, // Enable CORS support
          proxy: proxyUrl, // Set the proxy server
        }).then(canvas => {
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL();
      
          // Create a link element and trigger the download
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = `${payment.invoice_id}.png`;
          downloadLink.click();
      
          // Show the download button again after triggering the download
          downloadButton.style.display = 'block';
          backBtn.style.display = 'block';
        });
      };
      
      
      
  return (
    <>
        <Head title={payment.invoice_id} />
        <div id='capture'>
        <div className="flex flex-col min-h-screen">

      
           
        <section class="bg-white dark:bg-gray-900">
      
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <div id='backBtn' className='mb-4'>
                <RoundedHoverButton onClick={() => { router.visit(route('notifications.index')) }} svg_icon={
        <svg height="50px" id="Layer_1" fill='currentColor' version="1.1" viewBox="0 0 512 512" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>
      } />
                </div>
          
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{ payment.invoice_id }</h1>
                <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"> Here is your invoice for payment for project {payment.projects.project_title}  </p>
            
            </div>
        </section>
        

        <div class="relative overflow-x-auto w-2/3 mx-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 rounded-s-lg">
                            Project name
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-s-lg">
                            Customer name
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-s-lg">
                            Customer email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-e-lg">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {payment.projects.project_title}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {payment.projects.customers.name}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {payment.projects.customers.email}
                        </th>
                        <td class="px-6 py-4">
                           {payment.status ? (
                                 "Paid"
                               
                           ):(
                                   "Not Paid"
                               
                           )}
                        </td>
                        <td class="px-6 py-4">
                           Rs    <NumericFormat
                                    value={ payment.amount}
                                    thousandsGroupStyle="lakh"
                                    thousandSeparator=","
                                    displayType="text"

                                    />
                        </td>
                    </tr>
                   
                </tbody>
                <tfoot>
                    <tr class="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" class="px-6 py-3 text-base">Total</th>
                        <td class="px-6 py-3"></td>
                        <td class="px-6 py-3"></td>
                        <td class="px-6 py-3"></td>
                        <td class="px-6 py-3"> Rs    <NumericFormat
                                    value={ payment.amount}
                                    thousandsGroupStyle="lakh"
                                    thousandSeparator=","
                                    displayType="text"

                                    /></td>
                    </tr>
                </tfoot>
            </table>
        </div>

                            <div className='h-20 w-2/3 mx-auto mt-20 mb-10'>
                                
                                <p class="mb-3 text-gray-500 dark:text-gray-400 font-bold">Note: </p>
                                <p class="text-gray-500 dark:text-gray-400">
The freelance project terms and conditions delineate the agreement between the freelancer and client. This encompasses a detailed scope of work, payment terms, and project timeline, including provisions for revisions and communication protocols. Confidentiality clauses underscore the protection of sensitive information, while ownership of the final work, termination conditions, and the independent contractor status of the freelancer are clearly defined. The agreement also specifies the jurisdiction for legal matters, ensuring a comprehensive framework that balances the interests of both parties.</p>

                            </div>

       
        

        <footer className="flex flex-col items-end mt-auto">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <Link href={route('home')} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://cdn.icon-icons.com/icons2/2648/PNG/512/logo_freelancer_com_icon_160826.png" className="h-8" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kiet Freelancer</span>
              </Link>
              {payment.status === 1 && (
   <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
   <li>
     <DangerButton id="downloadButton" onClick={generatePDF}>Download PDF</DangerButton>
   </li>
 </ul>
              )}
           
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Kiet Freelancer. All Rights Reserved.</span>
          </div>
        </footer>

        
</div>
</div>


    </>
  )
}

export default Show