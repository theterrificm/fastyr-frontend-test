import Link from "next/link";
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="grid grid-cols-2">
        <div>
          <Link href="/users">
            <h1 className="text-4xl font-bold">/Users</h1>
          </Link>
        </div>
        <div>
          <Link href="/albums">
            <h1 className="text-4xl font-bold">/Albums</h1>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
