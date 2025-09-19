
import { getAPIData } from "@/app/serverFunction"
import ProductsClient from "./serverPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Page",
  description: "This is ecommerce website with nextJs",
};  
  

export default async function Page() {  
  const data = await getAPIData();  
  return (
    <ProductsClient list={data} />
  )
}