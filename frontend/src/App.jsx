import { useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Header from "./Components/Header";
import Button from "./Components/Button";
import Footer from "./Components/Footer.jsx";
import OnTop from "./Components/OnTop.jsx";
import AutoScroll from "./Components/AutoScroll.jsx";

function App() {
  useEffect(() => {
    const img = document.getElementById("highlight-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.classList.add("fade-in-blink");
            img.classList.remove("opacity-0");
          } else {
            img.classList.remove("fade-in-blink");
            img.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (img) observer.observe(img);
    return () => {
      if (img) observer.unobserve(img);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col pt-10 h-max bg-[#fdfaf8]">

        <OnTop />
        <Header />

        {/* ================= HERO SECTION ================= */}
        <section className="flex flex-col py-20 px-30">

          <div className="flex w-full items-center py-10">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col w-full"
            >
              <h3 className="font-bold text-3xl leading-snug">
                Secure{" "}
                <span className="text-4xl font-extrabold text-[#056973]">
                  Bidding,
                </span>{" "}
                Smart{" "}
                <span className="text-4xl font-extrabold text-[#056973]">
                  Winning
                </span>
              </h3>

              <h1 className="text-7xl font-extrabold mt-5 leading-tight">
                Buy and Sell
                <br />
                <span className="text-[#056973]">Bid of</span>
                <br />
                Your Choice!
              </h1>

              <div className="flex space-x-5 mt-10">
                <Button hrefLink="/auctions" btnName="Buy" colorName="purple" />
                <Button hrefLink="/placebid" btnName="Sell" colorName="purple" />

              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-end"
            >
              <img
                src="/auction.webp"
                alt="auction"
                id="highlight-section"
                className="h-125 opacity-0 floating"
              />
            </motion.div>
          </div>

          {/* Auto Scrolling Logos */}
          <AutoScroll />

          {/* ================ BID WITH US SECTION ================ */}
          <div className="py-10 flex w-full items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col w-full"
            >
              <h3 className="font-bold text-3xl">
                Bid{" "}
                <span className="text-4xl font-extrabold text-[#056973]">
                  With
                </span>{" "}
                Us!
              </h3>

              <h1 className="text-6xl font-extrabold mt-5 leading-tight">
                Successfully launch
                <br />
                <span className="text-[#056973]">your best</span>
                <br />
                Biddd!!!
              </h1>

              {/* Feature List */}
              <div className="grid gap-6 mt-10">

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <FeatureBox
                    icon="https://cdn1.iconfinder.com/data/icons/auction-1/512/auction-bid-bidding-09-512.png"
                    title="Auto Auction"
                  />
                  <FeatureBox
                    icon="https://cdn-icons-png.flaticon.com/512/4289/4289566.png"
                    title="Secure Transaction"
                  />
                </div>

                {/* Row 2 */}
                <FeatureBox
                  icon="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                  title="Connect Globally"
                />
              </div>
            </motion.div>

            {/* Right gradient card */}
           <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full flex justify-end items-center"
>
  <div
    className="
      animated-image 
      w-[700px] h-[700px]
      sm:w-[340px] sm:h-[340px]
      md:w-[420px] md:h-[420px]
      lg:w-[550px] lg:h-[550px]
      xl:w-[650px] xl:h-[650px]
      2xl:w-[750px] 2xl:h-[750px]
      flex justify-center items-center
    "
  >
    <img
      src="/online-auction.png"
      alt="Auction"
       className="w-[700px] h-[700px] object-contain drop-shadow-2xl
               hover:scale-105 transition-all duration-500"
    />
  </div>
</motion.div>




          </div>

          {/* ======== TIMELINE SECTION ======== */}
         <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="py-14 text-center"
>
  <h2 className="text-4xl sm:text-5xl font-extrabold">
    Bid <span className="text-[#056973]">timeline</span>
  </h2>

  <p className="text-3xl sm:text-4xl font-extrabold mt-6 leading-snug">
    We can enter at any point or help you all the
  </p>
  <p className="text-3xl sm:text-4xl font-extrabold leading-snug">
    way through the development cycle.
  </p>
</motion.div>


          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center py-10"
          >
            <img
              src="https://www.wholesalescout.co.uk/wp-content/uploads/2020/12/police-auctions.png"
              alt="E-Auction"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Sell With Us */}
          <SellWithUsSection />

          {/* Support Sections */}
          <SupportSection />

        </section>

        <Footer />
      </div>
    </>
  );
}

export default App;


/* ------------ EXTRA COMPONENTS ------------ */

function FeatureBox({ icon, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center p-3 bg-white/70 backdrop-blur-md rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="w-16 h-16 flex justify-center items-center rounded-full bg-white shadow">
        <img src={icon} className="w-10 h-10" />
      </div>
      <p className="ml-4 font-semibold">{title}</p>
    </motion.div>
  );
}

function SellWithUsSection() {
  return (
    <div className="py-10 flex w-full items-center">

      {/* Left gradient card */}
     {/* Left gradient card */}
<motion.div
  initial={{ opacity: 1, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full flex justify-start items-center"
>
  <div
    className="
      animated-image 
      w-[700px] h-[700px]
      sm:w-[340px] sm:h-[340px]
      md:w-[420px] md:h-[420px]
      lg:w-[550px] lg:h-[550px]
      xl:w-[650px] xl:h-[650px]
      2xl:w-[750px] 2xl:h-[750px]
      flex justify-center items-center
    "
  >
    <img
      src="/22060-removebg-preview.png"
      alt="Auction"
      className="w-full h-full object-contain drop-shadow-2xl 
                 hover:scale-105 transition-all duration-500"
    />
  </div>
</motion.div>


      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-full"
      >
        <h3 className="font-bold text-3xl">
          Sell{" "}
          <span className="text-4xl font-extrabold text-[#056973]">With</span> Us!
        </h3>

        <h1 className="text-6xl font-extrabold mt-5 leading-tight">
          Successfully launch <br />
          <span className="text-[#056973]">Sell at Best</span>
          <br />
          Amount!!!
        </h1>

        <div className="grid gap-6 mt-10">
          <FeatureBox
            icon="https://cdn1.iconfinder.com/data/icons/auction-1/512/auction-bid-bidding-09-512.png"
            title="Auto Auction"
          />
          <FeatureBox
            icon="https://cdn-icons-png.flaticon.com/512/4289/4289566.png"
            title="Secure Transaction"
          />
          <FeatureBox
            icon="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
            title="Connect Globally"
          />
        </div>
      </motion.div>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="w-full flex flex-col py-10 justify-center">
      <div className="text-6xl font-bold text-center">
        <p>
          Always By <span className="text-[#056973]">Your Side</span>
        </p>
        <hr className="w-1/4 mx-auto my-5 border-[#056973]" />
        <p>Be the First to use eAuction!</p>
      </div>

      <div className="bg-gray-300/30 rounded-2xl p-10 mt-10">
        <div className="flex justify-around">

          {[1, 2, 3].map(() => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="grid justify-center text-center gap-4"
            >
              <div className="rounded-full bg-white w-24 h-24 mx-auto shadow">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/people-connection/512/12-512.png"
                  className="p-4"
                />
              </div>
              <p className="font-semibold">24/7 Support</p>
              <p className="text-sm text-gray-700">
                Need Help? Get your requests solved quickly via support team.
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
