import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: 680895175751-6t72ofpof6b7ddn463jkjrt4hi2dfttr.apps.googleusercontent.com,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
});
