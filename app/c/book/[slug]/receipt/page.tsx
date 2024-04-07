'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
      <div className="flex-1 flex-col space-y-4  justify-center items-center flex p-8">
        <div className="text-2xl font-bold">Successfully booked 🎉</div>
        {book ? (
          <div className="w-full h-max p-5 bg-white text-black flex items-center justify-between rounded-md">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2">{book.title}</h3>
              <p className="text-gray-700">{book.author}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{book.publication_year}</span>
                {book.genre.length > 1 && <span className="mx-2">|</span>}
                <div className="flex space-x-2">
                  {book.genre.map((genre, genreIndex) => (
                    <span key={genreIndex}>{genre} </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-gray-700">{book.description}</p>
            </div>
            {/* <img
              className="w-20 h-20 rounded-full ml-4 object-cover"
              src={book.cover_image}
              alt={book.title}
            /> */}
          </div>
        ) : (
          ''
        )}

        <div className="font-bold">
          terms and conditions will be sent to your email
        </div>
      </div>
      <Link
        href={`/dashboard`}
        className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl "
      >
        Dismiss
      </Link>
    </div>
  );
}
