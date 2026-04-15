export default async function generateMeditation({
  userInput,
  token,
}: {
  userInput : string;
  token: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meditation`, {
    method: "POST",
    headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
    body: JSON.stringify({ userInput }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate meditation");
  }

  return await response.json();
}
