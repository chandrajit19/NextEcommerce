import Script from "next/script";
import { saveData } from "./contactServer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact to Shop",
  description: "This is ecommerce website with nextJs",
};  
  
const ContactPage=()=>{


  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-base text-slate-600 mt-2">Have a question, feedback or want to partner? Send us a message — we reply quickly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
          <div className="bg-white rounded-lg p-6 shadow-sm">

          <Script src="https://www.google.com/recaptcha/api.js" async defer></Script>
            <h2 className="text-xl font-semibold mb-4">Send a message</h2>

            <form id="contact-form" name="contact-form" className="space-y-4" action={saveData}  >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                <input id="name" name="name" required pattern="[a-z]{2,10}"  className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <input id="email" name="email" type="email" required pattern="[a-z._0-9]+@[a-z]+\.[a-z]{2,4}"  className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="you@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject (optional)</label>
                <input id="subject" name="subject" className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Order inquiry, partnership, feedback..." />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Write your message here..." />
              </div>
                     <div className="g-recaptcha" data-sitekey="6LeMj8wrAAAAAD_R_Ohp0IIZqQie0klGXtPIre8d"></div>
              <div className="flex items-center gap-3">
                <button type="submit"  className="inline-flex items-center cursor-pointer justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                  Send message
                </button>

                <button type="reset" className="inline-flex items-center cursor-pointer justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Reset
                </button>
              </div>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              <div><strong>Phone:</strong> +91 98765 43210</div>
              <div><strong>Email:</strong> support@example.com</div>
              <div><strong>Hours:</strong> Mon–Sat, 9am–6pm</div>
            </div>
          </div>

          {/* Right: map / location */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Our location</h2>
            <p className="text-sm text-slate-600 mb-4">Find us or embed your location map here. Replace the src with your Google Maps embed URL.</p>

            <div className="w-full h-72 rounded-md overflow-hidden">
              <iframe
                title="company-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14020.94159994851!2d77.1905863!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03f9f1b5b8b7%3A0x1b7e6eaf9f7d5a7f!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1623245678901"
                width="100%"
                height="100%"
                className="border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-4 text-sm text-slate-600">
              <div><strong>Address:</strong> 123, Market Street, New Delhi, India</div>
              <div><strong>Parking:</strong> Street parking available</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default ContactPage;