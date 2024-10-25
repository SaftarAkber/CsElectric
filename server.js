import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Çevre değişkenlerini yükler

const app = express();
const PORT = 3001;
const HOST = '0.0.0.0';

app.use(cors({
    origin: ['https://cselectric.az', 'http://localhost:5173'], // İzin verilen domainler
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/send-order', async (req, res) => {
    console.log(`Sunucu ${HOST}:${PORT} üzerinde çalışıyor.`);
    const { orderCode, customerName, customerSurname, phoneNumber, cartItems } = req.body;

    // Mesaj formatını düzenle
    const message = `Yeni Sifarişiniz var\nSifariş kodu: ${orderCode}\nAd: ${customerName}\nSoyad: ${customerSurname}\nTelefon: ${phoneNumber}\n\nSifariş detalları (Səbət):\n\n` +
        cartItems.map((item, index) => {
            const cleanItemName = item.name.replace(/[\[\]{}"]/g, ''); // [ ] { } " gibi karakterleri kaldır
            const cleanItemFullName = item.fullName && item.fullName !== '-' ? item.fullName.replace(/[\[\]{}"]/g, '') : '-'; // fullName varsa temizle, yoksa "-"
            const cleanItemPrice = item.price; // price bir sayı olduğu için temizleme gerekmiyor
            const quantity = item.quantity || 1; // quantity varsa kullan, yoksa 1 olarak kabul et

            return `${index + 1}. Məhsul: ${cleanItemName} \nMəhsulun tam adı:${cleanItemFullName}, \nMiqdarı: ${quantity}, \nQiymət: ${cleanItemPrice} AZN`;
        }).join('\n\n') + 
        `\n\nToplam Qiymət: ${cartItems.reduce((total, item) => total + (item.total || item.price * (item.quantity || 1)), 0)} AZN`;

    console.log('Göndərilən Mesaj:', message);

    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        if (telegramResponse.ok) {
            return res.status(200).json({ success: true, message: 'Sipariş alındı ve Telegram’a gönderildi!' });
        } else {
            const errorData = await telegramResponse.json();
            console.error('Telegram Hatası:', errorData);
            return res.status(500).json({ success: false, message: 'Telegram’a gönderim başarısız oldu.' });
        }

    } catch (error) {
        console.error('Hata:', error);
        return res.status(500).json({ success: false, message: 'Bir hata oluştu: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu ${HOST}:${PORT} portunda çalışıyor.`);
});
