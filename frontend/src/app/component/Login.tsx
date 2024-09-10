'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"

const handleSignIn = async () => {
  try {
    // console.log('Sign-in successful');
    await signIn('google');
    
    // Handle successful sign-in
  } catch (error) {
    // Handle sign-in error
    console.error('Error during sign-in:', error);
  }
};

const Login = () => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center
    justify-center text-center">
        <Image

        src="https://links.papareact.com/2i6"
        // src="https://unsplash.com/photos/three-crumpled-yellow-papers-on-green-surface-surrounded-by-yellow-lined-papers-V5vqWC9gyEU"
        width={300}
        height={300}
        alt ="logo"        
        />
        <button className="text-white font-bold text-3xl animate-pulse"
        onClick={()=> signIn()}>
            Sign In to use Chat NestAI</button>

        
    </div>
  )
}

export default Login