import Heading from "./Heading";
import Image from "next/image";
import { categories } from "../utils/constants";
import Link from "next/link";
import { formattedValue } from "../utils/constants";



const Categories = () => {
  console.log("inside catogires")
  return (
    <div className="rounded-t-[340px] bg-amber-300 pl-4 mt-10">
    <div className="py-3">
        <Heading  headingContent={"Shop by Category"}/>
        <div className="flex flex-wrap gap-4 mt-12">
            {categories.map(cat=>(
                <div key={cat.name} className="flex flex-col items-center w-58 cursor-pointer">
                <Link href={"/collection/"+formattedValue(cat.name)}>
                <Image src={cat.categoryIcon} alt="navbar-icons" width={100} height={100} className="rounded-full w-35 h-35" />
                <div className="font-semibold text-sm">{cat.name}</div>
                <div className="text-[#6e1414] text-[13px]">{cat.items} items</div>
                </Link>
                </div>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Categories