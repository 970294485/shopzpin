import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, Users, DollarSign, LayoutDashboard } from "lucide-react";

const data = [
  { name: "週一", conversion: 2.1, standard: 1.8 },
  { name: "週二", conversion: 3.4, standard: 1.9 },
  { name: "週三", conversion: 4.8, standard: 1.7 },
  { name: "週四", conversion: 6.2, standard: 2.0 },
  { name: "週五", conversion: 8.5, standard: 1.8 },
  { name: "週六", conversion: 10.1, standard: 2.1 },
  { name: "週日", conversion: 12.5, standard: 1.9 },
];

export function Analytics() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4 mr-2" /> 數據驅動的結果
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              實時觀看您的轉換率飆升
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              我們的商家看到比標準彈出視窗高出 4 倍的平均訂閱率。直接從儀表板追蹤每一次曝光、潛在客戶和銷售。
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-slate-900 flex items-center justify-center text-[#ffcb05]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">擴展您的電子郵件名單</h4>
                  <p className="text-slate-600">透過無法抗拒的遊戲化優惠，捕捉 10-15% 的訪客。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-slate-900 flex items-center justify-center text-[#ffcb05]">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">立即增加銷售</h4>
                  <p className="text-slate-600">提供立即滿足的折扣，促使他們今天就結帳。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-slate-900 flex items-center justify-center text-[#ffcb05]">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">內建 A/B 測試</h4>
                  <p className="text-slate-600">測試不同的遊戲類型和優惠，找出最適合您受眾的組合。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white font-semibold">轉換率</h3>
                  <p className="text-slate-400 text-sm">過去 7 天對比標準彈出視窗</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-3 h-3 rounded-full bg-[#ffcb05]"></div> 遊戲化
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-3 h-3 rounded-full bg-slate-600"></div> 標準
                  </div>
                </div>
              </div>
              
              <div className="w-full mt-6" style={{ height: "300px", minWidth: "100%" }}>
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs key="defs">
                      <linearGradient id="colorConversion" key="colorConversion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffcb05" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffcb05" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorStandard" key="colorStandard" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis key="xaxis" dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis key="yaxis" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                    <Tooltip 
                      key="tooltip"
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area key="area1" type="monotone" dataKey="standard" stroke="#475569" fillOpacity={1} fill="url(#colorStandard)" strokeWidth={2} />
                    <Area key="area2" type="monotone" dataKey="conversion" stroke="#ffcb05" fillOpacity={1} fill="url(#colorConversion)" strokeWidth={3} />
                  </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            
            {/* Floating stat card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-slate-100 p-4 w-48"
            >
              <div className="text-amber-500 text-sm font-bold flex items-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4" /> +412%
              </div>
              <div className="text-slate-900 font-bold text-lg">銷售增長</div>
              <div className="text-slate-500 text-xs">相比上週</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}