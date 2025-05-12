import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
     <h2 className="text-2xl font-semibold text-center text-white-700 mt-10">
      Welcome to the AI Learning Platform
      </h2>
      <Button variant="outline">Start Learning</Button>

    </div>
  );
}
