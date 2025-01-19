import { useEffect, useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import Logo from "../assets/Door-1.svg";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./subUi/navigateButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../contexts/UserAuth";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(user.isAuthenticated); // Default state

    useEffect(() => {
        setIsLoggedIn(user.isAuthenticated); // Sync state with context
    }, [user]);

    const handleLogoutClick = () => {
        signOut(auth)
            .then(() => {
                logout(); // Clear user state
                setIsLoggedIn(false); // Update UI state
            })
            .catch(() => {
                console.error("Logout failed");
            });
    };

    const handleProfileClick = () => navigate("/profile");
    const handleSignUpClick = () => navigate("/signUp");
    const handleLoginClick = () => navigate("/login");
    const backToHome = () => navigate("/");

    return (
        <nav className="bg-transparent backdrop-blur-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex-shrink-0 bg-[#65702f] p-2 rounded-[8px] cursor-pointer"
                        onClick={backToHome}
                    >
                        <img className="h-8 w-auto" src={Logo} alt="Company Logo" />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <NavigationButton />
                        <a
                            onClick={() => navigate("/About")}
                            className="text-gray-900 hover:text-[#59622b] px-3 py-2 rounded-md text-sm font-bold cursor-pointer"
                        >
                            About
                        </a>
                        <a
                            onClick={() => navigate("/Contact")}
                            className="text-gray-900 hover:text-[#59622b] px-3 py-2 rounded-md text-sm font-bold cursor-pointer"
                        >
                            Contact Us
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-900 hover:text-[#59622b] rounded-md"
                                >
                                    <FiUser size={20} />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogoutClick}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#65702f] hover:bg-[#59622b] rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-[#59622b] rounded-md"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={handleSignUpClick}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#65702f] hover:bg-[#59622b] rounded-md"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
