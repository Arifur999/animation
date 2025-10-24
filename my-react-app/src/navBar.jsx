import React from 'react';
import { CiMenuFries } from "react-icons/ci";

const navBar = () => {
    return (
        <div className='flex justify-between py-8 px-10'>
          <h1 className='font-bold text-2xl'>Animation</h1>
           <CiMenuFries className='cursor-pointer' size={20}  />
        </div>
    );
};

export default navBar;