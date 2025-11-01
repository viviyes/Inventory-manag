"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/app/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  const buildImageSrc = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    // 如果已经是完整的 URL（以 http:// 或 https:// 开头），直接返回
    if (/^https?:\/\//i.test(imageUrl)) {
      return imageUrl;
    }
    // 否则拼接 API 基础 URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const normalizedBase = baseUrl.replace(/\/$/, "");
    const normalizedPath = imageUrl.replace(/^\//, "");
    return `${normalizedBase}/${normalizedPath}`;
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <style>{`
        .custom-products-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        
        @media (min-width: 875px) and (max-width: 1350px) {
          .custom-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1351px) and (max-width: 1450px) {
          .custom-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1451px) {
          .custom-products-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      <div className="custom-products-grid gap-4 md:gap-6 lg:gap-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-3 md:p-4 hover:shadow-lg transition-shadow w-full gap-3 dark:bg-gray-100"
            >
              {/* 响应式布局：小屏幕竖向，大屏幕横向 */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center ">
                {/* 左侧部分：图片、标题和价格 */}
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg shadow-sm border border-gray-100 dark:border-gray-200 flex items-center justify-center p-1 flex-shrink-0"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    {product.imageUrl && buildImageSrc(product.imageUrl) ? (
                      <Image
                        src={buildImageSrc(product.imageUrl) || ""}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs md:text-sm">
                        No Image
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3
                      className="text-sm md:text-lg text-gray-900 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* 右侧部分：库存和评分 */}
                <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 text-right flex-shrink-0">
                  <div className="text-sm md:text-base text-gray-600 whitespace-nowrap">
                    Stock: {product.stockQuantity}
                  </div>
                  {product.rating && (
                    <div className="flex items-center">
                      <Rating rating={product.rating} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
