import Image from "next/image";
import { RecipeGenerator } from "./component/RecipeGenerator";

export default function Home() {
  return (
   <div>
    <h1 className="bg-green-400 text-white tex-3xl font-bold">Recipe Generator </h1>

    <RecipeGenerator />
   </div>
  );
}
