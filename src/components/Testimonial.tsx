import React from "react";
import { Star, Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="grid lg:grid-cols-2">
            
            <div className="p-12 lg:p-16 flex flex-col justify-center relative">
              {/* decorative accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#ffcb05]"></div>

              <Quote className="w-12 h-12 text-[#ffcb05] mb-6 opacity-80" />
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                「我們在星期二安裝了 Shopzpin。到了星期五，我們的電子郵件名單成長了 400%，這週的營收也提升了 22%。它帶來的效益遠遠超過了它的成本！」
              </h3>
              <div className="flex items-center gap-1 text-[#ffcb05] mb-8">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              
              <div>
                <div className="font-bold text-white text-lg">莎拉·詹金斯 (Sarah Jenkins)</div>
                <div className="text-slate-400">Bloom & Wild Co. 創辦人</div>
              </div>
              
              <div className="mt-8 flex gap-6 border-t border-slate-800 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[#ffcb05] mb-1">+400%</div>
                  <div className="text-sm text-slate-400">電子郵件訂閱</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ffcb05] mb-1">+22%</div>
                  <div className="text-sm text-slate-400">每週營收</div>
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1752650732081-8f61e81813ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwc21hbGwlMjBidXNpbmVzcyUyMG93bmVyJTIwZmVtYWxlfGVufDF8fHx8MTc3NjE1MDE3MHww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Smiling Merchant" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}