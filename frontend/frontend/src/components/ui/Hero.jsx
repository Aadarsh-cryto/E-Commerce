import React from "react";

const Hero = ({ onShopNowClick }) => {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-32 pb-20 overflow-hidden relative border-b border-slate-900">
      {/* Premium subtle background glow mesh */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12">
          
          {/* Left Content */}
          <div>
            <span className="inline-block bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase mb-5 shadow-lg shadow-cyan-500/5">
              🔥 New Collection 2026
            </span>

            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Latest <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Electronics</span> at Best Prices
            </h1>

            <p className="text-slate-400 text-base mt-6 leading-relaxed max-w-lg">
              Discover cutting-edge smartphones, laptops, smartwatches, headphones, gaming accessories and much more with exclusive premium discounts.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {/* Connected with props callback for auto-scroll mapping */}
              <button 
                onClick={onShopNowClick}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-black px-8 py-3.5 rounded-xl transition duration-300 shadow-xl shadow-cyan-500/20 uppercase tracking-wider text-sm active:scale-95"
              >
                Shop Now
              </button>
            </div>

            {/* Stats matrix divider overlay */}
            <div className="flex gap-10 mt-14 pt-8 border-t border-slate-900">
              <div>
                <h2 className="text-3xl font-black text-cyan-400 tracking-tight">20K+</h2>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">Happy Customers</p>
              </div>
              <div>
                <h2 className="text-3xl font-black text-cyan-400 tracking-tight">500+</h2>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">Premium Products</p>
              </div>
              <div>
                <h2 className="text-3xl font-black text-cyan-400 tracking-tight">24/7</h2>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">Live Support</p>
              </div>
            </div>
          </div>

          {/* Right Image Display Portal */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-80 h-80 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full blur-[100px] opacity-10 animate-pulse"></div>
            <div className="relative bg-gradient-to-b from-slate-900/40 to-slate-950/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-md shadow-2xl shadow-cyan-500/5">
              <img
                src="https://imgs.search.brave.com/rkgTqB4VH5fXL6gl4HK_PEuU7SHfbC032Ky-N5Ohxks/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/bWFya2V0aW5nLWNt/cy9hc3NldHMvaW1h/Z2VzLzI3Lzk1L2U2/MGJlMmY4NDBhNmFk/YTIyNTUwZjA1NjZl/ODQvYmVudG8tczI2/cGx1cy1kZXNrdG9w/LTJ4LndlYnA9bi13/NjAwLWg0NTQtZmNy/b3A2ND0xLDAwMDAw/ZjVlZmZmZmYwYTIt/cnc"
                alt="Featured Item"
                className="w-[360px] object-contain hover:scale-102 transition duration-700 drop-shadow-2xl filter brightness-95 contrast-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;