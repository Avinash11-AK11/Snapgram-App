// import Bottombar from '@/components/shared/Bottombar'
// import LeftSidebar from '@/components/shared/LeftSidebar'
// import Topbar from '@/components/shared/Topbar'
// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const RootLayout = () => {
//   return (
//     <div className='w-full md:flex'>
//       <Topbar />
//       <LeftSidebar />

//       <section className='flex flex-1 h-full'>
//         <Outlet />
//       </section>

//       <Bottombar />
//     </div>
//   )
// }

// export default RootLayout

import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Topbar */}
      <Topbar />

      {/* Left Sidebar (Hidden on smaller screens) */}
      <div className="md:block md:w-64">
        <LeftSidebar />
      </div>

      {/* Main Content Section */}
      <section className="flex-1 overflow-y-auto">
        <Outlet />
      </section>

      {/* Bottombar (Visible on smaller screens only) */}
      <div className="md:hidden">
        <Bottombar />
      </div>
    </div>
  )
}

export default RootLayout
