import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
    const { status } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        } else {
            router.push("/api/auth/signin")
        }
    }, [status, router])
    return <>
    </>
}
