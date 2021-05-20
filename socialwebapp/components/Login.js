import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="grid place-items-center mt-60">
      <Image src="/network.png" height={300} width={300} objectFit="contain" />
      <h1
        onClick={signIn}
        className="p-5 bg-purple-500 rounded-full text-white 
      text-center mt-10 cursor-pointer"
      >
        Login with Google
      </h1>
    </div>
  );
}

export default Login;
