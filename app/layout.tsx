'use client';

import './globals.css';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { createContext, useState } from 'react';
export const DataContext = createContext(null);
export default function RootLayout({ children }) {
  const [members, setMembers] = useState([
    {
      user: 'mike',
      email: '1@gmail',
      password: '123',
      role: 'member',
      books: [
        {
          id: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          publication_year: 1960,
          genre: ['Fiction', 'Classic'],
          description:
            'A classic novel depicting racial injustice in the American South.',
          cover_image: 'https://fakeimg.pl/667x1000/cc6600',
          duedate: 0,
        },
        {
          id: 2,
          title: '1984',
          author: 'George Orwell',
          publication_year: 1949,
          genre: ['Dystopian', 'Science Fiction'],
          description: 'A dystopian novel portraying a totalitarian society.',
          cover_image: 'https://fakeimg.pl/667x1000/cc6600',
          duedate: 1,
        },
      ],
    },
    { user: 'phillip', email: '2@gmail', password: '123', role: 'admin' },
  ]);
  const [user, setUser] = useState(false);
  // Improved context definition with default values
  const login = (email: string) => {
    const _user = members.find((m) => m.email === email);
    console.log('searching is ', email, ' the same as ', members[0].email);
    setUser(_user);
  };

  return (
    <html lang="en">
      <body>
        <DataContext.Provider value={{ members, setMembers, login, user }}>
          {children}
        </DataContext.Provider>
      </body>
    </html>
  );
}
