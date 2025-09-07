import Button from "./Button";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  
  let {isLoggedIn} = useContext(AuthContext)    
  
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const originalOffset = navbar.offsetTop;
    let isFixed = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarTop = navbar.getBoundingClientRect().top;

      // If navbar has scrolled out of view — lock it
      if (navbarTop <= 0 && !isFixed) {
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.left = "0";
        navbar.style.right = "0";
        navbar.style.zIndex = "50";
        isFixed = true;
      }

      // If we scroll back down to original position — reset
      if (currentScrollY <= originalOffset && isFixed) {
        navbar.style.position = "static";
        isFixed = false;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      {/* Navbar */}
      <div
        id="navbar"
        className=" flex transition-all duration-300 navbar p-4 px-30 text-white items-center text-md"
      >
        {/* Content 1 */}
        <div className="w-1/4">
          <p className="">LOGO</p>
        </div>

        {/* Content 2 */}
        <div className="flex justify-around w-3/4">
          <div>
            <a href="#">Home</a>
          </div>
          <div>
            <a href="#">About Us</a>
          </div>
          <div>
            <a href="#">Contact Us</a>
          </div>
          <div>
            <a href="#">Enjoy</a>
          </div>
        </div>

        {/* Content 3 */}
        <div className="flex w-1/4 justify-around">
          {isLoggedIn ? (
            <Button hrefLink={"/logout"} btnName={"Logout"} />
          ) : (
            <>
              <Button hrefLink={"/login"} btnName={"Login"} />
              <Button hrefLink={"/signup"} btnName={"Sign Up"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
