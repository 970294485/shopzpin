import React, { useState, useEffect } from "react";
import { Play, Plus, Video, X } from "lucide-react";

interface VideoPost {
  id: string;
  url: string;
  title: string;
  date: string;
}

export function VideoPage() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");

  useEffect(() => {
    // Load from local storage for demo purposes
    const saved = localStorage.getItem("shopzpin-videos");
    let loadedVideos = [];
    
    if (saved) {
      try {
        loadedVideos = JSON.parse(saved);
        // Force update the default video's date to 2024-01-17 for demo purposes
        const defaultVideo = loadedVideos.find((v: VideoPost) => v.id === "1" || v.url === "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        if (defaultVideo) {
          defaultVideo.date = "2024-01-17T00:00:00.000Z";
        }
      } catch (e) {
        console.error("Failed to parse videos");
      }
    } 
    
    if (loadedVideos.length === 0) {
      // Default placeholder videos
      loadedVideos = [
        {
          id: "1",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Shopzpin 平台功能介紹",
          date: "2024-01-17T00:00:00.000Z",
        }
      ];
    }
    
    setVideos(loadedVideos);
  }, []);

  const saveVideos = (updatedVideos: VideoPost[]) => {
    setVideos(updatedVideos);
    localStorage.setItem("shopzpin-videos", JSON.stringify(updatedVideos));
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoUrl || !newVideoTitle) return;

    const newVideo: VideoPost = {
      id: Date.now().toString(),
      url: newVideoUrl,
      title: newVideoTitle,
      date: new Date().toISOString(),
    };

    saveVideos([newVideo, ...videos]);
    setNewVideoUrl("");
    setNewVideoTitle("");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    saveVideos(videos.filter(v => v.id !== id));
  };

  // Helper to get embed URL for YouTube
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    
    // Handle youtube.com/watch?v=
    if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    } 
    // Handle youtu.be/
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const isYouTube = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Video className="w-8 h-8 text-[#ffcb05]" />
              影片教學
            </h1>
            <p className="mt-2 text-slate-600">
              在此管理並發布與 Shopzpin 相關的教學與宣傳影片
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#ffcb05] hover:bg-[#e6b604] text-slate-900 px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-[#ffcb05]/20"
          >
            <Plus className="w-5 h-5" />
            新增影片
          </button>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-slate-400 ml-1" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">目前尚無影片</h3>
            <p className="text-slate-500 mt-2 mb-6">點擊上方按鈕新增您的第一支影片連結</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              立即新增
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group relative">
                <button 
                  onClick={() => handleDelete(video.id)}
                  className="absolute top-3 right-3 z-10 bg-slate-900/50 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                  title="刪除影片"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="aspect-video w-full bg-slate-100 relative">
                  {isYouTube(video.url) ? (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <video 
                      src={video.url} 
                      controls 
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      您的瀏覽器不支援影片播放。
                    </video>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {new Date(video.date).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')} 發布
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">新增影片連結</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddVideo} className="p-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    影片標題 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="請輸入影片標題"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#ffcb05] focus:ring-2 focus:ring-[#ffcb05]/20 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
                    影片連結 (支援 YouTube 或 MP4 網址) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="url"
                    type="url"
                    required
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#ffcb05] focus:ring-2 focus:ring-[#ffcb05]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-slate-900 bg-[#ffcb05] hover:bg-[#e6b604] rounded-lg transition-colors shadow-sm"
                >
                  確認發布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}