import prisma from "@/utils/db";


export async function POST(req: Request) {
    const { userId } = await req.json();
    try {
        const project = await prisma.project.create({
            data: {
                userId,
                title: 'New Project',
                layers: {
                    create: [
                        {
                            name: 'Background',
                            visible: true,
                            sortOrder: 0,
                            object: {
                                type: 'background',
                                color: '#ffffff',
                            },

                        },
                    ],
                },


            },
        });
        return Response.json({
            project,
        });
    }
    catch (error) {
        console.log(error);
        return Response.json({
            error,
        });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
        return Response.json({
            error: 'userId is required',
        });
    }
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                title: true,
                thumbnail: true,
                updatedAt: true,
            },

        });
        return Response.json({
            projects,
        });
    }
    catch (error) {
        return Response.json({
            error,
        });
    }
}

