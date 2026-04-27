import React from 'react';

// Devopstrio Application Security Baseline (ASB)
// Dashboard: Executive Threat Console & Metrics View

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#07051a] text-slate-200 font-sans selection:bg-rose-500/30">
            {/* Nav Header */}
            <header className="border-b border-rose-900/50 bg-[#07051a]/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-600 to-orange-500 flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                            ASB
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white line-height-none">Application Security Baseline</h1>
                            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Global DevSecOps Platform</p>
                        </div>
                    </div>
                    <nav className="flex gap-6 text-sm font-bold">
                        <a href="#" className="text-white">Executive Posture</a>
                        <a href="#" className="text-slate-400 hover:text-white transition">CI/CD Gates</a>
                        <a href="#" className="text-slate-400 hover:text-white transition">Runtime Alerts</a>
                        <a href="#" className="text-slate-400 hover:text-white transition">Compliance Mappings</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-8 py-8">
                {/* Critical Alert Banner */}
                <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <div>
                            <h3 className="font-bold text-rose-400 text-sm">Action Required: Secrets Exposed</h3>
                            <p className="text-xs text-rose-400/80">Scan Engine detected 2 hardcoded Azure PAT tokens in the `retail-payment-v2` repository. Automated quarantine initiated.</p>
                        </div>
                    </div>
                    <button className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded transition-colors">Triage Now</button>
                </div>

                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: 'Global Baseline Compliance', stat: '94.2%', sub: 'Target: >98%', color: 'emerald' },
                        { title: 'MTTR (High & Critical)', stat: '4.2 Days', sub: 'Last 30 Days Average', color: 'blue' },
                        { title: 'CI/CD Deployments Blocked', stat: '14', sub: 'Due to Baseline Violations', color: 'rose' },
                        { title: 'Runtime Anomalies (24h)', stat: '0', sub: 'AKS Falco & AppGW WAF', color: 'slate' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-[#0b0a26] border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors"></div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{kpi.title}</h4>
                            <div className={`text-4xl font-black mt-3 text-${kpi.color}-400 drop-shadow-md`}>{kpi.stat}</div>
                            <p className="text-xs text-slate-500 mt-2 font-mono">{kpi.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Data Grids */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Findings Matrix */}
                    <div className="xl:col-span-2 bg-[#0b0a26] rounded-3xl border border-white/10 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-white">Vulnerability Prioritization Queue</h2>
                            <div className="flex gap-2">
                                <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded font-bold border border-rose-500/30">14 Critical</span>
                                <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded font-bold border border-orange-500/30">89 High</span>
                            </div>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-black uppercase text-slate-500 border-b border-white/10">
                                    <th className="pb-3 w-10">Sev</th>
                                    <th className="pb-3">Application</th>
                                    <th className="pb-3">Identifier</th>
                                    <th className="pb-3">Engine Detect</th>
                                    <th className="pb-3 text-right">Age</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { sev: 'CRIT', app: 'Customer-API', cve: 'CVE-2023-XXXX', type: 'SAST (Sonar)', age: '2d', color: 'rose' },
                                    { sev: 'CRIT', app: 'Auth-Service', cve: 'Hardcoded Secret', type: 'Secrets (Truffle)', age: '12h', color: 'rose' },
                                    { sev: 'HIGH', app: 'Payment-Worker', cve: 'Missing NetworkPolicy', type: 'IaC (Checkov)', age: '8d', color: 'orange' },
                                    { sev: 'HIGH', app: 'Retail-Web', cve: 'CVE-2024-YYYY', type: 'Container (Trivy)', age: '14d', color: 'orange' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4">
                                            <div className={`w-3 h-3 rounded-full bg-${row.color}-500 shadow-[0_0_8px_rgba(currentColor,0.8)]`}></div>
                                        </td>
                                        <td className="py-4 font-bold text-white">{row.app}</td>
                                        <td className="py-4 text-slate-300 font-mono text-xs">{row.cve}</td>
                                        <td className="py-4 text-slate-400 text-xs">{row.type}</td>
                                        <td className="py-4 text-slate-400 text-right">{row.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Policy Compliance Module */}
                    <div className="bg-[#0b0a26] rounded-3xl border border-white/10 p-6 flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-6">Continuous Compliance</h2>

                        <div className="space-y-4">
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm text-slate-200">SOC2 Type II</span>
                                    <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded">100% Control Mapping</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-full h-full"></div>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm text-slate-200">OWASP ASVS v4.0</span>
                                    <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-1 rounded">82% Automated Mapping</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-orange-500 w-[82%] h-full"></div>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm text-slate-200">CIS Azure Benchmark v2.0</span>
                                    <span className="text-rose-400 text-xs font-bold bg-rose-400/10 px-2 py-1 rounded">68% Evaluated</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-rose-500 w-[68%] h-full"></div>
                                </div>
                            </div>
                        </div>

                        <button className="mt-auto w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 text-sm rounded-lg transition-colors">
                            Export Artifacts for Auditor
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
