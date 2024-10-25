import React, { useState } from 'react';

const Purchase = ({ cartItems }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerSurname, setCustomerSurname] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const handlePurchase = () => {
        const orderCode = Math.floor(100000 + Math.random() * 900000); // 6 basamaklı rastgele kod
        const message = `Siparişiniz alınmıştır. Səbət'teki ürünler: ${cartItems.map(item => item.name).join(', ')}. Sipariş Kodunuz: ${orderCode}`; // Mesaj örneği
        alert(`SMS Gönderildi: ${message}`); // SMS gönderimini simüle et
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-5 text-center">Sipariş Formu</h1>
            <div className="bg-white rounded shadow-lg p-5 mb-5">
                <div className="mb-5">
                    <label className="block mb-2">
                        İsim:
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="block w-full p-2 mt-2 border border-gray-300 rounded"
                        />
                    </label>
                    <label className="block mb-2">
                        Soyisim:
                        <input
                            type="text"
                            value={customerSurname}
                            onChange={(e) => setCustomerSurname(e.target.value)}
                            className="block w-full p-2 mt-2 border border-gray-300 rounded"
                        />
                    </label>
                    <label className="block mb-5">
                        Telefon Numarası:
                        <input
                            type="text"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="block w-full p-2 mt-2 border border-gray-300 rounded"
                        />
                    </label>
                    <button 
                        onClick={handlePurchase} 
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Siparişi Tamamla
                    </button>
                </div>
                <h2 className="text-xl font-semibold mb-3">Səbət'teki Ürünler:</h2>
                <ul className="list-disc pl-5">
                    {cartItems.map(item => (
                        <li key={item.id} className="mb-2">
                            {item.name} - {item.price} AZN x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Purchase;
