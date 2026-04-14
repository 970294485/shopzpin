import React, { useState, useEffect } from "react";
import { 
  Terminal, Shield, Webhook, BookOpen, Key, Server, Users, 
  Store, UserCheck, Award, Ticket, Coffee, ShoppingCart, 
  CreditCard, Gamepad2, BarChart3, AlertCircle, Info 
} from "lucide-react";

export function ApiDocs() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((current) => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = (current as HTMLElement).offsetTop - 100;
        const sectionId = current.getAttribute("id") || "";

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { id: "overview", label: "1. 概述", icon: BookOpen },
    { id: "base-url", label: "2. 基本網址", icon: Server },
    { id: "auth", label: "3. 身份驗證", icon: Key },
    { id: "response", label: "4. 標準回應格式", icon: FileJsonIcon },
    { id: "core", label: "5. 核心資源", icon: Server },
    { id: "merchants", label: "6. 商家端點", icon: Store },
    { id: "staff", label: "7. 員工/用戶管理", icon: Users },
    { id: "outlets", label: "8. 門市管理", icon: Store },
    { id: "customers", label: "9. 顧客管理", icon: UserCheck },
    { id: "loyalty", label: "10. 會員與忠誠度", icon: Award },
    { id: "coupons", label: "11. 優惠券與促銷", icon: Ticket },
    { id: "products", label: "12. 產品/菜單管理", icon: Coffee },
    { id: "orders", label: "13. 智能點餐/訂單", icon: ShoppingCart },
    { id: "payments", label: "14. 付款", icon: CreditCard },
    { id: "campaigns", label: "15. 遊戲化活動", icon: Gamepad2 },
    { id: "analytics", label: "16. 數據分析", icon: BarChart3 },
    { id: "webhooks", label: "17. Webhooks", icon: Webhook },
    { id: "status-codes", label: "18. 狀態碼", icon: AlertCircle },
    { id: "rate-limits", label: "19. 頻率限制", icon: Shield },
    { id: "flow", label: "20. 端到端流程範例", icon: Info },
    { id: "security", label: "21. 安全建議", icon: Shield },
    { id: "errors", label: "22. 錯誤碼範例", icon: AlertCircle },
    { id: "versioning", label: "23. 版本控制", icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 lg:w-80 flex-shrink-0 bg-white border-r border-slate-200 fixed md:sticky top-20 h-[calc(100vh-80px)] overflow-y-auto z-10 hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#ffcb05]" />
            API 文件導覽
          </h2>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                    activeSection === item.id
                      ? "bg-[#ffcb05]/10 text-amber-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeSection === item.id ? "text-[#ffcb05]" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-amber-600">
          
          <div className="mb-12 pb-8 border-b border-slate-200">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffcb05]/10 text-amber-600 text-sm font-semibold mb-6 border border-[#ffcb05]/20">
              開發者資源
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Shopzpin API 文件</h1>
            <p className="text-xl text-slate-600">這是一份 API 規格文件，為開發者、合作夥伴及商戶提供 Shopzpin 平台的介接參考指南。</p>
          </div>

          <section id="overview" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="text-[#ffcb05]" /> 1. 概述</h2>
            <p className="text-slate-600 mb-4">
              本文檔為 Shopzpin 的<strong> API 規格</strong>，旨在用於前後端對接、合作夥伴導入或提案用途。
              Shopzpin 是一個專注於商戶的 O2O 商業和 CRM 平台，支援：
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>商家帳號管理</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>門市/分店管理</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>會員計畫</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>獎勵與忠誠度點數</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>優惠券與促銷</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>智能點餐</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>訂單與付款</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>顧客數據與分析</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>遊戲化活動互動</li>
            </ul>
          </section>

          <section id="base-url" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Server className="text-[#ffcb05]" /> 2. 基本網址</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">測試環境 (Sandbox)</h3>
                <CodeBlock code="https://api-sandbox.shopzpin.com/v1" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">生產環境 (Production)</h3>
                <CodeBlock code="https://api.shopzpin.com/v1" />
              </div>
            </div>
          </section>

          <section id="auth" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Key className="text-[#ffcb05]" /> 3. 身份驗證</h2>
            <p className="text-slate-600 mb-4">此 API 使用 <strong>Bearer Token</strong> 進行身份驗證。</p>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">請求標頭 (Header)</h3>
            <CodeBlock code={`Authorization: Bearer <access_token>\nContent-Type: application/json`} language="http" />

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-8">登入端點</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-700 font-mono text-sm px-2 py-1 rounded font-bold">POST</span>
              <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono text-sm">/auth/login</code>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase">請求範例</h4>
                <CodeBlock code={`{\n  "email": "merchant@brand.com",\n  "password": "YourPassword123"\n}`} language="json" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase">成功回應</h4>
                <CodeBlock code={`{\n  "success": true,\n  "data": {\n    "access_token": "eyJhbGciOi...",\n    "token_type": "Bearer",\n    "expires_in": 7200,\n    "merchant_id": "mrc_10001",\n    "user": {\n      "id": "usr_90001",\n      "name": "Shop Manager",\n      "role": "admin"\n    }\n  }\n}`} language="json" />
              </div>
            </div>
          </section>

          <section id="response" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Terminal className="text-[#ffcb05]" /> 4. 標準回應格式</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">成功回應</h3>
                <CodeBlock code={`{\n  "success": true,\n  "message": "Request completed successfully",\n  "data": {}\n}`} language="json" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">錯誤回應</h3>
                <CodeBlock code={`{\n  "success": false,\n  "message": "Validation failed",\n  "error_code": "VALIDATION_ERROR",\n  "errors": {\n    "email": ["The email field is required."]\n  }\n}`} language="json" />
              </div>
            </div>
          </section>

          <section id="core" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Server className="text-[#ffcb05]" /> 5. 核心資源</h2>
            <div className="flex flex-wrap gap-2">
              {['商家 (Merchants)', '員工 (Staff)', '門市 (Outlets)', '顧客 (Customers)', '會員 (Memberships)', '點數 (Points)', '優惠券 (Coupons)', '產品/菜單 (Products)', '訂單 (Orders)', '付款 (Payments)', '活動 (Campaigns)', '獎勵 (Rewards)', '分析 (Analytics)'].map((resource, i) => (
                <span key={i} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm shadow-sm">{resource}</span>
              ))}
            </div>
          </section>

          <section id="merchants" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Store className="text-[#ffcb05]" /> 6. 商家端點</h2>
            
            <Endpoint 
              method="GET" 
              path="/merchant/profile" 
              title="6.1 獲取商家資料" 
              response={`{\n  "success": true,\n  "data": {\n    "merchant_id": "mrc_10001",\n    "brand_name": "Demo Cafe",\n    "business_type": "F&B",\n    "email": "merchant@brand.com",\n    "phone": "+60-12-3456789",\n    "status": "active",\n    "created_at": "2026-04-14T10:00:00Z"\n  }\n}`}
            />
            
            <Endpoint 
              method="PUT" 
              path="/merchant/profile" 
              title="6.2 更新商家資料" 
              request={`{\n  "brand_name": "Demo Cafe Group",\n  "phone": "+60-12-8888888",\n  "business_type": "Retail & F&B"\n}`}
            />
          </section>

          <section id="staff" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="text-[#ffcb05]" /> 7. 員工 / 用戶管理</h2>
            <Endpoint method="GET" path="/staff" title="7.1 列出所有員工" params={["page", "limit", "role"]} />
            <Endpoint 
              method="POST" 
              path="/staff" 
              title="7.2 新增員工" 
              request={`{\n  "name": "Alice Wong",\n  "email": "alice@brand.com",\n  "role": "cashier",\n  "outlet_id": "out_101"\n}`}
            />
          </section>

          <section id="outlets" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Store className="text-[#ffcb05]" /> 8. 門市管理</h2>
            <div className="space-y-6">
              <Endpoint method="GET" path="/outlets" title="8.1 列出所有門市" />
              <Endpoint 
                method="POST" 
                path="/outlets" 
                title="8.2 新增門市" 
                request={`{\n  "name": "Demo Cafe - Puchong",\n  "code": "PCH001",\n  "address": "72-1A Jalan Puteri 2/4, Bandar Puteri, Puchong",\n  "phone": "+60-16-9642896",\n  "status": "active"\n}`}
              />
              <Endpoint method="GET" path="/outlets/{outlet_id}" title="8.3 獲取門市詳情" />
              <Endpoint method="PUT" path="/outlets/{outlet_id}" title="8.4 更新門市資料" />
              <Endpoint method="DELETE" path="/outlets/{outlet_id}" title="8.5 刪除門市" />
            </div>
          </section>

          <section id="customers" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><UserCheck className="text-[#ffcb05]" /> 9. 顧客管理</h2>
            <Endpoint method="GET" path="/customers" title="9.1 列出所有顧客" params={["page", "limit", "keyword", "membership_tier", "outlet_id"]} />
            <Endpoint 
              method="POST" 
              path="/customers" 
              title="9.2 新增顧客" 
              request={`{\n  "name": "Carter Yip",\n  "phone": "+852-90000000",\n  "email": "carter@example.com",\n  "birth_date": "1990-01-01",\n  "source": "qr_signup"\n}`}
            />
            <Endpoint 
              method="GET" 
              path="/customers/{customer_id}" 
              title="9.3 獲取顧客詳情" 
              response={`{\n  "success": true,\n  "data": {\n    "id": "cus_20001",\n    "name": "Carter Yip",\n    "phone": "+852-90000000",\n    "email": "carter@example.com",\n    "membership_tier": "Gold",\n    "points_balance": 580,\n    "total_spent": 2450.00,\n    "last_visit_at": "2026-04-13T14:22:10Z"\n  }\n}`}
            />
          </section>

          <section id="loyalty" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Award className="text-[#ffcb05]" /> 10. 會員與忠誠度</h2>
            <Endpoint 
              method="GET" 
              path="/memberships/tiers" 
              title="10.1 列出會員等級" 
              response={`{\n  "success": true,\n  "data": [\n    {\n      "id": "tier_bronze",\n      "name": "Bronze",\n      "min_spend": 0,\n      "benefits": ["Welcome reward"]\n    },\n    {\n      "id": "tier_silver",\n      "name": "Silver",\n      "min_spend": 1000,\n      "benefits": ["Birthday voucher", "Priority promo"]\n    },\n    {\n      "id": "tier_gold",\n      "name": "Gold",\n      "min_spend": 2000,\n      "benefits": ["Extra points", "Exclusive offers"]\n    }\n  ]\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/customers/{customer_id}/points/add" 
              title="10.2 新增忠誠度點數" 
              request={`{\n  "points": 100,\n  "reason": "Purchase reward",\n  "reference_no": "ord_50001"\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/customers/{customer_id}/points/redeem" 
              title="10.3 兌換點數" 
              request={`{\n  "points": 200,\n  "reward_id": "rw_001"\n}`}
            />
            <Endpoint method="GET" path="/customers/{customer_id}/points/ledger" title="10.4 檢視點數紀錄" />
          </section>

          <section id="coupons" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Ticket className="text-[#ffcb05]" /> 11. 優惠券與促銷</h2>
            <Endpoint method="GET" path="/coupons" title="11.1 列出所有優惠券" />
            <Endpoint 
              method="POST" 
              path="/coupons" 
              title="11.2 建立優惠券" 
              request={`{\n  "title": "10% OFF Lunch Promo",\n  "code": "LUNCH10",\n  "discount_type": "percentage",\n  "discount_value": 10,\n  "valid_from": "2026-04-15T00:00:00Z",\n  "valid_to": "2026-05-15T23:59:59Z",\n  "usage_limit": 500,\n  "applicable_outlet_ids": ["out_101", "out_102"]\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/coupons/validate" 
              title="11.3 驗證優惠券" 
              request={`{\n  "code": "LUNCH10",\n  "customer_id": "cus_20001",\n  "cart_total": 120.00\n}`}
            />
            <Endpoint method="PATCH" path="/coupons/{coupon_id}/disable" title="11.4 停用優惠券" />
          </section>

          <section id="products" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Coffee className="text-[#ffcb05]" /> 12. 產品 / 菜單管理</h2>
            <Endpoint method="GET" path="/products" title="12.1 列出所有產品" />
            <Endpoint 
              method="POST" 
              path="/products" 
              title="12.2 新增產品" 
              request={`{\n  "name": "Iced Latte",\n  "sku": "DRINK-001",\n  "category": "Beverage",\n  "price": 14.90,\n  "status": "active",\n  "outlet_ids": ["out_101"]\n}`}
            />
            <Endpoint method="PUT" path="/products/{product_id}" title="12.3 更新產品" />
            <Endpoint method="DELETE" path="/products/{product_id}" title="12.4 刪除產品" />
          </section>

          <section id="orders" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShoppingCart className="text-[#ffcb05]" /> 13. 智能點餐 / 訂單</h2>
            <Endpoint 
              method="POST" 
              path="/orders" 
              title="13.1 建立訂單" 
              request={`{\n  "customer_id": "cus_20001",\n  "outlet_id": "out_101",\n  "order_type": "pickup",\n  "items": [\n    {\n      "product_id": "prd_101",\n      "name": "Iced Latte",\n      "qty": 2,\n      "unit_price": 14.90\n    }\n  ],\n  "coupon_code": "LUNCH10",\n  "notes": "Less sugar"\n}`}
              response={`{\n  "success": true,\n  "data": {\n    "order_id": "ord_50001",\n    "status": "pending_payment",\n    "subtotal": 29.80,\n    "discount": 2.98,\n    "total": 26.82,\n    "currency": "MYR"\n  }\n}`}
            />
            <Endpoint method="GET" path="/orders/{order_id}" title="13.2 獲取訂單詳情" />
            <Endpoint method="GET" path="/orders" title="13.3 列出所有訂單" params={["status", "outlet_id", "customer_id", "date_from", "date_to"]} />
            <Endpoint 
              method="PATCH" 
              path="/orders/{order_id}/status" 
              title="13.4 更新訂單狀態" 
              request={`{\n  "status": "completed"\n}`}
            />
          </section>

          <section id="payments" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CreditCard className="text-[#ffcb05]" /> 14. 付款</h2>
            <Endpoint 
              method="POST" 
              path="/payments/intents" 
              title="14.1 建立付款意圖" 
              request={`{\n  "order_id": "ord_50001",\n  "method": "fpx",\n  "amount": 26.82,\n  "currency": "MYR"\n}`}
              response={`{\n  "success": true,\n  "data": {\n    "payment_intent_id": "pay_30001",\n    "status": "requires_action",\n    "payment_url": "https://pay.shopzpin.com/checkout/pay_30001"\n  }\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/payments/verify" 
              title="14.2 驗證付款" 
              request={`{\n  "payment_intent_id": "pay_30001",\n  "gateway_reference": "GX99887766"\n}`}
            />
            <Endpoint method="GET" path="/payments" title="14.3 付款紀錄" />
          </section>

          <section id="campaigns" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Gamepad2 className="text-[#ffcb05]" /> 15. 遊戲化活動 API</h2>
            <Endpoint method="GET" path="/campaigns" title="15.1 列出所有活動" />
            <Endpoint 
              method="POST" 
              path="/campaigns" 
              title="15.2 建立活動" 
              request={`{\n  "title": "Spin & Win April",\n  "campaign_type": "game_reward",\n  "game_type": "spin_wheel",\n  "start_at": "2026-04-15T00:00:00Z",\n  "end_at": "2026-04-30T23:59:59Z",\n  "outlet_ids": ["out_101"],\n  "rules": {\n    "daily_play_limit": 1,\n    "min_purchase": 20\n  }\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/campaigns/{campaign_id}/play" 
              title="15.3 開始遊戲會話" 
              request={`{\n  "customer_id": "cus_20001",\n  "source": "qr_code"\n}`}
            />
            <Endpoint 
              method="POST" 
              path="/campaigns/{campaign_id}/claim" 
              title="15.4 領取獎勵" 
              request={`{\n  "customer_id": "cus_20001",\n  "reward_code": "RWAPRIL88"\n}`}
            />
          </section>

          <section id="analytics" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BarChart3 className="text-[#ffcb05]" /> 16. 數據分析</h2>
            <Endpoint 
              method="GET" 
              path="/analytics/sales-summary" 
              title="16.1 銷售摘要" 
              params={["date_from", "date_to", "outlet_id"]}
              response={`{\n  "success": true,\n  "data": {\n    "gross_sales": 18500.00,\n    "net_sales": 17220.00,\n    "total_orders": 632,\n    "average_order_value": 27.25,\n    "new_customers": 87,\n    "repeat_customers": 214\n  }\n}`}
            />
            <Endpoint method="GET" path="/analytics/customers" title="16.2 顧客洞察" />
            <Endpoint method="GET" path="/analytics/campaigns/{campaign_id}" title="16.3 活動表現" />
          </section>

          <section id="webhooks" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Webhook className="text-[#ffcb05]" /> 17. Webhooks</h2>
            <p className="text-slate-600 mb-4">Shopzpin 可以將 webhook 事件發送到外部系統。</p>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-6">支援的事件：</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-600 font-mono text-sm mb-6">
              <li>order.created</li>
              <li>order.completed</li>
              <li>payment.success</li>
              <li>payment.failed</li>
              <li>customer.created</li>
              <li>coupon.redeemed</li>
              <li>campaign.reward_claimed</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">Webhook 數據範例：</h3>
            <CodeBlock code={`{\n  "event": "payment.success",\n  "created_at": "2026-04-14T11:30:00Z",\n  "data": {\n    "payment_intent_id": "pay_30001",\n    "order_id": "ord_50001",\n    "amount": 26.82,\n    "currency": "MYR",\n    "status": "success"\n  }\n}`} language="json" />
          </section>

          <section id="status-codes" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-[#ffcb05]" /> 18. 狀態碼</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white border border-slate-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left font-semibold text-slate-700">代碼</th>
                    <th className="py-3 px-4 text-left font-semibold text-slate-700">含義</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr><td className="py-3 px-4 font-mono">200</td><td className="py-3 px-4">成功 (OK)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">201</td><td className="py-3 px-4">已建立 (Created)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">400</td><td className="py-3 px-4">錯誤請求 (Bad Request)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">401</td><td className="py-3 px-4">未授權 (Unauthorized)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">403</td><td className="py-3 px-4">禁止訪問 (Forbidden)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">404</td><td className="py-3 px-4">未找到 (Not Found)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">422</td><td className="py-3 px-4">驗證錯誤 (Validation Error)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">429</td><td className="py-3 px-4">請求過多 (Too Many Requests)</td></tr>
                  <tr><td className="py-3 px-4 font-mono">500</td><td className="py-3 px-4">內部伺服器錯誤 (Internal Server Error)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="rate-limits" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="text-[#ffcb05]" /> 19. 頻率限制</h2>
            <p className="text-slate-600 mb-2">預設 API 頻率限制：</p>
            <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm text-slate-800 inline-block mb-4">
              100 次請求 / 分鐘 / token
            </div>
            <p className="text-slate-600 mb-2">超出限制時的回應：</p>
            <CodeBlock code={`{\n  "success": false,\n  "message": "Too many requests",\n  "error_code": "RATE_LIMIT_EXCEEDED"\n}`} language="json" />
          </section>

          <section id="flow" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Info className="text-[#ffcb05]" /> 20. 端到端流程範例</h2>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">場景：顧客掃描 QR Code、註冊、點餐並獲得獎勵</h3>
            
            <ol className="relative border-l-2 border-slate-200 ml-4 space-y-8">
              <FlowStep step={1} title="顧客註冊" endpoint="POST /customers" />
              <FlowStep step={2} title="商家 App 獲取顧客資料" endpoint="GET /customers/{customer_id}" />
              <FlowStep step={3} title="顧客下單" endpoint="POST /orders" />
              <FlowStep step={4} title="顧客付款" endpoint={["POST /payments/intents", "POST /payments/verify"]} />
              <FlowStep step={5} title="系統標記訂單為已完成" endpoint="PATCH /orders/{order_id}/status" />
              <FlowStep step={6} title="系統發放點數至顧客錢包" endpoint="POST /customers/{customer_id}/points/add" />
              <FlowStep step={7} title="顧客參加活動並領取獎勵" endpoint={["POST /campaigns/{campaign_id}/play", "POST /campaigns/{campaign_id}/claim"]} />
            </ol>
          </section>

          <section id="security" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="text-[#ffcb05]" /> 21. 安全建議</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600 mb-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>僅使用 HTTPS 傳輸</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>定期輪換 API 金鑰</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>為商家員工實施基於角色的存取控制 (RBAC)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>記錄所有管理員敏感操作日誌</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>驗證 Webhook 簽章</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffcb05]"></div>必要時為企業商家啟用 IP 白名單</li>
            </ul>
          </section>

          <section id="errors" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-[#ffcb05]" /> 22. 錯誤碼範例</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white border border-slate-200 rounded-lg shadow-sm text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left font-semibold text-slate-700">錯誤碼</th>
                    <th className="py-3 px-4 text-left font-semibold text-slate-700">描述</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr><td className="py-3 px-4 font-mono text-red-600">AUTH_INVALID_CREDENTIALS</td><td className="py-3 px-4">登入憑證無效</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">AUTH_TOKEN_EXPIRED</td><td className="py-3 px-4">Token 已過期</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">VALIDATION_ERROR</td><td className="py-3 px-4">請求驗證失敗</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">CUSTOMER_NOT_FOUND</td><td className="py-3 px-4">找不到顧客紀錄</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">OUTLET_NOT_FOUND</td><td className="py-3 px-4">找不到門市紀錄</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">COUPON_INVALID</td><td className="py-3 px-4">優惠券無效</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">COUPON_EXPIRED</td><td className="py-3 px-4">優惠券已過期</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">ORDER_NOT_FOUND</td><td className="py-3 px-4">找不到訂單</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">PAYMENT_FAILED</td><td className="py-3 px-4">付款失敗</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">CAMPAIGN_NOT_ACTIVE</td><td className="py-3 px-4">活動尚未啟用</td></tr>
                  <tr><td className="py-3 px-4 font-mono text-red-600">RATE_LIMIT_EXCEEDED</td><td className="py-3 px-4">請求次數過多</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="versioning" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Terminal className="text-[#ffcb05]" /> 23. 版本控制</h2>
            <p className="text-slate-600 mb-2">API 透過網址進行版本控制：</p>
            <CodeBlock code="/v1" />
            <p className="text-slate-600 mt-4 mb-2">未來的重大更新將發布於：</p>
            <CodeBlock code="/v2" />
          </section>

        </div>
      </div>
    </div>
  );
}

// ------------------------------
// Sub-components for API Docs
// ------------------------------

const FileJsonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M10 12v6"/>
    <path d="M8 14h4"/>
  </svg>
);

function CodeBlock({ code, language = "text" }: { code: string; language?: string }) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {language && <span className="ml-auto text-xs text-slate-400 font-mono uppercase">{language}</span>}
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Endpoint({ method, path, title, params, request, response }: { method: string, path: string, title: string, params?: string[], request?: string, response?: string }) {
  const methodColors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-emerald-100 text-emerald-700",
    PUT: "bg-amber-100 text-amber-700",
    PATCH: "bg-orange-100 text-orange-700",
    DELETE: "bg-red-100 text-red-700",
  };

  return (
    <div className="mb-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`${methodColors[method] || "bg-slate-100 text-slate-700"} font-mono text-sm px-3 py-1.5 rounded-md font-bold`}>
            {method}
          </span>
          <code className="bg-slate-50 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200 font-mono text-sm break-all">
            {path}
          </code>
        </div>
      </div>
      
      {(params || request || response) && (
        <div className="p-5 bg-slate-50 space-y-6">
          {params && (
            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">查詢參數 (Query Parameters)</h4>
              <div className="flex flex-wrap gap-2">
                {params.map((p, i) => (
                  <span key={i} className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded text-sm font-mono">{p}</span>
                ))}
              </div>
            </div>
          )}
          
          {request && (
            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">請求範例 (Request)</h4>
              <CodeBlock code={request} language="json" />
            </div>
          )}
          
          {response && (
            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">回應範例 (Response)</h4>
              <CodeBlock code={response} language="json" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FlowStep({ step, title, endpoint }: { step: number; title: string; endpoint: string | string[] }) {
  return (
    <li className="relative">
      <div className="absolute -left-[25px] mt-1.5 w-4 h-4 rounded-full bg-[#ffcb05] border-4 border-slate-50"></div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm ml-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ffcb05]/20 text-amber-700 font-bold text-sm">
            {step}
          </span>
          <h4 className="font-bold text-slate-800">{title}</h4>
        </div>
        <div className="space-y-2">
          {(Array.isArray(endpoint) ? endpoint : [endpoint]).map((ep, i) => {
            const [method, path] = ep.split(" ");
            const methodColors: Record<string, string> = {
              GET: "text-blue-600",
              POST: "text-emerald-600",
              PUT: "text-amber-600",
              PATCH: "text-orange-600",
              DELETE: "text-red-600",
            };
            return (
              <div key={i} className="flex items-center gap-2 font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <span className={`font-bold ${methodColors[method] || "text-slate-600"}`}>{method}</span>
                <span className="text-slate-700">{path}</span>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}
