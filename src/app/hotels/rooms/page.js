"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'

const Rooms = () => {
  return (
    <RoomsPage />
  )
}

export default Rooms;

function RoomsPage() {
  const [rooms, setRooms] = useState([]); // rooms is an empty array

  // Function to extract the hotel ID from the URL
  function getHotelIdFromUrl() {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 2]; // Assuming the URL structure is /hotels/:id/rooms
  }

  const hotelId = getHotelIdFromUrl();

  useEffect(() => {
    const fetchRooms = async () => {
      const Token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (!Token) {
        console.error('No token found');
        return;
      }
      console.log('Token found:', Token);
      try {
        const response = await fetch(`http://localhost:10000/hotel/${hotelId}/rooms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Token': `${Token}`,
          },
        });

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="ml-64 mt-32 mr-64 max-w-90 max-h-90 overflow-auto">
      <div className='bg-white min-h-screen p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  )

}

const RoomCard = ({ room }) => {
  return (
    <a href={`#`} className="block text-black no-underline">
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <img src="room-image-placeholder.jpg" alt="img" className="w-full h-48 object-cover" />
        <div className="p-4 border border-solid ">
          <p className="text-xl font-bold">size :{room.size}</p>
          <p className="text-sm text-gray-600">price :{room.price}</p>
          <p className="text-sm text-gray-600">seaside :{room.seaside}</p>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-950'
          >
            Book now
          </button>
        </div>
      </div>
    </a>
  )
}