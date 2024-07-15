import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/utils/db";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "",
    session: {
        strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true,
    },

    events: {
        async createUser({ user }) {
            // Create a default team for the new user
            await prisma.team.create({
                data: {
                    name: 'My Team',
                    creatorId: user.id,
                    members: {
                        connect: { id: user.id },
                    },
                },
            });
        },
    },

    callbacks: {
        async jwt({ token, user }) {
            console.log('jwt', user, token);
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('session', token);
            session.user = token;
            return session;
        },
    },
}
