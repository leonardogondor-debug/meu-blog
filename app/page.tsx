import Link from "next/link";
import { Artigo } from "./types/artigo";
import artigosData from "./data/artigo.json";
import homeStyles from "./Home.module.css";

export default async function HomePage() {
  const artigos: Artigo[] = artigosData;

  return (
    <main>
      <ul className={homeStyles.artigo_grid}>
        {artigos.map((artigo) => (
          <li className={homeStyles.artigo_card} key={artigo.slug}>
            <Link  className={homeStyles.artigo_link} href={`/artigos/${artigo.slug}`}>
            {artigo.titulo}
            </Link>
            <p>{artigo.autor} - {artigo.data}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}