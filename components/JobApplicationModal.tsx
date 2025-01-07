import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function JobApplicationModal(
  { isOpen, onClose, positions }: 
  { 
    isOpen: boolean; 
    onClose: () => void; 
    positions: Array<string> 
  }) {
  const [portfolioURL, setPortfolioURL] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus('pending'); // Set the status to pending while processing

    try {
      // Query to check if the user has already applied for the selected position
      const applicationsRef = collection(db, 'applications');
      const q = query(
        applicationsRef,
        where('email', '==', email),
        where('position', '==', selectedPosition)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setErrorMessage('You have already applied for this position.');
        setStatus('idle');
        return;
      }

      // Add a new application if not already applied
      await addDoc(applicationsRef, {
        firstName,
        lastName,
        contactNumber,
        email,
        portfolioURL,
        position: selectedPosition,
      });

      setStatus('idle');
      setErrorMessage('');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      setStatus('error');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <select
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Choose Position
              </option>
              {positions.map((pos, idx) => (
                <option key={idx} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-black mb-1" htmlFor="resume">Upload Resume</label>
              <input
                type="file"
                name="resume"
                placeholder="Upload Resume"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              />
            </div>
            <div className="mb-2">
            <label className="block text-black mb-1" htmlFor="resume">Upload Portfolio</label>
              <input
                type="file"
                name="portfolioFile"
                placeholder="Upload Portfolio"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              />
            </div>
          <div className="mb-2">
            <input
              type="url"
              placeholder="Portfolio URL"
              className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
              value={portfolioURL}
              onChange={(e) => setPortfolioURL(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 font-bold rounded-md p-2 w-1/2 mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={status === 'pending'}
              className={`${
                status === 'pending' ? 'bg-gray-500' : 'bg-blueTheme'
              } text-white font-bold rounded-md p-2 w-1/2`}
            >
              {status === 'pending' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

  