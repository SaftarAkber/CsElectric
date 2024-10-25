import React, { useState } from 'react';
import item1 from '/1.jpg';
import item2 from '/2.jpg';
import item3 from '/3.jpg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
const MainPage = () => {
    const slideitems = [
        {
            url: item1,
        },
        {
            url: item2,
        },
        {
            url: item3,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0)
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slideitems.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const nextSlide = () => {
        const isLastSlide = currentIndex === slideitems.length -1;
        const newIndex = isLastSlide ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
     };


    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
            <div style={{ backgroundImage: `url(${slideitems[currentIndex].url})` }} className='w-full h-full rounded-2xl bg-center  duration-500'></div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight  onClick={nextSlide} size={30} />
            </div >
        </div>
    )
}

export default MainPage;