import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  FaChartLine,
  FaLeaf,
  FaRupeeSign,
  FaArrowRight,
} from "react-icons/fa";
import { API_BASE_URL } from "../../services/apiBase";

const emptyAnalytics = {
  totals: {
    orders: 0,
    activeOrders: 0,
    cancelledOrders: 0,
    paidOrders: 0,
    grossSales: 0,
    collectedIncome: 0,
    pendingIncome: 0,
    cancelledValue: 0,
    averageOrder: 0,
    todaySales: 0,
    todayOrders: 0,
    thisMonthSales: 0,
    lastMonthSales: 0,
    monthGrowth: 0,
  },
  last7Days: [],
  last6Months: [],
  byStatus: {},
  byPaymentMethod: {},
  topProducts: [],
  recentOrders: [],
};

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}/api/admin/analytics`, {
          headers,
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load analytics");
        }

        setAnalytics({ ...emptyAnalytics, ...data.analytics });
      } catch (err) {
        setError(err.message || "Unable to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totals = analytics.totals || emptyAnalytics.totals;
  const maxDayIncome = Math.max(
    1,
    ...(analytics.last7Days || []).map((day) => day.income || 0)
  );
  const maxMonthIncome = Math.max(
    1,
    ...(analytics.last6Months || []).map((month) => month.income || 0)
  );

  return (
    <AdminLayout>
      <style>{`
        @media (max-width: 900px) {
          .admin-analytics-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={styles.page}>
        <div style={styles.hero}>
          <div style={styles.heroCircle} />
          <FaLeaf style={styles.heroLeaf} />
          <p style={styles.eyebrow}>Sales intelligence</p>
          <h1 style={styles.heroTitle}>Analytics</h1>
          <p style={styles.heroText}>
            Track orders, income and product performance from live checkout
            data. Cancelled orders are excluded from sales.
          </p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.kpiGrid}>
          <Kpi
            label="Gross sales"
            value={loading ? "..." : money(totals.grossSales)}
            hint={`${totals.activeOrders} active orders`}
          />
          <Kpi
            label="Collected"
            value={loading ? "..." : money(totals.collectedIncome)}
            hint={`${totals.paidOrders} paid orders`}
          />
          <Kpi
            label="This month"
            value={loading ? "..." : money(totals.thisMonthSales)}
            hint={`${Number(totals.monthGrowth || 0).toFixed(1)}% vs last month`}
          />
          <Kpi
            label="Average order"
            value={loading ? "..." : money(totals.averageOrder)}
            hint={`${totals.todayOrders} orders today`}
          />
        </div>

        <div className="admin-analytics-split" style={styles.split}>
          <section style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <h2 style={styles.cardTitle}>Income this week</h2>
                <p style={styles.cardSub}>Non-cancelled order value by day</p>
              </div>
              <FaChartLine color="#175C38" />
            </div>
            <div style={styles.bars}>
              {(analytics.last7Days || []).map((day) => (
                <div key={day.key} style={styles.barCol}>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        height: `${Math.max(
                          8,
                          ((day.income || 0) / maxDayIncome) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <span style={styles.barLabel}>{day.label}</span>
                  <span style={styles.barValue}>
                    {loading ? "—" : money(day.income)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <h2 style={styles.cardTitle}>Last 6 months</h2>
                <p style={styles.cardSub}>Monthly sales from orders</p>
              </div>
            </div>
            <div style={styles.monthList}>
              {(analytics.last6Months || []).map((month) => (
                <div key={month.key} style={styles.monthRow}>
                  <span style={styles.monthName}>{month.label}</span>
                  <div style={styles.monthTrack}>
                    <div
                      style={{
                        ...styles.monthFill,
                        width: `${Math.max(
                          6,
                          ((month.income || 0) / maxMonthIncome) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <span style={styles.monthValue}>
                    {loading ? "—" : money(month.income)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="admin-analytics-split" style={styles.split}>
          <section style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <h2 style={styles.cardTitle}>Order status</h2>
                <p style={styles.cardSub}>How the current pipeline looks</p>
              </div>
            </div>
            {Object.keys(analytics.byStatus || {}).length === 0 ? (
              <p style={styles.empty}>No orders yet.</p>
            ) : (
              Object.entries(analytics.byStatus).map(([status, info]) => (
                <div key={status} style={styles.statusRow}>
                  <span>{status}</span>
                  <strong>
                    {info.count} · {money(info.amount)}
                  </strong>
                </div>
              ))
            )}
          </section>

          <section style={styles.card}>
            <div style={styles.cardHead}>
              <div>
                <h2 style={styles.cardTitle}>Top products</h2>
                <p style={styles.cardSub}>Highest revenue from order items</p>
              </div>
            </div>
            {analytics.topProducts.length === 0 ? (
              <p style={styles.empty}>No product sales yet.</p>
            ) : (
              analytics.topProducts.map((product, index) => (
                <div key={product.name} style={styles.statusRow}>
                  <span>
                    {index + 1}. {product.name}
                  </span>
                  <strong>
                    {product.quantity} sold · {money(product.revenue)}
                  </strong>
                </div>
              ))
            )}
          </section>
        </div>

        <section style={styles.card}>
          <div style={styles.cardHead}>
            <div>
              <h2 style={styles.cardTitle}>Recent orders</h2>
              <p style={styles.cardSub}>Latest checkout activity</p>
            </div>
            <Link to="/admin/AdminOrders" style={styles.link}>
              All orders <FaArrowRight size={10} />
            </Link>
          </div>
          {analytics.recentOrders.length === 0 ? (
            <p style={styles.empty}>No recent orders to show.</p>
          ) : (
            analytics.recentOrders.map((order) => (
              <div key={order.id} style={styles.orderRow}>
                <div>
                  <p style={styles.orderName}>{order.customer}</p>
                  <p style={styles.orderMeta}>
                    {order.status} · {order.paymentStatus}
                  </p>
                </div>
                <strong style={styles.orderAmount}>{money(order.amount)}</strong>
              </div>
            ))
          )}
        </section>
      </div>
    </AdminLayout>
  );
}

function Kpi({ label, value, hint }) {
  return (
    <div style={styles.kpi}>
      <div style={styles.kpiIcon}>
        <FaRupeeSign />
      </div>
      <p style={styles.kpiLabel}>{label}</p>
      <h3 style={styles.kpiValue}>{value}</h3>
      <p style={styles.kpiHint}>{hint}</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    color: "#20382a",
    marginLeft: "-215px",
  },
  hero: {
    background:
      "linear-gradient(135deg, #123d27 0%, #1d5a38 55%, #2f7048 100%)",
    borderRadius: "24px",
    padding: "36px 40px",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    marginBottom: "22px",
    boxShadow: "0 18px 45px rgba(24, 74, 45, 0.16)",
  },
  heroCircle: {
    position: "absolute",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.1)",
    right: "-80px",
    top: "-90px",
  },
  heroLeaf: {
    position: "absolute",
    right: "36px",
    bottom: "28px",
    fontSize: "64px",
    color: "rgba(255,255,255,0.08)",
  },
  eyebrow: {
    margin: 0,
    letterSpacing: "2.4px",
    textTransform: "uppercase",
    fontSize: "11px",
    color: "#dfc27b",
    fontWeight: 800,
  },
  heroTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "38px",
    margin: "10px 0 8px",
    fontWeight: 500,
  },
  heroText: {
    margin: 0,
    maxWidth: "560px",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.6,
  },
  error: {
    background: "#FDECEC",
    color: "#9B1C1C",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "18px",
  },
  kpi: {
    background: "#fff",
    border: "1px solid #E3EBE4",
    borderRadius: "20px",
    padding: "18px 20px",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
  },
  kpiIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#F1F6F1",
    color: "#175C38",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  kpiLabel: {
    margin: 0,
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "#C79A45",
  },
  kpiValue: {
    margin: "8px 0 4px",
    fontFamily: "Georgia, serif",
    fontSize: "26px",
    fontWeight: 500,
  },
  kpiHint: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7A70",
  },
  split: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
    gap: "16px",
    marginBottom: "16px",
  },
  card: {
    background: "#fff",
    border: "1px solid #E3EBE4",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 10px 28px rgba(23,63,42,0.05)",
    marginBottom: "16px",
  },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
    gap: "12px",
  },
  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: "20px",
    fontWeight: 500,
    color: "#173F2A",
  },
  cardSub: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#6B7A70",
  },
  bars: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: "10px",
    alignItems: "end",
    minHeight: "180px",
  },
  barCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    height: "180px",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    maxWidth: "28px",
    background: "#EEF4EE",
    borderRadius: "999px",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    background: "linear-gradient(180deg, #2f7048 0%, #175C38 100%)",
    borderRadius: "999px",
  },
  barLabel: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#173F2A",
  },
  barValue: {
    fontSize: "10px",
    color: "#6B7A70",
    textAlign: "center",
  },
  monthList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  monthRow: {
    display: "grid",
    gridTemplateColumns: "44px minmax(0, 1fr) auto",
    gap: "10px",
    alignItems: "center",
  },
  monthName: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#173F2A",
  },
  monthTrack: {
    height: "10px",
    background: "#EEF4EE",
    borderRadius: "999px",
    overflow: "hidden",
  },
  monthFill: {
    height: "100%",
    background: "#C79A45",
    borderRadius: "999px",
  },
  monthValue: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#175C38",
    whiteSpace: "nowrap",
  },
  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #EDF1ED",
    fontSize: "13px",
    color: "#314438",
  },
  empty: {
    margin: 0,
    color: "#6B7A70",
    fontSize: "13px",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#175C38",
    fontWeight: 800,
    fontSize: "12px",
    textDecoration: "none",
  },
  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #EDF1ED",
  },
  orderName: {
    margin: 0,
    fontWeight: 700,
    color: "#173F2A",
  },
  orderMeta: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#6B7A70",
  },
  orderAmount: {
    color: "#175C38",
  },
};
