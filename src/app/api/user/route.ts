import { getServerSession } from "next-auth";
import prisma from "@/utils/db";
import { authOptions } from "@/utils/auth";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({
            session: null,
            message: "No session",
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    return Response.json({
        user,
    })
}