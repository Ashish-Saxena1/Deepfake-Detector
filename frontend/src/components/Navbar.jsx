

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ScanSearch, Settings2, Fingerprint, LogOut } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Theme state with localStorage sync
   const [theme, setTheme] = useState(() => {
    // Ye check karega ki pehle se kya saved hai
    const saved = localStorage.getItem('app-theme');
    return saved || 'white';
});

useEffect(() => {
    const root = window.document.documentElement;
    
    // Purani saari classes remove karo
    root.classList.remove('theme-white', 'theme-black', 'theme-retro');
    
    // Nayi class add karo
    root.classList.add(`theme-${theme}`);
    
    // Storage update karo
    localStorage.setItem('app-theme', theme);
}, [theme]);

    // Helper for Nav Items
    const NavItem = ({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
            <Link to={path} className="group relative flex items-center justify-center">
                <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-[var(--app-text)] text-[var(--app-bg)] shadow-lg scale-110' : 'opacity-40 hover:opacity-100 hover:bg-black/5'}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                {/* Tooltip on Hover */}
                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-[var(--app-text)] text-[var(--app-bg)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md pointer-events-none z-[200] shadow-xl whitespace-nowrap">
                    {label}
                </span>
            </Link>
        );
    };

    return (
        <aside className="fixed left-4 top-4 bottom-4 w-20 flex flex-col items-center py-8 gap-8 border border-[var(--app-border)] bg-[var(--app-card)] rounded-2xl shadow-sm z-[100] transition-colors duration-500">
            
            {/* Logo Section */}
            <div 
                className="p-2.5 bg-[var(--app-text)] text-[var(--app-bg)] rounded-xl cursor-pointer hover:rotate-12 transition-transform shadow-md" 
                onClick={() => navigate('/')}
            >
                <Fingerprint size={24} strokeWidth={2.5} />
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col gap-6 flex-1 mt-4">
                <NavItem icon={Home} label="Terminal Home" path="/" />
                <NavItem icon={ScanSearch} label="Neural Analyzer" path="/analyzer" />
                {/* <NavItem icon={Settings2} label="System Config" path="/settings" /> */}
            </div>

            {/* THEME SWITCHER (The 3 Dots) */}
            <div className="flex flex-col items-center gap-4 p-2 bg-black/5 rounded-full border border-current/5 mb-4">
                <button 
                    onClick={() => setTheme('white')}
                    className={`w-3.5 h-3.5 rounded-full bg-[#f5f5f0] border border-black/20 transition-all ${theme === 'white' ? 'scale-125 ring-2 ring-gray-400' : 'hover:scale-110 opacity-50'}`}
                    title="Light Beige"
                />
                <button 
                    onClick={() => setTheme('black')}
                    className={`w-3.5 h-3.5 rounded-full bg-[#0d0d0d] border border-white/20 transition-all ${theme === 'black' ? 'scale-125 ring-2 ring-gray-600' : 'hover:scale-110 opacity-50'}`}
                    title="Deep Black"
                />
                <button 
                    onClick={() => setTheme('retro')}
                    className={`w-3.5 h-3.5 rounded-full bg-[#e2b76e] transition-all ${theme === 'retro' ? 'scale-125 ring-2 ring-amber-600 shadow-[0_0_10px_rgba(226,183,110,0.5)]' : 'hover:scale-110 opacity-50'}`}
                    title="Professional Retro"
                />
            </div>

            {/* Logout at Bottom */}
            <button 
                onClick={() => navigate('/')}
                className="group relative flex items-center justify-center opacity-30 hover:opacity-100 transition-all pt-4 border-t border-current/5 w-full">
                <div className="p-3">
                    
                    <LogOut size={22} />
                </div>
                <span 
                    className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg">
                    Back
                </span>
            </button>
        </aside>
    );
};

export default Navbar;