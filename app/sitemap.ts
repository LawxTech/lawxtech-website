import type { MetadataRoute } from "next";
import { blogs } from "@/lib/data/blogs";
import { partners } from "@/lib/data/partners";

const baseUrl = "https://lawxtech.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/series`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/summit-awards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const partnerRoutes: MetadataRoute.Sitemap = partners.map((partner) => ({
    url: `${baseUrl}/partners/${partner.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...partnerRoutes];
}
