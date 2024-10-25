import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, onRemove, onClose, onOrder, setIsOrderPageOpen }) => {
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    const handleOrder = () => {
        onOrder(); // onOrder fonksiyonunu burada çağırın
        setIsOrderPageOpen(true); // OrderPage'i açmak için durumu güncelle
        navigate('/order'); // OrderPage'e yönlendirme
    };

    return (
        <div className="bg-blue-500 min-h-screen flex flex-col p-6 relative">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Səbət</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full bg-white divide-y divide-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 text-left">Mal adı</th>
                            <th className="py-2 px-4 text-center">Sayı</th>
                            <th className="py-2 px-4 text-right">Qiymət</th>
                            <th className="py-2 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {cartItems.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">Səbətinizdə mal yoxdur.</td>
                            </tr>
                        ) : (
                            cartItems.map(item => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-100 relative"
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <td className="py-2 px-4 flex items-center justify-between">
                                        {item.name}
                                        {hoveredItem === item.id && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="absolute right-0 w-12 h-12 border border-gray-300 rounded"
                                                style={{ transition: 'opacity 0.2s' }}
                                            />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                                    <td className="py-2 px-4 text-right">{(item.price * item.quantity).toFixed(2)} AZN</td>
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => onRemove(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <h3 className="text-lg font-semibold text-white">
                    Toplam qiymət: <span className="font-bold">{totalAmount.toFixed(2)} AZN</span>
                </h3>
                <button
                    onClick={handleOrder} // onOrder fonksiyonunu kullan
                    className="mt-4 sm:mt-0 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Sifariş et
                </button>
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
                Bağla
            </button>
        </div>
    );
};

export default CartPage;
