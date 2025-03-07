import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth, db } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;
          console.log(user, "user");
          return {
            uid: user.uid,
            email: user.email,
            role: 2,
            accessToken: user.accessToken,
          };
        } catch (error) {
          console.error("Error during authorization", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.uid = user.uid;
        token.email = user.email;
        token.token = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.uid = token.uid;
      session.user.email = token.email;
      session.user.token = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
