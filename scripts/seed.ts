#!/usr/bin/env tsx
/**
 * Create the first admin user and seed initial blog posts.
 *
 * Usage:
 *   npm run seed -- <email> <password> [--reset]
 *
 * Examples:
 *   npm run seed -- admin@lawxtech.org mypassword123
 *   npm run seed -- admin@lawxtech.org newpassword --reset   (update existing password)
 */

import { Client } from "pg";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

const email = process.argv[2];
const password = process.argv[3];
const reset = process.argv.includes("--reset");

if (!email || !password) {
  console.error("Usage: npm run seed -- <email> <password> [--reset]");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const connectionString =
  process.env.POSTGRES_URL_NO_SSL ??
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  "";

if (!connectionString) {
  console.error("No database URL found in .env.local");
  process.exit(1);
}

async function run() {
  const db = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  await db.connect();

  try {
    // ── Admin user ────────────────────────────────────────────────────────
    const { rows: existing } = await db.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    const hash = await bcrypt.hash(password, 12);

    if (existing.length > 0) {
      if (reset) {
        await db.query(
          "UPDATE users SET password_hash = $1 WHERE email = $2",
          [hash, email]
        );
        console.log(`✓ Password updated for: ${email}`);
      } else {
        console.log(
          `User ${email} already exists — skipping. Pass --reset to update the password.`
        );
      }
    } else {
      await db.query(
        `INSERT INTO users (id, name, email, password_hash, role)
         VALUES (gen_random_uuid()::text, 'Admin', $1, $2, 'admin')`,
        [email, hash]
      );
      console.log(`✓ Created admin user: ${email}`);
    }

    // ── Blog posts (idempotent via ON CONFLICT) ───────────────────────────
    const posts = [
      {
        slug: "welcome-to-law-x-tech",
        title: "Welcome to Law x Tech: Nigeria's Home for Legal Innovation",
        excerpt:
          "Law x Tech exists at a singular intersection — where legal expertise meets the power of technology. Here's the story of why we started and where we're headed.",
        content: `<h2>A Community Built on a Belief</h2>
<p>In 2022, a small group of Nigerian lawyers noticed something: the profession they loved was evolving faster than most practitioners could keep up with. Contract review tools powered by AI, court management software, e-filing systems, and legal research platforms were quietly reshaping the practice of law around the world — yet the conversation was barely audible in Nigeria's legal corridors.</p>
<p>Law x Tech was born from that silence.</p>
<p>We set out to create Africa's most vibrant community for legal professionals who want to understand, adopt, and shape the technology transforming their industry.</p>
<h2>What We Do</h2>
<p>At our core, we are a community — but we are also a movement. We host summits that bring together lawyers, technologists, regulators, and investors. We publish newsletters that translate complex tech concepts into language that practising lawyers can act on. We run a series of workshops and webinars that give participants hands-on experience with the tools redefining modern legal practice.</p>
<p>Every programme we run is guided by one question: <strong>how does this help a Nigerian legal professional do their job better, build their practice smarter, or create more access to justice?</strong></p>
<h2>Who We Are For</h2>
<p>Law x Tech is for the senior partner at a Lagos firm who wants to understand what AI can and cannot do for due diligence. It is for the fresh law graduate deciding whether to specialise in technology law or join a legal tech startup. It is for the in-house counsel at a fintech company navigating data protection obligations. It is for anyone who believes the law is not in tension with technology — it is shaped by it.</p>
<h2>Join Us</h2>
<p>The intersection of law and technology is not a niche. It is the future of the entire profession. We invite you to be part of shaping that future with us.</p>`,
        read_time: "4 minutes",
      },
      {
        slug: "why-nigerian-lawyers-must-embrace-legaltech",
        title:
          "Why Nigerian Lawyers Can No Longer Afford to Ignore Legal Technology",
        excerpt:
          "From AI-assisted contract review to blockchain-backed land registries, legal technology is not a distant trend — it is arriving in Nigerian courtrooms and boardrooms right now.",
        content: `<h2>The Quiet Revolution in Legal Practice</h2>
<p>Walk into the offices of any of the top twenty commercial law firms in Nigeria today and you will find something that was not there five years ago: a conversation about technology. Not the hypothetical, academic kind — but the urgent, practical kind. Which platform should we use for due diligence? How do we manage our client documents securely? Can AI draft the first pass of a standard commercial lease?</p>
<p>This conversation is no longer optional. It is existential.</p>
<h2>What Is Already Changing</h2>
<p><strong>Contract management</strong> is the most immediate battleground. Tools that can review a 200-page agreement for key risk clauses in under two minutes are no longer the exclusive preserve of Magic Circle firms in London. Nigerian lawyers at firms of every size are beginning to evaluate these tools, and clients — particularly multinational corporations and fast-growing startups — are starting to expect them.</p>
<p><strong>Legal research</strong> is another area in rapid transition. A well-trained language model, given access to Nigerian case law and statute databases, can surface relevant authorities in seconds. The lawyer's value shifts from finding the law to analysing and arguing it — a shift that rewards depth of expertise, not hours billed to Westlaw.</p>
<p><strong>Court technology</strong> is moving more slowly, but it is moving. The Lagos State Judiciary's e-filing initiatives, whatever their current limitations, signal a direction. Lawyers who learn to navigate digital court systems today will have a meaningful advantage as those systems mature.</p>
<h2>The Risk of Waiting</h2>
<p>The legal profession has a long tradition of deference to precedent — and for good reason. But treating the adoption of technology as something to defer until it is absolutely unavoidable carries real costs.</p>
<p>Clients are becoming more sophisticated. A client who has worked with a firm in London, New York, or Nairobi that uses modern document management and AI-assisted review will notice when their Nigerian counsel does not. The competitive pressure is not theoretical. It is already here.</p>
<p>More importantly, technology offers Nigerian lawyers something beyond efficiency: the opportunity to extend the reach of legal services to a population that is currently massively underserved. Nigeria has fewer than 30,000 registered lawyers for over 220 million people. Technology is not a threat to the profession — it is potentially its most powerful tool for impact.</p>
<h2>Where to Start</h2>
<p>For practitioners who want to begin engaging with legal technology, our advice is simple: start with the problem, not the tool. Identify the most time-consuming, error-prone part of your current practice. Then ask what exists to address it. The Law x Tech community exists precisely to help you answer that question — with practitioners who have already made the journey.</p>
<p>The intersection of law and technology is not something that is coming. It is something that is already here. The only question is whether Nigerian lawyers will help shape it, or simply adapt to it after the fact.</p>`,
        read_time: "5 minutes",
      },
    ];

    for (const post of posts) {
      await db.query(
        `INSERT INTO posts (slug, title, excerpt, content, image_url, image_key, read_time, published, created_at)
         VALUES ($1, $2, $3, $4, '', '', $5, true, NOW())
         ON CONFLICT (slug) DO NOTHING`,
        [post.slug, post.title, post.excerpt, post.content, post.read_time]
      );
      console.log(`✓ Seeded post: "${post.title}"`);
    }

    console.log("\nAll done. Log in at /admin/login");
  } finally {
    await db.end();
  }
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
