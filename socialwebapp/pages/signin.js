import { getProviders, signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function SignIn({ providers, session }) {
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  });

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="grid place-items-center mt-80">
          <Image
            src="/network.png"
            height={300}
            width={300}
            objectFit="contain"
          />
          <h1
            onClick={() => signIn(provider.id)}
            className="p-5 bg-purple-500 rounded-full text-white 
      text-center mt-20 cursor-pointer"
          >
            Sign in with {provider.name}
          </h1>
        </div>
      ))}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: { providers, session },
  };
}
