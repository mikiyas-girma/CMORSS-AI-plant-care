// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';
    let firstNameError = '';
    let lastNameError = '';

    // Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = 'Please enter a valid email address.';
    }

    // Password Validation
    if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      passwordError = 'Password must contain uppercase, lowercase, and a number.';
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      confirmPasswordError = 'Passwords do not match.';
    }

    // Required Fields Validation
    if (!firstName) {
      firstNameError = 'First name is required.';
    }
    if (!lastName) {
      lastNameError = 'Last name is required.';
    }

    setError({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError, firstName: firstNameError, lastName: lastNameError });

    if (!emailError && !passwordError && !confirmPasswordError && !firstNameError && !lastNameError) {
      console.log('Form submitted successfully:', { firstName, lastName, email, password });
      // Proceed with registration logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-500 p-4 rounded-full">
            <img src="/path/to/logo.png" alt="AgriCare Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl font-bold mt-4 text-green-700">Welcome to AgriCare!</h1>
          <p className="text-center text-gray-600 mt-2">
            We're excited to have you in our community. Please fill out the information below to get started.
          </p>
        </div>

        {/* First Name Field */}
        <div className= "flex space-x-4 mb-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            className={`mt-1 p-2 block w-full rounded-md border ${error.firstName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-required="true"
            aria-invalid={!!error.firstName}
          />
          {error.firstName && (
            <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            className={`mt-1 p-2 block w-full rounded-md border ${error.lastName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-required="true"
            aria-invalid={!!error.lastName}
          />
          {error.lastName && (
            <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
          )}
        </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 block w-full rounded-md border ${error.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!error.email}
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 block w-full rounded-md border ${error.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            aria-invalid={!!error.password}
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password*
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`mt-1 p-2 block w-full rounded-md border ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-400`}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-required="true"
            aria-invalid={!!error.confirmPassword}
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-green-600 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            By continuing, you are agreeing to the terms and conditions of our application.{' '}
            <a href="#" className="text-green-500 underline">
              Read our Policy here.
            </a>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 transition-colors mb-4"
        >
          Register
        </button>

        {/* Sign in with Google Button */}
        <button
          type="button"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Sign in with Google
        </button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-green-500 hover:underline"
            >
            LogIn Here
            </button>
              
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;