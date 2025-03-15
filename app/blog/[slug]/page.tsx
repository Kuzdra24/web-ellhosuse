import { getPostBySlug } from "@/lib/hygraph";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4 text-center">Dodane {format(new Date(post.updatedAt), 'dd MMMM yyyy', { locale: pl })}</p>
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mb-4 bg-gradient-to-b from-transparent to-background">
        <Image
          src={post.obraz.url}
          alt={post.title}
          className="w-full object-cover object-center z-[-10]"
          width={300}
          height={300}
        />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-center">{post.subtitle}</h2>
      <div className="prose prose-lg max-w-none blog-post mx-auto" dangerouslySetInnerHTML={{ __html: post.content.html }} />
    </div>
  );
}