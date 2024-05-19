'use client';
import { useDataStore } from '@/store/datastore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Home() {
  const [books, setBooks] = useState({ books: [], filter: [] });
  const [allGenres, setAllGenres] = useState([]);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [pagnationCount, setPagnationCount] = useState(10);
  
  const fetchBooks = useDataStore((state) => state.fetchbooks)
  const b = useDataStore((state) => state.books)
  const user = useDataStore((state) => state.loggedinUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetches from this api as per below
        // const response = await fetch('https://freetestapi.com/api/v1/books');
        // const data = await response.json();
        let data; 
        console.log('back here to c, data is: ', data)
        if (b.length === 0) {
         data = await fetchBooks()
          // Modify books directly to include received books
          
        } else {
          data = b
        }
          //set books 
        setBooks((prevBooks) => ({ ...prevBooks, books: data }));
        const uniqueGenres = [];
        for (const book of data) {
          for (const genre of book.genre) {
            if (!uniqueGenres.includes(genre)) {
              uniqueGenres.push(genre);
            }
          }
        }
        setAllGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log(books);
  }, [books]);
  const [search, setSearch] = useState('');
  const [GenreSearch, setGenreSearch] = useState('');
  const genres = showAllGenres ? allGenres : allGenres.slice(0, 3);

  // filteres books based on current book title being searched
  const filteredBooks = books?.books.filter((book: any) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
  // Function to filter books based on a genre
  const filterByGenre = (genre: string) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      filter: [...prevBooks.filter, genre], // Add genre to the filter array
    }));
  };
  // Function to clear the filter
  const clearFilter = () => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      filter: [],
    }));
  };
  const pagnate = () => {
    if (pagnationCount !== books.length) {
      setPagnationCount((X) => X + 10);
    }
  };

  //filter books by genre
  const filteredBooksBygenre = books.books.filter((book: any) => {
    // Check if all selected genres are included in the book's genres
    const hasAllGenres = books.filter.every((genre) =>
      book.genre.includes(genre)
    );
    return books.filter.length === 0 || hasAllGenres;
  });


  const router = useRouter()
  const addBook = () => {
    router.push('c/addbook')
  }
  return (
    <div className="bg-blue-200 text-black w-full min-h-screen flex flex-col p-4 space-y-4">
      <div className="w-full h-max flex justify-between">
        {' '}
        <div>Catalogue</div>
        <div>menu</div>{' '}
      </div>
      {user.role == 'admin' ? <>      <div className='w-full flex space-x-4'>
        <div className='flex-1 bg-white rounded-md font-bold text-1xl text-center flex items-center justify-center p-2'>Edit books</div>
        <div className='flex-1 bg-white rounded-md font-bold text-1xl text-center flex items-center justify-center p-2' onClick={addBook}>Add book</div>
      </div></> : ''}
      <input
        type="text"
        placeholder="search all books"
        value={search}
        className="p-2 rounded-md text-black"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-2 overflow-hidden">
        {genres.map((genre, index) => (
          <div
            onClick={() => filterByGenre(genre)}
            key={index}
            className={`rounded-lg text-center p-2 overflow-hidden truncate font-bold bg-${
              books.filter.includes(genre) ? 'grey-500' : 'white'
            } text-black whitespace-nowrap`}
          >
            {genre}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center">
        <div className="text-gray font-sm underline flex space-x-2">
          <div onClick={() => setShowAllGenres(!showAllGenres)}>
            {showAllGenres ? 'hide genres' : 'show genres'}
          </div>

          {books.books.filter.length > 0 ? (
            <div onClick={clearFilter}>clear filter</div>
          ) : (
            ''
          )}
        </div>{' '}
      </div>

      {!search == '' ? (
        <div className="flex flex-col space-y-4">
          <div>search results</div>
          <div className='flex flex-col space-y-4'>
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
                      <p className="mt-4 text-gray-700">{book.description}</p>
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
        <div className="flex flex-col space-y-3">
          {filteredBooksBygenre.slice(0, pagnationCount).map((book, index) => (
            <Link
              href={`c/book/${book.id}`}
              key={index}
              className="w-full h-max p-5 bg-white text-black flex items-center justify-between rounded-md"
            >
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
            </Link>
          ))}
        </div>
      )}
      {pagnationCount !== books.length ? (
        <div
          onClick={pagnate}
          className="rounded-md p-2 bg-white text-black flex items-center justify-center"
        >
          More
        </div>
      ) : (
        ''
      )}
      <div className='h-10'></div>
            <div className="fixed bottom-0 left-0 w-full p-2 bg-white  flex justify-around border-t-[1px] border-black">
  <Link href='/dashboard'>dashboard</Link>
  <Link href='/c'>catalogue</Link>
</div>
    </div>
  );
}
