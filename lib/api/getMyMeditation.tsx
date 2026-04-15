export default async function getMyMeditations({
  token
}: {
  token: string;
}) {
    console.log("Get History with token:", token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/medias`, {
    method: "GET",
    headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
  });

  if (!response.ok) {
    throw new Error("Failed to get user meditation");
  }

  return await response.json();
}
