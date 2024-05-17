
import axios from "axios";
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

        // const response = await axios.post(process.env.URL + "/api/checkUser", {
        //   email: user.email,
        // });
        // console.log("RESPONE: ", response.data);
        const userId = 8
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
      console.log("TOKEN");
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id.toString();
      }
      console.log("Session");
      return session;
    }
  },
}