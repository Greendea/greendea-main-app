import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

export default function SignIn({ providers }) {
    return (
        <>
            <Head>
                <title>GreenDea - SIGNIN</title>
            </Head>
            {Object.values(providers).map((provider) => (
                <div className="wrapperLogin" key={provider.name}>
                    <div className="login">
                        <form>
                            <img src="/logo.png" />
                            <div className="button_wrapper">
                                <img src="/google.avif" />
                                <div onClick={() => signIn(provider.id)}>Log in with Google</div>
                            </div>
                        </form>
                    </div>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}