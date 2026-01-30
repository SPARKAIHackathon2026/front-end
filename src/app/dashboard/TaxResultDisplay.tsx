import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/mockData/mockData";

interface AnalyzedTransaction extends Transaction {
    isTaxable: boolean;
    gainOrIncome: number;
    taxCategory: string;
}

interface TaxResults {
    analyzedTxs: AnalyzedTransaction[];
    taxableTotal: number;
    taxRate: number;
    taxDue: number;
}

export default function TaxResultDisplay({ results }: { results: TaxResults }) {
    const { analyzedTxs, taxableTotal, taxRate, taxDue } = results;

    // 计算统计数据
    const totalTransactions = analyzedTxs.length;
    const totalVolume = analyzedTxs.reduce((sum, tx) => sum + tx.fiatValueAtTime, 0);
    const estimatedCapitalGains = analyzedTxs
        .filter(tx => tx.type === "trade" && tx.gainOrIncome > 0)
        .reduce((sum, tx) => sum + tx.gainOrIncome, 0);

    return (
        <div className="space-y-6">
            {/* 汇总卡片 */}
            <div className="space-y-4">
                {/* 第一行 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-zinc-500 uppercase">交易笔数</p>
                        <p className="text-2xl font-bold text-white">{totalTransactions}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-zinc-500 uppercase">总交易量</p>
                        <p className="text-2xl font-bold text-white">${totalVolume.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-zinc-500 uppercase">预估资本利得</p>
                        <p className="text-2xl font-bold text-yellow-400">${estimatedCapitalGains.toLocaleString()}</p>
                    </div>
                </div>
                
                {/* 第二行 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-zinc-500 uppercase">应税总额</p>
                        <p className="text-2xl font-bold text-white">${taxableTotal.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs text-zinc-500 uppercase">预估税率</p>
                        <p className="text-2xl font-bold text-cyan-400">{(taxRate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                        <p className="text-xs text-cyan-500 uppercase">应缴税额</p>
                        <p className="text-2xl font-bold text-white">${taxDue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* 交易明细 */}
            <div className="rounded-xl border border-white/5 overflow-hidden text-white">
                <Table>
                    <TableHeader className="bg-white/5 ">
                        <TableRow className="text-white">
                            <TableHead className="text-white">时间</TableHead>
                            <TableHead className="text-white">交易类型</TableHead>
                            <TableHead className="text-white">应税类别</TableHead>
                            <TableHead className="text-right text-white">盈亏/收入</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {analyzedTxs.map((tx: AnalyzedTransaction) => (
                            <TableRow key={tx.id} className={tx.isTaxable ? "bg-red-500/5" : "opacity-50"}>
                                <TableCell className="text-xs font-mono">{tx.timestamp}</TableCell>
                                <TableCell className="capitalize">{tx.type}</TableCell>
                                <TableCell>
                   <span className={`text-[10px] px-2 py-1 rounded-full ${tx.isTaxable ? 'bg-red-500/20 text-red-400' : 'bg-zinc-500/20 text-zinc-500'}`}>
                    {tx.taxCategory}
                   </span>
                                </TableCell>
                                <TableCell className={`text-right font-bold ${tx.gainOrIncome > 0 ? 'text-red-400' : 'text-zinc-500'}`}>
                                    {tx.isTaxable ? `+$${tx.gainOrIncome.toFixed(2)}` : '--'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}