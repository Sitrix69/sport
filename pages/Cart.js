"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  function removeFromCart(itemId) {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function clearCart() {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Shopping Cart</h1>
      {cart.length > 0 ? (
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
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
}
