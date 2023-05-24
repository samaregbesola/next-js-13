import { fetcher } from "@/lib/api";
import SingleFilm from "./components/singleFilm";
import { notFound } from "next/navigation";

//generate dynamic metadata for each film
export async function generateMetadata({ params: { slug } }) {
  console.log(slug);
  const filmData = fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}`,
    { next: { revalidate: 20 } }
  );
  const film = await filmData;

  if (!film)
    return {
      title: "Film not found",
      description: "This film does not exist",
    };

  return {
    title: film?.data?.attributes?.title,
    description: `This is the page of ${film?.data?.attributes?.title}`,
  };
}

// Single film page
export default async function FilmPage({ params: { slug } }) {
  const filmData = fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}?populate=*`,
    { next: { revalidate: 20 } }
  );
  const film = await filmData;

  if (!film) notFound();

  return (
    <>
      <SingleFilm film={film?.data?.attributes} />
    </>
  );
}

// goes ahead and generates all the static paths for the films
export async function generateStaticParams() {
  const filmsData = fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`, {
    next: { revalidate: 20 },
  });
  const films = await filmsData;

  return films.data.map((film) => ({
    filmId: film.id.toString(),
  }));
}
