const Header = () => {
  return (
    <>
    {/* Navbar */}
      <div className="flex navbar p-4 px-30 text-white items-center text-md">

        {/* Content 1 */}
        <div className="w-1/4">
        <p className="">LOGO</p>
        </div>

        {/* Content 2 */}
        <div className="flex justify-around w-3/4">
          <div><a href="#">Home</a></div>
          <div><a href="#">About Us</a></div>
          <div><a href="#">Contact Us</a></div>
          <div><a href="#">Enjoy</a></div>
        </div>

        {/* Content 3 */}
        <div className="flex w-1/4 justify-around"> 
            <a href="#login" className="btn-user border-[3px] rounded-xl border-white p-2 px-6">Login</a>
            <a href="#signup" className="btn-user border-[3px] rounded-xl border-white p-2 px-6">Sign Up</a>
        </div>
      </div>
    </>
  );
}

export default Header