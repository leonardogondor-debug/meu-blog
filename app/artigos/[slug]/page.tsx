import { Artigo } from "../../types/artigo";
import artigosData from "../../data/artigo.json";
import pageStyles from "../ArtigoPage.module.css";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const artigos: Artigo[] = artigosData;
    return artigos.map((artigo) => ({
        slug: artigo.slug,
    })); 
}

export async function geraMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const artigos: Artigo[] = artigosData;
    const artigo = artigos.find((a) => a.slug === params.slug);
    return {
        title: artigo?.titulo || "Artigo",
        description: artigo?.conteudo.slice(0, 100) || "Descrição do artigo",
    };
}

export default async function ArtigoPage({params}: { params: { slug: string }}) {
    const artigos: Artigo[] = artigosData;
    const { slug } = await params;
    const artigo = artigos.find((a) => a.slug === slug);
    
    if (!artigo) return <h1>Artigo não encontrado</h1>;

    return (
        <article className={pageStyles.page}>
            <h1 className={pageStyles.page_titulo}>{artigo.titulo}</h1>
            <p><strong>{artigo.autor}</strong> - {artigo.data}</p>
            <p className={pageStyles.page_conteudo}>{artigo.conteudo}</p>
        </article>
    );
}