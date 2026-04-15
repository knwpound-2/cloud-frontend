import MeditationPlayer from "@/components/ui/home/MeditationPlayer";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PlayerPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ mood: string }> 
}) {
  const { slug } = await params;
  const { mood } = await searchParams;

  const audioUrl = `${process.env.NEXT_PUBLIC_S3_URL}/${slug}.mp3`;
  console.log(audioUrl)

  return (
    <main className="flex min-h-screen items-center justify-center">
      <MeditationPlayer 
        title={mood||"Your Meditation Journey"}
        audioUrl={audioUrl} 
      />
    </main>
  );
}