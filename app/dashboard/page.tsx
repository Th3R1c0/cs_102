'use client';
import useMembers from '@/hooks/members';
import { DataContext } from '../layout';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@/hooks/user';
import { useDataStore } from '@/store/datastore';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

const currentDate = new Date();


const AdminDashboard = () => {
  const user = useDataStore((state: any) => state.loggedinUser)
  const members = useDataStore((state: any) => state.users.filter((member: any) => member.role === 'member'));

  const overdueBooks = members.reduce((acc: any, member: any) => {
    const memberOverdueCount = member.books.reduce((memberAcc: any, book: any) => {
      const dueDate = new Date(book.duedate);
      return dueDate <= currentDate ? memberAcc + 1 : memberAcc;
    }, 0);
    return acc + memberOverdueCount;
  }, 0);
  
  return (
    <div className="bg-blue-200 text-black h-screen w-full flex flex-col p-4 space-y-8">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div>Welcome {user.user}</div>
        <div>menu</div>{' '}
      </div>
      <div className="grid grid-cols-2 gap-4">
  <div className='flex flex-col text-center p-8 space-y-4 rounded-2xl bg-white items-center justify-center'>
    <div className='text-6xl font-bold'>560</div>
    <div className='text-2xl font-semibold'>books in catalogue</div>
  </div>
  <div className='flex flex-col text-center p-8 space-y-4 rounded-2xl bg-white items-center justify-center'>
    <div className='text-6xl font-bold'>{members.length}</div>
    <div className='text-2xl font-semibold'>current members</div>
  </div>
  <div className='flex flex-col text-center p-8  space-y-4 rounded-2xl bg-white items-center justify-center'>
    <div className='text-6xl font-bold'>{overdueBooks}</div>
    <div className='text-2xl font-semibold'>overdue books</div>
  </div>
  <Link href={`c/`} className='flex flex-col p-8 text-center space-y-4 rounded-2xl bg-white items-center justify-center'>
    <div className='text-6xl font-bold'>{'->'}</div>
    <div className='text-2xl font-semibold'>Edit Books</div>
  </Link>
  <div className='h-10'></div>
            <div className="fixed bottom-0 left-0 w-full p-2 bg-white  flex justify-around border-t-[1px] border-black">
  <Link href='/dashboard'>dashboard</Link>
  <Link href='/c'>Edit books</Link>
</div>
</div>


      <div className="flex w-full h-max  items-center space-x-4">
            <div className="text-2xl">Members </div>
            <div className="w-full flex-1 h-[2px] bg-black"></div>
          </div>
      
      <div className="w-full space-y-4 max-h-300px  flex flex-col rounded-md">
          {members.map((member, index) => {
            
            const stats = {
              current: 0, 
              overdue: 0,
            }
            member.books.forEach((b) => {
              const dueDate = new Date(b.duedate);
              if (currentDate > dueDate) {
                stats.current += 1
              } else {
                stats.overdue += 1
              }
            })
            return (
              <div className='w-full p-6 text-2xl space-x-4 rounded-md bg-white text-black flex' key={index}>
                <div>{member.user}</div> <div>{member.email}</div>
                <div>{member.books.length} books - {stats.current} current - {stats.overdue} overdue</div>
                </div>
            )
          })}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const user = useDataStore((state) => state.loggedinUser)
  const [search, setSearch] = useState('');

  if (user === null) {
    return null; // Render nothing or handle the case where user is null
  }
  // Assuming user data is fetched and available
  const filteredBooks = user.books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    
    <div className="bg-blue-200 text-black h-screen w-full flex flex-col p-4 space-y-8">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div>Welcome {user.user}</div>
        <div>menu</div>{' '}
      </div>
      <input
        type="text"
        placeholder="search your books"
        value={search}
        className="p-2 rounded-md"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search !== '' ? (
        <div className="flex flex-col space-y-4">
          <div>search results</div>
          <div>
            {filteredBooks ? (
              filteredBooks.map((book, index) => {
                return (
                  <Link
                    href={`c/book/${book.id}`}
                    key={index}
                    className="w-full h-max p-4 bg-white text-black flex items-center justify-between rounded-md"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold mb-2 truncate">
                        {book.title}
                      </h3>
                      <p className="text-gray-700">{book.author}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{book.publication_year}</span>
                        {book.genre.length > 1 && (
                          <span className="mx-2">|</span>
                        )}
                        <div className="flex space-x-2">
                          {book.genre.map((genre, genreIndex) => (
                            <span key={genreIndex}>{genre} </span>
                          ))}
                        </div>
                      </div>
                      <div>due: {book.duedate}</div>
                    </div>
                    {/* <img
                className="w-20 h-20 rounded-full ml-4 object-cover"
                src={book.cover_image}
                alt={book.title}
              /> */}
                  </Link>
                );
              })
            ) : (
              <div>No Results </div>
            )}
          </div>{' '}
        </div>
      ) : (
        <>
          <div className="flex w-full h-max  items-center space-x-4">
            <div className="text-2xl">Current Books </div>
            <div className="w-full flex-1 h-[2px] bg-black"></div>
          </div>
          <div className="w-full h-max  flex flex-col space-y-4  rounded-md">
            {user.books.map((book, index) => {
              const dueDate = new Date(book.duedate);
               if (dueDate > currentDate) {
                return (
                  <Link
                    href={`c/book/${book.id}`}
                    key={index}
                    className="w-full h-max p-4 bg-white text-black flex items-center justify-between rounded-md"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold mb-2 truncate">
                        {book.title}
                      </h3>
                      <p className="text-gray-700">{book.author}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{book.publication_year}</span>
                        {book.genre.length > 1 && (
                          <span className="mx-2">|</span>
                        )}
                        <div className="flex space-x-2">
                          {book.genre.map((genre, genreIndex) => (
                            <span key={genreIndex}>{genre} </span>
                          ))}
                        </div>
                      </div>
                      <div>due: {book.duedate}</div>
                    </div>
                    {/* <img
                className="w-20 h-20 rounded-full ml-4 object-cover"
                src={book.cover_image}
                alt={book.title}
              /> */}
                  </Link>
                );
              }
            })}
          </div>
          <div className="flex w-full h-max  items-center space-x-4">
            <div className="text-2xl">Overdue Now </div>
            <div className="w-full flex-1 h-[2px] bg-black"></div>
          </div>

          <div className="w-full h-max  flex flex-col space-y-4  rounded-md">
            {user.books.map((book, index) => {
              const dueDate = new Date(book.duedate);
              if (dueDate <= currentDate) {
                return (
                  <Link
                    href={`c/book/${book.id}`}
                    key={index}
                    className="w-full h-max p-4 bg-white text-black flex items-center justify-between rounded-md"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold mb-2 truncate">
                        {book.title}
                      </h3>
                      <p className="text-gray-700">{book.author}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{book.publication_year}</span>
                        {book.genre.length > 1 && (
                          <span className="mx-2">|</span>
                        )}
                        <div className="flex space-x-2">
                          {book.genre.map((genre, genreIndex) => (
                            <span key={genreIndex}>{genre} </span>
                          ))}
                        </div>
                      </div>
                      <div>due: {book.duedate}</div>
                    </div>
                    {/* <img
                className="w-20 h-20 rounded-full ml-4 object-cover"
                src={book.cover_image}
                alt={book.title}
              /> */}
                  </Link>
                );
              }
            })}
          </div>
        </>
      )}
      <div className='h-20 '>.</div>
      <div className="fixed bottom-0 left-0 w-full p-2 bg-white  flex justify-around border-t-[1px] border-black">
        <Link href='/dashboard'>dashboard</Link>
        <Link href='/c'>catalogue</Link>
      </div>

    </div>
  );
};

export default function Home() {
  const {user, role } = useDataStore((state) => state.loggedinUser)
  const router = useRouter()
  if (user === '') {
    // Render a loading state or placeholder while user data is being fetched
    //redirect
    router.push('/')
  }


  // Assuming user data is fetched and available
  return role === 'member' ? <UserDashboard /> : <AdminDashboard />;
}
