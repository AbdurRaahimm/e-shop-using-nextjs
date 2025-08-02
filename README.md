# E-Shop (Next.js)

This is a modern e-commerce storefront built with Next.js, TypeScript, and Tailwind CSS. It demonstrates best practices for building a fast, scalable, and SEO-friendly web application using the Next.js App Router.

## Overview

The application provides a seamless shopping experience, allowing users to browse products, view detailed product pages, and manage their shopping cart. It fetches product data from the [Fake Store API](https://fakestoreapi.com/).

**Key Features:**
- Product listing and browsing
- Detailed product view
- Shopping cart functionality (add, remove, view)
- Fully responsive design

## Live Demo

The live demo of the application is available at [Live Demo/](https://e-shop-using-nextjs.vercel.app/)


## Project Structure

The project follows the standard Next.js App Router structure, which is organized for clarity and scalability.

-   `app/`: Contains all the routes, pages, and layouts of the application.
    -   `app/layout.tsx`: The root layout, which includes the main HTML structure and global metadata.
    -   `app/page.tsx`: The homepage of the application.
    -   `app/product/[id]/`: A dynamic route for displaying individual product pages.
    -   `app/checkout/`: The checkout page.
    -   `app/sitemap.ts`: Dynamically generates the sitemap.
-   `components/`: Contains reusable React components used across the application, such as `Header`, `ProductCard`, etc.
-   `lib/`: Holds the core business logic, state management, and API service definitions.
    -   `lib/api/`: Contains functions for fetching data. `productsApi.ts` is for client-side RTK Query.
    -   `lib/features/`: Contains Redux Toolkit slices for managing state (e.g., `cartSlice.ts`).
    -   `lib/store.ts`: The Redux store configuration.
-   `public/`: Stores static assets like images and icons.
    -   `public/robots.txt`: Instructs search engine crawlers.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AbdurRaahimm/e-shop-using-nextjs.git
    cd e-shop-using-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## SEO Features Implemented

This project has been optimized for search engines with the following techniques:

1.  **Server-Side Rendering (SSR):** All pages are rendered on the server, ensuring that search engine crawlers receive fully-formed HTML for better and faster indexing.

2.  **Dynamic Metadata:** Each product page dynamically generates unique `<title>` and `<meta name="description">` tags based on the product's details, improving relevance for search queries.

3.  **Structured Data (JSON-LD):** Product pages include JSON-LD schema markup. This provides search engines with detailed, machine-readable information (like price, rating, and availability), which can lead to rich snippets in search results.

4.  **Open Graph Protocol:** All pages include Open Graph tags (`og:title`, `og:description`, `og:image`) to ensure that they look great when shared on social media platforms like Facebook, Twitter, and LinkedIn.

5.  **`robots.txt` & Dynamic `sitemap.xml`:**
    -   A `robots.txt` file is provided to guide search engine crawlers.
    -   A dynamic `sitemap.ts` generates an up-to-date `sitemap.xml` on demand, ensuring that all product pages are discoverable by search engines.

6.  **Clean and Crawlable URLs:** The application uses a clean, hierarchical URL structure (e.g., `/product/1`) that is easy for both users and search engines to understand.