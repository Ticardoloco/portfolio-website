import type { MetadataRoute } from "next";

const BASE_URL = "https://taiwoegbelekeportfoliowebsite.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap{
    const route = ["", "/projects", "/about", "/resume", "/contact"];

    return route.map((route)=>({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}