import React from "react";
import { Handshake, Building2, Cpu, LineChart, Globe2, ShieldCheck, PlayCircle, Trophy } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import partnerImport from "../imports/下載_(2).jpg";
const partnerImg = typeof partnerImport === 'object' && partnerImport !== null ? (partnerImport as any).src : partnerImport;

export function Partners() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <div className="bg-slate-900 py-24 md:py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffcb05] opacity-10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600 opacity-20 blur-[80px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffcb05]/20 text-[#ffcb05] text-sm font-bold tracking-wider uppercase mb-6 border border-[#ffcb05]/30 shadow-[0_0_15px_rgba(255,203,5,0.2)]">
            合作與資源
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            共創雙贏的合作夥伴網絡
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            透過強大的合作生態系，我們與數碼港 (Cyberport) 等頂尖機構攜手合作，協助您的企業數位轉型並達到最佳成長。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Cyberport & DTSPP Highlight Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200 shadow-xl relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcb05] opacity-20 blur-[50px]"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <div>
              <div className="inline-flex items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                <Globe2 className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                數碼轉型支援先導計劃 <br/>
                <span className="text-amber-600">(DTSPP)</span> 與 <span className="text-[#ffcb05] drop-shadow-sm bg-slate-900 px-2 py-1 rounded">Cyberport</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Shopzpin 深耕行銷科技，並榮獲香港數碼港 (Cyberport) 的支持與認可。我們積極參與「數碼轉型支援先導計劃 (DTSPP)」，協助中小企業以更低成本、更高效率完成數位轉型。
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1 flex-shrink-0">✓</div>
                  <span className="text-slate-700 font-medium">申請政府補助，降低數位轉��成本</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1 flex-shrink-0">✓</div>
                  <span className="text-slate-700 font-medium">獲得 Cyberport 專業生態圈資源支持</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1 flex-shrink-0">✓</div>
                  <span className="text-slate-700 font-medium">導入 Shopzpin 遊戲化行銷，加速營收增長</span>
                </li>
              </ul>
              <a 
                href="https://dtspp.cyberport.hk/zh-hk/%e6%96%b9%e6%a1%88%e4%be%9b%e6%87%89%e5%95%86/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <Handshake className="w-5 h-5 text-[#ffcb05] group-hover:scale-110 transition-transform" />
                了解如何申請 DTSPP
              </a>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
                <ImageWithFallback 
                  src={partnerImg} 
                  alt="Cyberport partnership"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <Building2 className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">官方合作</div>
                    <div className="text-lg font-extrabold text-slate-900">Cyberport 數碼港</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ffcb05] rounded-full flex items-center justify-center shadow-lg animate-bounce duration-[3000ms]">
                <Trophy className="w-10 h-10 text-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Other Partners / Benefits */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">為什麼成為我們的合作夥伴？</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">我們提供強大的技術支援與豐富的行銷資源，幫助您的客戶達成業務目標。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "深度技術整合", desc: "開放完整的 API 與 Webhook 串接，無縫整合您現有的 POS 或 CRM 系統。" },
            { icon: LineChart, title: "共同業務成長", desc: "加入夥伴計畫，享有豐厚的分潤獎金，與我們一起拓展 B2B SaaS 市場。" },
            { icon: ShieldCheck, title: "專業技術支援", desc: "專屬的合作夥伴技術支援團隊，提供一對一的系統導入顧問服務。" }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-sm text-center group">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                  <Icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}