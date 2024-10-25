import React from 'react';

const ProductDetail = ({ product, addToCart }) => {
    const [quantity, setQuantity] = React.useState(1); 

    const handleAddToCart = () => {
        if (quantity > 0) { 
            addToCart(product, quantity);
            setQuantity(1); 
        }
    };

    return (
        <div className="flex flex-col items-center max-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                {/* fullName */}
                <div className="p-4 text-left flex justify-between">
                    <p className="text-black text-4xl ml-2 font-bold mb-4 ">{product.fullName}</p>
                    
                    <h2 className="text-2xl font-bold text-orange-600 mb-2">{product.name}</h2>
                            
                </div>
                
                <div className="flex flex-col md:flex-row">
                    {/* Sol */}
                    <div className="md:w-1/2 p-4">
                        <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
                    </div>

                    {/* Sağ */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            {product.id && <p className="text-gray-800 mb-2">İd: {product.id}</p>}
                            {product.price && <p className="text-gray-800 mb-2">Qiymət: {product.price} Azn</p>}
                            {product.model && <p className="text-gray-800 mb-2">Model: {product.model}</p>}
                            {product.year && <p className="text-gray-800 mb-2">İl: {product.year}</p>}
                            {product.country && <p className="text-gray-800 mb-2">İstehsalçı ölkə: {product.country}</p>}
                            {product.brend && <p className="text-gray-800 mb-2">Brend: {product.brend}</p>}
                            {product.olcu && <p className="text-gray-800 mb-2">Ölçü: {product.olcu}</p>}
                            {product.reng && <p className="text-gray-800 mb-2">Rəng: {product.reng}</p>}
                            {product.en && <p className="text-gray-800 mb-2">Eni: {product.en}</p>}
                            {product.hundurluk && <p className="text-gray-800 mb-2">Hündürlüyü: {product.hundurluk}</p>}
                            {product.uzunluq && <p className="text-gray-800 mb-2">Uzunluğu: {product.uzunluq}</p>}
                            {product.guc && <p className="text-gray-800 mb-2">Gücü: {product.guc}</p>}
                            {product.cereyansiddeti && <p className="text-gray-800 mb-2">Cərəyan şiddəti: {product.cereyansiddeti}</p>}
                        </div>

                        {/* Səbət' */}
                        <div className="flex flex-col md:flex-row items-center mt-4">
                            <input 
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-20 text-center border border-gray-300 rounded-md mr-4 mb-4 md:mb-0"
                            />
                            <button 
                                onClick={handleAddToCart} 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                            >
                                Səbətə göndər
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
