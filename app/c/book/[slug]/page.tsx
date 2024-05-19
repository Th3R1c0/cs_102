'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/datastore';
import { ImBin } from 'react-icons/im';
export default function Home() {
  const params = useParams();
  const [book, setBook] = useState(null); // State to hold the fetched book object
  const [id, setId] = useState(params.slug); // Destructure slug from router query
  const [currentlyBooked, setCurrentlyBooked] = useState(false)
  const router = useRouter()
  const user = useDataStore((state) => state.loggedinUser);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://freetestapi.com/api/v1/books');
        const data = await response.json();
        const filteredBook = data.find((b) => b.id === Number(id)); // Find book with matching title
        setBook(filteredBook); // Update state with filtered book
        if (filteredBook && user.books.some((userBook) => userBook.id === filteredBook.id)){
          setCurrentlyBooked(true)
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchData();
  }, []);
  
  const addBook = useDataStore((state) => state.addBook);
  const deleteBook = useDataStore((state) => state.deleteBook);
  
  const deleteBookById = () => {
    deleteBook(id);
    router.push('/c')
  };
  


  const confirmBooking = () => {
    //call backend and add book to users current books
    addBook(book)
    // Navigate to receipt page
    router.push(`${id}/receipt`);
  };
  
  return (
    <div className='w-screen h-screen bg-blue-200 flex items-center justify-center'>
    <div className="bg-blue-200 text-black h-screen max-w-2xl flex flex-col p-4 space-y-4">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div className="font-bold text-2xl">{user.role == 'admin' ? "Book info" : "Confirm Booking"}</div>
        <div>menu</div>{' '}
      </div>
      <div className="w-full h-max flex justify-between">{/* ... */}</div>
      {book ? (
        <div className="w-full flex-col space-y-8  p-8 bg-white flex rounded-md">
          <div className="h-[400px] bg-gradient-to-r from-blue-400 to-blue-800 rounded-md" />
          {/* Book information based on book state */}
          <h2 className="text-2xl font-bold ">{book.title}</h2>
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
      {user.role !== "admin" ? <>      {!currentlyBooked ?   <>   <div className="flex items-center justify-center space-x-4">
        <input type="checkbox" />
        <div className="underline">
          {' '}
          by confirming i agree to the terms and conditions
        </div>
      </div>
     
      <div
        onClick={confirmBooking}
        className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl "
      >
        confirm booking
      </div></>  : <div className='w-full h-max p-4 text-2xl text-center font-bold'>Currently Booked!</div>}</>: <div onClick={deleteBookById} className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-red-500 text-2xl space-x-4 "><div>Delete</div><ImBin /></div>}


      <div className="fixed bottom-0 left-0 w-full bg-white border-t-[1px] border-black">
          <div className="flex justify-around p-2">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/c">Catalogue</Link>
          </div>
        </div>
<div className='h-10'></div>
    </div></div>
  );
}
