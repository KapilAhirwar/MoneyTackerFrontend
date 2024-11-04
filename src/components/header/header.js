import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import LoginModal from './LoginModal'; // Adjust the path if needed
import SignupModal from './SignupModal'; // Adjust the path if needed
import { useAppContext } from '../../UseContext/context'; // Import useAppContext hook

function Header() {
    const { isLoggedIn, login, logout, user } = useAppContext(); // Access context
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const handleLoginLogout = () => {
        if (isLoggedIn) {
            logout(); // Call context logout function if logged in
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false); // Close login modal after successful login
    };

    const openSignupModal = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(true);
    };

    const openLoginModal = () => {
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
    };

    return (
        <div className='flex flex-col h-screen gap-[5rem] w-[20rem]'>
            <div className='m-[1rem] bg-teal-200 border-4 h-[100%] border-white text-stone-700 p-[1.5rem] rounded-[2rem] flex flex-col justify-between'>
                <div>
                    <div className='flex gap-[1rem] font-bold text-[1.2rem] pl-[1.5rem] align-baseline items-center'>
                        <div className='text-[2.5rem] ml-[1rem] bg-white rounded-[50%] p-[1rem]'>
                            <FaUser />
                        </div>
                        <span>{isLoggedIn ? user?.username || 'Logged User' : 'USER'}</span>
                    </div>
                    <div className='text-[1.4rem] font-semibold flex flex-col text-left p-[2rem] pt-[2rem]'>
                        <NavLink to={'/'} activeClassName="text-stone-800" className='flex pl-[1rem] w-[100%] hover:bg-teal-100'>Dashboard</NavLink>
                        <NavLink to={'/Transaction'} activeClassName="text-stone-800" className='flex pl-[1rem] w-[100%] hover:bg-teal-100'>Transaction</NavLink>
                        <NavLink to={'/Income'} activeClassName="text-stone-800" className='flex pl-[1rem] w-[100%] hover:bg-teal-100'>Income</NavLink>
                        <NavLink to={'/Expend'} activeClassName="text-stone-800" className='flex pl-[1rem] w-[100%] hover:bg-teal-100'>Expend</NavLink>
                    </div>
                </div>
                <div className='m-[1rem] p-[1rem] bg-teal-200 rounded-[2rem]'>
                    <button
                        onClick={handleLoginLogout}
                        className='w-full text-stone-700 font-bold text-[1.2rem] bg-teal-100 hover:bg-teal-200 rounded-[1rem] p-[0.5rem]'
                        type="button"
                        aria-label={isLoggedIn ? 'Logout' : 'Login'}
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>

            {/* Modals */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
                onSignupClick={openSignupModal}
            />
            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={() => setIsSignupModalOpen(false)}
                onLoginClick={openLoginModal}
            />
        </div>
    );
}

export default Header;
