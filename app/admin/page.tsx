'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your login logic here using Firebase or any other method
    // Example: try to log in with email and password
    try {
      // Your Firebase login logic here
      // await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logging in with:', email, password);
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <Image
            src="/images/uptech-logo.svg"
            alt="Uptech Logo"
            className="w-32 mx-auto mb-4"
            width={128}
            height={128}
          />
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
        </div>
        <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
          {errorMessage && <div id="error-message" className="text-red-500 text-center">{errorMessage}</div>}
        </form>
      </div>

      {/* Firebase Scripts */}
      <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
      <script src="/js/firebase-config.js"></script>
      <script src="/js/login.js"></script>
    </div>
  );
}