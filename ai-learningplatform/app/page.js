import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
     <h2>
      Welcome to the AI Learning Platform
      </h2>
      <Button variant="outline">Start Learning</Button>


    <UserButton/>
    </div>
  );
}
