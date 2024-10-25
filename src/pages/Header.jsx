import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import '../index.css';
import CartIcon from '../components/CartIcon';
import logo from '/logo.png';


const Header = ({ onCartClick, uniqueItemCount, onSearch, onLogoClick }) => { 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); 
    };

    const handleSearchIconClick = () => {
        onSearch(searchTerm); 
    };

    return (
        <header className="bg-white flex flex-col md:flex-row justify-around items-center p-4 border-b border-gray-300">
            {/* Logo ve İletişim Numarası */}
            <div className="flex flex-row items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                <div className="flex flex-col items-center md:items-start">
                    <img 
                        src={logo} 
                        alt="Şirket Logosu" 
                        className="w-20 h-auto md:w-28 cursor-pointer" 
                        onClick={onLogoClick} 
                    /> 
                    
                </div>
                <p className="text-blue-600 text-sm md:text-left">Əlaqə nömrələri: (123)456-78-90</p>
                {/* Sepet ikonu (Mobilde sağa yerleştirilecek) */}
                <div className="flex md:hidden items-center">
                    <CartIcon onClick={onCartClick} itemCount={uniqueItemCount} />
                </div>
            </div>

            {/* Arama Barı */}
            <div className="flex justify-center w-full md:w-auto md:mx-4">
                <div className="relative w-full max-w-xs md:max-w-md shadow-lg shadow-blue-500/50 rounded-lg">
                    <FaSearch 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer " 
                        onClick={handleSearchIconClick} 
                    />
                    <input
                        type="text"
                        placeholder="Axtar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Sepet ikonu (Daha büyük ekranlar için) */}
            <div className="hidden md:flex items-center">
                <CartIcon onClick={onCartClick} itemCount={uniqueItemCount} />
            </div>
        </header>
    );
};

export default Header;
