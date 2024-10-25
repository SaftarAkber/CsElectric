import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onClose, onRemove, onOrder, onOpenCartPage, onClearCart }) => { // onClearCart parametresi eklendi
    const navigate = useNavigate();
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartRef = useRef(null);

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            onClose();
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const visibleItemsCount = cartItems.length;
    const maxVisibleItems = 3;
    const hiddenItemsCount = visibleItemsCount > maxVisibleItems ? visibleItemsCount - maxVisibleItems : 0;

    const handleMoreItemsClick = () => {
        onOpenCartPage();
        navigate('/cart'); 
    };

    return (
        <div ref={cartRef} className="fixed z-10 right-0 top-0 w-full sm:w-96 bg-white border border-gray-300 p-4 shadow-lg max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Səbət</h2>
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                    Bağla
                </button>
            </div>
            {cartItems && cartItems.length === 0 ? (
                <p className="mt-4">Səbətinizdə mal yoxdur.</p>
            ) : (
                <div>
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 text-left">Mal adı</th>
                                <th className="py-2 text-center">Sayı</th>
                                <th className="py-2 text-right">Qiymət</th>
                                <th className="py-2 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {cartItems && cartItems.slice(0, maxVisibleItems).map(item => (
                                <tr key={item.id} className="bg-gray-100 hover:bg-gray-200">
                                    <td className="py-2 px-2">{item.name}</td>
                                    <td className="py-2 px-2 text-center">{item.quantity}</td>
                                    <td className="py-2 px-2 text-right">{(item.price * item.quantity).toFixed(2)} AZN</td>
                                    <td className="py-2 px-2 text-right">
                                        <button
                                            onClick={() => onRemove(item.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {hiddenItemsCount > 0 && (
                        <p
                            className="mt-2 text-red-600 text-center underline cursor-pointer"
                            onClick={handleMoreItemsClick}
                        >
                            ...{hiddenItemsCount} item daha bax
                        </p>
                    )}

                    <div className="flex justify-between items-center mt-4">
                        <h3 className="text-lg font-semibold">Toplam qiymət: <br />{totalAmount.toFixed(2)} AZN</h3>
                        <button
                            onClick={onClearCart} // Tümünü silmek için bu fonksiyon
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors ml-4"
                        >
                            Səbəti təmizlə
                        </button>
                    </div>

                    <button
                        onClick={onOrder}
                        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Sifariş et
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
