'use client'
import { use, useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { addToCart } from "@/app/lib/cart";
import { useUser } from "@clerk/nextjs";
import { insertData, readData, updateData } from "@/app/serverFunction";
import Swal from "sweetalert2";
import { Product } from "../serverPage";

const ProductDetails = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const {  user } = useUser();
  const dispatch = useDispatch();
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const [pending, setPending] = useState(true);
  const AddedList = useSelector((obj:RootState) => obj.abc); // getting current cart from Redux

  useEffect(() => {
    const getData = async () => {
      try {
        const URL = "https://apiofmine.netlify.app/api/users";
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProducts(data);
        setPending(false)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getData();
  }, []);

  // filter the product based on id
  const product = products.filter((obj) => obj.id === Number(id));
  const [stock] = product.map((obj) => obj.stock);

  // handle quantity change (+ / -)
  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    if (button.textContent === "+") {
      if (quantity < (stock ?? Infinity)) {
        setQuantity((prev) => prev + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  // Insert / update in DB using my serverFunction helpers.
  // This version **adds** the delta to existing quantity when row exists.
  const insertIntoDataBase = async (id: number, email: string, quantity: number) => {
    try {
      const res = await readData(email); 

      if (res && res.length > 0) {
        const existing = res.find((obj) => Number(obj.id) === Number(id));
        if (existing) {
          const newQuantity = Number(quantity);
          await updateData(id, email, newQuantity);
          // return canonical quantity
          return newQuantity;
        } else {
          await insertData(id, email, quantity);
          return quantity;
        }
      } else {
        await insertData(id, email, quantity);
        return quantity;
      }
    } catch (err) {
      console.error('insertIntoDataBase error:', err);
      throw err;
    }
  };


  const handleAddToCart = async (productId: number) => {
    if (!email) {
      // please sign in add to cart
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "warning",
            title: "Please sign in to add to cart"
          });
          return;
        }

    // Check if item already exists in Redux cart (for current user)
    const existingItem = AddedList.find(i => i.id === productId && i.email === email);
    const isUpdate = !!existingItem; // True if exists (update), false if new (add)

    try {
      // 1) Optimistic Redux update for instant UI
      dispatch(addToCart({ id: productId, quantity, email }));
      // 2) Persist to DB 
      insertIntoDataBase(productId, email, quantity);
       const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          if (isUpdate) {
              Toast.fire({
              icon: "success",
              title: "Item updated"
          });
          } else {
              Toast.fire({
              icon: "success",
              title: "Item added"
          });
          }

    } catch (err) {
      console.error("Add to cart failed:", err);

      alert("Unable to add to cart. Please try again.");
    } 
  };

  return (
    <>  

        {
          pending?(<p className="animate-pulse font-semibold text-center min-h-[90vh] my-[30vh]">loading...</p> ):( 
              <>
                 {product.map((obj) => (
        <article key={obj.id} className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
          <div className="container mx-auto">
            <nav className="text-sm text-slate-600 mb-4">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li><Link href="/products" className="hover:underline">Products</Link></li>
                <li>/</li>
                <li className="text-slate-700">{obj.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-[60vw] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-100">
                  <Image
                    src={obj.image?.startsWith('/') ? obj.image : `/images/${obj.image}`}
                    alt={obj.brand || obj.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <header>
                  <h1 className="text-2xl md:text-3xl font-bold">{obj.name}</h1>
                  <p className="text-sm text-slate-500 mt-1">{obj.brand} · {obj.category}</p>
                </header>

                <section className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <div className="text-3xl font-extrabold">₹{obj.price}</div>
                      <div className="text-sm text-slate-500">Inclusive of all taxes</div>
                    </div>

                    <div className="text-sm text-slate-600">
                      {obj.stock > 0 ? (
                        <span className="text-green-600 font-medium">{obj.stock} in stock</span>
                      ) : (
                        <span className="text-red-600 font-medium">Out of stock</span>
                      )}
                    </div>
                  </div>
                </section>

                <section className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Product description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{obj.description}</p>
                </section>

                <section className="bg-white p-4 rounded-lg shadow-sm flex flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600">Qty</label>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button type="button" aria-label="Decrease" className="px-3 py-2 text-lg bg-slate-100 hover:bg-slate-200" onClick={handleChange}>−</button>
                      <div className="px-4 py-2 min-w-[48px] text-center">{quantity}</div>
                      <button type="button" aria-label="Increase" className="px-3 py-2 text-lg bg-slate-100 hover:bg-slate-200" onClick={handleChange}>+</button>
                    </div>
                  </div>

                  <div className="flex gap-3 ml-auto">
                    <button
                      type="button"
                   
                      className="px-3 py-2 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 active:scale-[.898] disabled:opacity-60"
                      onClick={() => handleAddToCart(obj.id)}
                    >
                     Add to Cart
                    </button>
                  </div>
                </section>

                <div className="text-sm text-slate-500">
                  <div>Free returns within 30 days • <span className="font-medium text-slate-700">Secure checkout</span></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
       
              </>
            
          )
        }
      
   
    </>
  );
};

export default ProductDetails;