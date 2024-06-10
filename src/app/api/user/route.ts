import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/utils/db";

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