
   "use server";
   import { Resend } from "resend"

   export const sendEmail=async(email:string, name:string)=>{
      const mess="Thanks for contacting us!"
                     const resend=new  Resend('re_PhDSxfXa_KY8Wm42S6jU8RBKqL7jed2mu')
                    await resend.emails.send({
                        from: 'support team <onboarding@ninjatech.space>',
                        to: email,
                        subject: 'Contact Form Submission',
                        html: `<strong>Hi ${name}, </strong>`+mess,
                     });
   }
    

   export const saveData = async (fd: FormData) => {
   const name = String(fd.get("name") ?? "");
   const email = String(fd.get("email") ?? "");
   const message=String(fd.get("message") ?? "");
   const subject=String(fd.get("subject") ?? "");
   const rs=fd.get("g-recaptcha-response") as string;

   const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
   method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ secret: "6LeMj8wrAAAAAEiDMTzZugNpUUkzxg9bm4jpDMvL", response:rs }),
 
      });

      const res=await response.json()
       
      if(res.success){
          console.log("database logic goes here")
          console.log("Name", name);
          console.log("Email", email);
          console.log("message", message);
          console.log("subject", subject)
       sendEmail(email, name)

      }
      else{
          console.log("do not be oversmart")
      }
   };
    
