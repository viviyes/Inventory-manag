import React from "react";
import { useGetDashboardMetricsQuery } from "../state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "../(components)/Rating";
import Image from "next/image";

const CardPopularProducts = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    error,
  } = useGetDashboardMetricsQuery();

  const buildImageSrc = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    if (/^https?:\/\//i.test(imageUrl)) {
      return imageUrl;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (!baseUrl) {
      return imageUrl;
    }
    const normalizedBase = baseUrl.replace(/\/$/, "");
    const normalizedPath = imageUrl.replace(/^\//, "");
    return `${normalizedBase}/${normalizedPath}`;
  };

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full custom-scrollbar">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm border border-gray-100 dark:border-gray-200 flex items-center justify-center p-1" style={{ backgroundColor: '#ffffff' }}>
                    {product.imageUrl ? (
                      <Image
                        src={buildImageSrc(product.imageUrl) || ""}
                        alt={product.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">img</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0}/>
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                        <ShoppingBag className="w-4 h-4"/>
                    </button>
                    {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
