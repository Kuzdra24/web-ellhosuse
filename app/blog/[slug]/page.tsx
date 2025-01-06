import { getPostBySlug } from "@/lib/hygraph";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4 text-center">Dodane {format(new Date(post.updatedAt), 'dd MMMM yyyy', { locale: pl })}</p>
      <div className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-md mb-4">
        <img
          src={post.obraz.url}
          alt={post.title}
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-center">{post.subtitle}</h2>
      <div className="prose prose-lg max-w-none blog-post mx-auto" dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </div>
  );
}