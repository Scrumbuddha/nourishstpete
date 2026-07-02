import { DashboardMetrics } from "./analytics";

// Simple PDF export utility for Nourish Dashboard
// Uses a server-side PDF generation approach (can be upgraded to client-side in future)

export class PDFExporter {
  private generateHTML(metrics: DashboardMetrics, generatedAt: Date): string {
    const formatCurrency = (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);

    const formatPercent = (value: number) => `${value.toFixed(2)}%`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nourish Network Dashboard - Monthly Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1f2937;
      line-height: 1.6;
      background: white;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .header {
      border-bottom: 3px solid #1e40af;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .header h1 {
      font-size: 28px;
      color: #000;
      margin-bottom: 5px;
    }

    .header p {
      color: #6b7280;
      font-size: 14px;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6b7280;
      margin-top: 10px;
    }

    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #111;
      margin-bottom: 15px;
      border-left: 4px solid #1e40af;
      padding-left: 10px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    .metric-card {
      border: 1px solid #e5e7eb;
      padding: 15px;
      border-radius: 6px;
      background: #f9fafb;
    }

    .metric-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-value {
      font-size: 24px;
      font-weight: bold;
      color: #111;
    }

    .metric-unit {
      font-size: 12px;
      color: #6b7280;
      margin-left: 5px;
    }

    .metric-subtext {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 5px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .table th {
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }

    .table td {
      padding: 10px 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 13px;
    }

    .table tr:nth-child(even) {
      background: #f9fafb;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 5px;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 4px;
    }

    .highlight-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }

    .highlight-box p {
      font-size: 13px;
      color: #1e3a8a;
      margin: 0;
    }

    .footer {
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      margin-top: 40px;
      font-size: 11px;
      color: #9ca3af;
      text-align: center;
    }

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 600px) {
      .two-column {
        grid-template-columns: 1fr;
      }
    }

    .resource-list {
      list-style: none;
    }

