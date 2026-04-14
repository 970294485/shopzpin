import React from "react";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "入門版",
    price: "$399",
    period: "/月",
    description: "適合希望增加名單的新手商家。",
    features: [
      "每月高達 5,000 次曝光",
      "幸運轉盤遊戲",
      "基本客製化",
      "電子郵件整合",
      "標準支援"
    ],
    highlighted: false
  },
  {
    name: "成長版",
    price: "$799",
    period: "/月",
    description: "適合準備大幅提升轉換率的成熟商店。",
    features: [
      "每月高達 50,000 次曝光",
      "所有遊戲類型（轉盤、打地鼠、記憶遊戲）",
      "進階受眾定位與觸發條件",
      "A/B 測試功能",
      "優先支援",
      "移除商標"
    ],
    highlighted: true
  },
  {
    name: "專業版",
    price: "$8099",
    period: "/月",
    description: "需要發揮最大效能的高流量商家。",
    features: [
      "無限曝光次數",
      "專屬遊戲建立",
      "專屬客戶經理",
      "客製化整合支援",
      "API 存取權限",
      "進階分析與報表"
    ],
    highlighted: false
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            簡單透明的定價
          </h2>
          <p className="text-lg text-slate-600">
            從 14 天免費試用開始。無需信用卡，隨時可升級或取消。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'bg-slate-900 text-white shadow-xl scale-105 relative z-10' 
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ffcb05] text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  最受歡迎
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                {plan.description}
              </p>
              
              <button className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors mb-8 ${
                plan.highlighted 
                  ? 'bg-[#ffcb05] text-slate-900 hover:bg-[#e6b604]' 
                  : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
              }`}>
                開始免費試用 <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="space-y-4">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-[#ffcb05]' : 'text-amber-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}