import React from "react";
import { Gamepad2, Sparkles, Target, Users, MousePointerClick, Puzzle } from "lucide-react";

const features = [
  {
    icon: <Target className="w-6 h-6 text-slate-900" />,
    title: "幸運轉盤",
    description: "用互動轉盤取代無聊的電子郵件彈出視窗。讓購物者贏取折扣，同時建立您的客戶名單。"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-slate-900" />,
    title: "打地鼠",
    description: "營造遊戲趣味感。讓購物者透過打地鼠遊戲，享受捕捉隱藏折扣的樂趣。"
  },
  {
    icon: <Gamepad2 className="w-6 h-6 text-slate-900" />,
    title: "記憶遊戲",
    description: "考驗購物者的記憶力。讓他們在配對遊戲中尋找並贏得專屬折扣優惠。"
  },
  {
    icon: <MousePointerClick className="w-6 h-6 text-slate-900" />,
    title: "退出意圖彈出視窗",
    description: "在用戶準備離開時準確觸發遊戲，在他們跳出前捕捉銷售機會。"
  },
  {
    icon: <Users className="w-6 h-6 text-slate-900" />,
    title: "忠誠度任務",
    description: "讓他們不斷回訪。為社交分享、評論和購買等行為獎勵積分。"
  },
  {
    icon: <Puzzle className="w-6 h-6 text-slate-900" />,
    title: "一鍵整合",
    description: "與 Shopify、WooCommerce、BigCommerce 以及您最愛的電子郵件行銷工具無縫運作。"
  }
];

export function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-amber-500 font-semibold tracking-wide uppercase text-sm mb-3">遊戲化工具</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            將訪客變成買家所需的一切
          </h3>
          <p className="text-lg text-slate-600">
            拋棄傳統表單。透過互動體驗吸引您的受眾，同時收集潛在客戶並推動銷售。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#ffcb05]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#ffcb05] flex items-center justify-center mb-6 shadow-lg shadow-[#ffcb05]/20">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}