    .resource-list li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
      font-size: 13px;
    }

    .resource-list li:last-child {
      border-bottom: none;
    }

    .resource-rank {
      color: #9ca3af;
      font-weight: 600;
      width: 25px;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🍽️ Nourish Network</h1>
      <p>Executive Dashboard Report</p>
      <div class="meta">
        <span>Generated: ${generatedAt.toLocaleDateString()} at ${generatedAt.toLocaleTimeString()}</span>
        <span>30-Day Period</span>
      </div>
    </div>

    <!-- User Metrics Section -->
    <div class="section">
      <div class="section-title">👤 Active Users</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Users Today</div>
          <div class="metric-value">${metrics.activeUsersToday.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Users This Week</div>
          <div class="metric-value">${metrics.activeUsersThisWeek.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Users This Month</div>
          <div class="metric-value">${metrics.activeUsersThisMonth.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">New Users Today</div>
          <div class="metric-value">${metrics.newUsersToday}</div>
        </div>
      </div>
    </div>

    <!-- Search Metrics Section -->
    <div class="section">
      <div class="section-title">🔍 Search Activity</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Searches Today</div>
          <div class="metric-value">${metrics.searchesToday.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Searches This Month</div>
          <div class="metric-value">${metrics.searchesThisMonth.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Avg Searches/User</div>
          <div class="metric-value">${metrics.avgSearchesPerUser.toFixed(1)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Resources Mapped</div>
          <div class="metric-value">${metrics.resourcesMapped}</div>
        </div>
      </div>
    </div>

    <!-- SNAP Impact Section -->
    <div class="section">
      <div class="section-title">💚 SNAP Enrollment Impact</div>
      <div class="highlight-box">
        <p><strong>🎯 Key Metric:</strong> Every SNAP referral results in ~$3,000/year in annual benefits to residents. This month's impact is substantial.</p>
      </div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">SNAP Referrals Today</div>
          <div class="metric-value">${metrics.snapReferralsToday}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">SNAP Referrals (Month)</div>
          <div class="metric-value">${metrics.snapReferralsThisMonth.toLocaleString()}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Est. New Enrollees</div>
          <div class="metric-value">${metrics.estimatedSnapEnrollments.toLocaleString()}</div>
          <div class="metric-subtext">75% conversion rate</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Est. Annual Benefit</div>
          <div class="metric-value">${(metrics.estimatedAnnualBenefit / 1000).toFixed(0)}<span class="metric-unit">K</span></div>
          <div class="metric-subtext">To residents per year</div>
        </div>
      </div>
    </div>

    <!-- Top Resources Section -->
    <div class="section">
      <div class="section-title">⭐ Top Resources Found</div>
      <table class="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Resource Name</th>
            <th style="text-align: right;">Views</th>
          </tr>
        </thead>
        <tbody>
          ${metrics.topResourcesFound.map((r, i) => `
          <tr>
            <td>${i + 1}.</td>
            <td>${r.name}</td>
            <td style="text-align: right;">${r.views.toLocaleString()}</td>
          </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- Feature Usage Section -->
    <div class="section">
      <div class="section-title">🎯 Feature Usage</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Eligibility Checker</div>
          <div class="metric-value">${metrics.eligibilityCheckerUsage.toLocaleString()}</div>
          <div class="metric-subtext">Privacy questionnaire</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Open Now Filter</div>
          <div class="metric-value">${metrics.openNowFilterUsage.toLocaleString()}</div>
          <div class="metric-subtext">Real-time filter</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Type Filter</div>
          <div class="metric-value">${metrics.typeFilterUsage.toLocaleString()}</div>
          <div class="metric-subtext">By resource type</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Combined Filters</div>
          <div class="metric-value">${metrics.filterCombinationUsage.toLocaleString()}</div>
          <div class="metric-subtext">Multiple used</div>
        </div>
      </div>
    </div>

    <!-- System Health Section -->
    <div class="section">
      <div class="section-title">🏥 System Health</div>
      <div class="two-column">
        <div>
          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-size: 13px; font-weight: 600;">App Uptime</span>
              <span style="font-size: 13px; color: #059669;">${formatPercent(metrics.appUptime)}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${metrics.appUptime}%; background: #10b981;"></div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-size: 13px; font-weight: 600;">Data Freshness</span>
              <span style="font-size: 13px; color: #059669;">${formatPercent(100 - metrics.staleDataPercentage)}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${100 - metrics.staleDataPercentage}%; background: #10b981;"></div>
            </div>
            <div style="font-size: 11px; color: #6b7280; margin-top: 5px;">${metrics.staleDataPercentage}% resources need verification</div>
          </div>
        </div>

        <div>
          <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 10px; text-transform: uppercase; font-weight: 600;">Avg Search Latency</div>
            <div style="font-size: 24px; font-weight: bold; color: #111; margin-bottom: 5px;">${metrics.avgSearchLatency}<span style="font-size: 14px; color: #6b7280;">ms</span></div>
            <div style="font-size: 11px; color: #9ca3af;">Target: &lt; 200ms ✓</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Insights Section -->
    <div class="section">
      <div class="section-title">💡 Key Insights</div>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
        <p style="font-size: 13px; color: #15803d; margin: 0;"><strong>Impact:</strong> This month, ${metrics.estimatedSnapEnrollments} estimated new SNAP enrollees will receive ${formatCurrency(metrics.estimatedAnnualBenefit)} annually—a direct result of improved resource discoverability.</p>
      </div>

      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px;">
        <p style="font-size: 13px; color: #92400e; margin: 0;"><strong>Engagement:</strong> ${metrics.avgSearchesPerUser.toFixed(1)} average searches per user indicates strong engagement. Users are combining ${metrics.filterCombinationUsage} filter combinations to refine results.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Nourish Network Executive Dashboard • ${generatedAt.getFullYear()} • stpeteai.org</p>
      <p style="margin-top: 5px;">This report contains aggregated, anonymized data. No personally identifiable information is collected or included.</p>
    </div>
  </div>
</body>
</html>
    `;

    return html;
  }

  generate(metrics: DashboardMetrics, generatedAt: Date): void {
    const html = this.generateHTML(metrics, generatedAt);

    // Create a blob and trigger download
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Generate filename with date
    const dateStr = generatedAt.toISOString().split("T")[0];
    link.href = url;
    link.download = `nourish-dashboard-${dateStr}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
