import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Button from "./Components/Button";
import Card from "./Components/Card.jsx";
import Login from "./Components/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer.jsx";
import goOnTop from "./Components/onTop.jsx";

function App() {

  useEffect(()=> {
    const img = document.getElementById("highlight-section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry)=>{
        if (entry.isIntersecting) {
          img.classList.add("fade-in-blink");
          img.classList.remove("opacity-0");
        } else {
          // Reset so it can animate again on scroll back
          img.classList.remove("fade-in-blink");
          img.classList.add("opacity-0");
        }
        })
      },
      { threshold: 0.3 }
    )

    if(img) observer.observe(img);
    return()=>{
      if(img) observer.unobserve(img);
    }
  },[])
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    <div className="flex flex-col pt-10 h-max">
      <Header />

      <div className="flex flex-col py-10 px-30">
        {/* Content 1 */}
        <div className="flex w-full items-center py-10">
          {/* Content 1 Left Part */}
          <div className="flex flex-col w-full">
            {/* Tag Line */}
            <h3 className="font-bold text-3xl">
              Secure{" "}
              <span className="text-4xl font-extrabold" style={{color: 'olive'}}>
                Bidding, 
              </span>
               {" "}Smart{"  "}
              <span className="text-4xl font-extrabold" style={{color: 'olive'}}>
                Winning
              </span>
            </h3>
            <br />
            {/* Buy and Sell Line */}
            <h1 className="text-6xl font-bold">
              Buy and Sell 
              <br />
              <span style={{color: 'olive'}}>Bid of</span>
              <br />
              Your Choice!
            </h1>
            <br /> <br />
            <div className="flex space-x-5" style={{color: 'olive'}}>
              <Button hrefLink="#buy" btnName="Buy" colorName="purple" />
              <Button hrefLink="#sell" btnName="Sell" colorName="purple" />
            </div>
          </div>

          {/* Content 1 Right Part */}
          <div className="w-full flex justify-end" >
            <img
              src="../public/auction.webp"
              alt="auction"
              id="highlight-section"
              className=" h-125 opacity-0"
              />
          </div>
        </div>
        {/* Content 1 */}

        {/* Content 2 */}
        <div className="w-full grid grid-flow-col gap-20 py-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        {/* Content 2 */}

        {/* Content 3 */}
        <div className="py-10 flex w-full items-center">
          {/* Content 3 Left Part */}
          <div className="flex flex-col w-full">
            {/* Tag Line */}
            <h3 className="font-bold text-3xl">
              Bid{" "}
              <span className="text-4xl font-extrabold" style={{color: 'olive'}}>
                With
              </span>
              , Us!
            </h3>
            <br />
            {/* Buy and Sell Line */}
            <h1 className="text-6xl font-bold">
              Successfully launch
              <br />
              <span style={{color: 'olive'}}>your best </span>
              <br />
              Biddd!!!
            </h1>
            <br /> <br />
            <div className="w-full grid gap-6">
              <div className="w-full grid grid-flow-col gap-1">
                <div className="flex items-center">
                  <div className="flex justify-center items-center rounded-full bg-white w-20 h-20">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/auction-1/512/auction-bid-bidding-09-512.png"
                      alt="Auto-auction"
                      className="flex items-center w-15 h-15"
                      />
                  </div>
                  <div className="">
                    Auto <br />
                    Auction
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex justify-center items-center rounded-full bg-white w-20 h-20">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/4289/4289566.png"
                      alt="Secure-Transaction"
                      className="w-15 h-15"
                      />
                  </div>
                  <div className="">
                    Secure <br />
                    Transaction
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center">
                  <div className="rounded-full bg-white w-20 h-20">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                      alt="Connect Golobally"
                      />
                  </div>
                  <div className="">
                    Connect <br />
                    Globally
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content 3 Right Part */}
          <div className="w-full flex justify-end">
            <div className="flex w-100 h-125 rounded-2xl" style={{backgroundColor: 'olive'}}></div>
          </div>
        </div>
        {/* Content 3 */}

        {/* Content 4 */}
        <div className="py-10 w-full flex flex-col items-center">
          <div className="text-3xl font-bold">
            Bid <span style={{color: 'olive'}}>timeline</span>
          </div>
          <div className="text-4xl font-extrabold">
            We can enter at any point or help you all the{" "}
          </div>
          <div className="text-4xl font-extrabold">
            {" "}
            way through the development cycle.
          </div>
        </div>
        {/* Content 4 */}

        {/* Content 5 */}
        <div className="py-10 w-full h-full flex justify-center">
          <img
            src="https://www.wholesalescout.co.uk/wp-content/uploads/2020/12/police-auctions.png"
            alt="E-Auction"
            />
        </div>
        {/* Content 5 */}

        {/* Content 6 */}

        <div className="py-10 flex w-full items-center">
          {/* Content 6 Left Part */}
          <div className="w-full flex">
            <div className="flex w-100 h-125 rounded-2xl" style={{backgroundColor: 'olive'}}></div>
          </div>

          {/* Content 3 Right Part */}

          <div className="flex flex-col justify-end w-full">
            {/* Tag Line */}
            <h3 className="font-bold text-3xl">
              Sell{" "}
              <span style={{color: 'olive'}} className="text-4xl font-extrabold">
                With
              </span>
              , Us!
            </h3>
            <br />
            {/* Buy and Sell Line */}
            <h1 className="text-6xl font-bold">
              Successfully launch
              <br />
              <span style={{color: 'olive'}}>Sell at best </span>
              <br />
              Amount!!!
            </h1>
            <br /> <br />
            <div className="w-full grid gap-6">
              <div className="flex items-center">
                <div className="flex justify-center items-center rounded-full bg-white w-20 h-20">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/auction-1/512/auction-bid-bidding-09-512.png"
                    alt="Auto-auction"
                    className="flex items-center w-15 h-15"
                    />
                </div>
                <div className="">
                  Auto <br />
                  Auction
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex justify-center items-center rounded-full bg-white w-20 h-20">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4289/4289566.png"
                    alt="Secure-Transaction"
                    className="w-15 h-15"
                    />
                </div>
                <div className="">
                  Secure <br />
                  Transaction
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <div className="rounded-full bg-white w-20 h-20">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                      alt="Connect Golobally"
                      />
                  </div>
                  <div className="">
                    Connect <br />
                    Globally
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content 7 */}
        <div className="w-full flex flex-col py-10 justify-center ">
          <div className="text-6xl font-bold">
            <div className="w-full flex justify-center py-5">
              <p>
                Always By <span style={{color: 'olive'}}>Your Side</span>
              </p>
            </div>
            <div className="w-full flex justify-center py-5">
              <hr className="  w-25 " />
            </div>
            <div className="w-full flex justify-center py-5">
              <p>Be the First to use eAuction!</p>
            </div>
          </div>

          <div className="bg-[rgba(128,128,128,0.3)] rounded-2xl font-semibold">
            
            <div className="px-5 flex justify-center">
              <div className="w-full flex justify-around">

                {/* First */}
                <div className="grid grid-col justify-center gap-15 py-15">
                  <div className="flex justify-center">

                  <div className="rounded-full bg-white w-18 h-18">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                      alt="Connect Golobally"
                      />
                  </div>
                      </div>

                  <div className="flex justify-center font-semibold">
                    <p>24/7 Support</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p>Need Help? Get your requests solved</p>
                    <p>quickly via support team.</p>
                  </div>

                </div>
                {/* First */}

                {/* Second */}
                <div className="grid grid-col justify-center gap-15 py-15">
                  <div className="flex justify-center">

                  <div className="rounded-full bg-white w-18 h-18">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                      alt="Connect Golobally"
                      />
                  </div>
                      </div>

                  <div className="flex justify-center font-semibold">
                    <p>24/7 Support</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p>Need Help? Get your requests solved</p>
                    <p>quickly via support team.</p>
                  </div>

                </div>
                {/* Second */}

                {/* Third */}
                <div className="grid grid-col justify-center gap-15 py-15">
                  <div className="flex justify-center">

                  <div className="rounded-full bg-white w-18 h-18">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                      alt="Connect Golobally"
                      />
                  </div>
                      </div>

                  <div className="flex justify-center font-semibold">
                    <p>24/7 Support</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p>Need Help? Get your requests solved</p>
                    <p>quickly via support team.</p>
                  </div>

                </div>
                {/* Third */}


  
              </div>
            </div>
          </div>

        </div>
        {/* Content 7 */}
      </div>

      <Footer />      
    <goOnTop />
    </div>


                      </>
  );
}

export default App;
