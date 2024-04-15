let User:any = null; // Declaring User outside of the functions to make it persistent

export async function POST(req: Request) {
    const { user } = await req.json();
    User = user; // Update the User value
    return Response.json({ status: 'post called successfully' });
}

export async function GET() {
    return Response.json(User);
}
