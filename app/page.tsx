import Link from "next/link";
import { Artigo } from "./types/artigo";
import artigosData from "./data/artigo.json";

export default async function HomePage() {
  const artigos: Artigo[] = artigosData;

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {artigos.map((artigo) => (
          <li key={artigo.slug}>
            <Link href={`/artigos/${artigo.slug}`}>
            {artigo.titulo}
            </Link>
            <p>{artigo.autor} - {artigo.data}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}