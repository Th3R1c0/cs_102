'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Home() {
  const params = useParams();
  const [book, setBook] = useState(null); // State to hold the fetched book object
  const [id, setId] = useState(params.slug); // Destructure slug from router query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://freetestapi.com/api/v1/books');
        const data = await response.json();
        console.log(data);
        const filteredBook = data.find((b) => b.id === Number(id)); // Find book with matching title
        setBook(filteredBook); // Update state with filtered book
        console.log(filteredBook);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-blue-200 text-black h-screen w-full flex flex-col p-4 space-y-8">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div className="font-bold">Confirm Booking</div>
        <div>menu</div>{' '}
      </div>
      <div className="w-full h-max flex justify-between">{/* ... */}</div>
      {book ? (
        <div className="w-full flex-col space-y-8  p-8 bg-white flex rounded-md">
          <div className="h-[400px] bg-blue-700 rounded-md" />
          {/* Book information based on book state */}
          <h2 className="text-2xl font-bold bg-red-200">{book.title}</h2>
          <div className="flex space-x-4">
            <p className="text-gray-700 font-semibold">{book.author}</p>

            <div className="flex items-center text-sm text-gray-500">
              <span>{book.publication_year}</span>
              {book.genre.length > 1 && <span className="mx-2">|</span>}
              <div className="flex space-x-2">
                {book.genre.map((genre, genreIndex) => (
                  <span key={genreIndex}>{genre} </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xl">{book.description}</p>
          {/* Add other book details (author, genre, etc.) based on the API response */}
        </div>
      ) : (
        <div className="w-full h-[600px] p-8 bg-blue-500 flex items-center justify-center rounded-md">
          {/* Loading message or error message if book data fetch fails */}
          Loading book information...
        </div>
      )}
      <div className="flex items-center justify-center space-x-4">
        <input type="checkbox" />
        <div className="underline">
          {' '}
          by confirming i agree to the terms and conditions
        </div>
      </div>
      <Link
        href={`${id}/receipt`}
        className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl "
      >
        confirm booking
      </Link>
    </div>
  );
}
