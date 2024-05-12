
import axios from "axios";

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }: any) {
      // call api/createUser

      if (user) {
        console.log(user);
        const response = await axios.post("http://localhost:3000/api/checkUser", {
          email: user.email,
        });
        console.log(response.data);
        const userId = response.data.user[0].id;
        user.id = userId;
        return true
      }
      else {
        return false;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id.toString();
      }
      console.log("Session", session);
      return session;
    }
  }
}

// Ignore Error
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }