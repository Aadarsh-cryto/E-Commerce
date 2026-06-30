import React from "react";

const Features = () => {
  return (
    <section className="bg-slate-950 py-12 border-b border-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-slate-900 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/5 transition duration-500 group">
            <div className="text-3xl bg-slate-950 border border-slate-800 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition duration-500">🚚</div>
            <div>
              <h2 className="text-lg font-bold text-white mb-0.5">Free Shipping</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free delivery on all premium orders over <span className="text-cyan-400 font-extrabold">₹4,000</span>.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-slate-900 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/5 transition duration-500 group">
            <div className="text-3xl bg-slate-950 border border-slate-800 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition duration-500">💳</div>
            <div>
              <h2 className="text-lg font-bold text-white mb-0.5">Secure Payment</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% encrypted checkout with trusted corporate gateway nodes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-slate-900 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/5 transition duration-500 group">
            <div className="text-3xl bg-slate-950 border border-slate-800 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition duration-500">🎧</div>
            <div>
              <h2 className="text-lg font-bold text-white mb-0.5">24/7 Support</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated expert engineers available at your call anytime.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;