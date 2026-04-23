// import React, { useState } from 'react';
// import axios from 'axios';
// import { Upload, Zap, Search, Fingerprint, Film, RefreshCw, Layers3, Target, ShieldAlert, ImageIcon } from 'lucide-react';

// function App() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//       setResult(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // API call to our FastAPI backend on port 8000
//       const response = await axios.post('http://127.0.0.1:8000/predict', formData);
//       setResult(response.data);
//     } catch (error) {
//       console.error("Connection Error:", error);
//       alert("Make sure your Python backend is running on port 8000!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#010204] text-[#00e1ff] flex flex-col items-center p-6 md:p-12 font-mono relative overflow-hidden">
      
//       {/* 1. Animated Wireframe Mesh (The "Imagination" part) */}
//       <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
//         <defs>
//           <pattern id="dotGrid" width="60" height="60" patternUnits="userSpaceOnUse">
//             <circle cx="1" cy="1" r="1" fill="#00e1ff"/>
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#dotGrid)" />
//       </svg>
//       <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-transparent to-[#010204] opacity-80"></div>

//       {/* 2. Holographic Scan Lines effect */}
//       <div className="absolute inset-0 pointer-events-none opacity-5 active-scan-lines"></div>

//       {/* Header with tactical info */}
//       <header className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center border-b border-[#00e1ff]/10 pb-8 mb-16 relative z-10">
//         <div className="flex items-center gap-3">
//           <Layers3 className="h-9 w-9 text-[#00e1ff] animate-pulse" />
//           <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#00e1ff] via-[#4dffff] to-white bg-clip-text text-transparent uppercase tracking-tighter tactical-glitch">
//             Project::SYNTH·GUARD
//           </h1>
//         </div>
//         <div className="text-[11px] text-[#00e1ff]/70 text-right tracking-widest mt-4 md:mt-0 leading-relaxed uppercase">
//           Authorization: [ALPHA_OMEGA_SECURED]<br/>
//           Session ID: {Math.random().toString(16).slice(2, 10).toUpperCase()} [ACTIVE]<br/>
//           Node Location: [RUDRAPUR_IN_DATA_CORE_7]
//         </div>
//       </header>

//       {/* Multi-Column Layout (The AR Viewport) */}
//       <main className="w-full max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12">
        
//         {/* Viewport 1: The Input Matrix */}
//         <section className="border border-[#00e1ff]/20 bg-[#00e1ff]/5 rounded-3xl p-10 relative overflow-hidden shadow-[0_0_60px_rgba(0,225,255,0.05)]">
          
//           {/* Fancier corners */}
//           <div className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-[#00e1ff]"></div>
//           <div className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-[#00e1ff]"></div>

//           <div className="flex items-center gap-3 mb-10">
//             <Target className="h-7 w-7 text-[#00e1ff]" />
//             <h2 className="text-3xl font-black text-white tracking-tight uppercase">Submit Source Matrix</h2>
//           </div>

//           <div className="relative group border border-[#00e1ff]/30 rounded-2xl transition-all flex flex-col items-center justify-center h-[400px] md:h-[550px] cursor-pointer overflow-hidden p-6
//             ${preview ? 'border-[#00e1ff]/60 bg-black/40 shadow-inner' : 'hover:border-[#00e1ff]/80 hover:bg-[#00e1ff]/10'}"
//           >
//             <input 
//               type="file" 
//               className="absolute inset-0 opacity-0 cursor-pointer z-20" 
//               onChange={onFileChange} 
//               accept="image/*,video/*" 
//             />
            
//             {preview ? (
//               file.type.startsWith('video') ? (
//                 <video src={preview} controls className="max-h-full rounded-lg shadow-2xl shadow-black/80 ring-1 ring-[#00e1ff]/40" />
//               ) : (
//                 <img src={preview} alt="Preview" className="max-h-full rounded-lg shadow-2xl shadow-black/80 ring-1 ring-[#00e1ff]/40" />
//               )
//             ) : (
//               <div className="text-center group-hover:scale-105 transition-transform duration-300">
//                 <Upload className="mx-auto h-24 w-24 text-[#00e1ff]/5 group-hover:text-[#00e1ff]/70 transition-colors" />
//                 <p className="mt-8 text-2xl text-[#00e1ff]/90 font-black tracking-widest uppercase">[Initialize Media Handshake]</p>
//                 <div className="flex justify-center gap-6 text-[#00e1ff]/20 mt-3">
//                   <Film size={32} /> <Zap size={32} /> <ImageIcon size={32} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Viewport 2: Analysis & Controls */}
//         <section className="flex flex-col gap-10">
          
