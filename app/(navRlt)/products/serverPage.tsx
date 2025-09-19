
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export interface Product {
   id: number;
   name: string;
   description: string;
   price: number;
   category: string;
   image: string;
   brand: string;
   stock: number;
}

const ProductsClient = ({ list }: { list: Product[] }) => {
    const [allProducts] = useState<Product[]>(list || []); // Original list
    const [products, setProducts] = useState<Product[]>(list || []); // Filtered list
    const [minPrice, setMinPrice] = useState<number | ''>(''); // Min price input
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 9; // 9 items per page

    // Filter when minPrice changes
    useEffect(() => {
        let filtered = allProducts;
        if (minPrice !== '') {
            const min = Number(minPrice);
            filtered = filtered.filter(product => product.price >= min);
        }
        setProducts(filtered);
        setCurrentPage(1); // Reset to page 1 after filter
    }, [minPrice, allProducts]);

    // Clear filter
    const clearFilters = () => {
        setMinPrice('');
        setProducts(allProducts);
        setCurrentPage(1); // Reset to page 1
    };

    // Calculate total pages based on filtered products
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get products for current page
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page changes
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
          <section className="bg-white border-b">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
                  <p className="text-sm text-slate-600 mt-1">Browse our curated selection — quality products, fair prices.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main content: sidebar filters + product grid */}
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar (filters) */}
              <aside className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-white rounded-lg p-4 shadow-sm sticky top-24">
                  <h3 className="font-semibold mb-3">Filters</h3>

                  <div className="mb-4">
                    <div className="text-sm text-slate-600 mb-2">Min Price</div>
                    <div className="flex items-center gap-2">
                      <input 
                        placeholder="Min" 
                        className="w-1/2 rounded-md border border-slate-200 px-2 py-1 text-sm" 
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                      />
                    </div>
                  </div>

                  <button type='button'
                    className="w-full bg-slate-100 text-slate-700 py-2 rounded-md text-sm"
                    onClick={clearFilters}
                  >Clear filters</button>
                </div>
              </aside>

              {/* Products grid */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  
              {

                 paginatedProducts.map((obj, i)=>{
                   return(
                   
                     <article key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="relative w-full h-48 bg-gray-100">
                    
                        <Image src={obj.image} alt="product" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>

                      <div className="p-3">
                        <h4 className="font-semibold text-sm">{obj.category}</h4>
                        <p className="text-sm text-slate-500 mt-1">{obj.description}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="font-bold">{obj.price}</div>
                          <Link href={`/products/${obj.id}`} className="text-sm text-teal-600">View</Link>
                        </div>
                      </div>
                    </article>
                   
                )
                 })
                   
       }
                </div>

                {/* Pagination / load more */}
                <div className="mt-6 flex items-center justify-center">
                  <button 
                    type="button" 
                    className="px-4 py-2 border rounded-md text-sm bg-white disabled:opacity-50" 
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <div className="px-4 text-sm">Page {currentPage} of {totalPages}</div>
                  <button 
                    type="button" 
                    className="px-4 py-2 border rounded-md text-sm bg-white disabled:opacity-50" 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>
      );
}

export default ProductsClient;