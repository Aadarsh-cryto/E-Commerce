import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../components/ui/Navbar";

const BASE = "http://localhost:5000/api/v1";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(""); // Dynamic big image display switcher
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${BASE}/product/${id}`)
      .then((res) => {
        const prodData = res.data.product || null;
        setProduct(prodData);
        if (prodData) {
          setActiveImage(prodData.image); // Set primary cover photo initially
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    setAdding(true);
    try {
      await axios.post(`${BASE}/cart/add`, { productId: id, quantity: 1 }, { headers, withCredentials: true });
      alert("Added to cart! 🛒");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <Loader2 className="animate-spin text-cyan-400" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col">
      <Navbar />
      
      <main className="pt-28 flex-grow max-w-6xl mx-auto px-6 w-full py-12">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to products
        </button>

        {!product ? (
          <div className="text-center text-slate-400 py-10">
            <p className="text-xl font-semibold">Product not found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* Top Grid Area: Images + Buy Actions */}
            <div className="flex flex-col md:flex-row gap-12 items-start bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              
              {/* Flipkart Style Image Selector Array */}
              <div className="w-full md:w-1/2 flex gap-4">
                {/* Thumbnails list on the side */}
                {product.images && product.images.length > 0 && (
                  <div className="flex flex-col gap-3 flex-shrink-0">
                    {/* Render primary cover image as first thumbnail option */}
                    <div 
                      onClick={() => setActiveImage(product.image)}
                      className={`w-14 h-14 bg-slate-950 rounded-lg border p-1 flex items-center justify-center overflow-hidden cursor-pointer transition ${activeImage === product.image ? 'border-cyan-400' : 'border-slate-800'}`}
                    >
                      <img src={product.image} className="max-h-full max-w-full object-contain" alt="thumbnail" />
                    </div>
                    {/* Render extra dynamic sub-images */}
                    {product.images.map((imgUrl, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-14 h-14 bg-slate-950 rounded-lg border p-1 flex items-center justify-center overflow-hidden cursor-pointer transition ${activeImage === imgUrl ? 'border-cyan-400' : 'border-slate-800'}`}
                      >
                        <img src={imgUrl} className="max-h-full max-w-full object-contain" alt="thumbnail" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Big Display Window Viewer */}
                <div className="w-full h-80 flex items-center justify-center bg-slate-950 rounded-xl p-6 overflow-hidden border border-slate-800/50">
                  <img 
                    src={activeImage || product.image || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain transition duration-300"
                  />
                </div>
              </div>

              {/* Product Info Summary Box */}
              <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
                <div>
                  <h1 className="text-3xl font-extrabold text-white mb-2">{product.name}</h1>
                  <p className="text-sm text-cyan-400 font-semibold mb-4 bg-cyan-950/30 border border-cyan-800/30 px-3 py-1 rounded-md inline-block">
                    {product.category || "General"}
                  </p>
                  <p className="text-3xl font-black text-cyan-400 mb-4">₹{product.price?.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">{product.description}</p>
                </div>

                <button
                  onClick={addToCart}
                  disabled={adding}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
                >
                  {adding ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
                  {adding ? "Adding to Cart..." : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Bottom Area: Large Detailed Description Box */}
            {product.longDescription && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Product Description</h3>
                <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            )}

            {/* Bottom Area: Tech Specifications Table Section */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Specifications</h3>
                <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden">
                  {product.specifications.map((spec, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col sm:flex-row border-b border-slate-800 text-sm ${idx % 2 === 0 ? 'bg-slate-950/40' : 'bg-transparent'}`}
                    >
                      <div className="w-full sm:w-1/3 p-4 text-slate-400 font-medium bg-slate-950/20">{spec.key}</div>
                      <div className="w-full sm:w-2/3 p-4 text-slate-200 font-semibold">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}