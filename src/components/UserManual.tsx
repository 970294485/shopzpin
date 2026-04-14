import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Menu, X, MonitorPlay, ShoppingBag, Target, Settings, CreditCard, ChevronDown } from "lucide-react";

export function UserManual() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "overview": true,
    "store-management": true,
    "sales-platform": true,
    "marketing": true,
    "settings": true,
    "pricing": true
  });

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const manualData = [
    {
      id: "overview",
      title: "1. 概述",
      icon: MonitorPlay,
      items: [
        { id: "1.1", title: "1.1 儀表板", content: "儀表板的作用為了讓商戶能夠查閱其下加入 SHOPZPIN 店鋪的經營狀態：例如每日/月訂單數、截至目前總收入、及新加入客戶等等。最上方的四個選項亦可讓商戶快速設定 SHOPZPIN 裡面的四項主要功能，讓大家可以迅速建立自己的 PWA 網店。" },
        { id: "1.2", title: "1.2 訂閱", content: "這頁面將會顯示商戶目前訂閱 SHOPZPIN 服務的現況：可開設 PWA 分店數量、可加入的商品項目數量 (SKU)、以及能增設員工帳戶數量。而點擊細節則可查看目前訂閱等級所包括的服務功能。" },
        { id: "1.3", title: "1.3 報告", content: "「報告」為更仔細 PWA 營運報表，商戶可於此查看各種銷售相關的報告，以及其設立的迎新優惠碼及禮品卡的使用情況，或者其 SMS 短訊使用量（主要用作認証新加入會員）。" },
      ]
    },
    {
      id: "store-management",
      title: "2. 店舖管理",
      icon: ShoppingBag,
      items: [
        { id: "2.1", title: "2.1 訂單", content: "這個頁面將顯示所有客戶所提交的訂單詳情，不論經手機應用或網上商店，全都顯示於此。另外點擊最右方的紅色「細節」，則可以看到該訂單的詳細資料：下單商品、接單的分店及如何付款等。你會看見在訂單狀態中見到紅色 [已取消]，這個其中一個原因是因為當客人在櫃檯付款時，店員沒有跟以下程序做收款。過了時間後就會自動轉為已取消。按下訂單 > 更新狀態 > 完成標誌才算完成訂單，否則訂單無法視為已付款訂單。" },
        { id: "2.2.1", title: "2.2.1 我的產品", content: "這裡為商戶於 SHOPZPIN 所建立的網上商城所使用的商品後台。商戶可以在此加入並管理在網上商城中的產品（例如設定價錢及加入相片、或將貨品上下架等動作）。\n\n*注意：目前網上商城與手機應用（PWA）的商品資料庫並非互通，建立新商品時請僅記分別為兩邊各自建立新產品。商品件數是根據你所選購的方案而定。" },
        { id: "2.2.2", title: "2.2.2 物品種類", content: "這裡為 PWA 及網上商城中商品設立分類的地方，建立後商戶將能夠更有效將同類的商品置於同一類別中，方便客人瀏覽選購。而沒有置於任何一個分類的商品，則不會顯示於手機應用及網上商城中，所以在建立一個新商品前請先選擇或建立其相關的物品種類。" },
        { id: "2.3.1", title: "2.3.1 客戶", content: "在這部份商戶可查看已加入成會員的客戶及其所提供的資料（電話、電郵），以及其在商戶 PWA 中的消費金額和其所擁有的優惠券。另外有需要時，商戶亦能夠為忘記自己登入密碼的會員重設密碼。" },
        { id: "2.3.2", title: "2.3.2 客戶群", content: "用於以特定條件去將現有及將來新加入的會員分成特地群組的工具，商戶可以在右上角的「創建客戶群」中的「增加新條件」中設定分組條件（例：目前花費多於一定金額的會員）。而這個功能最大用處是以快速選擇需要派發優惠碼或限定特定會員參與活動時使用。" },
      ]
    },
    {
      id: "sales-platform",
      title: "3. 銷售平台",
      icon: ShoppingBag,
      items: [
        { id: "3.1", title: "3.1 網上商城-設立網店", content: "「網上商城」一個獨立於應用程式的銷售平台，以網絡瀏覽器為主要平台的網店。其優勢在於不論流動裝置或電腦平台上均能瀏覽使用，而且外觀上有更多的外觀模版可供選擇。\n\n• 商店名稱：在瀏覽器分頁上顯示的名稱。\n• 稅號及銷售稅：香港商戶只需要填0000及0即可。\n• 簡短說明：用作介紹商戶網上商城，讓用戶能夠快速暸解你的生意。\n• 商店標誌：用於顯示在網上商店的公司/組織標誌。\n• 四捨五入：自動將價錢調整，方便後續結算用。" },
        { id: "3.2", title: "3.2 分行管理", content: "在開始使用 PWA 前，商戶都需要開設一個分店才能使用後續的功能（遊戲、禮券等），在右上角的「創造分店」中商戶則可以創分店，只需要按頁面中的欄目填入資料即可。\n\n分行主題顏色可用作調整 PWA 中店面的主題顏色的頁面。分行產品庫存用作管理貨品庫存數量用途，「On Sales」一欄指在 PWA 販賣中，該方格為紫色時即為上架中，點擊它則能將貨品下架。" },
      ]
    },
    {
      id: "marketing",
      title: "4. 市場行銷",
      icon: Target,
      items: [
        { id: "4.1", title: "4.1 二維碼", content: "製作各種營運用的二維碼的頁面：由直接顯示網店、分店選擇頁面、去指定的分店、或直接連到 PWA 去的二維碼。而左下方「在 QR 碼上覆蓋徽標」，則讓商戶可以自行在二維碼中加入自己想要的標記。" },
        { id: "4.2", title: "4.2 促銷活動", content: "促銷交易類別：用以設定優惠使用方式，分店促銷則應用於 PWA 網店消費時。優先事項決定同時間有多於一個促銷活動在進行時，優先次序較高者會優先應用到該訂單中。可以設定如「買一送一」、「免運費」及「滿額折扣」等活動。" },
        { id: "4.3", title: "4.3 促銷代碼", content: "操作上與前的「促銷活動」大致相同，但可以設置更多領取及使用上限制：例如設置領取上限（有效期間無限用量/每日限定一定數量/該代碼最高使用次數）。「客戶資格」則能夠使用該促銷代碼的資格，這裡的選項將會依商戶設置「客戶群」而有所改變。" },
        { id: "4.4", title: "4.4 優惠券", content: "這裡可以建立 SHOPZPIN 中使用的優惠券，其不同處在於可以讓用戶藉由 PWA 同遊玩遊戲、或由員工直接經商戶專用程式派發予用戶。「適用於」分成三種：「小計」是以整個訂單的總數作折扣、「送貨費」就是對運費方面作各種優惠、「特定產品」則是對指定的產品作出優惠。" },
        { id: "4.5", title: "4.5 印花", content: "用作設定收集印花活動作促銷的頁面。在設定時請注意要先「優惠券」的頁面將優惠券預先設置成「僅限印花活動」，否則將無法立新的印花促銷活動。目前商戶能設定「購買指定貨品來取得印花」。" },
        { id: "4.6", title: "4.6 WhatsApp 營銷", content: "此頁面為管理及設定使用 WhatsApp 作營銷方面的功能。WhatsApp 模板建立時請注意內文單純以英語及數字的話，其總字數上限為 153 個字符；而以中文及其他語言的話，最大總字數則為 63 個字符。通知設定可以設定在特定情況下，自動向客戶發 WhatsApp 訊息（如會員生日、預訂生效及到期日）。" },
        { id: "4.7", title: "4.7 電子郵件行銷", content: "用作建立向已成為會員的用戶大量發放推廣電郵、或為電子郵件配額儲值的地方。\n\n• 行銷模板：商戶可以從預好的板面中，自行加入或更改文字，並替換內容圖片來建立一個屬於自己的 eDM 電子郵件！\n• 被遺棄的購物車：當用戶在應用程式添加貨品於購物車，但未有完全交易時，系統會自動發送電郵提醒用戶。\n• 批量邀請：商戶可以使用手上已有的電郵名單，發放邀請電郵。" },
      ]
    },
    {
      id: "settings",
      title: "5. 設定",
      icon: Settings,
      items: [
        { id: "5.1", title: "5.1 付款方案", content: "此頁面是用來設定應用程式商店的收款方式，SHOPZPIN 與 WONDER 合作，提供更低的手續費優惠。" },
        { id: "5.2", title: "5.2 PWA 設定", content: "PWA 即是漸進式網絡應用程式，打開瀏覽器建立屬於你的應用程式。可以設定形像標識（加入手機主畫面時的圖案）、應用名稱及簡稱、主題顏色（PWA 主頁面中各部的顏色配置）等。" },
        { id: "5.3", title: "5.3 遊戲化", content: "用作設定 PWA 中用戶能夠遊玩的遊戲設定，當中「遊戲化設定」是設定和遊戲網站 Klick2Play 互相連接時所需要的設定教學。\n\n遊戲積分設定：\n• 完成訂單獲取積分：設定每消費一定金額來換取多少次進行遊戲機會。\n• 兌換忠誠度積分：忠誠度可以藉由用戶購物或是進行遊戲來獲得。\n• 每日登入獎勵：設定用戶每日登入 PWA 的遊戲時可以獲取進行遊戲的積分。\n\n完成 Klick2Play 設置後，會員玩遊戲所獲得的優惠券會自動加入會員賬號。" },
        { id: "5.4", title: "5.4 帳戶詳細資料", content: "用來查看商戶目前登入帳號的資料，並可以更改其顯示的名稱、所用的電子郵件、更改地址以及更改目前帳號的密碼。\n*注意：你的使用者名稱會直接作為你的網址 Domain，請謹慎考慮使用者名稱。" },
        { id: "5.5", title: "5.5 員工", content: "商戶可根據員工職位，而決定他們的擁有權限。而「建立員工帳戶」是開設一個帳號讓員工可以登入 PWA 的後台中進行各種權限所及的工作。人員配額數量是根據你所選購的方案而定。" },
      ]
    },
    {
      id: "pricing",
      title: "6. 方案價錢",
      icon: CreditCard,
      items: [
        { id: "6.1", title: "6.1 價目表", content: "我們提供進階方案：包含 Digital Payment 訂單管理 + CRM & Loyalty 會員制度 + 建立及無限產出優惠券 e-coupon + Online Promotion 網上推廣等。亦提供 SEO & SEM 服務（價值關鍵字，網站健康分析、SEO策略制定、優化網站內容）以及社交媒體專頁推廣貼文等服務。" },
      ]
    }
  ];

  // Scroll to section when clicked
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Observe scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = manualData.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(manualData[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredData = manualData.map(section => {
    if (!searchQuery) return section;
    const matchingItems = section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, items: matchingItems };
  }).filter(section => section.items.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-20 min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Hero Header */}
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ffcb05]/10 via-slate-900 to-slate-900"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffcb05]/20 text-[#ffcb05] text-sm font-semibold mb-4 border border-[#ffcb05]/30">
            Shopzpin 使用說明書
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Shopzpin 用戶手冊</h1>
          
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#ffcb05] outline-none transition-all placeholder:text-slate-400"
              placeholder="搜尋使用手冊內容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm text-slate-900 font-medium"
          >
            <span className="flex items-center gap-2">
              <Menu className="w-5 h-5 text-[#ffcb05]" />
              目錄導覽
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`w-full md:w-72 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">目錄</h3>
            <nav className="space-y-1">
              {manualData.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isExpanded = expandedMenus[section.id];
                
                return (
                  <div key={section.id} className="mb-2">
                    <button
                      onClick={() => {
                        scrollToSection(section.id);
                        if (!isExpanded) toggleMenu(section.id);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-[#ffcb05]/10 text-slate-900 font-bold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#ffcb05]' : 'text-slate-400'}`} />
                        <span className="text-sm">{section.title}</span>
                      </div>
                      <ChevronRight 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(section.id);
                        }}
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    </button>
                    
                    {/* Sub-items in sidebar */}
                    {isExpanded && (
                      <div className="ml-9 mt-1 space-y-1 border-l border-slate-100 pl-2 py-1">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              const el = document.getElementById(`content-${item.id}`);
                              if (el) {
                                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                              }
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-2 py-1.5 text-xs text-slate-500 hover:text-[#ffcb05] hover:bg-slate-50 rounded transition-colors truncate"
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 lg:p-12 mb-16">
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">找不到相關內容</h3>
              <p className="text-slate-500">嘗試使用不同的關鍵字搜尋。</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredData.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#ffcb05] flex items-center justify-center shadow-sm">
                      <section.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-10 pl-2 md:pl-6">
                    {section.items.map((item) => (
                      <div key={item.id} id={`content-${item.id}`} className="scroll-mt-28">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#ffcb05]"></span>
                          {item.title}
                        </h3>
                        <div className="prose prose-slate prose-amber max-w-none text-slate-600 leading-relaxed">
                          {item.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 text-base">
                              {paragraph.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                  {line}
                                  {i < paragraph.split('\n').length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}