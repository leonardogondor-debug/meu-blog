import { Artigo } from "../../types/artigo";
import artigosData from "../../data/artigo.json";
import pageStyles from "../ArtigoPage.module.css";
import type { Metadata } from "next";

//gera parametros estaticos para criar paginas estaticas de cada arquivo
export async function generateStaticParams() {
    const artigos: Artigo[] = artigosData;
    return artigos.map((artigo) => ({
        slug: artigo.slug,
    }));
}

//metodos dinamicos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const artigos: Artigo[] = artigosData;
    const { slug } = params;
    const artigo = artigos.find((a) => a.slug === params.slug);
    return {
        title: artigo?.titulo || "Artigo",
        description: artigo?.conteudo.slice(0, 100) || "Descrição do artigo",
    };
}

//pagina do arquivo
export default async function ArtigoPage({ params }: { params: { slug: string } }) {
    const artigos: Artigo[] = artigosData;
    const { slug } = params;
    const artigo = artigos.find((a) => a.slug.toLowerCase() === slug.toLowerCase());

    if (!artigo) return <h1 className="m-4 text-xl">Artigo não encontrado</h1>;

    return (
        <article className={pageStyles.page}>
            <h1 className={pageStyles.page_titulo}>{artigo.titulo}</h1>
            <p><strong>{artigo.autor}</strong> - {artigo.data}</p>
            <p className={pageStyles.page_conteudo}>{artigo.conteudo}</p>
        </article>
    );
}