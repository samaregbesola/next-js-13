import Link from "next/link";

export default function Films({ films }) {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl text-gray-900 font-bold mb-3">
        {films ? (
          films.data.map((film) => {
            return (
              <li key={film.id}>
                <Link href={`films/${film.attributes.slug}`}>
                  {film.attributes.title}
                </Link>
              </li>
            );
          })
        ) : (
          <li>No films</li>
        )}
      </ul>
    </>
  );
}
