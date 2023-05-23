import { fetcher } from "@/lib/api";
import Films from "./components/Films";

//add films metatag
export const metadata = {
  title: "Films",
  description: "This is the page of all the films",
};

export default async function FilmsList() {
  const filmResponse = fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`, {
    next: { revalidate: 20 },
  });

  const films = await filmResponse;

  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          <Films films={films} />
        </span>
      </h1>
    </>
  );
}
