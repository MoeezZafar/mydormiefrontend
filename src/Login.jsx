import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { auth } from './firebase'; // Assuming you have Firebase set up
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth import
import { useUser } from './contexts/UserAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loginError, setLoginError] = useState(""); // New state for handling login errors

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSignUpClick = () => {
    navigate("/signUp");
  };

  useEffect(() => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length >= 8;
    
    // Set form validity based on both email and password
    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters"
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(""); // Clear any previous errors
  
    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        setLoginError("Please verify your email before logging in.");
        setIsLoading(false);
        return;
      }
  
      // Profile fetch
      try {
        const response = await fetch("https://mydormiebackend.abdurrehmanshafique.online/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          if (response.status === 404) {
            setLoginError("Profile not found. Please contact support.");
            return;
          }
          throw new Error(data.message || "Failed to fetch profile");
        }
  
        if (!data.success || !data.profile) {
          throw new Error("Invalid profile data received");
        }
  
        // Successfully retrieved profile
        await login(data.profile);
        navigate('/'); // Only navigate after successful profile fetch
  
      } catch (error) {
        console.error("Profile fetch error:", error);
        setLoginError("Unable to load your profile. Please try again later.");
      }
  
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Incorrect email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf9e4] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </h2>

        {loginError && (
          <div className="text-red-500 text-center mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${isFormValid ? "bg-[#65702f] hover:bg-[#58612b]" : "bg-gray-400"}`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="font-medium text-[#65702f] hover:text-[#4f5624] focus:outline-none focus:underline transition-colors"
          onClick={handleSignUpClick}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
