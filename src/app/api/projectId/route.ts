import prisma from "@/utils/db";

export async function POST(req: Request) {
    const { projectId } = await req.json();
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
            select: {
                id: true,
                title: true,
                layers: true,
            },
        });
        return Response.json({
            project,
        })
    }
    catch (error) {
        return Response.json({
            error,
        })
    }
}

export async function PUT(req: Request) {
    const { projectId, layers, title, thumbnail } = await req.json();

    try {


        // update project   
        await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                title,
                thumbnail,
            },
        });

        //  delete all layers
        await prisma.layer.deleteMany({
            where: {
                projectId,
            },
        });


        await prisma.layer.createMany({
            data: layers.map((layer, index) => ({
                ...layer,
                projectId,
            })),
        });


        return Response.json({
            projectId,
        });

    }
    catch (error) {
        console.log(error);
        return Response.json({
            error,
        })
    }
}

