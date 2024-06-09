import React, { useState, useEffect } from 'react';
import { account, databases } from '../appwrite';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await account.get();
        setUser(user);
        setEmail(user.email);
        setName(user.name);
      } catch (error) {
        console.error("Error fetching user", error);
        toast.error("Error fetching user");
      }
    }

    async function fetchPurchases() {
      try {
        const response = await databases.listDocuments('66655893003896c51ade', '666558a90025d1d5e7d4');
        setPurchases(response.documents);
      } catch (error) {
        console.error("Error fetching purchases", error);
        toast.error("Error fetching purchases");
      }
    }

    fetchUser();
    fetchPurchases();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Error logging out");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await account.updateEmail(email);
      await account.updateName(name);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Personal Account</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Profile Information</h2>
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
            Update Profile
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Purchases</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {purchases.map(purchase => (
            <Disclosure key={purchase.$id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>{purchase.title} - {purchase.price} руб.</span>
                    <ChevronUpIcon
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {purchase.details}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
