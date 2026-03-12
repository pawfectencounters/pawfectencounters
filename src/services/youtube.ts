import { YOUTUBE_CONFIG, YOUTUBE_API_BASE } from '@/config/youtube';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

// 格式化观看次数
function formatViewCount(count: string): string {
  const num = parseInt(count, 10);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return count;
}

// 格式化日期
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) {
    return diffDays + ' days ago';
  } else if (diffDays < 30) {
    return Math.floor(diffDays / 7) + ' weeks ago';
  } else if (diffDays < 365) {
    return Math.floor(diffDays / 30) + ' months ago';
  } else {
    return Math.floor(diffDays / 365) + ' years ago';
  }
}

// 格式化视频时长
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// 获取频道信息
export async function getChannelInfo(): Promise<YouTubeChannel | null> {
  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${YOUTUBE_CONFIG.CHANNEL_ID}&key=${YOUTUBE_CONFIG.API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch channel info');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const channel = data.items[0];
    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.medium?.url || channel.snippet.thumbnails.default?.url,
      subscriberCount: formatViewCount(channel.statistics.subscriberCount),
      videoCount: channel.statistics.videoCount,
      viewCount: formatViewCount(channel.statistics.viewCount),
    };
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return null;
  }
}

// 获取频道最新视频
export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    // 首先获取频道的上传播放列表 ID
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${YOUTUBE_CONFIG.CHANNEL_ID}&key=${YOUTUBE_CONFIG.API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel details');
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      return [];
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // 获取播放列表中的视频
    const playlistResponse = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${YOUTUBE_CONFIG.MAX_RESULTS}&key=${YOUTUBE_CONFIG.API_KEY}`
    );
    
    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist items');
    }
    
    const playlistData = await playlistResponse.json();
    
    if (!playlistData.items || playlistData.items.length === 0) {
      return [];
    }
    
    // 获取视频详细信息（包括观看次数、时长等）
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
    
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_CONFIG.API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch video details');
    }
    
    const videosData = await videosResponse.json();
    
    // 合并数据
    return playlistData.items.map((playlistItem: any) => {
      const videoId = playlistItem.snippet.resourceId.videoId;
      const videoDetails = videosData.items.find((v: any) => v.id === videoId);
      
      return {
        id: videoId,
        title: playlistItem.snippet.title,
        description: playlistItem.snippet.description,
        thumbnail: playlistItem.snippet.thumbnails.high?.url || 
                   playlistItem.snippet.thumbnails.medium?.url || 
                   playlistItem.snippet.thumbnails.default?.url,
        publishedAt: formatDate(playlistItem.snippet.publishedAt),
        viewCount: videoDetails ? formatViewCount(videoDetails.statistics.viewCount) : '0',
        likeCount: videoDetails ? formatViewCount(videoDetails.statistics.likeCount) : '0',
        duration: videoDetails ? formatDuration(videoDetails.contentDetails.duration) : '0:00',
      };
    });
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
}

// 搜索频道视频（备用方案：如果不知道频道 ID，可以通过用户名搜索）
export async function searchChannelByHandle(handle: string): Promise<YouTubeChannel | null> {
  try {
    // 去掉 @ 符号
    const cleanHandle = handle.replace('@', '');
    
    const response = await fetch(
      `${YOUTUBE_API_BASE}/search?part=snippet&type=channel&q=${cleanHandle}&key=${YOUTUBE_CONFIG.API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search channel');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    // 获取第一个匹配的频道的详细信息
    return getChannelInfo();
  } catch (error) {
    console.error('Error searching channel:', error);
    return null;
  }
}
