import React from "react";
import { UserPlus, Settings2, QrCode, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="w-8 h-8 text-slate-900" />,
    title: "註冊並選擇遊戲",
    description: "無需編寫程式碼，即可註冊並選擇適合您品牌的遊戲。"
  },
  {
    number: "02",
    icon: <Settings2 className="w-8 h-8 text-slate-900" />,
    title: "設定您的行銷活動",
    description: "建立您獨一無二的行銷活動，以帶動流量、獲取新客並提升銷售。"
  },
  {
    number: "03",
    icon: <QrCode className="w-8 h-8 text-slate-900" />,
    title: "顧客開始遊戲",
    description: "顧客可以掃描您店內的 QR Code，或在我們的 Finyours 平台上找到您的品牌，開始參與遊戲活動。"
  },
  {
    number: "04",
    icon: <HeartHandshake className="w-8 h-8 text-slate-900" />,
    title: "顧客互動與參與",
    description: "透過趣味的遊戲化互動體驗，加深顧客與品牌的連結，有效提升忠誠度與回購率。"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-semibold tracking-wide uppercase text-sm mb-3">運作方式</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            不到 5 分鐘，從設定到達成銷售
          </h3>
          <p className="text-lg text-slate-600">
            我們讓遊戲化行銷變得無比簡單。今天就啟動您的第一個活動，完全不需要開發人員。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-10"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center relative z-10 mb-6 group hover:border-[#ffcb05] transition-colors duration-300">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ffcb05] text-slate-900 font-bold text-sm flex items-center justify-center border-2 border-white">
                  {step.number}
                </div>
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}