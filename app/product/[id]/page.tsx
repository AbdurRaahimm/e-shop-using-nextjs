import type { Metadata } from "next";
import { productsApi } from "@/lib/api/productsApi"; // Import the productsApi
import type { Product } from "@/lib/types";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return (
    products?.map((product: Product) => ({
      id: product.id.toString(),
    })) || []
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - E-Shop",
    };
  }

  return {
    title: `${product.title} - E-Shop`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductPageClient id={id} />;
}

// Fetch products using the productsApi directly
const getProducts = async () => {
  const response = await productsApi.endpoints.getProducts.initiate();
  const { data: products } = response;
  return products;
};

// Fetch a single product using the productsApi directly
const getProduct = async (id: string) => {
    try {
      const response = await productsApi.endpoints.getProduct.initiate(Number(id));
      
      // Check if the response has an error
      if (response.error) {
        console.error("Error fetching product:", response.error);
        return null; // Handle the error as needed
      }
  
      // Access the data property safely
      const product = response.data as Product; // Cast to Product type
      console.log("Product Data:", product); // Log the product data
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null; // Handle the error as needed
    }
  };
  
 