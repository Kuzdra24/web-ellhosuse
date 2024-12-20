// src/lib/hygraph.ts

import { GraphQLClient } from 'graphql-request';

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT || '';

const hygraphClient = new GraphQLClient(HYGRAPH_ENDPOINT);

type Post = {
    title: string;
    slug: string;
    subtitle: string;
    obraz: {
        url: string;
        width: number;
        height: number;
    };
    updatedAt: string;
};

type OnePost = {
    title: string;
    slug: string;
    subtitle: string;
    obraz: {
        url: string;
        width: number;
        height: number;
    };
    updatedAt: string;
    content: {
        html: string;
    };
}

export async function getPosts(): Promise<Post[]> {
    const query = `
    query MyQuery {
        blogEllhouses {
            title
            slug
            subtitle
            obraz {
                url
                width
                height
            }
            updatedAt
        }
    }
  `;

    try {
        const data = await hygraphClient.request<{ blogEllhouses: Post[] }>(query);
        return data.blogEllhouses; // Zwraca dane postów
    } catch (error) {
        console.error("Błąd pobierania postów z Hygraph:", error);
        return []; // Jeśli wystąpi błąd, zwróci pustą tablicę
    }
}

export async function getPostBySlug(slug: string): Promise<OnePost> {
    const query = `
    query MyQuery($slug: String!) {
        blogEllhouse(where: {slug: $slug}) {
            content {
                html
            }
            obraz {
                url
                width
                height
            }
            slug
            subtitle
            title
            updatedAt
        }
    }
  `;

    const variables = { slug };

    try {
        const data = await hygraphClient.request<{ blogEllhouse: OnePost }>(query, variables);
        return data.blogEllhouse; // Zwraca dane posta
    } catch (error) {
        console.error("Błąd pobierania posta z Hygraph:", error);
        throw new Error("Nie udało się pobrać posta");
    }
}
