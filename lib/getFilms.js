export async function getFilms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`);

  if (!res.ok) return undefined;

  return res.json();
}
