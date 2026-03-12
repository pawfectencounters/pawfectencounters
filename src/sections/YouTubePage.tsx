import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Youtube, ExternalLink, Users, Eye, Video } from 'lucide-react';
import { youtubeVideos } from '@/data';

export function YouTubePage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/youtube-hero.jpg"
            alt="YouTube Channel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <Youtube className="h-12 w-12 text-white" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">Pawfect Encounters</h1>
                <Badge variant="secondary">YouTube</Badge>
              </div>
              <p className="text-muted-foreground max-w-xl mb-4">
                Join us on our journey capturing the unique personalities of pets through
                street photography. Subscribe for behind-the-scenes content, photography tips,
                and heartwarming pet stories.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 bg-red-600 hover:bg-red-700">
                    <Youtube className="h-5 w-5" />
                    Subscribe
                  </Button>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Channel
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Subscribers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Video className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Eye className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5M+</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Video */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Video</h2>
        <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Featured Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>

      {/* Latest Videos */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Latest Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {youtubeVideos.map((video) => (
            <a
              key={video.id}
              href={`https://youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {video.views} views • {video.date}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Content Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">What You'll Find</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Behind the Scenes', desc: 'See how we capture the perfect pet portraits' },
            { title: 'Photography Tips', desc: 'Learn techniques for better pet photos' },
            { title: 'Pet Stories', desc: 'Heartwarming stories of rescue pets' },
            { title: 'Equipment Reviews', desc: 'Gear recommendations for pet photography' },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
