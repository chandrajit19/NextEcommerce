"use client"
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import { selectCartCount, setCartItems } from "@/app/lib/cart";
import { readData } from "../serverFunction";
import { useEffect } from "react";

const NavBar = () => {
   const { isSignedIn, user } = useUser();
   const email = user?.emailAddresses[0]?.emailAddress || "";
   const count = useSelector((state: RootState) => selectCartCount(state));
   const dispatch = useDispatch();

   // Fetching data from DB and sync with Redux on mount/email change
   useEffect(() => {
      const fetchData = async () => {
         if (isSignedIn && email) {
            const data = await readData(email);
            dispatch(setCartItems(data)); // Syncing Redux with DB data
         }
      };
      fetchData();
   }, [email, isSignedIn, dispatch]);
   return (
      <>
         <div className="w-full ">
            <div className="container mx-auto flex justify-between bg-white/80 backdrop-blur-md px-4 py-2 border-b border-gray-200">
               <div className="text-xs text-gray-600 flex items-center "> 
                  <h1>Shop Smart, Live Better!</h1> 
               </div>
 
               <div className="flex sm:gap-4 items-center text-gray-600 font-semibold min-w-max">    
                  <SignedOut>
                 
                     <SignInButton mode="modal">
                        <button
                           className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 rounded-full text-sm font-medium 
                                     bg-white text-[#191137] border border-gray-200 shadow-sm
                                     hover:bg-slate-50 active:scale-[0.899] transition transform
                                     focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                           aria-label="Sign in"
                           type="button"
                        >
                           Sign In
                        </button>
                     </SignInButton>

                 
                     <SignUpButton mode="modal">
                        <button
                           className="inline-flex items-center gap-2 px-2 ml-2 sm:px-5 py-2 rounded-full text-sm font-semibold 
                                     bg-[#191137] text-white shadow-md
                                     hover:bg-[#0f0b2a] active:scale-[0.899] transition transform
                                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2"
                           aria-label="Sign up"
                           type="button"
                        >
                           Sign Up
                        </button>
                     </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                     {isSignedIn && <p>{user?.firstName}!</p>}
                     <div className="ml-2">
                        <UserButton />
                     </div>
                  </SignedIn>
               </div>
            </div>
         </div>

         <header className="sticky top-0 z-50">
            <div className="sticky top-0 z-50">
               <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 text-white container mx-auto flex justify-between px-4 py-3 shadow-lg">
                  <div className="hidden sm:block">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 animate-bounce">
                        <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                        <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
                     </svg>
                  </div>

                  <div className="flex gap-4 items-center mx-auto sm:mx-0 text-xs md:text-xl font-semibold">
                     <Link href="/">Home</Link>
                     <Link href="/about">About</Link>
                     <Link href="/contact">Contact</Link>
                     <Link href="/products">Product</Link>
                     <Link href="/cart" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-8 md:h-8 w-7 h-7">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span className="absolute inline-block w-[20px] h-[20px] rounded-full text-center text-[10px] bg-red-500 text-white top-[-7px] right-[-3px] p-1">{count}</span>
                     </Link>
                  </div>
               </div>
            </div>
         </header>
      </>
   );
};

export default NavBar;