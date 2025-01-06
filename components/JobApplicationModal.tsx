import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, 'applications'), {
      firstName,
      lastName,
      contactNumber,
      email,
      portfolioURL,
      position: selectedPosition,
    });

    onClose();
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
                name="first name"
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
                name="last name"
                placeholder="Last Name"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <select
                name="position"
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
                name="number"
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
                name="email"
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
                name="portfolio"
                placeholder="Portfolio URL"
                className="w-full bg-blueTheme text-white placeholder-gray-100 border rounded px-2 py-1"
                value={portfolioURL}
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 font-bold rounded-md p-2 w-1/2 mr-2"
              >
                Close
              </button>
              <button type="submit" className="bg-blueTheme text-white font-bold rounded-md p-2 w-1/2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  