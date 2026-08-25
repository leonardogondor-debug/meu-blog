import { Artigo } from "../../types/artigo";
import artigosData from "../../data/artigo.json";

export async function geraParamsStatic() {
    const artigos: Artigo[] = artigosData;
    return artigos.map((artigo) => ({
        slug: artigo.slug,
    })); 
}

export async function geraMetadata({ params }: { params: { slug: string } }) {
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
        <article>
            <h1>{artigo.titulo}</h1>
            <p><strong>{artigo.autor}</strong> - {artigo.data}</p>
            <div>{artigo.conteudo}</div>
        </article>
    );
}