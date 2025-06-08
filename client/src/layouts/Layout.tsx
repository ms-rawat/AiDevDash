import Sidebar from '@/components/sidebar_package/components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header';


function Layout() {
  return (
       <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <Sidebar />
      </aside>
      <Header/>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Routed Content */}
        <Outlet />
      </main>
    </div>

  )
}

export default Layout