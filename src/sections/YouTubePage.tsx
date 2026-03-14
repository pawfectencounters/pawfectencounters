import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Youtube, ExternalLink, Users, Eye, Video, Play, Clock, ThumbsUp, AlertCircle } from 'lucide-react';
import { getChannelInfo, getChannelVideos, type YouTubeChannel, type YouTubeVideo } from '@/services/youtube';
import { YOUTUBE_CONFIG } from '@/config/youtube';

export function YouTubePage() {
  const [channel, setChannel] = useState<YouTubeChannel | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查是否配置了 API Key
    if (YOUTUBE_CONFIG.API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE' || 
        YOUTUBE_CONFIG.CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') {
      setError('请先在 src/config/youtube.ts 中配置您的 YouTube API Key 和频道 ID');
      setLoading(false);
      return;
    }

    console.log('YouTube Config:', {
      API_KEY: YOUTUBE_CONFIG.API_KEY.substring(0, 10) + '...',
      CHANNEL_ID: YOUTUBE_CONFIG.CHANNEL_ID,
    });

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // 并行获取频道信息和视频
        const [channelData, videosData] = await Promise.all([
          getChannelInfo(),
          getChannelVideos(),
        ]);
        
        console.log('Fetched channel:', channelData);
        console.log('Fetched videos:', videosData);
        
        if (channelData) {
          setChannel(channelData);
        } else {
          setError('未找到频道信息，请检查频道 ID 是否正确');
        }
        
        setVideos(videosData);
        
        if (videosData.length === 0 && channelData) {
          setError('频道信息已获取，但未找到视频。可能是频道没有公开视频。');
        }
      } catch (err: any) {
        console.error('Error fetching YouTube data:', err);
        setError(`获取 YouTube 数据失败: ${err.message || '未知错误'}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 获取最新的视频作为精选视频
  const featuredVideo = videos[0];
  const latestVideos = videos.slice(1);

  if (error) {
    return (
      <div className="space-y-8 pb-20">
        <section className="container mx-auto px-4 pt-20">
          <Card className="glass-card border-orange-500/30">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">配置错误</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              
              {/* 显示当前配置 */}
              <div className="text-sm text-left max-w-2xl mx-auto mb-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">当前配置：</p>
                  <p className="font-mono text-xs break-all">
                    CHANNEL_ID: {YOUTUBE_CONFIG.CHANNEL_ID}
                  </p>
                  <p className="font-mono text-xs mt-1">
                    API_KEY: {YOUTUBE_CONFIG.API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE' ? '未配置' : '已配置'}
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg text-left max-w-2xl mx-auto">
                <p className="font-semibold mb-2">配置步骤：</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>访问 <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
                  <li>创建新项目并启用 YouTube Data API v3</li>
                  <li>创建 API Key</li>
                  <li>获取频道 ID：访问 <a href="https://www.youtube.com/account_advanced" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube 高级设置</a></li>
                  <li>在 src/config/youtube.ts 中填写 API_KEY 和 CHANNEL_ID</li>
                  <li>重新运行 <code className="bg-primary/20 px-1 rounded">npm run build</code></li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
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
            {loading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : (
              <div className="h-24 w-24 rounded-full overflow-hidden shrink-0 ring-4 ring-red-600/30 ring-offset-4 ring-offset-background">
                <img 
                  src={channel?.thumbnail || '/logo.png'} 
                  alt={channel?.title || 'Channel'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-64 mb-2" />
                  <Skeleton className="h-4 w-full max-w-xl mb-4" />
                  <Skeleton className="h-4 w-3/4 max-w-xl mb-4" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{channel?.title || 'Pawfect Encounters'}</h1>
                    <Badge variant="secondary" className="bg-red-600/20 text-red-500 border-red-600/30">
                      <Youtube className="h-3 w-3 mr-1" />
                      YouTube
                    </Badge>
                  </div>
                  <p className="text-muted-foreground max-w-xl mb-4">
                    {channel?.description || 'Join us on our journey capturing the unique personalities of pets through street photography.'}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a
                      href={`https://youtube.com/channel/${YOUTUBE_CONFIG.CHANNEL_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="glow" className="gap-2 bg-red-600 hover:bg-red-700">
                        <Youtube className="h-5 w-5" />
                        Subscribe
                      </Button>
                    </a>
                    <a
                      href={`https://youtube.com/channel/${YOUTUBE_CONFIG.CHANNEL_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="gradient-border" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Visit Channel
                      </Button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <>
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
            </>
          ) : (
            <>
              <Card className="glass-card card-glow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient">{channel?.subscriberCount || '0'}</p>
                    <p className="text-sm text-muted-foreground">Subscribers</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card card-glow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center">
                    <Video className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient">{channel?.videoCount || '0'}</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card card-glow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient">{channel?.viewCount || '0'}</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Featured Video */}
      {featuredVideo && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Play className="h-5 w-5 text-red-500" />
            Featured Video
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-secondary relative group">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${featuredVideo.id}`}
              title={featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{featuredVideo.title}</h3>
            <p className="text-muted-foreground mt-1 line-clamp-2">{featuredVideo.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {featuredVideo.viewCount} views
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {featuredVideo.likeCount} likes
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredVideo.publishedAt}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Latest Videos */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Video className="h-5 w-5 text-red-500" />
          Latest Videos
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-xl" />
            ))}
          </div>
        ) : latestVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="overflow-hidden glass-card card-glow card-lift">
                  <div className="aspect-video overflow-hidden relative img-shine">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/50 group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-20 w-20 rounded-full bg-red-600/20 blur-xl" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.viewCount}
                      </span>
                      <span>•</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          <Card className="glass-card">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无视频</p>
            </CardContent>
          </Card>
        )}
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
          ].map((item, index) => (
            <Card key={item.title} className="glass-card card-glow card-lift" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
