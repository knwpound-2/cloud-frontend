'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. ใช้ signIn แทนการเรียก userLogin ตรงๆ
      // "credentials" ต้องตรงกับ id ใน Provider ที่ตั้งไว้ใน route.ts
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false, // เราจะจัดการเปลี่ยนหน้าเอง
      });

      if (result?.error) {
        // NextAuth จะคืน error มาถ้า authorize() ใน route.ts คืนค่า null
        setError('Invalid email or password');
        return;
      }

      // 2. ถ้าสำเร็จ ให้ใช้ router.push หรือ window.location
      // NextAuth จะจัดการล้าง session เก่าและเซ็ต session ใหม่ให้เอง
      router.push('/');
      router.refresh(); // บังคับให้ Navbar/Layout อัปเดตสถานะ session
    } catch (err: any) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className="flex flex-col justify-center items-center w-fit h-fit bg-white/90 px-10 py-15 rounded-lg gap-7 shadow-md
        max-sm:px-5 max-sm:py-8 z-30 m-auto"
      >
        <div className="flex flex-col gap-2 items-center">
          <h1 className="p-0 m-0 text-3xl text-center font-bold max-sm:text-xl">
            Sign in with Email
          </h1>
          <p className="text-sm text-center">
            Welcome! Let’s make new memories together.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-[80%]">
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              className="w-full text-black text-sm px-3 py-1.5 placeholder:black border border-1 border-black 
            rounded-sm focus:outline focus:outline-gray-500"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full text-black text-sm px-3 py-1.5 placeholder:black border border-1 border-black 
            rounded-sm focus:outline focus:outline-gray-500"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full bg-black text-white font-medium px-3 py-1.5 rounded-md border border-1
            hover:bg-white hover:text-black hover:border hover:border-1 hover:border-black transition duration-200
            cursor-pointer"
            onClick={handleLogin}
          >
            {loading ? 'Login...' : 'Login'}
          </button>
        </div>

        <div className="flex flex-row gap-2">
          <p className="text-sm">Don't have an account?</p>
          <a
            className="text-sm font-semibold hover:underline active:font-bold cursor-pointer transition duration-150"
            href="/auth/register"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
