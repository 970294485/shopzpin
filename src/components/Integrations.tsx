import React from "react";
import { ShoppingBag, CreditCard, ShieldCheck, ShoppingCart, Wallet } from "lucide-react";

export function Integrations() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-slate-500 font-semibold tracking-wide uppercase text-sm mb-3">商家支付與整合</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            與您現有的支付系統無縫串接
          </h3>
          <p className="text-slate-600">
            Shopzpin 可與您的結帳流程完美配合。獎勵折扣會自動應用於顧客的購物車，完全兼容主要商家支付閘道。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-70 max-w-5xl mx-auto">
          {/* E-commerce & Payment Platform Logos (Mocked with styled text/icons for robustness) */}
          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-2 font-bold text-xl text-[#95bf47]">
              <ShoppingBag className="w-6 h-6" /> Shopify
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-2 font-bold text-xl text-[#96588a]">
              <ShoppingCart className="w-6 h-6" /> Woo
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-2 font-bold text-xl text-[#635bff]">
              <CreditCard className="w-6 h-6" /> Stripe
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-1 font-bold text-xl text-[#00457C]">
              <span className="italic text-[#0079C1]">Pay</span><span className="italic text-[#00457C]">Pal</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <ShieldCheck className="w-6 h-6 text-emerald-500" /> Braintree
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-default">
            <div className="flex items-center gap-2 font-bold text-xl text-[#ffcb05]">
              <Wallet className="w-6 h-6 text-slate-900" /> <span className="text-slate-900">Wonder</span>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">安全的折扣兌換</h4>
              <p className="text-slate-600 text-sm">自動生成獨一無二的單次使用代碼並同步至您的結帳系統，防止濫用。</p>
            </div>
          </div>
          <a href="/api-docs/" className="whitespace-nowrap px-6 py-2.5 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-lg transition-colors">
            查看所有整合
          </a>
        </div>
      </div>
    </section>
  );
}