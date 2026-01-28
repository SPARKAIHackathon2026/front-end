"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Bot, Wallet, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// 引入新的背景组件
import ParticleFlowCanvas from "@/components/3d/ParticleFlow";

// 步骤配置项
const stepsItems = [
    { id: 1, title: "连接钱包", icon: Wallet },
    { id: 2, title: "AI 分析", icon: ShieldCheck },
    { id: 3, title: "Kite 代缴", icon: Zap },
];

export default function DashboardPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isLoading, setIsLoading] = useState(false);

    // ... (此处省略 handleConnect, handleAnalyze 等模拟函数，请复用之前的逻辑)
    // 模拟连接钱包
    const handleConnect = () => {
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); setStep(2); }, 1000);
    };
    // 模拟 AI 分析
    const handleAnalyze = () => {
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); setStep(3); }, 1500);
    };


    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex flex-col">
            {/* 1. 新的动态背景 */}
            <ParticleFlowCanvas />

            {/* 2. Dashboard 导航栏 */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                            <Bot className="text-cyan-400 w-5 h-5" />
                        </div>
                        <span className="font-bold">控制台</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">钱包状态:</span>
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-950/20">未连接</Badge>
                </div>
            </header>

            {/* 3. 主要内容区域 */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-28 pb-10 px-4">

                {/* 步骤指示器 (优化版) */}
                <div className="w-full max-w-3xl mb-12">
                    <div className="flex justify-between relative">
                        {/* 进度线背景 */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full -z-10"></div>
                        {/* 进度线前景 */}
                        <motion.div
                            className="absolute top-1/2 left-0 h-1 bg-cyan-500 -translate-y-1/2 rounded-full -z-10 origin-left"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((step - 1) / 2) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        ></motion.div>

                        {stepsItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = step >= item.id;
                            const isCurrent = step === item.id;
                            return (
                                <div key={item.id} className="flex flex-col items-center gap-3 relative z-10">
                                    <motion.div
                                        animate={{
                                            backgroundColor: isActive ? "#06b6d4" : "#000000",
                                            borderColor: isActive ? "#06b6d4" : "#404040",
                                            scale: isCurrent ? 1.1 : 1
                                        }}
                                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${isActive ? "text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]" : "text-gray-500 bg-black"}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.div>
                                    <span className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-500"}`}>{item.title}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 核心功能卡片容器 (复用之前的逻辑，外层包裹新的样式) */}
                <div className="w-full max-w-xl relative perspective-1000">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                exit={{ opacity: 0, rotateY: 10, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, type: "spring" }}
                            >
                                {/* ---> 这里放入 STEP 1 的 Card 代码 (复用上一版) <--- */}
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    {/* 简写示例 */}
                                    <CardHeader><CardTitle className="text-white">步骤 1: 连接您的资产</CardTitle></CardHeader>
                                    <CardContent className="text-gray-400 h-40 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                                        (在此处复用之前的 MetaMask 按钮组件)
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleConnect} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold" disabled={isLoading}>
                                            {isLoading ? "连接中..." : "模拟连接钱包"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, rotateY: -10, scale: 0.95 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}>
                                {/* ---> 这里放入 STEP 2 的 Card 代码 <--- */}
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <CardHeader><CardTitle className="text-white">步骤 2: AI 税务分析</CardTitle></CardHeader>
                                    <CardContent className="text-gray-400 h-40 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                                        (在此处复用之前的表单组件)
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleAnalyze} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold" disabled={isLoading}>
                                            {isLoading ? "AI 分析中..." : "生成报告"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, rotateY: -10, scale: 0.95 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}>
                                {/* ---> 这里放入 STEP 3 的 Card 代码 <--- */}
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <CardHeader><CardTitle className="text-white">步骤 3: Kite AI 自动代缴</CardTitle></CardHeader>
                                    <CardContent className="text-gray-400 h-40 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                                        (在此处复用之前的支付确认组件)
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-[0_0_20px_rgba(22,163,74,0.3)]">
                                            启动 Kite Agent 支付
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}