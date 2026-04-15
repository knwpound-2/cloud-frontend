// @/lib/api/userLogin.ts
export default async function userLogin(username: string, userPassword: string) {
    // ยิงตรงไปหา AWS API (ใช้ BACKEND_URL จาก .env)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: userPassword
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to Login");
    }
    
    return await response.json(); // คืนค่า { token: "...", msg: "..." }
}