"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {motion, AnimatePresence, Variants} from "motion/react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
    ChevronLeft, Bot, Wallet, Zap,
    CheckCircle2, AlertCircle, ArrowRight, ArrowLeft,
    FileBarChart, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";

// 引入你之前做好的背景组件 (如果没有请用空div代替)
import ParticleFlowCanvas from "@/components/3d/ParticleFlow";

// --- 模拟 RainbowKit/Wagmi Hooks (真实开发时替换为实际库) ---
const useMockAccount = () => {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { openConnectModal } = useConnectModal();

    const connect = () => {
        openConnectModal?.();
    };

    return { isConnected, address: address ?? null, connect, disconnect };
};

// --- 常量定义 ---
const COUNTRIES = [
    { value: "us", label: "🇺🇸 United States (美国)" },
    { value: "sg", label: "🇸🇬 Singapore (新加坡)" },
    { value: "jp", label: "🇯🇵 Japan (日本)" },
    { value: "cn", label: "🇨🇳 China (中国)" },
    { value: "uk", label: "🇬🇧 United Kingdom (英国)" },
];

const TAX_YEARS = ["2024", "2023", "2022"];

export default function DashboardPage() {
    // 状态管理
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [direction, setDirection] = useState(0); // 用于控制动画方向
    const { isConnected, address, connect, disconnect } = useMockAccount(); // 模拟钱包 Hook

    // 表单数据
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        taxYear: "2024",
    });

    // 分析状态
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisDone, setAnalysisDone] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("hifo"); // 默认选中 HIFO

    // 导航函数
    const nextStep = () => {
        setDirection(1);
        setStep((prev) => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => (prev > 1 ? prev - 1 : prev) as 1 | 2 | 3);
    };

    // 触发 Step 3 的分析逻辑
    useEffect(() => {
        if (step === 3 && !analysisDone) {
            setIsAnalyzing(true);
            // 模拟 AI 分析耗时 2.5秒
            setTimeout(() => {
                setIsAnalyzing(false);
                setAnalysisDone(true);
            }, 2500);
        }
    }, [step, analysisDone]);

    // 动画配置
    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, type: "spring", bounce: 0.3 }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2 }
        })
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex flex-col">
            {/* 背景 */}
            <div className="fixed inset-0 z-0">
                <ParticleFlowCanvas />
            </div>

            {/* 顶部导航 */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                        <ChevronLeft className="w-5 h-5" /> 返回首页
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    {isConnected ? (
                        <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-950/20 px-3 py-1 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            {address}
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="border-gray-500/50 text-gray-400 px-3 py-1">
                            未连接钱包
                        </Badge>
                    )}
                </div>
            </header>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-24 pb-10 px-4 w-full max-w-4xl mx-auto">

                {/* 步骤进度条 */}
                <div className="w-full mb-12 relative px-10">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 -z-10"></div>
                    {/* 动态进度条 */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-cyan-500 -translate-y-1/2 -z-10 origin-left"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((step - 1) / 2) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>

                    <div className="flex justify-between">
                        {[
                            { id: 1, title: "连接钱包", icon: Wallet },
                            { id: 2, title: "身份信息", icon: Building2 },
                            { id: 3, title: "智能方案", icon: Bot },
                        ].map((item) => {
                            const isActive = step >= item.id;
                            return (
                                <div key={item.id} className="flex flex-col items-center gap-2 bg-black px-2">
                                    <motion.div
                                        animate={{
                                            backgroundColor: isActive ? "#06b6d4" : "#171717",
                                            color: isActive ? "#000" : "#6b7280",
                                            borderColor: isActive ? "#06b6d4" : "#404040"
                                        }}
                                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {step > item.id && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                                <CheckCircle2 className="w-3 h-3 text-black" />
                                            </div>
                                        )}
                                    </motion.div>
                                    <span className={`text-xs font-medium ${isActive ? "text-cyan-400" : "text-gray-600"}`}>
                                {item.title}
                            </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 核心卡片区域 */}
                <div className="w-full max-w-2xl perspective-1000">
                    <AnimatePresence custom={direction} mode="wait">

                        {/* STEP 1: 连接钱包 */}
                        {step === 1 && (
                            <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full">
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-white">连接您的 Web3 资产</CardTitle>
                                        <CardDescription>我们将扫描您的链上交易记录以计算税务基准。</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* 状态展示区 */}
                                        <div className={`p-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 ${isConnected ? "border-green-500/30 bg-green-500/5" : "border-white/10 bg-white/5"}`}>
                                            {isConnected ? (
                                                <>
                                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                                        <Wallet className="w-8 h-8 text-green-400" />
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-lg font-bold text-white">已连接 RainbowKit</h3>
                                                        <p className="text-gray-400 font-mono mt-1">{address}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => disconnect()} className="mt-2 border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300">
                                                        断开连接
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                                                        <Wallet className="w-8 h-8 text-gray-500" />
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-lg font-bold text-gray-300">未检测到钱包</h3>
                                                        <p className="text-sm text-gray-500 mt-1">请点击下方按钮连接 RainbowKit</p>
                                                    </div>
                                                    {/* 模拟 Rainbow Button */}
                                                    <Button onClick={connect} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/20">
                                                        <span className="mr-2">🌈</span> Connect Wallet
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-4">
                                        <Button
                                            onClick={nextStep}
                                            disabled={!isConnected}
                                            className={`px-8 ${isConnected ? "bg-cyan-500 hover:bg-cyan-400 text-black" : "bg-gray-800 text-gray-500"}`}
                                        >
                                            下一步 <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {/* STEP 2: 完善信息 */}
                        {step === 2 && (
                            <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full">
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-white">完善税务身份</CardTitle>
                                        <CardDescription>不同的国家/地区适用不同的税收政策，AI 将为您自动匹配。</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">真实姓名 (Legal Name)</Label>
                                            <Input
                                                placeholder="如: Zhang San"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="text-white bg-white/5 border-white/10 focus:border-cyan-500/50"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-gray-300">居住国家/地区</Label>
                                                <Select
                                                    value={formData.country}
                                                    onValueChange={(val) => setFormData({...formData, country: val})}
                                                >
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                        <SelectValue placeholder="选择国家" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-900 border-white/10 text-white">
                                                        {COUNTRIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-gray-300">报税财年</Label>
                                                <Select
                                                    value={formData.taxYear}
                                                    onValueChange={(val) => setFormData({...formData, taxYear: val})}
                                                >
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                        <SelectValue placeholder="年份" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-900 border-white/10 text-white">
                                                        {TAX_YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-200">
                                                不用担心，您的隐私数据将存储在本地，仅用于 AI 本地计算生成报表，不会上传至中央服务器。
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white hover:bg-white/10">
                                            <ArrowLeft className="mr-2 w-4 h-4" /> 上一步
                                        </Button>
                                        <Button
                                            onClick={nextStep}
                                            disabled={!formData.country || !formData.name}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8"
                                        >
                                            开始 AI 分析 <Bot className="ml-2 w-4 h-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {/* STEP 3: 分析结果与方案选择 */}
                        {step === 3 && (
                            <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full">
                                <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                                    {isAnalyzing ? (
                                        /* --- Loading 状态 --- */
                                        <div className="h-[500px] flex flex-col items-center justify-center space-y-6">
                                            <div className="relative">
                                                <div className="w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Bot className="w-8 h-8 text-cyan-400 animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="text-xl font-bold text-white">AI 正在扫描链上数据...</h3>
                                                <p className="text-gray-400 font-mono text-sm">
                                                    Parsing tx history for {address}... <br/>
                                                    Matching {formData.country} tax regulations...
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        /* --- 结果展示状态 --- */
                                        <>
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-2xl text-white flex items-center gap-2">
                                                            <FileBarChart className="w-6 h-6 text-cyan-400" />
                                                            分析报告 ({formData.taxYear})
                                                        </CardTitle>
                                                        <CardDescription>
                                                            基于您在 {formData.country === 'us' ? 'United States' : 'Selected Region'} 的税务身份分析
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant="outline" className="text-green-400 border-green-500/30 bg-green-900/20">
                                                        可优化
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-6">
                                                {/* 1. 钱包数据摘要 */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                                        <p className="text-xs text-gray-500">交易笔数</p>
                                                        <p className="text-xl font-bold text-white">1,240</p>
                                                    </div>
                                                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                                        <p className="text-xs text-gray-500">总交易量</p>
                                                        <p className="text-xl font-bold text-white">$420k</p>
                                                    </div>
                                                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                                        <p className="text-xs text-gray-500">预估资本利得</p>
                                                        <p className="text-xl font-bold text-yellow-400">+$12,500</p>
                                                    </div>
                                                </div>

                                                <Separator className="bg-white/10" />

                                                {/* 2. 方案选择 (核心功能) */}
                                                <div className="space-y-3">
                                                    <Label className="text-lg text-white font-bold flex items-center gap-2">
                                                        选择 AI 推荐的申报方案 <Bot className="w-4 h-4 text-cyan-400"/>
                                                    </Label>

                                                    <RadioGroup defaultValue="hifo" value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                                        {/* FIFO 方案 */}
                                                        <div className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-white/5 ${selectedPlan === 'fifo' ? 'border-cyan-500 bg-cyan-950/10' : 'border-white/10'}`} onClick={() => setSelectedPlan('fifo')}>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-bold text-white">FIFO</span>
                                                                {selectedPlan === 'fifo' && <CheckCircle2 className="w-4 h-4 text-cyan-500"/>}
                                                            </div>
                                                            <p className="text-xs text-gray-400 mb-2">先进先出 (Standard)</p>
                                                            <div className="text-lg font-bold text-white">$3,200 <span className="text-xs text-gray-500 font-normal">税费</span></div>
                                                        </div>

                                                        {/* HIFO 方案 (推荐) */}
                                                        <div className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-white/5 ${selectedPlan === 'hifo' ? 'border-green-500 bg-green-950/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-white/10'}`} onClick={() => setSelectedPlan('hifo')}>
                                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                                                                Best Value
                                                            </div>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-bold text-white">HIFO</span>
                                                                {selectedPlan === 'hifo' && <CheckCircle2 className="w-4 h-4 text-green-500"/>}
                                                            </div>
                                                            <p className="text-xs text-gray-400 mb-2">最高成本先出 (Optimized)</p>
                                                            <div className="text-lg font-bold text-green-400">$2,150 <span className="text-xs text-gray-500 font-normal">税费</span></div>
                                                            <p className="text-[10px] text-green-500 mt-1">为您节省 $1,050</p>
                                                        </div>

                                                        {/* LIFO 方案 */}
                                                        <div className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-white/5 ${selectedPlan === 'lifo' ? 'border-cyan-500 bg-cyan-950/10' : 'border-white/10'}`} onClick={() => setSelectedPlan('lifo')}>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-bold text-white">LIFO</span>
                                                                {selectedPlan === 'lifo' && <CheckCircle2 className="w-4 h-4 text-cyan-500"/>}
                                                            </div>
                                                            <p className="text-xs text-gray-400 mb-2">后进先出</p>
                                                            <div className="text-lg font-bold text-white">$2,800 <span className="text-xs text-gray-500 font-normal">税费</span></div>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="flex justify-between pt-4 bg-white/5 border-t border-white/10">
                                                <Button variant="ghost" onClick={prevStep} className="text-gray-400">
                                                    重新填写
                                                </Button>
                                                <div className="flex gap-4 items-center">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-400">预计需缴税款</p>
                                                        <p className="text-xl font-bold text-white">
                                                            {selectedPlan === 'fifo' ? '$3,200' : selectedPlan === 'hifo' ? '$2,150' : '$2,800'}
                                                        </p>
                                                    </div>
                                                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold h-12 px-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                                        <Zap className="mr-2 w-4 h-4 fill-yellow-400 text-yellow-400" /> 使用 Kite AI 支付
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </>
                                    )}
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}