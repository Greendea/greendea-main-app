import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({ providers }) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div className="wrapperLogin" key={provider.name}>
                    <div className="login">
                        <form>
                            <img src="https://res.cloudinary.com/dyajk5rfe/image/upload/v1677771930/logo_im5hov.png" />
                            <a href="">
                                <img src="https://res.cloudinary.com/dyajk5rfe/image/upload/v1677771929/google_guijhs.avif" />
                                <div onClick={() => signIn(provider.id)}>Log in with Google</div>
                            </a>
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