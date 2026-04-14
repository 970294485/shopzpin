import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImport from "../imports/shopzpin-logo-white@2x-pihzw0jz0vx1eoidx9hackg3eft0a508opyeiz3s9e.png";
const logoUrl = typeof logoImport === 'object' && logoImport !== null ? (logoImport as any).src : logoImport;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="/">
              <img src={logoUrl} alt="Shopzpin" className="h-8 w-auto cursor-pointer" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">首頁</a>
            <a href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">功能</a>
            <a href="/integrations" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">整合</a>
            <a href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">價格</a>
            <a href="/partners" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">合作夥伴</a>
            <a href="/careers" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">招募</a>
            <a href="/user-manual" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">使用手冊</a>
            <a href="/api-docs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">API 文件</a>
            <a href="/videos" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">影片教學</a>
            <a href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">聯絡我們</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://shopzpin-merchant-web.shopzpin.com/#/auth/login?returnUrl=%2Fdashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              登入
            </a>
            <button className="text-sm font-bold bg-[#ffcb05] hover:bg-[#e6b604] text-slate-900 px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#ffcb05]/20">
              開始免費試用
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#ffcb05] hover:text-[#e6b604] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 pb-4 px-4 shadow-xl">
          <div className="flex flex-col space-y-4 pt-4">
            <a href="/" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">首頁</a>
            <a href="/features" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">功能</a>
            <a href="/integrations" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">整合</a>
            <a href="/pricing" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">價格</a>
            <a href="/partners" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">合作夥伴</a>
            <a href="/careers" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">招募</a>
            <a href="/user-manual" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">使用手冊</a>
            <a href="/api-docs" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">API 文件</a>
            <a href="/videos" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">影片教學</a>
            <a href="/contact" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-300">聯絡我們</a>
            <div className="h-px bg-slate-800 w-full my-2"></div>
            <a 
              href="https://shopzpin-merchant-web.shopzpin.com/#/auth/login?returnUrl=%2Fdashboard"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full text-left text-base font-bold text-slate-300 block"
            >
              登入
            </a>
            <button className="w-full text-center text-base font-bold bg-[#ffcb05] text-slate-900 px-5 py-3 rounded-lg">
              開始免費試用
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}