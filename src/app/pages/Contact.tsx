import React from "react";
import { Mail } from "lucide-react";

export function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">聯絡我們</h1>
          <p className="text-xl text-slate-400">
            想了解更多關於 Shopzpin 的服務？或是需要客製化解決方案？<br />
            請填寫以下表單，我們的專員將盡快與您聯繫。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          
          {/* Form Section */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/20">
            <form className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  公司/品牌名稱 *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="您的公司或品牌/業務名稱" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcb05] focus:ring-1 focus:ring-[#ffcb05] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    姓名 *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="我們該如何稱呼您？" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcb05] focus:ring-1 focus:ring-[#ffcb05] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    聯絡電話 *
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="我們該如何與您聯絡？" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcb05] focus:ring-1 focus:ring-[#ffcb05] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  電子郵件 *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcb05] focus:ring-1 focus:ring-[#ffcb05] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  訊息 *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="告訴我們更多關於您的專案細節..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#ffcb05] focus:ring-1 focus:ring-[#ffcb05] transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-[#ffcb05] hover:bg-[#e6b604] text-slate-900 font-bold px-6 py-4 rounded-lg transition-colors shadow-lg shadow-[#ffcb05]/20 mt-4"
              >
                送出訊息
              </button>

            </form>
          </div>

          {/* Contact Info Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/20 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6">聯絡資訊</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ffcb05]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#ffcb05]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">電子郵件</p>
                    <a href="mailto:enquiry@shopzpin.store" className="text-white hover:text-[#ffcb05] transition-colors">
                      enquiry@shopzpin.store
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">我們的承諾</h4>
                <p className="text-sm text-slate-400">
                  我們會在收到您的訊息後 1-2 個工作天內由專人與您聯絡，為您提供最適合的行銷解決方案。
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
