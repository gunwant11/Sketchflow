import prisma from "@/utils/db";


export async function POST(req: Request) {
    const { userId, teamId } = await req.json();
    try {
        const project = await prisma.project.create({
            data: {
                userId,
                title: 'New Project',
                teamId: teamId || null,
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
    const teamId = url.searchParams.get('team');
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
                teamId: teamId || undefined,
            },
            select: {
                id: true,
                title: true,
                thumbnail: true,
                updatedAt: true,
                teamId: true,
                favorite: true,
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


// update favorite status of project put request
export async function PUT(req: Request) {
    const { projectId, favorite } = await req.json();
    try {
        const project = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                favorite,
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
