

"use client";

import { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { Loader2, Send, BarChart3 } from "lucide-react";

const API_BASE ="https://vanna-ai-backend-python.vercel.app";

export default function DataWandDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [trends, setTrends] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [cashOutflow, setCashOutflow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);


  useEffect(() => {
    async function fetchJson(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.error("Fetch failed:", url, err);
        return null;
      }
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const [statsRes, trendsRes, vendorsRes, cashRes] = await Promise.all([
          fetchJson(`${API_BASE}/stats`),
          fetchJson(`${API_BASE}/invoice-trends`),
          fetchJson(`${API_BASE}/vendors/top10`),
          fetchJson(`${API_BASE}/cash-outflow`),
        ]);

        // Stats
        setStats(statsRes?.stats_summary || statsRes || {});

        // Invoice trends
        const trendArr = Array.isArray(trendsRes?.monthly)
          ? trendsRes.monthly
          : Array.isArray(trendsRes)
          ? trendsRes
          : [];
        setTrends(
          trendArr.map((r) => ({
            month: r.month || r.label || "Unknown",
            total: Number(r.total ?? r.amount ?? 0),
          }))
        );

        // Vendors
        const vendorsArr = Array.isArray(vendorsRes)
          ? vendorsRes
          : Array.isArray(vendorsRes?.vendors)
          ? vendorsRes.vendors
          : [];
        setVendors(
          vendorsArr.map((v, i) => ({
            vendor_name: v.vendor_name || `Vendor ${i + 1}`,
            total: Number(v.total ?? v.amount ?? 0),
          }))
        );

        // Cash Outflow
        const cashArr = Array.isArray(cashRes?.rows)
          ? cashRes.rows
          : Array.isArray(cashRes)
          ? cashRes
          : [];
        setCashOutflow(
          cashArr.map((r, i) => ({
            vendor_name: r.vendor_name || `Vendor ${i + 1}`,
            payment_date: r.payment_date || "",
            amount: Number(r.payment_total ?? 0),
          }))
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);


  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: q }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (data.error) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", text: `⚠${data.error}` },
        ]);
      } else {
        const sql = data.generated_sql || "No SQL generated.";
        const result = JSON.stringify(data.result || "No result.", null, 2);
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: ` SQL:\n${sql}\n\n Result:\n${result}`,
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${err.message}` },
      ]);
    } finally {
      setChatLoading(false);
      setTimeout(
        () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  // ---------------- Loading state ----------------
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  // ---------------- UI ----------------
  const totalOutflow = cashOutflow.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <h1 className="font-semibold text-lg"> FLOWBIT</h1>
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
            onClick={() => setActiveTab("chat")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              activeTab === "chat"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Chat
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" ? (
          <>
            <h2 className="text-2xl font-bold mb-6"> Business Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(stats).map(([k, v]) => (
                <div key={k} className="bg-white shadow-sm rounded-xl p-4 border">
                  <h3 className="text-sm text-gray-600 capitalize">
                    {k.replaceAll("_", " ")}
                  </h3>
                  <p className="text-xl font-bold mt-1">
                    {typeof v === "number" ? v.toLocaleString() : String(v ?? "N/A")}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Invoice Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-3">Top Vendors</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={vendors}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="vendor_name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cash Outflow */}
            <div className="bg-white border rounded-xl p-4 mt-8">
              <h3 className="font-semibold mb-3">Recent Cash Outflows</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-left text-gray-700">
                  <thead className="border-b border-gray-200 text-gray-500">
                    <tr>
                      <th className="p-2">Payment Date</th>
                      <th className="p-2">Vendor</th>
                      <th className="p-2 text-right">Amount ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashOutflow.map((r, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="p-2">{r.payment_date?.slice(0, 10) || "-"}</td>
                        <td className="p-2">{r.vendor_name}</td>
                        <td className="p-2 text-right">
                          ${r.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center font-semibold text-blue-600">
                Total recent outflow: ${totalOutflow.toFixed(2)}
              </p>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={cashOutflow}
                    dataKey="amount"
                    nameKey="vendor_name"
                    outerRadius={90}
                    label
                  >
                    {cashOutflow.map((_, i) => (
                      <Cell
                        key={i}
                        fill={[
                          "#3b82f6",
                          "#1d4ed8",
                          "#60a5fa",
                          "#93c5fd",
                          "#2563eb",
                        ][i % 5]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          // Chat Section
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4"> Chat with Your Data</h2>
            <div className="bg-white border rounded-xl flex flex-col h-[600px] shadow-sm">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && <div className="text-gray-400 text-sm">Thinking...</div>}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleChat} className="border-t flex items-center gap-2 p-3">
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
