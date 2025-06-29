
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import DashboardHeader from "./dashboard/_components/DashboardHeader";

export default function Home() {
  return (
    <div>
    
      <DashboardHeader />

      <section className="z-50 pt-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
     

          <Image
            src={"/knowledge.png"}
            alt="image"
            width={80}
            height={80}
            className="absolute -rotate-12"
          />
          <Image
            src={"/code.png"}
            alt="image"
            width={80}
            height={80}
            className="absolute rotate-12 right-36"
          />

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
            Generate Exam Study Materials{" "}
            <span className="text-primary">with the Power</span>
            <br />
            of AI
          </h1>

          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            AI Assistant for Exams – Quick and Easy Access to Personalized Study
            Notes
          </p>

        
          <div className="flex justify-center">
            <a
              href="/dashboard"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
             START LEARNING
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>

       
        </div>
      </section>

  
     
    </div>
  );
}