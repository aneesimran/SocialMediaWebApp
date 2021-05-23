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
        <div key={provider.name} className="grid place-items-center ">
          <div className="bg-gray-100 border rounded-3xl p-10 mt-40 ml-12 mr-12 shadow-lg">
            <Image
              src="/network.png"
              height={300}
              width={300}
              objectFit="contain"
            />
            <h1
              onClick={() => signIn(provider.id)}
              className="p-5 bg-green-600 rounded-full text-white 
      text-center mt-14 cursor-pointer shadow-lg border-green-400 hover:bg-green-500"
            >
              Sign in with {provider.name}
            </h1>
          </div>
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
