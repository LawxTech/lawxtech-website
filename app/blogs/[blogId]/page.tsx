import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogs } from "@/lib/data/blogs";
import { buildMetadata } from "@/lib/metadata";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ blogId: string }>;
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ blogId: String(b.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const blog = blogs.find((b) => b.id === Number(blogId));
  if (!blog) return {};
  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image, alt: blog.title }],
    },
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { blogId } = await params;
  const blog = blogs.find((b) => b.id === Number(blogId));
  if (!blog) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    datePublished: blog.date,
    author: {
      "@type": "Organization",
      name: "Law x Tech",
    },
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
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {blog.duration} read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <article className="prose prose-slate max-w-none">
            {blog.article.map((para, i) => (
              <p
                key={i}
                className="text-[#374151] text-base leading-relaxed mb-5"
                dangerouslySetInnerHTML={{
                  __html: para.p.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-navy font-semibold">$1</strong>'
                  ),
                }}
              />
            ))}
          </article>

          <div className="mt-12 pt-8 border-t border-border-brand">
            <div className="flex items-center gap-4 bg-surface rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
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
