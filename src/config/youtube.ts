// YouTube API Configuration
// 请在这里填写你的 YouTube API Key 和频道信息

export const YOUTUBE_CONFIG = {
  // 你的 YouTube API Key 
  // 获取方式：https://console.cloud.google.com/apis/credentials
  API_KEY: 'AIzaSyDGW3AYi3a_-I1L9Yi_crjEWqMe7rubdac',
  
  // 你的 YouTube 频道 ID
  // 获取方式：访问你的 YouTube 频道，URL 中的部分就是频道 ID
  // 例如：https://www.youtube.com/@PawfectEncounters
  // 频道 ID 可能是：UCxxxxxxxxxxxxxxxxxxx 或 @PawfectEncounters
  CHANNEL_ID: '@pawfectencounters',
  
  // 每次获取的视频数量
  MAX_RESULTS: 8,
};

// YouTube API 基础 URL
export const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
