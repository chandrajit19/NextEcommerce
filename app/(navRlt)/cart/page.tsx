"use client";

import { useEffect, useState } from "react";
import { deleteData, getDataFromAPI, readData } from "@/app/serverFunction";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { setCartItems, removeFromCart } from "@/app/lib/cart";
import Swal from "sweetalert2";
 
const Cart = () => {
  const { isSignedIn, user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress || "";
  type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    brand: string;
    category: string;
  };
  
  type CartItem = {
    id: number;
    quantity: number;
   
  };
  
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const AddedList = useSelector((obj: RootState) => obj.abc) as CartItem[];
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true); 

  useEffect(() => {
    const apiCall = async () => {
      setPending(true); // Seting loading when starting fetch
      const arr = await getDataFromAPI();
      setProducts(arr);
      const dbData = await readData(email);
      dispatch(setCartItems(dbData));
      console.log("dbdata", dbData);
      setPending(false); // Stop loading when data is ready
    };
    apiCall();
  }, [dispatch, email]);

  // Merging  them
  const fliteredArr = AddedList
    .filter((p) => products.some((u) => u.id === p.id)) // Keep only matched ids
    .map((p) => {
      const match = products.find((u) => u.id === p.id);
      return {
        ...p,
        name: match?.name,
        image: match?.image,
        price: match?.price,
        brand: match?.brand,
        category: match?.category,
      };
    });

  const handleDelete = async (id: number, email: string) => {
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
    Toast.fire({
      icon: "success",
      title: "Item deleted"
    });
    dispatch(removeFromCart({ id, email }));
    await deleteData(id, email);
    setCount(count + 1);
  };

  // Finding total price
  const subTotal = fliteredArr.reduce((acc, item) => {
    return acc + (item.price ?? 0) * item.quantity;
  }, 0);
  let total;
  let shipping: number | string;
  if (subTotal >= 3000) {
    shipping = "Free";
    total = subTotal;
  } else {
    shipping = "₹99";
    total = subTotal + 99;
  }

  return (
    <main className="container mx-auto min-h-[85vh] px-4 py-8 my-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {pending && isSignedIn && (
        <div className="mb-6   p-3 text-sm animate-pulse text-gray-800 text-center">
          Loading your cart...
        </div>
      )}

      {!isSignedIn && (
        <div className="mb-6 mt-[20%]  font-semibold  p-3 text-sm text-yellow-800 text-center">
          Sign in to show your products here...
        </div>
      )}

      {isSignedIn && !pending && fliteredArr.length === 0 && (
        <div className="mb-6  animate-pulse p-3 text-sm text-gray-600 text-center">
          Your cart is empty.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: cart list */}
        <section className="lg:col-span-8">
          {!pending && fliteredArr.length > 0 && (
            <ul className="space-y-4">
              {fliteredArr.map((item) => (
                <li
                  key={item.id}
                  className="bg-white p-4 rounded shadow-sm flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="w-full sm:w-28 h-28 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name ?? "Product image"}
                        width={150}
                        height={150}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  {/* info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{item.brand} • {item.category}</p>
                      </div>

                      <div className="text-right">
                        <div className="font-bold">₹{item.price}</div>
                        <div className="text-sm text-slate-500">each</div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* quantity controls (layout-only) */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">Quantity</span>
                        <span>{item.quantity}</span>
                      </div>

                      {/* actions */}
                      <div className="flex items-center gap-3">
                        <button
                          className="px-3 py-2 border rounded-md text-sm text-red-600 hover:bg-amber-50 active:scale-[.899]"
                          onClick={() => handleDelete(item.id, email)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Right: summary */}
        <aside className="lg:col-span-4">
          {!pending && fliteredArr.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold mb-3">Order summary</h2>
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mb-4">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 text-lg mb-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button type="button"
                className="w-full px-4 py-3 bg-[#191137] text-white rounded-md font-medium hover:bg-[#0f0b2a]"
              >
                Checkout
              </button>

              <Link
                className="w-full inline-block text-center mt-3 px-4 py-2 border rounded-md text-sm"
                href={"/products"}
              >
                Continue shopping
              </Link>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default Cart;