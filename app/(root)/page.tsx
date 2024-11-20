'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function Home() {
  const handleCookie = (genderPreference: string) => {
    Cookies.set('genderPreference', genderPreference);
  }


  return (
    <section className="main-container !min-h-[calc(100vh-62px)]">
      <h1 className="heading
      ">AIMatch</h1>
      <h2 className="sub-heading">
        Find the love of your life with the help of AI
      </h2>

      {/* preguntarle al usuario si le gustan los hombres lo las mujeres */}
      <div className="flex justify-center gap-5 flex-col">

        <p className="sub-heading">What do you like?</p>
        <div className="flex gap-3">
          <Link
            href="/chat/men"
            onClick={() => handleCookie("men")}
          >
            <Button className="text-blue-500 text-xl bg-blue-200 rounded-full min-w-28">
              Men
            </Button>
          </Link>

          <Link
            href="/chat/woman"
            onClick={() => handleCookie("woman")}
          >
            <Button className="text-pink-500 text-xl bg-pink-200 rounded-full min-w-28">
              Woman
            </Button>
          </Link>
        </div>
      </div>

    </section>
  );
}