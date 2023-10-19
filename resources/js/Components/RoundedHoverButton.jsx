

import React from 'react'

const RoundedHoverButton = ({svg_icon,onClick}) => {
  return (
    <button onClick={onClick} type="button" class="text-black border border-black hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-black dark:text-black dark:hover:text-white dark:focus:ring-black dark:hover:bg-black">
        {svg_icon}
      
    </button>
  )
}

export default RoundedHoverButton