"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <h1></h1>
        <button className="btn btn-neutral" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <button className="btn btn-primary" onClick={() => signIn()}>
        Sign in
      </button>
    );
  }
};

export default AuthButton;
