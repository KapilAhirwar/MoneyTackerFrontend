import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

function Header() {
  return (
    <div className='flex flex-col h-screen gap-[5rem] w-[20rem]'>
        <div className='m-[1rem] bg-teal-200 border-4 h-[100%] border-white text-stone-700 p-[1.5rem] rounded-[2rem] '>

            <div className='flex gap-[1rem] font-bold text-[1.2rem] pl-[1.5rem] align-baseline items-center'>
                <div className='text-[2.5rem] ml-[1rem] bg-white rounded-[50%] p-[1rem]'><FaUser/></div>
                <span>USER</span>
            </div>
            <div className='text-[1.4rem] font-semibold flex flex-col text-left p-[2rem] pt-[2rem]'>
              <NavLink to={'/'}>
                <div className='flex pl-[1rem] w-[100%] hover:bg-teal-100 hover:text-stone-800 active:bg-teal-100 '>DashBoard</div>
              </NavLink>
              <NavLink to={'/Transaction'}>
                <div className='flex pl-[1rem] w-[100%] hover:bg-teal-100 hover:text-stone-800 active:bg-teal-100 '>Transaction</div>
              </NavLink>
              <NavLink to={'/Income'}>
                <div className='flex pl-[1rem] w-[100%] hover:bg-teal-100 hover:text-stone-800 active:bg-teal-100 '>Income</div>
              </NavLink>  
              <NavLink to={'/Expend'}>
                <div className='flex pl-[1rem] w-[100%] hover:bg-teal-100 hover:text-stone-800 active:bg-teal-100 '>Expend</div>
              </NavLink>  
            </div>
        </div>

    </div>
  );
}

export default Header;
