import prisma from "@/utils/db";

export async function POST(req: Request) {
    const { teamName, teamImage, userId } = await req.json();
    try {
        const team = await prisma.team.create({
            data: {
                name: teamName,
                creatorId: userId,
                image: teamImage,
                members: {
                    connect: { id: userId },
                },
            },
        });
        return Response.json({
            team,
        });
    } catch (error) {
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
        const teams = await prisma.team.findMany({
            where: {
                members: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        return Response.json({
            teams,
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            error,
        });
    }
}


export async function DELETE(req: Request) {
    const { teamId } = await req.json();
    try {
        const team = await prisma.team.delete({
            where: {
                id: teamId,
            },
        });
        return Response.json({
            teamId,
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            error,
        });
    }
}

