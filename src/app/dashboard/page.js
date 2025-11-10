"use client";

import { useEffect, useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Loader2, Send, BarChart3,
} from "lucide-react";

const API_BASE = "https://vanna-ai-backend-python.vercel.app"; // 🔹 your Flask backend URL

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cashOutflow, setCashOutflow] = useState([]);
  const [loading, setLoading] = useState(true);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, trendRes, vendorRes, catRes, cashRes] = await Promise.all([
        fetch(`${API_BASE}/stats`),
        fetch(`${API_BASE}/invoice-trends`),
        fetch(`${API_BASE}/vendors/top10`),
        fetch(`${API_BASE}/category-spend`),
        fetch(`${API_BASE}/cash-outflow`),
      ]);

      const [statsData, trendData, vendorData, catData, cashData] = await Promise.all([
        statsRes.json(),
        trendRes.json(),
        vendorRes.json(),
        catRes.json(),
        cashRes.json(),
      ]);

      // ✅ FIXED according to your Flask backend structure:
      setStats(statsData.stats_summary || {});
      setTrends(trendData.monthly || []);
      setVendors(statsData.top_vendors || vendorData.vendors || []);
      setCategories(catData.categories || []);
      setCashOutflow(cashData.buckets || []);
    } catch (e) {
      console.error("Data fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const question = chatInput.trim();
    setChatMessages((m) => [...m, { role: "user", text: question }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat-with-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            (data.result && JSON.stringify(data.result, null, 2)) ||
            data.error ||
            "No data returned",
        },
      ]);
    } catch (e) {
      setChatMessages((m) => [
        ...m,
        { role: "assistant", text: `Error: ${e.message}` },
      ]);
    } finally {
      setChatLoading(false);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <h1 className="font-semibold text-lg">Flowbit AI</h1>
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("chatbot")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              activeTab === "chatbot"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Chatbot
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats &&
                Object.entries(stats).map(([key, value], idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-sm rounded-xl p-4 border"
                  >
                    <h3 className="text-sm text-gray-600 capitalize">
                      {key.replaceAll("_", " ")}
                    </h3>
                    <p className="text-xl font-bold mt-1">{value}</p>
                  </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Invoice Trends */}
              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Invoice Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total_spend" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Vendor Spend */}
              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Top Vendors</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={vendors}>
                    <XAxis dataKey="vendor_name" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category + Cash Outflow */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Spend by Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="total"
                      nameKey="category"
                      outerRadius={100}
                      fill="#3b82f6"
                      label
                    >
                      {categories.map((_, i) => (
                        <Cell
                          key={i}
                          fill={["#3b82f6", "#f97316", "#22c55e", "#a855f7"][i % 4]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Cash Outflow Forecast</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={cashOutflow}>
                    <XAxis dataKey="bucket" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#1e3a8a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          // Chatbot Section
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Chat with Your Data 💬</h2>
            <div className="bg-white border rounded-xl shadow-sm flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <pre className="text-sm whitespace-pre-wrap">
                        {msg.text}
                      </pre>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="text-gray-400 text-sm">Thinking...</div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form
                onSubmit={handleChat}
                className="border-t flex items-center gap-2 p-3"
              >
                <input
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                  disabled={chatLoading}
                >
                  {chatLoading ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
