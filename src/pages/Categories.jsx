import React, { useState } from 'react';
import { products } from '../data.js';
import { FaBars, FaTimes } from 'react-icons/fa';

const Categories = ({ onSelectItem, selectedItem, isCategoryOpen, onCategoryClick }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isNavbarOpen, setNavbarOpen] = useState(false); // Navbar'ın açık olup olmadığını takip etmek için

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onSelectItem(null);
        onCategoryClick(category);
    };

    const filteredProducts = products.filter(product => product.category === selectedCategory);

    const groupProductsByCatname = (products) => {
        return products.reduce((acc, product) => {
            if (!acc[product.catname]) {
                acc[product.catname] = [];
            }
            acc[product.catname].push(product);
            return acc;
        }, {});
    };

    const groupedProducts = groupProductsByCatname(filteredProducts);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <div className="text-center bg-blue-900">
            <div className="border-blue-600 h-[100px] flex justify-between items-center px-4">
                <button onClick={toggleNavbar} className="md:hidden text-white">
                    {isNavbarOpen ? <FaTimes /> : <FaBars />}
                </button>
                <div className="flex-grow flex items-center justify-center">
                    <div className="hidden md:flex"> {/* Büyük ekranlarda kategoriler görünür */}
                        {['İşıqlandırma', 'Elektrik', 'Elektrikli əl alətləri', 'Xırdavat və əl alətləri', 'Yanğın sistemləri', 'Kamera və təhlükəsizlik sistemləri'].map(category => (
                            <button
                                key={category}
                                className={`mr-3 px-4 h-[50px] py-2 border-double border-4 border-sky-500 text-blue-600 rounded transition-colors ${
                                    selectedCategory === category 
                                        ? 'bg-blue-600 text-white border-white' 
                                        : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-white'
                                }`} 
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {isNavbarOpen && (
                <div className="bg-blue-400 p-4 md:hidden">
                    {['İşıqlandırma', 'Elektrik', 'Elektrikli əl alətləri', 'Xırdavat və əl alətləri', 'Yanğın sistemləri', 'Kamera və təhlükəsizlik sistemləri'].map(category => (
                        <button
                            key={category}
                            className={`mr-3 px-4 h-[50px] py-2 border-double border-4 border-sky-500 text-blue-600 rounded transition-colors ${
                                selectedCategory === category 
                                    ? 'bg-blue-600 text-white border-white' 
                                    : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-white'
                            }`} 
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            {isCategoryOpen && selectedCategory && !selectedItem && (
                <div className="bg-blue-300 p-4 hidden md:block"> {/* Arka plan rengi bir ton daha az */}
                    {Object.keys(groupedProducts).reduce((rows, catname, index) => {
                        if (index % 3 === 0) rows.push([]);
                        rows[rows.length - 1].push(catname);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex  my-4"> {/* Row'ları merkezde göster */}
                            {row.map(catname => (
                                <div key={catname} className="flex items-start mx-4 text-center w-1/3 border border-blue-600 rounded-lg bg-blue-400 p-4 m-2"> {/* Border ve rounded köşeler eklendi */}
                                    <img src={groupedProducts[catname][0]?.image} alt={catname} className="w-10 h-10 mr-4" />
                                    <div className="flex flex-col">
                                        <h1 className="text-md font-bold text-left text-white">{catname}</h1> 
                                        <div className="flex flex-col items-start mt-1">
                                            {groupedProducts[catname].map((product) => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => onSelectItem(product)}
                                                    className="my-0 text-left cursor-pointer hover:underline"
                                                >
                                                    <h2 className="text-sm font-semibold text-blue-950">{product.name}</h2> {/* Yazı boyutu azaltıldı */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;
