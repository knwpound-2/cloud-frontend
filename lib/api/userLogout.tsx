// @/lib/api/userLogout.ts
export default async function userLogout(token: string) {
    console.log("Logging out with token:", token);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
    });

    if (!response.ok) {
        // จัดการกรณี Error เช่น Token หมดอายุไปก่อนแล้ว
        console.error("Backend logout failed");
        console.log(response.json());
    }

    return await response.json();
}