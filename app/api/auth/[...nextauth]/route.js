import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // Add your Strapi authentication logic here
    //     const public_url = process.env.NEXT_PUBLIC_API_URL;
    //     const response = await fetch(`${public_url}/api/auth/local`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(credentials),
    //     });
    //     const user = await response.json();
    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ user, session, token }) {
      session.user = token;
      session.user.id = user ? user.id : null;
      return Promise.resolve(session);
    },

    async jwt({ token, user, account }) {
      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        try {
          console.log("Google Account >>>>>>>>>>>>>> ", account);
          const public_url = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(
            `${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();
          console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data);
          token.jwt = data.jwt;
          token.id = data.user.id;
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
