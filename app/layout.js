import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Provider from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strapi movie application",
  description: "This was created using the official strapi tutorial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={` bg-gradient-to-r from-pink-300 via-purple-300 to-violet-300 ${inter.className}`}
      >
        <Provider>
          <Nav />
          <main className="px-4">
            <div className="flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p-16">
              <div className="text-2xl font-medium text-gray-900">
                {children}
              </div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
