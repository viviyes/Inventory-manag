"use client";
import React from "react";
import { Settings, Sun, Bell, Menu, Moon } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector (
    (state)=>state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toogleSidebar = () =>{
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toogleDarkMode =() =>{
    dispatch(setIsDarkMode(!isDarkMode))
  }

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* Left side */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toogleSidebar}
        >
          <Menu className="w-4 h-4"></Menu>
        </button>
      </div>
      <div className="relative">
        <input
          type="research"
          placeholder="Start type to search groups 6 products"
          className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
          <Bell className="text-gray-500" size={20} />
        </div>
      </div>

      {/* right side */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toogleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
              <img src="./user-image.png" alt="profile" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
            </div>
            <span className="font-semibold">Vivi</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings
            className="cursor-pointer text-gray-500"
            size={24}
          ></Settings>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
