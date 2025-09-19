   "use server"
   import sql from "./db"

// fetching data from my API
     export   const getAPIData = async () => {
         try {
         const URL = "https://apiofmine.netlify.app/api/users";
         const res = await fetch(URL);
         if (!res.ok) throw new Error("Failed to fetch data");
         const data = await res.json();
         return data;
         } catch (err) {
         console.error("Error fetching data:", err);
         }
      };


   export const insertData=async (id:number, email:string, quantity:number)=>{
         await sql `insert into products(id, email, quantity) values(${id}, ${email}, ${quantity})`;
   }

    export const readData=async (email:string)=>{
      const data=await sql `select * from products where email=${email}`;
         return data;
   }


export const updateData = async (id: number, email: string, quantity: number) => {
  await sql`
    UPDATE products 
    SET quantity = ${quantity} 
    WHERE id = ${id} AND email = ${email}
  `;
};

   export const deleteData=async(id:number, email:string)=>{
     await sql ` delete from products where id=${id} and email=${email};`
   }




       
   export  const getDataFromAPI = async () => {
              try {
                const URL = "https://apiofmine.netlify.app/api/users";
                const res = await fetch(URL);
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                return data
              } catch (err) {
                console.error("Error fetching data:", err);
              }     
    };


  