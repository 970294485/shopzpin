import React from "react";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import logoImport from "../imports/shopzpin-logo-white@2x-pihzw0jz0vx1eoidx9hackg3eft0a508opyeiz3s9e.png";
const logoUrl = typeof logoImport === 'object' && logoImport !== null ? (logoImport as any).src : logoImport;

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logoUrl} alt="Shopzpin" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              專為電商商家打造的頂級遊戲化行銷平台。建立名單、提升銷量，將訪客變成忠實粉絲。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#ffcb05] hover:text-slate-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#ffcb05] hover:text-slate-900 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-[#ffcb05] hover:text-slate-900 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">產品</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/features/" className="hover:text-[#ffcb05] transition-colors">功能</a></li>
              <li><a href="/integrations/" className="hover:text-[#ffcb05] transition-colors">整合</a></li>
              <li><a href="/pricing/" className="hover:text-[#ffcb05] transition-colors">價格</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">資源</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/user-manual/" className="hover:text-[#ffcb05] transition-colors">使用手冊</a></li>
              <li><a href="/ecommerce-guide/" className="hover:text-[#ffcb05] transition-colors">電商指南</a></li>
              <li><a href="/api-docs/" className="hover:text-[#ffcb05] transition-colors">API 文件</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">公司</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#ffcb05] transition-colors">關於我們</a></li>
              <li><a href="/careers/" className="hover:text-[#ffcb05] transition-colors">招募</a></li>
              <li><a href="/contact/" className="hover:text-[#ffcb05] transition-colors">聯絡我們</a></li>
              <li><a href="/partners/" className="hover:text-[#ffcb05] transition-colors">合作夥伴</a></li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <img
                src="/images/pngegg.png"
                alt="Google Pay"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div className="flex gap-6 w-full md:w-auto justify-center md:justify-start">
            <a href="https://admin.shopzpin.com/#/auth/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">隱私權政策</a>
            <a href="https://admin.shopzpin.com/#/auth/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">服務條款</a>
            <a href="#" className="hover:text-slate-400">Cookie 設定</a>
          </div>
          <p>
            Powered By{" "}
            <a 
              href="https://www.starlightlimited.com/zh_hk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#ffcb05] transition-colors"
            >
              Starlight Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}