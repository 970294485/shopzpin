import { Features as FeaturesComponent } from "../components/Features";
import { GameLibrary } from "../components/GameLibrary";
import { ArrowRight, Code } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Features() {
  return (
    <div className="pt-20">
      <div className="relative py-24 md:py-32 text-center px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1649655889000-275b65602343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNhZGUlMjBuZW9uJTIwZ2FtZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc2MTU1OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Game Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffcb05]/20 text-[#ffcb05] text-sm font-bold tracking-wider uppercase mb-6 border border-[#ffcb05]/30 shadow-[0_0_15px_rgba(255,203,5,0.2)]">
            行銷功能
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            強大功能與遊戲庫
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            透過 Shopzpin 的多樣化互動遊戲與強大行銷工具，輕鬆打造高轉換率的專屬活動。
            告別無聊的彈出視窗，用遊戲化體驗吸引顧客！
          </p>
        </div>
      </div>
      <GameLibrary />
      <FeaturesComponent />

      {/* API Feature Section */}
      <div className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-[#ffcb05] text-sm font-bold mb-6">
                <Code className="w-4 h-4" />
                開發者友善
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                開放式 API 串接 <br/>
                <span className="text-slate-600 font-medium text-2xl">無縫整合您的現有系統</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Shopzpin 提供完善且安全的 RESTful API，讓您的工程團隊可以輕鬆串接現有的 POS、CRM、ERP 等系統。將遊戲化行銷體驗無縫融入到您自家的 App 或網站，實現一體化的營運管理。
              </p>
              
              <ul className="space-y-4 mb-10">
                {['同步會員、點數與優惠券資料', '即時 Webhook 訂單與狀態推送', '沙盒環境測試，確保上線穩定', '完整的線上開發者說明文件'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ffcb05] text-slate-900 flex items-center justify-center font-bold text-xs">✓</div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/api-docs" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl group">
                查看 API 文件
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-[#ffcb05] rounded-3xl translate-x-4 translate-y-4 opacity-20"></div>
              <div className="relative bg-slate-900 p-2 rounded-3xl shadow-2xl border border-slate-700">
                <div className="flex gap-2 px-4 py-3 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1775994121064-e75fa6f3e84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBBUEklMjBzY3JlZW58ZW58MXx8fHwxNzc2MTU3MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="API Documentation & Code" 
                  className="w-full h-auto rounded-b-2xl object-cover mix-blend-screen opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}