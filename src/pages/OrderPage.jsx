import React, { useState } from 'react';

const OrderPage = ({ cartItems, onClose }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerSurname, setCustomerSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callBackRequest, setCallBackRequest] = useState(false);

    const handleSubmit = async () => {
        const orderCode = Math.floor(100000 + Math.random() * 900000);
        
        // Sepetteki ürünlerin bilgilerini sadece gerekli alanlarla al
        const orderItems = cartItems.map(item => ({
            name: item.name,
            fullName: item.fullName || '-', // fullName'i al, yoksa "-" kullan
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity, // Ürünlerin toplam fiyatı
        }));
    
        const orderData = {
            orderCode, // Sipariş kodunu ekliyoruz
            customerName,
            customerSurname,
            phoneNumber,
            cartItems: orderItems, // Yeni yapı burada
        };
    
        // Gönderilecek verileri konsola yazdır
        console.log(orderData); // Burada orderData'yı yazdırıyoruz
    
        try {
            const response = await fetch('https://cselectric.az/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            const result = await response.json();
            if (result.success) {
                alert(`Siparişiniz başarıyla oluşturuldu. Sipariş kodu: ${orderCode} \nSMS ile gönderilecektir.`);
            } else {
                alert('Sipariş gönderilirken bir hata oluştu: ' + result.message);
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Sipariş gönderilemedi.');
        }
    };
    
    if (cartItems.length === 0) {
        return null; 
    }

    return (
        <div className="order-page p-5 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-5 text-center">Sifariş bölməsi</h2>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 p-4">
                    <input 
                        type="text" 
                        placeholder="Adınız" 
                        value={customerName} 
                        onChange={(e) => setCustomerName(e.target.value)} 
                        className="p-2 mb-4 border border-gray-300 rounded w-full"
                    />
                    <input 
                        type="text" 
                        placeholder="Soyadınız" 
                        value={customerSurname} 
                        onChange={(e) => setCustomerSurname(e.target.value)} 
                        className="p-2 mb-4 border border-gray-300 rounded w-full"
                    />
                    <input 
                        type="text" 
                        placeholder="Telefon nömrəniz" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="p-2 mb-4 border border-gray-300 rounded w-full"
                    />
                    <div className="flex items-center mt-4">
                        <button 
                            onClick={handleSubmit} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
                        >
                            Sifarişi tamamla
                        </button>
                        <label className="flex items-center items-end cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={callBackRequest} 
                                onChange={() => setCallBackRequest(!callBackRequest)} 
                                className="mr-2" 
                            />
                            Biz sizə zəng edək
                        </label>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mt-4"
                    >
                        Bağla
                    </button>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-lg mt-4 md:mt-0">
                    <h3 className="text-lg font-semibold mb-4">Səbətdəki məhsullar</h3>
                    {cartItems.length > 0 ? (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="flex justify-between mb-2">
                                    <span>{item.name} ({item.fullName || '-'})    sayı: {item.quantity}</span>
                                    <span>{item.price} AZN</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Səbət boşdur.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
