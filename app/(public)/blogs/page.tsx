import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/db";
import { Clock, Calendar } from "lucide-react";

export const metadata = buildMetadata({
  title: "Newsletters & Articles",
  description:
    "Read newsletters and articles from the Law x Tech community on legal technology, career transitions, and thriving at the intersection of law and tech.",
  robots: { index: false, follow: true },
});

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getPublishedPosts().catch(() => []);

  return (
    <>
      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            From the Community
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Newsletters &amp; Articles
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            Insights, stories, and practical advice for legal professionals
            navigating the world of technology.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📖</p>
              <h3 className="text-xl font-bold text-navy">
                Articles coming soon
              </h3>
              <p className="mt-2 text-muted-brand">
                Check back soon for new newsletters and articles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-border-brand hover:border-teal/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {post.image_url && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-muted-brand text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.read_time} read
                      </span>
                    </div>
                    <h2 className="font-bold text-navy text-base leading-snug mb-3 group-hover:text-teal transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-brand text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border-brand">
                      <span className="text-teal text-sm font-semibold">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
