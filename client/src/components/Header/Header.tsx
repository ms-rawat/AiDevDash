function Header() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <div className="text-lg font-semibold text-gray-800">MyLogo</div>

        <div className="flex-1 mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="sm:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
    </div>
  );
}

export default Header;
