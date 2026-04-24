import React, { useState } from "react";
import { Zap, Play, CheckCircle, X } from "lucide-react";
import { motion } from "motion/react";
import luckyWheelImport from "../imports/game-colour-spin-150x150.png";
const luckyWheelImg = typeof luckyWheelImport === 'object' && luckyWheelImport !== null ? (luckyWheelImport as any).src : luckyWheelImport;

const bgImage = "https://images.unsplash.com/photo-1645109870868-e1b6f909e444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5aW5nJTIwbW9iaWxlJTIwZ2FtZXxlbnwxfHx8fDE3NzYxNTUyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section 
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-slate-900/85"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#ffcb05]/15 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffcb05]/10 text-[#ffcb05] text-sm font-semibold mb-6 border border-[#ffcb05]/20">
                <Zap className="w-4 h-4 mr-2" />
                首選商家遊戲化行銷平台
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                將隨意逛逛的訪客變成 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcb05] to-amber-200">忠實顧客</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                透過互動彈出視窗、幸運轉盤和打地鼠，將電商轉換率提升高達 15%。
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#ffcb05] hover:bg-[#e6b604] text-slate-900 rounded-lg font-bold transition-all shadow-lg shadow-[#ffcb05]/20">
                  開始免費試用
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" /> 觀看演示
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 text-sm font-medium text-slate-400 sm:flex-row sm:flex-wrap sm:gap-6 lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#ffcb05]" /> 無需編寫程式碼
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#ffcb05]" /> 14 天免費試用
                </div>
              </div>
            </motion.div>
          </div>

          {/* Graphic/Mockup */}
          <div className="relative mt-16 min-w-0 lg:col-span-6 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-3 shadow-2xl backdrop-blur-sm sm:p-4"
            >
              {/* Dashboard Mockup Header */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffcb05]"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="mx-auto bg-slate-900 rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-700 font-mono">
                  app.shopzpin.com
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">今日潛在客戶</div>
                  <div className="text-2xl font-bold text-white">1,248</div>
                  <div className="text-[#ffcb05] text-xs mt-1 flex items-center gap-1">
                    ↑ 較昨日提升 12.5%
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">轉換率</div>
                  <div className="text-2xl font-bold text-white">8.4%</div>
                  <div className="text-[#ffcb05] text-xs mt-1 flex items-center gap-1">
                    ↑ 較昨日提升 2.1%
                  </div>
                </div>
              </div>

              {/* Floating Wheel Graphic */}
             
             {/*}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-8 -bottom-8 w-48 h-48 flex items-center justify-center"
              >
                <img 
                  src={luckyWheelImg} 
                  alt="幸運轉盤" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>*/}

              {/* Popup Mockup */}
          {/*   <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-6 -bottom-4 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-56 text-slate-800"
              >
                <div className="text-center mb-3">
                  <span className="text-2xl">🎁</span>
                  <div className="font-bold text-sm mt-1">恭喜獲得 8 折優惠！</div>
                  <div className="text-xs text-slate-500">請使用優惠碼 WINNER20</div>
                </div>
                <button className="w-full bg-[#ffcb05] text-slate-900 text-xs py-2 rounded font-bold hover:bg-[#e6b604] transition-colors">
                  領取折扣
                </button>
              </motion.div> 

              {/* Video Thumbnail Popup */}
              {/*
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-8 -right-4 sm:-right-8 lg:-right-12 w-48 sm:w-56 md:w-64 bg-slate-800 rounded-xl shadow-2xl border-2 border-[#ffcb05] p-1.5 cursor-pointer group z-20 hover:scale-105 transition-transform"
                onClick={() => setIsVideoOpen(true)}
                title="觀看平台演示影片"
              >
                <div className="relative rounded-lg overflow-hidden aspect-video">
                  <img 
                    src="https://img.youtube.com/vi/iOh7lOhfCwI/maxresdefault.jpg" 
                    alt="影片預覽" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/10 transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffcb05] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,203,5,0.5)] transform group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-slate-900 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>*/}

            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex min-h-0 items-center justify-center overflow-y-auto overscroll-contain bg-slate-900/90 p-3 backdrop-blur-sm sm:p-4">
          <div className="relative my-auto aspect-video w-full max-h-[85dvh] max-w-5xl animate-in overflow-hidden rounded-xl bg-black shadow-2xl fade-in duration-200 zoom-in-95 sm:rounded-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute right-2 top-2 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-slate-900/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-red-500 sm:right-4 sm:top-4"
              title="關閉影片"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
            <video
              src="/Shopzpin.mp4"
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
              title="Shopzpin 平台演示"
            >
              您的瀏覽器不支援影片播放。
            </video>
          </div>
        </div>
      )}
    </section>
  );
}