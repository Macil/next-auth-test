import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // needed when using `npm run preview` and is fine for production on
  // Cloudflare
  trustHost: true
});
