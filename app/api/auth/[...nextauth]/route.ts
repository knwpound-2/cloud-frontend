import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/lib/api/userLogin"; // ดึงฟังก์ชันที่คุณเขียนไว้มาใช้

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // เรียกใช้ฟังก์ชันเดิมของคุณตรงๆ
          const data = await userLogin(credentials.email, credentials.password);

          // ถ้า API คืนค่า token มา (ตามโครงสร้าง {"msg": "...", "token": "..."})
          if (data && data.token) {
            // NextAuth ต้องการ object ที่มี id เป็นอย่างน้อย
            return {
              id: "user-id", // หรือดึงจาก sub ใน token ถ้ามี
              email: credentials.email,
              token: data.token, 
            };
          }
          return null;
        } catch (error) {
          // ถ้า userLogin throw Error (เช่น 401) NextAuth จะรับรู้ที่นี่
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };