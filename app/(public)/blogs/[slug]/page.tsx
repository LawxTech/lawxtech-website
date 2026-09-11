import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/db";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.image_url
        ? [{ url: post.image_url, alt: post.title }]
        : [],
    },
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image_url,
    datePublished: new Date(post.created_at).toISOString(),
    author: { "@type": "Organization", name: "Law x Tech" },
    publisher: {
      "@type": "Organization",
      name: "Law x Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://lawxtech.org/assets/logo/logo_2.JPG",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-brand hover:text-navy text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>

          <div className="flex items-center gap-4 text-muted-brand text-sm mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.read_time} read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-8">
            {post.title}
          </h1>

          {post.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article
            className="prose prose-slate max-w-none text-[#374151] text-base leading-8 text-justify
              prose-p:text-justify prose-p:leading-8 prose-p:my-[1.5lh]
              prose-headings:text-navy prose-headings:mt-10 prose-headings:mb-4
              prose-li:my-2 prose-li:leading-8 prose-ul:my-6 prose-ol:my-6
              [hyphens:auto]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-border-brand">
            <div className="flex items-center gap-4 bg-surface rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">L×T</span>
              </div>
              <div>
                <p className="font-bold text-navy text-sm">Law x Tech</p>
                <p className="text-muted-brand text-xs mt-0.5">
                  Nigeria&apos;s community for legal tech enthusiasts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
