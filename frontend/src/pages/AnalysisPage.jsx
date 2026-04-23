import React, { useState } from 'react';
import axios from 'axios';
import { Upload, ShieldCheck, ShieldAlert, Loader2, Activity, Cpu, FileSearch } from 'lucide-react';
import Navbar from '../components/Navbar'; // Wahi vertical sidebar

const AnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Replace with your FastAPI endpoint
      const response = await axios.post('http://localhost:8000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Backend Connection Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen p-4 gap-4 font-sans transition-colors duration-500">
      <Navbar />

      <main className="flex-1 ml-24 flex flex-col border border-[var(--app-border)] bg-[var(--app-card)] rounded-2xl overflow-hidden shadow-sm relative">

        {/* Header Section */}
        <header className="px-10 py-6 border-b border-[var(--app-border)] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileSearch size={18} className="opacity-40" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic font-sans">
              Media Analysis Node // Forensic Verification
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold opacity-30 uppercase tracking-widest">
            <span>Engine: EffNet-B0</span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          {/* Left Side: Upload & Media Preview */}
          <div className="p-10 flex flex-col border-r border-[var(--app-border)] h-full overflow-hidden">
            <div className="flex-1 relative border-2 border-dashed border-[var(--app-border)] rounded-xl flex items-center justify-center overflow-hidden bg-black/5 group">
              {preview ? (
                file?.type.startsWith('video') ? (
                  <video
                    src={preview}
                    controls
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain p-4"
                  />
                )
              ) : (
                <div className="text-center space-y-4">
                  <Upload size={40} className="mx-auto opacity-20 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Drop Media for Scan</p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*,video/*"
              />
            </div>

            {/* Format & Size Footer */}
            <div className="mt-6 flex justify-between items-center text-[10px] font-bold uppercase opacity-30 tracking-widest">
              <span>Format: {file ? file.type.split('/')[1] : 'N/A'}</span>
              <span>Size: {file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '0 MB'}</span>
            </div>
          </div>

          {/* Right Side: Log & Results */}
          <div className="p-10 flex flex-col justify-between bg-inherit">
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-80 border-b border-current/10 pb-2 flex items-center gap-2">
                  <Activity size={16} /> Analysis_Log
                </h3>
                <p className="text-sm opacity-50 leading-relaxed font-medium">
                  Select a digital asset to begin the verification process.
                </p>
              </div>

              {/* Result Dashboard Section */}
              {result ? (
                <div className={`p-8 border-2 border-current transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-lg ${result.prediction === 'Fake' ? 'bg-red-500/5' : 'bg-emerald-500/5'}`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Classification</p>
                      <h4 className={`text-5xl font-black uppercase tracking-tighter ${result.prediction === 'DEEPFAKE' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {result.prediction}
                      </h4>
                    </div>
                    {result.prediction === 'DEEPFAKE' ? <ShieldAlert size={48} className="text-red-500" /> : <ShieldCheck size={48} className="text-emerald-500" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Confidence</p>
                    <p className="text-2xl font-bold font-mono">
                      {typeof result.confidence === 'number'
                        ? (result.confidence * 100).toFixed(2)
                        : parseFloat(result.confidence)}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-48 border border-current/5 flex flex-col items-center justify-center opacity-20">
                  <Cpu size={32} strokeWidth={1} />
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] mt-4 text-center leading-loose">
                    Waiting for Data Input... <br /> Neural Node Standby
                  </p>
                </div>
              )}
            </div>

            {/* Execute Button */}
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full bg-[var(--app-text)] text-[var(--app-bg)] py-5 rounded-xl text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:opacity-90 disabled:opacity-20 active:scale-95 shadow-xl hover:shadow-current/10"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <> [ Start Scanning ] </>
              )}
            </button>
          </div>
        </div>

        {/* Tactical Footer */}
        <footer className="px-10 py-6 border-t border-[var(--app-border)] flex justify-between text-[8px] font-black uppercase tracking-[0.4em] opacity-20">
          <div className="flex gap-8">
            <span>Sovereign ID: {file ? Math.random().toString(36).substring(7).toUpperCase() : 'Waiting'}</span>
            <span>Latency: 4.2ms</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AnalyzerPage;