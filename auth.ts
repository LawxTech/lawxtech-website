import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Client } from "pg";

function getDbConnectionString() {
  return (
    process.env.POSTGRES_URL_NO_SSL ??
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    ""
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Use pg (TCP wire protocol) — more reliable than neon HTTP in Next.js server context
        const db = new Client({
          connectionString: getDbConnectionString(),
          ssl: { rejectUnauthorized: false },
        });

        try {
          await db.connect();
          const { rows } = await db.query(
            "SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1",
            [credentials.email as string]
          );
          const user = rows[0] as
            | { id: string; name: string; email: string; password_hash: string }
            | undefined;
          if (!user?.password_hash) return null;
          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          );
          if (!valid) return null;
          return { id: user.id, name: user.name, email: user.email };
        } finally {
          await db.end();
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});
