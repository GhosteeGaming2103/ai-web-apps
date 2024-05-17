
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
        console.log(user);

        // const response = await axios.post(process.env.URL + "/api/checkUser", {
        //   email: user.email,
        // });
        // console.log("RESPONE: ", response.data);
        let temp = undefined;
        const connection = await mysql.createConnection({
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
        });
        // Check if the email already exists
        const [rows, fields] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        );
        if (Array.isArray(rows) && rows.length === 0) {
          await connection.execute("INSERT INTO users (email) VALUES (?)", [
            user.email,
          ]);
          const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [user.email]);
          temp = rows as any;
          user.id = temp[0].id;
        }
        else {
          temp = rows as any;
          user.id = temp[0].id;
        }
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