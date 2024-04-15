export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY!,
    //   },
    // })
    // const product = await res.json()
   const data =    [{
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
  { user: 'phillip', email: '2@gmail', password: '123', role: 'admin' },]
    return Response.json(data)
  }

  export async function POST(req: Request) {
    const { members } = await req.json()
    const Members = members
    return Response.json({status: 'success', Members})
  }