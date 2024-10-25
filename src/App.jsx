import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CartPage from './components/CartPage';
import Header from './pages/Header';
import Categories from './pages/Categories';
import OrderPage from './pages/OrderPage';
import { products } from './data';
import MainPage from './pages/MainPage';
import Footer from './pages/Footer';

const App = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem('cartItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [activeCategory, setActiveCategory] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isOrderPageOpen, setIsOrderPageOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isCartPageOpen, setIsCartPageOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex >= 0) {
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += Number(quantity);
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: Number(quantity) }]);
        }
    };

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    const handleSearch = (term) => {
        if (term.trim() === '') {
            setSearchResults([]);
            setSelectedItem(null);
        } else {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                (product.fullName && product.fullName.toLowerCase().includes(term.toLowerCase()))
            );
            setSearchResults(filteredProducts);
            setSelectedItem(null);
            setSelectedCategory(null);
            setIsCategoryOpen(false);
        }

        if (isOrderPageOpen) {
            setIsOrderPageOpen(false);
        }
        setIsCartPageOpen(false);
    };
    const handleLogoClick = () => {
        setSelectedItem(null);
        setIsCartOpen(false);
        setIsCartPageOpen(false);
        setIsOrderPageOpen(false);
        setIsCategoryOpen(false);
        setSearchResults([]);
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category); // Aktif kategoriyi ayarla
        setSelectedItem(null);
        setSearchResults([]);
        setIsCategoryOpen(true);
        setIsOrderPageOpen(false);
        setIsCartPageOpen(false);
    };

    const handleOrder = () => {
        if (cartItems.length > 0 && !isOrderPageOpen) {
            setIsOrderPageOpen(true);
            setIsCartPageOpen(false);
        }
    };

    const handleClearCart = () => {
        setCartItems([]); // Sepetteki tüm ürünleri kaldırır
    };

    const handleOpenCartPage = () => {
        setSelectedItem(null);
        setSearchResults([]);
        setIsCategoryOpen(false);
        setIsCartOpen(false);
        setIsCartPageOpen(true);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header
                    onCartClick={() => setIsCartOpen(true)}
                    uniqueItemCount={cartItems.length}
                    onSearch={handleSearch}
                    onLogoClick={handleLogoClick} // Logoya tıklama işlevi
                />
                <Categories
                    onSelectItem={setSelectedItem}
                    selectedItem={selectedItem}
                    onCategoryClick={handleCategoryClick}
                    selectedCategory={selectedCategory}
                    isCategoryOpen={isCategoryOpen && !isOrderPageOpen}
                    setIsCategoryOpen={setIsCategoryOpen}
                    activeCategory={activeCategory} // Yeni prop eklendi
                />
                

                {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-4 lg:grid-cols-4 gap-4 mt-4">
                        {searchResults.map(product => (
                            <div
                                key={product.id}
                                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 flex items-center"
                                onClick={() => {
                                    setSelectedItem(product);
                                    setSearchResults([]);
                                }}
                            >
                                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                                <span className="text-lg font-semibold">{product.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {selectedItem && (
                    <ProductDetail product={selectedItem} addToCart={addToCart} />
                )}

                {isCartOpen && (
                    <Cart
                        cartItems={cartItems}
                        onClose={() => setIsCartOpen(false)}
                        onClearCart={handleClearCart}
                        onRemove={removeFromCart}
                        onOrder={handleOrder}
                        onOpenCartPage={handleOpenCartPage}
                    />
                )}
                {isCartPageOpen && (
                    <CartPage
                        cartItems={cartItems}
                        onRemove={removeFromCart}
                        onClose={() => setIsCartPageOpen(false)} // Yalnızca CartPage'i kapat
                        onOrder={handleOrder}
                    />
                )}

                {isOrderPageOpen && (
                    <OrderPage
                        cartItems={cartItems}
                        onClose={() => setIsOrderPageOpen(false)}
                    />
                )}
                <MainPage/>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;