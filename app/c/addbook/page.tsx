'use client';

import { use, useState } from 'react';
import { useDataStore } from "@/store/datastore";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AddBook = () => {
    const user = useDataStore((state) => state.loggedinUser);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [publication_year, setPublication_year] = useState('')
    const addBook = useDataStore((state) => state.addBook)
    const router = useRouter()


    const handleFormSubmit = (event:any ) => {
        event.preventDefault();
        //split the genres into a array to that ui can map over it 
        const genresArray = genre.split(',');
        // add book to the catalogue
        const _addbook = async () => {
            addBook({ title, author, genre: genresArray, description, publication_year });
        }
        _addbook()
        //redirect to catalogue (c)
        router.push('/c')
    };

    return (
        <div className="bg-blue-200 text-black h-screen w-full flex flex-col p-4 space-y-8">
            <div className="w-full h-max flex justify-between">
                <div>Welcome {user.user}</div>
                <div>menu</div>{' '}
            </div>

            <div className="flex w-full h-max items-center space-x-4">
                <div className="text-3xl">Add new book</div>
                <div className="w-full flex-1 h-[2px] bg-black"></div>
            </div>

            <form onSubmit={handleFormSubmit} className='flex flex-col space-y-4 text-2xl'>
                <div className="flex flex-col">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="p-2 rounded-md text-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        className="p-2 rounded-md text-black"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="author">Publication Year:</label>
                    <input
                        type="text"
                        id="author"
                        className="p-2 rounded-md text-black"
                        value={publication_year}
                        onChange={(e) => setPublication_year(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        className="p-2 rounded-md text-black"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className="p-2 rounded-md text-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl " type="submit">Submit</button>
            </form>
            <div className="fixed bottom-0 left-0 w-full p-2 bg-white  flex justify-around border-t-[1px] border-black">
        <Link href='/dashboard'>dashboard</Link>
        <Link href='/c'>catalogue</Link>
      </div>
        </div>
    );
};

export default AddBook;
