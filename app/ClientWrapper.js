"use client";

import React, { useEffect, useState } from 'react';

export default function ClientWrapper({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            {children}
        </>
    );
}
