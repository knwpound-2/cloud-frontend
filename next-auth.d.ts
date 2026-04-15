import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // เพิ่ม Field ที่คุณต้องการ
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    token?: string; // สำหรับรองรับตอนรับค่าจาก API Login
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}