import React, { useState, useEffect } from 'react';
import { ArrowRight, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Homepage = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('white');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('theme-white', 'theme-black', 'theme-crazy');
        root.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <div className="min-h-screen w-screen p-4 flex font-sans transition-colors duration-500">
            <Navbar />
            
            {/* Main Content Area */}
            <main className="flex-1 ml-24 flex flex-col border border-[var(--app-border)] bg-[var(--app-card)] rounded-2xl overflow-hidden shadow-sm relative transition-all">
                
                {/* TOP BAR */}
                <header className="px-10 py-6 border-b border-[var(--app-border)] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 italic">Deepfake Detection Engine // Status: Active</h2>
                    </div>
                </header>

                {/* CENTER CONTENT */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                    <div className="max-w-xl space-y-10">
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter uppercase italic leading-[0.9]">
                            DEEPFAKE <br /> 
                            <span className="opacity-30">DETECTOR</span>
                        </h1>
                        
                        <p className="text-lg opacity-60 font-medium leading-relaxed max-w-[100%] mx-auto">
Deepfake Detector is a streamlined AI utility built to identify synthetic patterns in images and videos. By using neural feature extraction, we help creators and platforms ensure that the content we consume remains authentic and human-led.
</p>

                        <div className="pt-6 flex justify-center">
                            <button 
                                onClick={() => navigate('/analyzer')}
                                className="group flex items-center gap-6 bg-[var(--app-text)] text-[var(--app-bg)] pl-10 pr-3 py-3 rounded-full transition-all hover:pr-5 shadow-xl hover:shadow-current/20"
                            >
                                <span className="text-xs font-black uppercase tracking-widest">Initialize Node</span>
                                <div className="w-10 h-10 bg-[var(--app-bg)] text-[var(--app-text)] rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <ArrowRight size={18} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                

                {/* FOOTER */}
                <footer className="px-10 py-6 border-t border-[var(--app-border)] flex justify-between text-[8px] font-black uppercase tracking-[0.4em] opacity-20">
                    <span>Forensic Analysis Terminal</span>
                    <span>© SynthGuard 2026</span>
                </footer>
            </main>
        </div>
    );
};

export default Homepage;