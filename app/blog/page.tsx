// src/pages/blog.tsx

import Link from "next/link";
import { getPosts } from "@/lib/hygraph";
import Image from "next/image";
import { format } from "date-fns";
import {pl} from 'date-fns/locale';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug} className="bg-white p-4 rounded-md max-w-[400px] shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href={`/blog/${post.slug}`}>
                <div className="cursor-pointer">
                  <img width={post.obraz.width || 800} height={post.obraz.height || 600} src={post.obraz.url} alt={post.title} className="w-full h-auto rounded-t-md" />
                  <div className="p-4">
                    <p className="text-gray-500 text-sm mb-2">Dodane {format(new Date(post.updatedAt), 'dd MMMM yyyy', {locale: pl})}</p>
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-700">{post.subtitle}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>Brak postów do wyświetlenia.</p>
        )}
      </ul>
    </div>
  );
}
