"use client";

import { useState, useEffect } from "react";
import { DashboardMetrics, analyticsStore } from "@/lib/analytics";
import { PDFExporter } from "@/lib/pdf-export";

function MetricCard({
  title,
  value,
  unit = "",
  subtext,
  trend,
  icon,
}: {
  title: string;
  value: number | string;
  unit?: string;
  subtext?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-stone-600">{title}</p>
          <p className="mt-2 text-3xl font-bold">
            {icon} {value}
            {unit && <span className="text-lg text-stone-600 ml-1">{unit}</span>}
          </p>
          {subtext && <p className="mt-1 text-xs text-stone-500">{subtext}</p>}
        </div>
        {trend && (
          <div
            className={`text-lg ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                  ? "text-red-600"
                  : "text-stone-400"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceRow({
  name,
  views,
  rank,
}: {
  name: string;
  views: number;
  rank: number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-stone-100 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-stone-400 w-6">{rank}.</span>
        <span className="text-sm font-medium text-stone-900">{name}</span>
      </div>
      <span className="text-sm text-stone-600">{views} views</span>
    </div>
  );
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setMetrics(analyticsStore.getMetrics(30));
    setLoading(false);
    setLastUpdated(new Date());

    const interval = setInterval(() => {
      setMetrics(analyticsStore.getMetrics(30));
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    const exporter = new PDFExporter();
    exporter.generate(metrics, lastUpdated);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nourish Network Dashboard</h1>
          <p className="mt-1 text-sm text-stone-600">
            Executive view • Real-time metrics
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 transition"
        >
          📊 Export PDF
        </button>
      </div>

      {/* Last Updated */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">
        Last updated: {lastUpdated.toLocaleTimeString()} •{" "}
        <span className="font-medium">Real-time data refreshes every minute</span>
      </div>

      {/* User Metrics */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Active Users</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Users Today"
            value={metrics.activeUsersToday}
            icon="👤"
            trend="up"
          />
          <MetricCard
            title="Users This Week"
            value={metrics.activeUsersThisWeek}
            icon="📈"
            trend="up"
          />
          <MetricCard
            title="Users This Month"
            value={metrics.activeUsersThisMonth}
            icon="📊"
            trend="neutral"
          />
          <MetricCard
            title="New Users Today"
            value={metrics.newUsersToday}
            icon="✨"
            trend="up"
          />
        </div>
      </div>

      {/* Search Metrics */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Search Activity</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Searches Today"
            value={metrics.searchesToday}
            icon="🔍"
            trend="up"
          />
          <MetricCard
            title="Searches This Month"
            value={metrics.searchesThisMonth}
            icon="📋"
            trend="neutral"
          />
          <MetricCard
            title="Avg Searches per User"
            value={metrics.avgSearchesPerUser.toFixed(1)}
            icon="🎯"
            subtext="Higher = better engagement"
            trend="up"
          />
          <MetricCard
            title="Resources Mapped"
            value={metrics.resourcesMapped}
            icon="📍"
            subtext="Verified & updated"
            trend="neutral"
          />
        </div>
      </div>

      {/* SNAP Impact */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">SNAP Enrollment Impact</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="SNAP Referrals Today"
            value={metrics.snapReferralsToday}
            icon="🤝"
            trend="up"
          />
          <MetricCard
            title="SNAP Referrals This Month"
            value={metrics.snapReferralsThisMonth}
            icon="📈"
            trend="up"
          />
          <MetricCard
            title="Est. New SNAP Enrollees"
            value={metrics.estimatedSnapEnrollments}
            icon="✅"
            subtext="75% conversion"
            trend="up"
          />
          <MetricCard
            title="Est. Annual Benefit"
            value={`$${(metrics.estimatedAnnualBenefit / 1000).toFixed(0)}K`}
            icon="💰"
            subtext="To residents, per year"
            trend="up"
          />
        </div>
      </div>

      {/* Top Resources & System Health */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Resources */}
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-semibold">Top Resources Found</h3>
          <div className="space-y-1">
            {metrics.topResourcesFound.map((resource, idx) => (
              <ResourceRow
                key={resource.id}
                rank={idx + 1}
                name={resource.name}
                views={resource.views}
              />
            ))}
          </div>
          {metrics.topResourcesFound.length === 0 && (
            <p className="text-xs text-stone-500">No search data yet</p>
          )}
        </div>

        {/* System Health */}
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-semibold">System Health</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">App Uptime</span>
                <span className="font-semibold text-green-600">
                  {metrics.appUptime.toFixed(2)}%
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-stone-200">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: `${metrics.appUptime}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Avg Search Latency</span>
                <span className="font-semibold text-blue-600">
                  {metrics.avgSearchLatency}ms
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">Target: &lt; 200ms</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Data Freshness</span>
                <span className="font-semibold text-amber-600">
                  {(100 - metrics.staleDataPercentage).toFixed(0)}% current
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                {metrics.staleDataPercentage}% resources need update
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Usage */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Feature Usage</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Eligibility Checker Used"
            value={metrics.eligibilityCheckerUsage}
            icon="📋"
            subtext="Privacy-first questionnaire"
            trend="up"
          />
          <MetricCard
            title="Open Now Filter Used"
            value={metrics.openNowFilterUsage}
            icon="⏰"
            subtext="Real-time availability"
            trend="up"
          />
          <MetricCard
            title="Type Filter Used"
            value={metrics.typeFilterUsage}
            icon="🎯"
            subtext="By resource type"
            trend="neutral"
          />
          <MetricCard
            title="Filters Combined"
            value={metrics.filterCombinationUsage}
            icon="🔗"
            subtext="Multiple filters"
            trend="up"
          />
        </div>
      </div>

      {/* Geographic Coverage */}
      <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 font-semibold">Geographic Coverage</h3>
        <div className="mb-4">
          <p className="text-sm text-stone-600">
            {metrics.neighborhoodsCovered} neighborhoods covered
          </p>
        </div>

        <div className="space-y-2">
          {metrics.geographicCoverage.map((geo, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-700">{geo.neighborhood}</span>
                <span className="text-stone-600">{geo.userSearches} searches</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-stone-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{
                    width: `${
                      (geo.userSearches /
                        Math.max(
                          ...metrics.geographicCoverage.map((g) => g.userSearches)
                        )) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {metrics.geographicCoverage.length === 0 && (
          <p className="text-xs text-stone-500">No geographic data yet</p>
        )}
      </div>

      {/* Footer */}
      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-center text-xs text-stone-600">
        <p>
          Dashboard auto-refreshes every minute. For questions or data issues,
          contact nourish@stpeteai.org
        </p>
      </div>
    </div>
  );
}
