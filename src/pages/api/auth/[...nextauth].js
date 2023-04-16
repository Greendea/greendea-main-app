import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })
                return user
            },
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
    },
}

export default NextAuth(authOptions)