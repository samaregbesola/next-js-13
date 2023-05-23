import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <h1>The requested movie does not exist.</h1>
      <Link
        href="/films"
        className="block bg-gray-600 rounded-md w-[fit-content] py-3 px-2 mt-1 text-white"
      >
        Back to films
      </Link>
    </>
  );
}
