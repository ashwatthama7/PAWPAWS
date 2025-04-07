import React from "react";
import image from "../assets/logo.png";
export default function About() {
  return (
    <div className="w-full lg:h-screen h-full m-auto flex items-center justify-cetner py-20 bg-gray-50 dark:bg-gray-900">
  <div className="w-full h-full flex flex-col justify-center items-center sm:px-4 px-2">
    {/*  */}
    <div className="lg:w-[90%] w-full mx-auto flex flex-col lg:gap-6 lg:flex-row items-center justify-center ">
      <div className="relative">
        {/* Side Img 1 */}
        <img
          className="absolute z-20 lg:left-[2rem] -top-4 left-[1rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
          src="https://pbs.twimg.com/profile_images/1424714912165548039/ttk43SNo_400x400.jpg"
          alt="Side Image"
        />
        {/* Side Img 2 */}
        <img
          className="absolute z-20 lg:top-[12rem] sm:top-[11rem] top-[5rem] sm:-left-[3rem] -left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
          src="https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-6/480677069_1005490094776892_1262779490684070657_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3c9Z3F6xn70Q7kNvwFOVd0E&_nc_oc=AdmPf4yAJLHre5vRP9uWajganmTTdfRkIzy0qH78HvOOaBmdVf9qmDzBr78-LGB0TUw&_nc_zt=23&_nc_ht=scontent.fktm7-1.fna&_nc_gid=dMeE83GxwCMFKoQe8dYJ1A&oh=00_AfG9vIXV0ZkB7vLk4Y6MNeWdSUCkAnevu1Q3ZMZ5pac5aw&oe=67F81B57"
          alt="Side Image 2"
        />
        {/* Side Img 3 */}
        <img
          className="absolute z-20 lg:top-[23rem] sm:top-[20.5rem] top-[10.5rem] left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
          src="https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/430904314_919301169741073_1123067945070965995_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Dg78pgRlJnIQ7kNvwFsIDWf&_nc_oc=AdkaJRP3BfD-CQ2N_cBU3C4KU-MvnhiiwVx3to8e6TfA8bgMs4pvyoOCUo6Wtbdrc0k&_nc_zt=23&_nc_ht=scontent.fktm10-1.fna&_nc_gid=tGBjd5lbwtC-qooW5gV7vg&oh=00_AfF1Q4K96kSyO74b4eZTGenH3gM62NnJQxyifLzBOn3n2g&oe=67F804B1"
          alt="Side Image 3"
        />
        {/* Main Img */}
        <img
          className="rounded-full relative object-cover right-0 lg:w-[30rem] lg:h-[30rem] sm:w-[25rem] sm:h-[25rem] w-[12rem] h-[12rem] outline sm:outline-offset-[.77em] outline-offset-[.37em] outline-green-500"
          src={image}
          alt="About us"
        />
      </div>
      {/*  */}
      <div className="lg:w-[60%] p-4 w-full h-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center sm:px-6 px-4 rounded-xl">
        <h2 className="text-4xl text-center text-green-600 dark:text-green-400 font-bold px-4 py-1 md:mt-0 mt-10">
          About Us
        </h2>
        <p className="md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">
          We are Student of NEC       
        </p>
        <p className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">
      
        Project Pawpaws is a dedicated initiative aimed at rescuing, rehabilitating, and rehoming stray dogs. Our mission is to provide these voiceless souls with a safe shelter, proper care, and loving homes. Through our platform, users can browse available dogs, connect with adopters, and support our cause through donations. Together, we can make a difference — one paw at a time. 🐾
        </p>
      
      </div>
    </div>
  </div>
</div>
  );
}