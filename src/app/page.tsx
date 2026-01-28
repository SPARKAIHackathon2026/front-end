"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { motion,Variants } from "motion/react";
import NetworkGlobeCanvas from "@/components/3d/NetworkGlobe"; // 确保路径正确
import { ConnectButton } from '@rainbow-me/rainbowkit';

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 }, // 示例值，保持你原有配置即可
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6, // 保持你原有数值
            ease: "easeOut", // 核心修复：替换为内置合法关键字（可选值见下文）
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

export default function LandingPage() {
    return (
        <main className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
            {/* 1. 3D 背景层 */}
            <NetworkGlobeCanvas />

            {/* 2. 顶部导航 (简化版) */}
            <header className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <BrainCircuit className="text-cyan-400 w-6 h-6" />
                    <span>TaxAgent<span className="text-cyan-400">.AI</span></span>
                </div>
                <div className="flex items-center gap-8">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/30 backdrop-blur-md">
                        Kite AI Hackathon
                    </Badge>
                    <ConnectButton />
                </div>
            </header>

            {/* 3. Hero Section 内容区 */}
            <section className="relative z-10 flex-1 flex items-center">
                <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">

                    {/* 左侧文案 */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8 max-w-2xl"
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border-0 backdrop-blur-md px-4 py-1.5 text-sm">
                                Web3 税务的终极形态
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                  智能合规，
                </span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  自动代缴。
                </span>
                            </h1>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            告别复杂的 Crypto 税务计算。我们将 AI 分析引擎与
                            <span className="text-cyan-400 font-bold mx-1">Kite AI</span>
                            自主支付代理相结合，为您提供从链上追踪到一键完税的无感体验。
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="w-full sm:w-auto text-base font-bold cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-6 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300">
                                    启动控制台 <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base cursor-pointer border-white/20 text-gray-700 hover:bg-white/5 hover:text-white px-8 py-6 rounded-full backdrop-blur-md">
                                了解 Kite AI 集成
                            </Button>
                        </motion.div>

                        {/* 特性列表 */}
                        <motion.div variants={fadeInUp} className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10">
                            <div>
                                <ShieldCheck className="text-cyan-400 mb-2 h-6 w-6" />
                                <h3 className="font-bold">隐私优先</h3>
                                <p className="text-sm text-gray-500">只读权限，数据本地化。</p>
                            </div>
                            <div>
                                <BrainCircuit className="text-purple-400 mb-2 h-6 w-6" />
                                <h3 className="font-bold">AI 驱动核算</h3>
                                <p className="text-sm text-gray-500">针对复杂 DeFi 场景优化。</p>
                            </div>
                            <div>
                                <Zap className="text-yellow-400 mb-2 h-6 w-6" />
                                <h3 className="font-bold">Kite Agent 支付</h3>
                                <p className="text-sm text-gray-500">无需出金，链上直接结算。</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 右侧为了平衡布局，留空让 3D 背景展示 */}
                    <div className="hidden lg:block h-[800px]"></div>
                </div>
            </section>

            {/* 底部遮罩，让文字更清晰 */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>
        </main>
    );
}
