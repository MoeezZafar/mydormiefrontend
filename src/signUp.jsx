import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Assuming you have configured Firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // To show messages to the user

  const handleLoginClick = () => {
    navigate("/login");
  };

  const commonDomains = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);

      const { email, password } = formData;
      try {
        // Create user with email/password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully:", userCredential.user);

        // Send email verification
        await sendEmailVerification(userCredential.user);
        console.log("Verification email sent");
        const res = await fetch("https://mydormiebackend.abdurrehmanshafique.online/api/profile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          city: ""
        });
        // Inform user to verify their email
        setMessage("A verification email has been sent. Please check your inbox.");
        
        // Redirect to login after showing message
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds

      } catch (error) {
        console.error("Error signing up:", error.message);
        setErrors({ email: error.message }); // Display Firebase error message if signup fails
      }

      setIsLoading(false);
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9e4] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.username}
                  onChange={handleInputChange}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.email}
                  onChange={handleInputChange}
                  list="email-suggestions"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <datalist id="email-suggestions">
                  {commonDomains.map((domain) => (
                    <option key={domain} value={`${formData.email.split("@")[0]}${domain}`} />
                  ))}
                </datalist>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.address}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#65702f] focus:border-[#65702f] transition-colors sm:text-sm`}
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  aria-invalid={errors.city ? "true" : "false"}
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{errors.city}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#65702f] hover:bg-[#4f5624] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#65702f] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-sm text-green-600 text-center">
              {message}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-[#65702f] hover:text-[#4f5624] focus:outline-none focus:underline transition-colors"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;