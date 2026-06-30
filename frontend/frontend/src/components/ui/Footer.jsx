import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-sm selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Replaced grid with simple flex-wrap div layout */}
        <div className="flex flex-wrap gap-10 justify-between items-start">

          {/* Company Intro Div */}
          <div className="w-full md:w-64 flex flex-col gap-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Shop<span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Hub</span>
            </h2>
            <p className="leading-relaxed text-slate-400 text-xs">
              ShopHub provides the latest luxury electronics, flagship smartphones, gaming accessories, and smart gadgets with elite level fast secure delivery.
            </p>
          </div>

          {/* Quick Links Div */}
          <div className="w-full sm:w-40 flex flex-col">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-5 text-slate-300">Quick Navigation</h3>
            <ul className="space-y-3 text-xs font-medium">
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Products Catalog</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Categories Matrix</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Contact Support</li>
            </ul>
          </div>

          {/* Customer Support Div */}
          <div className="w-full sm:w-40 flex flex-col">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-5 text-slate-300">Customer Legal</h3>
            <ul className="space-y-3 text-xs font-medium">
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Help Dashboard</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Shipping Track</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Returns Portal</li>
              <li className="hover:text-cyan-400 cursor-pointer transition duration-300">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Details Div */}
          <div className="w-full md:w-60 flex flex-col">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-5 text-slate-300">Corporate Office</h3>
            <div className="flex flex-col gap-2.5 text-xs mb-6 leading-relaxed">
              <p>📍 Bilaspur, Chhatisgarh, India</p>
              <p>📧 support@shophub.com</p>
              <p>📞 +91 7869736431</p>
            </div>

            {/* Social Icons inside simple div box */}
            <div className="flex gap-3">
              <a href="#" className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition duration-300 shadow-md">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition duration-300 shadow-md">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition duration-300 shadow-md">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition duration-300 shadow-md">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl hover:border-cyan-500/50 hover:text-cyan-400 transition duration-300 shadow-md">
                <FaGithub size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="border-t border-slate-900 mt-12 pt-6 text-center text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} ShopHub Inc. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;