'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CarouselImage {
    src: string;
    alt: string;
    title: string;
    description: string;
}

interface CarouselProps {
    images: CarouselImage[];
    interval?: number; // ms
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="flex flex-col items-center space-y-3 h-full w-full justify-center">
            <div className="w-72 h-72 relative">
                <Image
                    src={images[current].src}
                    alt={images[current].alt}
                    fill
                    className="object-contain rounded-lg"
                />
            </div>
            <div className="flex space-x-2">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`h-2 w-2 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                ))}
            </div>

            <div className="flex flex-col justify-start items-center space-y-2 mt-5 h-28 w-[85%]">
                <h1 className="text-3xl font-poppins font-bold text-center">{images[current].title}</h1>
                <p className="text-sm font-open-sans text-center">{images[current].description}</p>
            </div>
        </div>
    );
};

export default Carousel; 