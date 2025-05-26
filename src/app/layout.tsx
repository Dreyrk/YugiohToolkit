import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getSession } from "@/actions/auth/getSession";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Yugi Deck Builder",
  description: "Deck builder for yugioh",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="relative">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          theme="dark"
        />
        <Navbar user={session.user} />
        <main className="layout-main">
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
