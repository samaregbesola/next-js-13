export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }

  if (!response.ok) return undefined;
  const data = response.json();
  return data;
}
