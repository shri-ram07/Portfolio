import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { name } from '../constants';
import { motion } from "framer-motion";
import Background from './Background';
// Remove Footer import since it's already in App.js

const Home = () => {
    const ref = useRef(0);
    const [text, setText] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (ref.current < name.length) {
                ref.current++;
                setText(() => text + name[ref.current - 1]);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className='area relative z-0 bg-black min-h-screen'> {/* Changed w-screen h-screen to min-h-screen */}
            <ul className="circles"> {/* Changed class to className */}
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className='hero relative min-h-screen flex justify-center items-center text-white' id='hero'>
                <div className='pt-4 h-36 backdrop-blur-sm rounded-3xl px-4'> {/* Added px-4 for padding */}
                    <h1 className='text-6xl sm:text-7xl font-extrabold mt-2'>Hi, I'm&nbsp;
                        <span className='text-yellow-200 font-extrabold'>{text}</span>
                    </h1>
                    <p className='mt-3 text-xl'>Passionate Machine Learning Engineer dedicated to transforming data into innovative solutions that drive real-world impact.</p>
                </div>      
            </div>
            {/* Removed Footer component */}
        </div>  
    );
}

export default Home;