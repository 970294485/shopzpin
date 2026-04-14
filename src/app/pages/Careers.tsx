import React from "react";
import { Briefcase, MapPin, Clock, Users, ArrowRight, HeartHandshake, Zap, Trophy, Rocket } from "lucide-react";

export function Careers() {
  const jobs = [
    {
      id: 1,
      title: "資深前端工程師 (React)",
      department: "工程團隊",
      location: "香港 / 遠端",
      type: "全職",
    },
    {
      id: 2,
      title: "行銷企劃專員",
      department: "行銷團隊",
      location: "香港 (銅鑼灣)",
      type: "全職",
    },
    {
      id: 3,
      title: "商業開發經理 (B2B SaaS)",
      department: "業務團隊",
      location: "台北",
      type: "全職",
    },
    {
      id: 4,
      title: "UI/UX 設計師",
      department: "設計團隊",
      location: "台北 / 遠端",
      type: "全職",
    },
    {
      id: 5,
      title: "客戶成功經理 (CSM)",
      department: "客戶服務",
      location: "香港",
      type: "全職",
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <div className="bg-slate-900 py-24 lg:py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-600/30 via-slate-900 to-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffcb05]/20 text-[#ffcb05] text-sm font-bold tracking-wider uppercase mb-6 border border-[#ffcb05]/30">
            加入我們
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            一起打造未來的遊戲化行銷平台
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            我們正在尋找充滿熱情、喜歡挑戰的夥伴加入 Shopzpin。無論你是工程師、設計師還是行銷人才，這裡都有你的舞台！
          </p>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">為什麼選擇 Shopzpin？</h2>
          <p className="text-xl text-slate-600">我們重視每一位團隊成員的成長與福祉</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Rocket, title: "快速成長", desc: "扁平化組織，有機會參與核心產品開發，發揮巨大影響力。" },
            { icon: HeartHandshake, title: "彈性與信任", desc: "彈性上下班時間、部分職位支援遠端工作，我們信任你的專業。" },
            { icon: Trophy, title: "優渥福利", desc: "提供具競爭力的薪資、績效獎金，以及完善的健康檢查與保險。" },
            { icon: Zap, title: "持續學習", desc: "提供購書補助、進修課程津貼，鼓勵團隊成員不斷提升自我。" }
          ].map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#ffcb05] hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-slate-50 group-hover:bg-[#ffcb05] rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-7 h-7 text-amber-600 group-hover:text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{perk.title}</h3>
                <p className="text-slate-600 leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Job Openings */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-amber-600" /> 最新職缺
              </h2>
              <p className="text-slate-600">找到適合你的位置，開啟全新的職涯旅程。</p>
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-semibold transition-colors">
              查看所有職位
            </button>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="group border border-slate-200 hover:border-[#ffcb05] rounded-2xl p-6 transition-all hover:shadow-md cursor-pointer bg-slate-50 hover:bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                <div className="md:text-right flex items-center md:justify-end gap-3 text-amber-600 font-semibold group-hover:text-slate-900 transition-colors">
                  應徵此職位
                  <div className="w-10 h-10 rounded-full bg-amber-100 group-hover:bg-[#ffcb05] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-5 h-5 text-amber-700 group-hover:text-slate-900" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center border-t border-slate-200 pt-10">
            <p className="text-slate-600 mb-4">沒有找到合適的職缺嗎？</p>
            <p className="text-lg">
              我們隨時歡迎優秀人才加入！請將您的履歷與作品集發送至{" "}
              <a href="mailto:hr@shopzpin.com" className="text-amber-600 font-bold hover:text-amber-700 underline decoration-amber-200 underline-offset-4">hr@shopzpin.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}