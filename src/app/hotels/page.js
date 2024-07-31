"use client";
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function page () {
  return (
    <HotelsPage />
  )
}

const HotelsPage = () => {
    const [hotels, setHotels] = useState([]); // hotels is an empty array

    useEffect(() => {
        const fetchHotels = async () => {
            const Token = localStorage.getItem('token'); // Retrieve the token from local storage
            if (!Token) {
              console.error('No token found');
              return;
            }
            console.log('Token found:', Token);
            try {
                const response = await fetch('http://localhost:8000/api/v1/hotel',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Token': `Bearer ${Token}`,
                    },
                });
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:',error);
            }
        };
        fetchHotels();
    }, []);

    return (
        <div className='bg-white min-h-screen p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {hotels.map(hotel =>  (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}


const HotelCard = ({ hotel }) => {
    return (
        <a href={`/hotels/${hotel.id/rooms}`} className="block text-black no-underline">
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img src="hotel-image-placeholder.jpg" alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <p className="text-gray-700">{hotel.location}</p>
                <p className="text-gray-700">Rating: {hotel.rating}</p>
            </div>
        </div>
    </a>
    )
}