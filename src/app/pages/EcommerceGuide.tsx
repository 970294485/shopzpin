import React, { useState } from "react";
import { BookOpen, TrendingUp, ShoppingBag, Target, ArrowLeft, Calendar, Share2 } from "lucide-react";

export function EcommerceGuide() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 0,
      title: "2026 電商行銷趨勢",
      description: "了解消費者行為的改變，以及如何利用互動式行銷吸引新一代的年輕客群。",
      icon: TrendingUp,
      date: "2026-04-10",
      content: (
        <>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            隨著 2026 年的到來，電子商務市場的競爭愈發激烈。消費者不再滿足於單純的「瀏覽與購買」流程，他們期待在購物過程中獲得更多娛樂與互動體驗。
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">今年最值得關注的三大電商行銷趨勢</h3>
          <ul className="space-y-6 mb-8">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffcb05] text-slate-900 font-bold flex items-center justify-center mt-1">1</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">互動式行銷的崛起</h4>
                <p className="text-slate-600 leading-relaxed">相較於傳統的橫幅廣告，數據顯示超過 70% 的年輕消費者更容易被互動式內容（如小遊戲、心理測驗）吸引。這不僅能增加他們在網站上的停留時間，更能大幅提升品牌記憶度。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffcb05] text-slate-900 font-bold flex items-center justify-center mt-1">2</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">個人化獎勵機制</h4>
                <p className="text-slate-600 leading-relaxed">利用 AI 分析顧客的購物軌跡與偏好，在最恰當的時機（例如將商品加入購物車卻遲遲未結帳時）推送專屬的折扣代碼或遊戲化獎勵。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffcb05] text-slate-900 font-bold flex items-center justify-center mt-1">3</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">社群購物與 UGC 結合</h4>
                <p className="text-slate-600 leading-relaxed">讓消費者主動分享他們的遊戲成果、中獎喜悅或購物體驗，形成自然的口碑行銷。這比任何花費高昂的付費廣告都來得真實且有效。</p>
              </div>
            </li>
          </ul>
          <div className="bg-slate-50 border-l-4 border-amber-500 p-6 rounded-r-lg mt-10">
            <p className="text-slate-800 font-medium leading-relaxed">
              Shopzpin 透過強大的遊戲化模組，正是為了幫助品牌抓住這些趨勢，輕鬆打造更具吸引力的購物環境。現在就開始讓您的商店煥然一新吧！
            </p>
          </div>
        </>
      )
    },
    {
      id: 1,
      title: "遊戲化行銷：從入門到精通",
      description: "透過遊戲機制如抽獎、刮刮樂等方式，有效提升會員註冊率與重複購買率。",
      icon: Target,
      date: "2026-03-25",
      content: (
        <>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            「遊戲化行銷」不僅僅是在網站上放一個小遊戲，而是一套完整的激勵系統。這篇文章將帶你從零開始了解如何運用它，讓枯燥的購物過程變成充滿驚喜的旅程。
          </p>
          
          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">第一步：設定明確的商業目標</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            在導入任何遊戲之前，你必須先問自己：這次活動的目的是什麼？你是想要提升電子報訂閱率、增加首次購買轉換，還是提高老客的留存與回購率？不同的目標決定了你該使用什麼樣的機制。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">第二步：選擇合適的互動機制</h3>
          <div className="grid gap-6 mb-8 mt-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold text-amber-600 mb-2 flex items-center gap-2">🎰 幸運轉盤</h4>
              <p className="text-slate-600 leading-relaxed">最適合用來收集顧客名單（Lead Generation）與發放首購優惠。視覺上的旋轉動態能產生極大的期待感，有效降低消費者留下 Email 的防備心。</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold text-amber-600 mb-2 flex items-center gap-2">🎟️ 數位刮刮樂</h4>
              <p className="text-slate-600 leading-relaxed">非常適合在顧客完成結帳後彈出（Post-purchase），透過刮開獎項的動作，發放下次購買的折價券，鼓勵回購。</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold text-amber-600 mb-2 flex items-center gap-2">📅 每日簽到</h4>
              <p className="text-slate-600 leading-relaxed">培養顧客定期回訪網站的習慣，並搭配累積點數系統，大幅提升品牌的 App 或網站開啟率。</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">第三步：設計誘人的獎勵結構</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            獎品不一定要是高額的現金折扣。免運券、專屬小贈品、會員紅利點數，甚至是「再來一次」的機會，只要配合充滿驚喜的揭曉過程，都能創造極佳的轉換率。關鍵在於讓顧客覺得他們「贏得」了這個優惠，而不是單純「被發放」。
          </p>
        </>
      )
    },
    {
      id: 2,
      title: "高轉換率商店的秘密",
      description: "分析成功商家的頁面設計、優惠券發放策略以及結帳流程優化。",
      icon: ShoppingBag,
      date: "2026-03-12",
      content: (
        <>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            為什麼有些電商網站的轉換率可以高達 5%，而有些卻總是在 1% 左右掙扎？關鍵在於對「細節」的無情優化。成功商家懂得在顧客猶豫的每一個節點推他們一把。
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-6">打造高轉換的三大心法</h3>
          
          <div className="space-y-8 mb-10">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-amber-600 font-bold text-xl">#1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">消除結帳摩擦</h4>
                <p className="text-slate-600 leading-relaxed">
                  結帳流程應該盡可能簡單直觀。提供多元的第三方登入（Google, Apple, Line）與一鍵支付方式，減少顧客填寫繁瑣表單的時間。記住，每一個多餘的點擊，都可能流失 5% 的潛在訂單。
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-amber-600 font-bold text-xl">#2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">聰明的優惠券發放策略</h4>
                <p className="text-slate-600 leading-relaxed">
                  不要只是把折扣碼呆板地貼在首頁橫幅上。聰明的商家會利用退出意圖（Exit-intent）觸發器：當系統偵測到顧客準備關閉分頁或離開網站時，突然彈出一個互動小遊戲送出限時優惠。根據 Shopzpin 的數據，這能挽回高達 20% 的流失客。
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-amber-600 font-bold text-xl">#3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">增強購買信任感</h4>
                <p className="text-slate-600 leading-relaxed">
                  清晰明瞭的退換貨政策、真實且附有圖片的顧客評價（Reviews），以及顯眼的安全結帳標章，都是降低顧客購買猶豫期的重要因素。當顧客感到安全，他們自然更願意掏出錢包。
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white p-8 md:p-10 rounded-2xl mt-12 text-center">
            <h4 className="text-2xl font-bold mb-4">準備好提升您的轉換率了嗎？</h4>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              結合 Shopzpin 的互動行銷工具，無縫整合至您的電商平台，今天就開始您的優化之旅。
            </p>
            <button className="bg-[#ffcb05] text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
              免費開始試用
            </button>
          </div>
        </>
      )
    }
  ];

  const currentArticle = selectedArticle !== null ? articles[selectedArticle] : null;

  return (
    <div className="pt-20 min-h-screen bg-slate-50 font-sans">
      {!currentArticle ? (
        <>
          <div className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffcb05]/20 via-slate-900 to-slate-900 opacity-60"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ffcb05]/20 text-[#ffcb05] text-sm font-bold tracking-wider mb-6 border border-[#ffcb05]/30">
                專業資源
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">電商指南</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                掌握最新的電子商務趨勢、遊戲化行銷策略，以及如何透過 Shopzpin 提升轉換率的實用技巧。
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => {
                const Icon = article.icon;
                return (
                  <div 
                    key={article.id} 
                    onClick={() => {
                      window.scrollTo({top: 0, behavior: 'smooth'});
                      setSelectedArticle(article.id);
                    }}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ffcb05] transition-all">
                      <Icon className="w-7 h-7 text-amber-600 group-hover:text-slate-900" />
                    </div>
                    <div className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {article.date}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">{article.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-8 flex-grow text-lg">
                      {article.description}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-amber-600 font-bold text-sm bg-amber-50 px-4 py-2 rounded-lg group-hover:bg-[#ffcb05] group-hover:text-slate-900 transition-colors">
                        閱讀全文 <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-slate-50 min-h-screen pb-24">
          <div className="bg-slate-900 pt-16 pb-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffcb05] opacity-10 blur-[100px] rounded-full"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center text-slate-300 hover:text-[#ffcb05] font-semibold transition-colors mb-12 group bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-[#ffcb05]/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                返回指南列表
              </button>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm mb-6">
                <span className="flex items-center gap-1.5 bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-4 py-1.5 rounded-full text-slate-300 font-medium">
                  <Calendar className="w-4 h-4" />
                  {currentArticle.date}
                </span>
                <span className="flex items-center gap-1.5 text-[#ffcb05] font-medium bg-[#ffcb05]/10 px-4 py-1.5 rounded-full border border-[#ffcb05]/20">
                  <BookOpen className="w-4 h-4" />
                  約 3 分鐘閱讀
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-sm">
                {currentArticle.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
                {currentArticle.description}
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 lg:p-16 mb-12">
              <div className="prose prose-lg prose-slate max-w-none">
                {currentArticle.content}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-300 pt-8 mt-12 gap-6">
              <button 
                onClick={() => {
                  window.scrollTo({top: 0, behavior: 'smooth'});
                  setSelectedArticle(null);
                }}
                className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-2 transition-colors group text-lg"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-[#ffcb05] group-hover:text-slate-900 transition-colors">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                閱讀更多文章
              </button>
              
              <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white border-2 border-slate-200 hover:border-[#ffcb05] shadow-sm hover:shadow-md px-6 py-3 rounded-xl transition-all">
                <Share2 className="w-5 h-5 text-amber-600" />
                分享此篇文章
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}