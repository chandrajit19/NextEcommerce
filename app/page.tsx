import Image from 'next/image';
import heroImage from '../public/heroimg.webp';
import pic1 from '../public/pic1.webp';
import pic2 from '../public/pic2.webp';
import pic3 from '../public/pic3.webp';
import Link from 'next/link';
const Home=()=>{
   return(<section className='min-h-full'>
           <section className="container mx-auto bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 grid grid-cols-12 gap-4 py-8 px-4 text-white">
               <div className=" text-white col-span-12 sm:col-span-6 text-center my-auto">
                   <Image
                        className='w-[30%] h-auto inline-block'
                        src={heroImage}
                        alt="Landscape picture"
                        width={2179}
                        height={2542}
                        loading='lazy'
                     />
               </div>
              <div className="text-white col-span-12 sm:col-span-6 text-center sm:text-end my-auto px-4 sm:px-6 py-8 sm:py-12">
                     <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                        Discover Premium Products at Unbeatable Prices
                     </h2>
                     <p className="text-lg mb-6">
                        Explore the latest trends and must-haves in fashion, beauty, and lifestyle.
                     </p>
                     <Link 
                        href="/products" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md animate-pulse"
                     >
                        Explore Products
                     </Link>
                     </div>
            </section>
                  <section className="container mx-auto py-8 px-4">
                  <div className=" mb-8">
                     <h2 className="text-2xl font-bold">Customer Testimonials</h2>
                     <p className="text-lg leading-relaxed max-w-2xl ">Real customers, real feedback — we pride ourselves on fast delivery and top-notch product quality.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <article className="bg-white/5 p-6 rounded-lg shadow-sm overflow-hidden">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 float-right ml-4 rounded-full overflow-hidden">
                           <Image
                              src={pic1}                
                              alt="John D. avatar"
                              width={2179}              
                              height={2542}             
                              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                              className="object-cover w-full h-full"
                              loading="lazy"
                           />
                        </div>

                           <h3 className="text-xl font-bold mb-2">John D.</h3>
                           <p className="text-lg leading-relaxed">
                              I had a fantastic shopping experience! The product quality is top-notch and the delivery was super fast.
                           </p>
                     </article> 
                       
                        <article className="bg-white/5 p-6 rounded-lg shadow-sm overflow-hidden">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 float-right ml-4 rounded-full overflow-hidden">
                           <Image
                              src={pic2}                
                              alt="John D. avatar"
                              width={2179}              
                              height={2542}             
                              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                              className="object-cover w-full h-full"
                              loading="lazy"
                           />
                        </div>

                           <h3 className="text-xl font-bold mb-2">Jane S.</h3>
                           <p className="text-lg leading-relaxed">
                              Great selection of items at unbeatable prices. I will definitely be back for more!
                           </p>
                     </article> 

                        <article className="bg-white/5 p-6 rounded-lg shadow-sm overflow-hidden">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 float-right ml-4 rounded-full overflow-hidden">
                           <Image
                              src={pic3}                
                              alt="John D. avatar"
                              width={2179}              
                              height={2542}             
                              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                              className="object-cover w-full h-full"
                              loading="lazy"
                           />
                        </div>

                           <h3 className="text-xl font-bold mb-2">Alex P.</h3>
                           <p className="text-lg leading-relaxed">
                              Amazing customer support and fast delivery. Highly recommended!
                           </p>
                     </article>  
                            <article className="bg-white/5 p-6 rounded-lg shadow-sm overflow-hidden">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 float-right ml-4 rounded-full overflow-hidden">
                           <Image
                              src={pic2}                
                              alt="John D. avatar"
                              width={2179}              
                              height={2542}             
                              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                              className="object-cover w-full h-full"
                              loading="lazy"
                           />
                        </div>

                           <h3 className="text-xl font-bold mb-2">Tene P.</h3>
                           <p className="text-lg leading-relaxed">
                              Great choise of items at unbelivele prices. I is one of my best platform!
                           </p>
                     </article>  
                  </div>
        </section>

   </section>)
}
export default Home; 