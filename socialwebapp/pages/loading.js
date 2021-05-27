import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/client";
import { Wave } from "better-react-spinkit";

export default function Loading({ providers, session }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (session) {
        router.push("/");
      } else {
        router.push("signin");
      }
    }, 3000);
  });

  return (
    <div className="grid place-items-center">
      <div className="bg-gray-100 border rounded-3xl p-10 mt-40 ml-12 mr-12 shadow-lg">
        <Image
          src="/network.png"
          height={300}
          width={300}
          objectFit="contain"
        />
        <div className="grid place-items-center mt-8">
          <Wave color="#8051f1" size={60} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
