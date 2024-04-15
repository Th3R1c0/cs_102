'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useMembers from '@/hooks/members';
import { useUser } from '@/hooks/user';
export default function Home() {
  const params = useParams();
  const [book, setBook] = useState(null); // State to hold the fetched book object
  const [id, setId] = useState(params.slug); // Destructure slug from router query
  const router = useRouter()
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
  const [members, setMembers] = useMembers()
  const [user, updateUser] = useUser()
  const confirmBooking = () => {
    // Find user in members and add book to their books
    const updatedMembers = members.map((member) => {
      if (member.role === 'member' && Array.isArray(member.books)) {
        // Clone the member object to avoid mutating the original state
        const updatedMember = { ...member };
        updatedMember.books = [...updatedMember.books, book]; // Add the booked book to the user's list of books
        return updatedMember;
      }
      return member;
    });
    
    // Update members state with the new members that include updated user's books
    console.log('updated members are: ', updatedMembers)
    setMembers(updatedMembers);
  
    // Navigate to receipt page
    router.push(`${id}/receipt`);
  };
  
  return (
    <div className="bg-blue-200 text-black w-full flex flex-col p-4 space-y-4">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div className="font-bold text-2xl">Confirm Booking</div>
        <div>menu</div>{' '}
      </div>
      <div className="w-full h-max flex justify-between">{/* ... */}</div>
      {book ? (
        <div className="w-full flex-col space-y-8  p-8 bg-white flex rounded-md">
          <div className="h-[400px] bg-blue-700 rounded-md" />
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
      <div className="flex items-center justify-center space-x-4">
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
      </div>
      <div className="fixed bottom-0 left-0 w-full p-2 bg-white  flex justify-around border-t-[1px] border-black">
  <Link href='/dashboard'>dashboard</Link>
  <Link href='/c'>catalogue</Link>
</div>
<div className='h-10'></div>
    </div>
  );
}
