import Image from "next/image";
export default function SingleFilm({ film }) {
  console.log(film);
  return (
    <>
      <Image src={film?.poster} alt={film?.title} width={300} height={300} />
      <h2>{film?.title}</h2>
      <p>{film?.director}</p>
      <p>{film?.plot}</p>
    </>
  );
}
