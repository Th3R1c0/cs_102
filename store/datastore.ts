import { create } from 'zustand'

const fetchData = async () => {
  try {
    const response = await fetch('https://freetestapi.com/api/v1/books');
    const data = await response.json();

    // Modify books directly to include received books
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publication_year: 1960,
    genre: ['Fiction', 'Classic'],
    description:
      'A classic novel depicting racial injustice in the American South.',
    cover_image: 'https://fakeimg.pl/667x1000/cc6600',
    duedate: "2024-05-31T02:12:27.036Z",
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    publication_year: 1949,
    genre: ['Dystopian', 'Science Fiction'],
    description: 'A dystopian novel portraying a totalitarian society.',
    cover_image: 'https://fakeimg.pl/667x1000/cc6600',
    duedate: "2023-05-31T02:12:27.036Z",
  },
]


export const useDataStore = create((set) => ({
  books: [],
  fetchbooks: async () => {
    const data = await fetchData();
    set({ books: data });
    return data;
  },
  loggedinUser: { user: '', role: '' },
  users: [{
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
        duedate: "2024-05-31T02:12:27.036Z",
      },
      {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        publication_year: 1949,
        genre: ['Dystopian', 'Science Fiction'],
        description: 'A dystopian novel portraying a totalitarian society.',
        cover_image: 'https://fakeimg.pl/667x1000/cc6600',
        duedate: "2023-05-31T02:12:27.036Z",
      },
    ],
  },
  { user: 'phillip', email: '2@gmail', password: '123', role: 'admin' },],
  loginUser: (email, password) => set((state) => {
    const user = state.users.find((user) => user.email === email && user.password === password);
    if (user) {
      return { loggedinUser: user };
    } else {
      return { loggedinUser: '' };
    }
  }),
  addBookToUser: (book) => set((state) => {
    const dueDateDays = 14; // Number of days until the book is due
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + dueDateDays);

    const bookWithDueDate = { ...book, duedate: dueDate.toISOString() };
    const updatedUsers = state.users.map((user) => {
      if (user.user === state.loggedinUser.user) {
        const updatedUser = {
          ...user,
          books: [...user.books, bookWithDueDate],
        };
        return updatedUser;
      }
      return user;
    });

    const updatedLoggedinUser = {
      ...state.loggedinUser,
      books: [...state.loggedinUser.books, bookWithDueDate],
    };


    return { users: updatedUsers, loggedinUser: updatedLoggedinUser };
  }),
  addBook: (bookDetails: any) => set(async (state: any) => {
    const data = await fetchData();
    set({ books: [bookDetails, ...data] });
    return { books: [bookDetails, ...data] }
  }), 
  deleteBook: (id: any) => set((state: any) => {
    // Filter out the book with the specified ID
    const updatedBooks = state.books.filter((book: any) => book.id !== id);
    return { books: updatedBooks };
})

}));
