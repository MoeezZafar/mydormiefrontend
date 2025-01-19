import { useNavigate } from "react-router-dom";
import Navbar from "./ui/navbar";
import Footer from "./ui/Footer";

const PostBooking = () => {

    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/");
    };

    return(
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-[#fdf9e4] py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 mt-[10%]">
                    <div className="text-center mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">Request Sent!</h1>
                        <p className="mt-2 text-gray-600">Your Request has been sent to MyDormie Team, We will contact you shortly about acceptance of your booking.</p>
                        <button
                            type="submit"
                            className="w-[40%] flex justify-center py-3 px-4 mt-5 mx-[30%] border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#65702f] hover:bg-[#65702f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#65702f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={backToHome}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default PostBooking