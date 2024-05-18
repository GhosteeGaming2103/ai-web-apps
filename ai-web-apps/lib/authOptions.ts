
import axios from "axios";
import GithubProvider from "next-auth/providers/github"
import mysql from "mysql2/promise";

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
        const response = await axios.post(process.env.URL + "/api/checkUser", {
          email: user.email,
        });
        const temp = response.data.user[0];
        user.id = temp.id;
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
      return session;
    }
  },
}