//           {/* Analysis Card */}
//           <div className="border border-[#00e1ff]/20 bg-[#00e1ff]/5 rounded-3xl p-10 flex flex-col justify-between relative shadow-[0_0_60px_rgba(0,225,255,0.05)]">
            
//             <div className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-[#00e1ff]"></div>
//             <div className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-[#00e1ff]"></div>

//             <div>
//               <div className="flex items-center gap-3 mb-10 border-b border-[#00e1ff]/10 pb-6">
//                 <ShieldAlert className="h-7 w-7 text-[#00e1ff]" />
//                 <h2 className="text-3xl font-black text-white tracking-tight uppercase">Analysis Status</h2>
//               </div>

//               <div className="text-xs text-[#00e1ff]/80 mb-6 leading-relaxed flex items-center gap-2">
//                 <RefreshCw className={`h-4 w-4 text-[#00e1ff] ${loading ? 'animate-spin' : ''}`} />
//                 ANALYSIS LOG [v3.1]::MODEL [EFFNET_B0] <br/>
//                 READY_FOR_DATASTREAM...
//               </div>

//               <button 
//                 onClick={handleUpload}
//                 disabled={!file || loading}
//                 className={`group relative w-full py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 tracking-wider uppercase transition-all overflow-hidden active:scale-95
//                   ${!file || loading 
//                     ? 'border border-[#00e1ff]/10 text-[#00e1ff]/20 cursor-not-allowed bg-black/40' 
//                     : 'border-2 border-[#00e1ff] text-white shadow-2xl hover:shadow-[#00e1ff]/20 hover:text-[#00e1ff] hover:bg-[#00e1ff]/5'}`}
//               >
//                 {/* Tactical glowing pulse on hover */}
//                 <div className="absolute inset-0 bg-[#00e1ff] opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
                
//                 {loading ? (
//                   <>
//                     <Search className="animate-spin h-7 w-7 relative z-10" />
//                     <span className="relative z-10">Processing datastream</span>
//                   </>
//                 ) : (
//                   <>
//                     <Zap className="h-7 w-7 relative z-10 group-hover:animate-pulse" />
//                     <span className="relative z-10">[EXPLAINABLE ANALYSIS]</span>
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Tactical Result Display */}
//             {result && (
//               <div className={`mt-10 p-8 rounded-2xl border ${result.prediction === 'REAL' ? 'border-[#00ff88]/40 bg-[#00ff88]/5' : 'border-[#ff3333]/40 bg-[#ff3333]/5'}
//                 relative shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-tactical-result`}>
                
//                 <div className="flex justify-between items-center gap-4">
//                   <div>
//                     <h4 className="text-[11px] text-[#00e1ff]/70 uppercase tracking-widest font-semibold mb-1">[FINAL VERDICT]</h4>
//                     <p className={`text-5xl font-black tracking-tighter uppercase ${result.prediction === 'REAL' ? 'text-[#00ff88]' : 'text-[#ff3333]'}`}>
//                       {result.prediction}
//                     </p>
//                   </div>
                  
//                   <div className="text-right border-l border-dashed border-[#00e1ff]/10 pl-6 py-2">
//                     <h4 className="text-[11px] text-[#00e1ff]/70 uppercase tracking-widest font-semibold mb-1">[CONFIDENCE_LEVEL]</h4>
//                     <p className="text-5xl font-black text-white tracking-tighter">
//                       {result.confidence}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-5 border-t border-dashed border-[#00e1ff]/10 flex justify-between text-[10px] text-[#00e1ff]/60 tracking-widest uppercase">
//                   <span>LOG: #{Math.floor(Math.random()*90000)} [SECURED]</span>
//                   <span>MODality: {result.type}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       <footer className="mt-20 py-8 border-t border-[#00e1ff]/10 w-full max-w-7xl text-center text-[#00e1ff]/40 text-[10px] tracking-[0.4em] uppercase leading-loose relative z-10">
//         Project Node: Alpha Omega / authorization::CONFIDENTIAL / developed by user // [Final Year Project]
//       </footer>
//     </div>
//   );
// }

// export default App;





import React from 'react'
// import { useState, useEffect } from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
// import Header from './components/header'
import Homepage from './pages/homepage'
import AnalysisPage from './pages/AnalysisPage'

const App = () => {
  return (
    <div>
      <Routes>
      
      <Route path='/' element={<Homepage/>}/>
      <Route path='/analyzer' element={<AnalysisPage/>}/>
      
      
      
    </Routes>
    </div>
  )
}

export default App
