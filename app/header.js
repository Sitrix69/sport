"use client";
import React, { useState, useEffect } from 'react';
import { account } from '../appwrite';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

export default function Header({ cart, setCart }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error("User not logged in", error);
      }
    }
    fetchUser();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const placeOrder = () => {
    console.log('Order placed:', cart);
    clearCart();
    closeModal();
  };

  return (
    <header>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">SportClub</span>
          </a>
          <div className="flex items-center">
            <a href="tel:5541251234" className="mr-6 text-sm text-gray-500 hover:underline">(555) 412-1234</a>
            <button onClick={openModal} className="text-sm text-blue-600 hover:underline">Cart ({cart ? cart.length : 0})</button>
            {user ? (
              <>
                <a href="/account" className="text-sm text-blue-600 hover:underline ml-4">Personal Account</a>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm text-blue-600 hover:underline ml-4">Login</a>
                <a href="/register" className="text-sm text-blue-600 hover:underline ml-4">Register</a>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li><a href="/" className="text-gray-900 hover:underline">Главная</a></li>
              <li><a href="/house" className="text-gray-900 hover:underline">Фитнес</a></li>
              <li><a href="/fight" className="text-gray-900 hover:underline">Легкая атлетика</a></li>
              <li><a href="/relax" className="text-gray-900 hover:underline">Отдых</a></li>
              <li><a href="/outside" className="text-gray-900 hover:underline">Тренажеры</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cart Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Shopping Cart</h2>
        {cart && cart.length > 0 ? (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id} className="mb-4 flex justify-between items-center">
                  <span>{item.title} - {item.price} руб.</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={clearCart} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors">Clear Cart</button>
            <button onClick={placeOrder} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors mt-4">Place Order</button>
          </>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
        <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
      </Modal>
    </header>
  );
}
