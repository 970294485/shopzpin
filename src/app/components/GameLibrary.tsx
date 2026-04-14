import React from "react";
import { ArrowRight, Star } from "lucide-react";
import luckyWheelImg from "../../imports/game-colour-spin-150x150.png";
import whackAMoleImg from "../../imports/game-whack-the-mole-150x150.png";
import memoryGameImg from "../../imports/game-memory-game-150x150.png";
import countTheSheepImg from "../../imports/game-count-the-sheep-150x150.png";

const games = [
  {
    title: "幸運轉盤",
    category: "收集潛在客戶",
    popularity: "最受歡迎",
    image: luckyWheelImg,
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "打地鼠",
    category: "互動參與",
    popularity: "高轉換率",
    image: whackAMoleImg,
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "記憶遊戲",
    category: "提升客單價",
    popularity: "趨勢",
    image: memoryGameImg,
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "數綿羊",
    category: "顧客留存",
    popularity: "最新",
    image: countTheSheepImg,
    color: "from-rose-400 to-red-500"
  }
];

export function GameLibrary() {
  return (
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#ffcb05] font-semibold tracking-wide uppercase text-sm mb-3">遊戲庫</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              適合各種行銷活動的範本
            </h3>
            <p className="text-lg text-slate-400">
              瀏覽我們高轉換率的互動遊戲系列。每個範本都可以完全客製化，以符合您商店的品牌形象。
            </p>
          </div>
          <a href="https://www.klick2play.com/" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-[#ffcb05] hover:text-white font-bold transition-colors">
            查看所有遊戲 <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl flex flex-col h-full hover:border-[#ffcb05]/50 transition-all duration-300 hover:-translate-y-1">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-slate-900 flex items-center justify-center p-4">
                <div className={`absolute inset-0 bg-gradient-to-tr opacity-60 z-10 ${game.color} mix-blend-multiply`}></div>
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className={`w-full h-full group-hover:scale-110 transition-transform duration-700 relative z-0 ${['幸運轉盤', '打地鼠', '記憶遊戲', '數綿羊'].includes(game.title) ? 'object-contain' : 'object-cover absolute inset-0'}`}
                />
                <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-sm text-xs font-bold text-white px-2 py-1 rounded-md flex items-center gap-1 border border-slate-700">
                  <Star className="w-3 h-3 text-[#ffcb05] fill-current" /> {game.popularity}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{game.category}</div>
                <h4 className="text-xl font-bold text-white mb-4">{game.title}</h4>
                
                <div className="mt-auto pt-4">
                  <a href="https://www.klick2play.com/" target="_blank" rel="noopener noreferrer" className="block text-center w-full py-2.5 rounded-lg border border-slate-600 text-sm font-bold text-white hover:bg-[#ffcb05] hover:text-slate-900 hover:border-[#ffcb05] transition-colors">
                    預覽遊戲
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <a href="https://www.klick2play.com/" target="_blank" rel="noopener noreferrer" className="w-full mt-8 md:hidden flex justify-center items-center gap-2 text-[#ffcb05] font-bold py-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
          查看所有遊戲 <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}