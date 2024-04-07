'use client';
import { DataContext } from '../layout';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
const AdminDashboard = () => {
  const { members, setMembers, login, user } = useContext(DataContext);
  return (
    <div className="bg-blue-200 text-black h-screen w-full flex flex-col p-4 space-y-8">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div>Welcome {user.user}</div>
        <div>menu</div>{' '}
      </div>
      <div className="w-full h-[300px] bg-blue-500 flex items-center justify-center rounded-md">
        Dashboard{' '}
      </div>
      <div className="w-full h-[300px] bg-blue-500 flex items-center justify-center rounded-md">
        Member Infomation{' '}
      </div>
      <div className="w-full h-[300px] bg-blue-500 flex items-center justify-center rounded-md">
        Books Infomation{' '}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { members, setMembers, login, user } = useContext(DataContext);
  const [search, setSearch] = useState('');
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
      {!search == '' ? (
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
              if (book.duedate > 0) {
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
              if (book.duedate < 1) {
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
    </div>
  );
};

export default function Home() {
  const { members, setMembers, login, user } = useContext(DataContext);
  return user.role === 'member' ? <UserDashboard /> : <AdminDashboard />;
}
