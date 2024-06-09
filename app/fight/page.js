"use client";
import React, { useState, useEffect } from "react";
import Header from "../header";
import Cards from "./Fight.js";
import { databases, ID, account, DATABASE_ID, COLLECTION_PURCHASES } from "../../appwrite";

export default function FightPage() {
  const [Card, setCard] = useState(Cards);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
    else setCart([]);  // Initialize cart as an empty array if there's no stored cart

    async function checkAndCreateSession() {
      try {
        const user = await account.get();
        console.log('User is already logged in', user);
      } catch (error) {
        console.error('No user logged in, creating anonymous session');
        await account.createAnonymousSession();
      }
    }

    checkAndCreateSession();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function buy(e, card) {
    setCart([...cart, card]);

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_PURCHASES,
        ID.unique(),
        {
          title: card.title,
          price: card.price,
          img: card.img,
          text: card.text,
        }
      );
      console.log('Product added to the database');
    } catch (error) {
      console.error('Failed to add product to the database', error);
    }
  }

  return (
    <div>
      <Header cart={cart} setCart={setCart} />
      <div className="container mx-auto w-full mt-10">
        <a href="/" className="flex gap-2 items-center cursor-pointer text-blue-600">
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          На главную
        </a>
      </div>
      <div className="container w-full mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Card.map(card => (
          <div key={card.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a className="" href="#">
              <img className="rounded-t-lg h-64" src={card.img} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{card.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">{card.text}</p>
              <div className="flex justify-between items-center">
                <p className="mb-3 font-bold text-gray-900">Цена: {card.price} руб.</p>
                <button onClick={(e) => buy(e, card)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  В корзину
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
