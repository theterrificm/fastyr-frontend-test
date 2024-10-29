import Link from "next/link";
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-2 gap-4">
        {/* Link to the users page */}
        <Link href="/users">
          <h1 className="text-4xl font-bold">/Users</h1>
        </Link>
        {/* Link to the albums page */}
        <Link href="/albums">
          <h1 className="text-4xl font-bold">/Albums</h1>
        </Link>
      </div>
    </div>
  );
}

