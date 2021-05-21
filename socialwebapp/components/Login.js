import React from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Login() {
  const router = useRouter();
  useEffect(() => {
    router.push("/signin");
  });
  return <div></div>;
}

export default Login;
