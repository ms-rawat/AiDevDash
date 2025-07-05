import { toggleSidebar } from "@/Redux/ReduxSlices/SidebarSlice";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch(); // ✅ make sure dispatch is defined

  return (
    <div className="border-[0.5px] border-gray-700 dark:border-b-gray-100 py-2">
      <header className="flex items-center justify-between px-4 py-2 shadow-md">
        <div className="text-lg font-semibold text-text-secondary">MyLogo</div>

        <div className="flex-1 mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ dispatch toggleSidebar when clicked */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="sm:hidden p-2 rounded-md focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
    </div>
  );
}

export default Header;
