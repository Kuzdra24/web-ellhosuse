import { getPostBySlug } from "@/lib/hygraph";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">Dodane {format(new Date(post.updatedAt), 'dd MMMM yyyy', { locale: pl })}</p>
      <Image width={post.obraz.width} height={post.obraz.height} src={post.obraz.url} alt={post.title} className="w-full h-auto rounded-md mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{post.subtitle}</h2>
      <div className="prose prose-lg max-w-none blog-post" dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </div>
  );
}