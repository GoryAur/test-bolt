import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative pt-32 px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Stranger Things
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
              <Button size="lg" variant="secondary">
                <Info className="mr-2 h-5 w-5" /> More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 md:px-6 lg:px-8 py-12 max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-video bg-muted rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80')"
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}