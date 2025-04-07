const Navbar = () => {
  return (
    <header className="bg-white border-b px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Welcome, Faculty</h1>
      <button className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
