"use client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home(){
  const router = useRouter();
  
  useEffect(() => {
    router.push("/welcome");
  }, [router]);

  return(
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </main>
  )
}