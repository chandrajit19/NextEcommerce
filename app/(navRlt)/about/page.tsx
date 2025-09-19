import { SignUpButton } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About Shop",
  description: "This is ecommerce website with nextJs",
};  
  

export default function About() {
 

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">

      <section className="container mx-auto grid grid-cols-12 gap-4 py-12 px-4">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed mb-4 max-w-prose">
            Welcome to our online store. Founded in 2023, we are built around a simple idea: quality
            products should be easy to find and pleasant to buy. We focus on curating items that
            deliver value, durability, and style — backed by fast delivery and friendly support.
          </p>

          <p className="text-base leading-relaxed mb-6 max-w-prose">
            Our team blends retail experience with modern e‑commerce practices so you get the best
            of both worlds: carefully selected inventory, transparent pricing and a checkout that
            just works. We believe shopping should be effortless, trustworthy, and a little bit
            enjoyable — every single time.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-md shadow-md text-sm font-medium"
            >
              Contact us
            </Link>

            <Link
              href="/products"
              className="inline-block border border-teal-600 text-teal-600 px-5 py-3 rounded-md text-sm font-medium hover:bg-teal-50"
            >
              Browse products
            </Link>
          </div>
        </div>

        {/* Side column */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-5 mt-6 md:mt-0">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
            <p className="text-sm leading-relaxed mb-4">
              To make quality shopping accessible and reliable — with a human touch at every step.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-500">Founded</div>
                <div className="font-bold">2023</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Fast Delivery</div>
                <div className="font-bold">48‑72 hrs</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Satisfaction</div>
                <div className="font-bold">30-day returns</div>
              </div>

              <div>
                <div className="text-sm text-slate-500">Support</div>
                <div className="font-bold">Live chat</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <p className="mb-2">
              We care about sustainability. Where possible we choose suppliers who minimize packaging and use responsible materials.
            </p>
            <p>
              If you&apos;d like to learn more about our sourcing or CSR policies, please get in touch.
            </p>
          </div>
        </aside>
      </section>

 
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">Curated Selection</h4>
            <p className="text-sm text-slate-600">Every product is selected based on quality and value.</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">Trusted Suppliers</h4>
            <p className="text-sm text-slate-600">We work with partners that meet our standards for sustainability and fairness.</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">Customer First</h4>
            <p className="text-sm text-slate-600">Fast support, easy returns and clear communication — that&apos;s our promise.</p>
          </div>
        </div>
      </section>


      <section className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Join our community</h3>
          <p className="mb-4  text-center">Sign up for product drops, deals and early-access events.</p>
          <SignUpButton mode="modal"  >
            <button type='button' className="inline-block bg-white text-slate-900 px-5 py-3 rounded-md font-medium cursor-pointer">
              Create an account
            </button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
