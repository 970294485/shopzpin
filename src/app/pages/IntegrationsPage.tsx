import { Integrations } from "../components/Integrations";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function IntegrationsPage() {
  return (
    <div className="pt-20">
      <div className="bg-slate-900 py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#ffcb05]/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffcb05]/10 text-[#ffcb05] text-sm font-semibold mb-6 border border-[#ffcb05]/20">
              無縫串接
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">與您的工作流程完美結合</h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
              Shopzpin 支援多種熱門電子商務平台與行銷工具。
              輕鬆一鍵整合，讓您的行銷自動化作業更有效率。
            </p>
            <div className="bg-slate-800/50 border border-[#ffcb05]/20 rounded-xl p-6 relative">
              <div className="absolute -top-3 -left-3">
                <span className="flex h-6 w-6 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffcb05] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-[#ffcb05] items-center justify-center text-xs text-slate-900 font-bold">新</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">整合收款解決方案</h3>
              <p className="text-slate-300">
                我們提供全方位的支付解決方案，能為您的商店自動生成付款連結，並配備專屬電子錢包，輕鬆接收客戶的款項。
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffcb05]/20 to-transparent blur-3xl -z-10 rounded-full"></div>
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2FsbGV0JTIwbW9iaWxlJTIwcGF5bWVudHxlbnwxfHx8fDE3NzYxNTUyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="電子錢包收款" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </div>
      <Integrations />
    </div>
  );
}