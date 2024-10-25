// src/CartIcon.jsx
import React from 'react';
import { TiShoppingCart } from 'react-icons/ti'; // Shopping cart ikonu içe aktar

const CartIcon = ({ onClick, itemCount }) => {
    return (
        <div className="relative cursor-pointer" onClick={onClick}>
            <TiShoppingCart className="w-6 h-6 sm:w-16 sm:h-14 text-blue-600" />
            {itemCount > 0 && (
                <div className="absolute top-[10px] left-[50px] bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold transform -translate-x-1/2 -translate-y-1/2">
                    {itemCount}
                </div>
            )}
        </div>
    );
};

export default CartIcon;
