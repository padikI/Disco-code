import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

export const getSlugs = (url: string): string[] => {
    const paths = sync(`${url}/*.mdx`);

    return paths.map(path => {
        const parts = path.split("/");
        const fileName = parts[parts.length - 1];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [slug, _ext] = fileName.split(".");
        return slug;
    });
};
export const getAllPosts = (url:string) => {
    const posts = getSlugs(url).map(slug => getPostFromSlug(slug,url)).sort((a, b) => {
        if (a.meta.id > b.meta.id) return -1;
        if (a.meta.id < b.meta.id) return 1;
        return 0;


    }).reverse();
    return posts;
};


interface Post {
    content: string,
    meta: PostMeta,

}

export interface PostMeta {
    slug: string;
    excerpt: string;
    title: string;
    id:string;
    prev: string;
    next:string;
    category?: string;
    titleCategory?:string;

}
export const getPostFromSlug = (slug: string,url: string): Post => {
    const postPath = path.join(url, `${slug}.mdx`);
    const source = fs.readFileSync(postPath);

    const { content, data } = matter(source);

    return {
        content,
        meta: {
            slug,
            excerpt: data.excerpt ?? "",
            title: data.title ?? slug,
            id: data.id ?? "",
            prev: data.prev ?? "",
            next: data.next ?? "",
            category: data.category ?? "none",
            titleCategory: data.titleCategory ?? ""
        },
    };

};

