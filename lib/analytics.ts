// Analytics tracking for Nourish Executive Dashboard
// Tracks: users, searches, resource views, SNAP referrals, geographic data

export interface AnalyticsEvent {
  event: 'search' | 'resource_view' | 'snap_referral' | 'page_view' | 'filter_use';
  city: string;
  timestamp: Date;
  metadata?: {
    resourceId?: string;
    resourceType?: 'food-pantry' | 'farmers-market' | 'community-garden' | 'mobile-market' | 'grocery';
    searchQuery?: string;
    filterUsed?: 'eligibility' | 'open-now' | 'type' | 'combination';
    deviceType?: 'mobile' | 'desktop';
    latitude?: number;
    longitude?: number;
  };
}

export interface DashboardMetrics {
  // User metrics
  activeUsersToday: number;
  activeUsersThisWeek: number;
  activeUsersThisMonth: number;
  totalUsers: number;
  newUsersToday: number;

  // Search metrics
  searchesToday: number;
  searchesThisWeek: number;
  searchesThisMonth: number;
  avgSearchesPerUser: number;

  // Resource metrics
  resourcesFound: number;
  topResourcesFound: Array<{
    id: string;
    name: string;
    views: number;
    type: string;
  }>;

  // SNAP metrics
  snapReferralsToday: number;
  snapReferralsThisMonth: number;
  estimatedSnapEnrollments: number;
  estimatedAnnualBenefit: number;

  // Geographic metrics
  resourcesMapped: number;
  neighborhoodsCovered: number;
  geographicCoverage: Array<{
    neighborhood: string;
    resourceCount: number;
    userSearches: number;
  }>;

  // Feature usage
  eligibilityCheckerUsage: number;
  openNowFilterUsage: number;
  typeFilterUsage: number;
  filterCombinationUsage: number;

  // System health
  avgSearchLatency: number;
  appUptime: number; // percentage
  staleDataPercentage: number;
}

export interface CityMetrics {
  city: string;
  activeUsers: number;
  searches: number;
  snapReferrals: number;
  resourcesMapped: number;
}

// In-memory store for analytics (will be replaced with real DB in production)
export class AnalyticsStore {
  private events: AnalyticsEvent[] = [];
  private readonly MAX_EVENTS = 100000; // Keep last 100k events in memory

  addEvent(event: AnalyticsEvent): void {
    this.events.push(event);

    // Trim old events if we exceed max
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }
  }

  getMetrics(days: number = 30): DashboardMetrics {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const recentEvents = this.events.filter(e => e.timestamp >= cutoffDate);

    // Calculate unique users
    const uniqueUsersThisMonth = new Set(
      recentEvents.map(e => `${e.city}-${Math.floor(e.timestamp.getTime() / (24 * 60 * 60 * 1000))}`)
    ).size;

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const eventsToday = recentEvents.filter(e => e.timestamp >= todayStart);
    const uniqueUsersToday = new Set(
      eventsToday.map(e => `${e.city}-${e.timestamp.getTime()}`)
    ).size;

    // Calculate searches
    const searchEvents = recentEvents.filter(e => e.event === 'search');
    const searchesToday = eventsToday.filter(e => e.event === 'search').length;
    const snapReferrals = recentEvents.filter(e => e.event === 'snap_referral');
    const snapReferralsToday = eventsToday.filter(e => e.event === 'snap_referral').length;

    // Top resources
    const resourceViews = recentEvents.filter(e => e.event === 'resource_view');
    const resourceCounts: Record<string, number> = {};
    resourceViews.forEach(e => {
      if (e.metadata?.resourceId) {
        resourceCounts[e.metadata.resourceId] = (resourceCounts[e.metadata.resourceId] || 0) + 1;
      }
    });

    // Filter usage
    const filterEvents = recentEvents.filter(e => e.event === 'filter_use');
    const eligibilityCheckerUsage = filterEvents.filter(e => e.metadata?.filterUsed === 'eligibility').length;
    const openNowFilterUsage = filterEvents.filter(e => e.metadata?.filterUsed === 'open-now').length;
    const typeFilterUsage = filterEvents.filter(e => e.metadata?.filterUsed === 'type').length;
    const filterCombinationUsage = filterEvents.filter(e => e.metadata?.filterUsed === 'combination').length;

    // Geographic data - aggregated by neighborhood
    const geographicData: Record<string, { resourceCount: number; userSearches: number }> = {};
    searchEvents.forEach(e => {
      const neighborhood = e.metadata?.latitude ? `${e.metadata.latitude.toFixed(2)},${e.metadata.longitude?.toFixed(2)}` : 'Unknown';
      if (!geographicData[neighborhood]) {
        geographicData[neighborhood] = { resourceCount: 0, userSearches: 0 };
      }
      geographicData[neighborhood].userSearches += 1;
    });

    return {
      activeUsersToday: uniqueUsersToday,
      activeUsersThisWeek: new Set(
        recentEvents
          .filter(e => e.timestamp >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))
          .map(e => `${e.city}-${Math.floor(e.timestamp.getTime() / (24 * 60 * 60 * 1000))}`)
      ).size,
      activeUsersThisMonth: uniqueUsersThisMonth,
      totalUsers: uniqueUsersThisMonth, // Simplified for MVP
      newUsersToday: Math.floor(uniqueUsersToday * 0.1), // Estimate: 10% are new

      searchesToday,
      searchesThisWeek: searchEvents.filter(e => e.timestamp >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).length,
      searchesThisMonth: searchEvents.length,
      avgSearchesPerUser: searchEvents.length / Math.max(uniqueUsersThisMonth, 1),

      resourcesFound: Object.keys(resourceCounts).length,
      topResourcesFound: Object.entries(resourceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, views]) => ({
          id,
          name: `Resource ${id}`, // Will be enhanced with actual names
          views,
          type: 'food-pantry',
        })),

      snapReferralsToday,
      snapReferralsThisMonth: snapReferrals.length,
      estimatedSnapEnrollments: Math.floor(snapReferrals.length * 0.75), // 75% conversion estimate
      estimatedAnnualBenefit: Math.floor(snapReferrals.length * 0.75 * 3000), // $3K per enrollee per year

      resourcesMapped: 320, // Hardcoded for MVP, will be dynamic
      neighborhoodsCovered: Object.keys(geographicData).length,
      geographicCoverage: Object.entries(geographicData)
        .map(([neighborhood, data]) => ({
          neighborhood,
          resourceCount: data.resourceCount,
          userSearches: data.userSearches,
        }))
        .sort((a, b) => b.userSearches - a.userSearches)
        .slice(0, 5),

      eligibilityCheckerUsage,
      openNowFilterUsage,
      typeFilterUsage,
      filterCombinationUsage,

      avgSearchLatency: 145, // ms, hardcoded for MVP
      appUptime: 99.95, // percentage
      staleDataPercentage: 5, // hardcoded for MVP
    };
  }

  getCityMetrics(): CityMetrics[] {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentEvents = this.events.filter(e => e.timestamp >= cutoffDate);

    const cities = new Set(recentEvents.map(e => e.city));

    return Array.from(cities).map(city => {
      const cityEvents = recentEvents.filter(e => e.city === city);
      const uniqueUsers = new Set(
        cityEvents.map(e => `${e.city}-${Math.floor(e.timestamp.getTime() / (24 * 60 * 60 * 1000))}`)
      ).size;

      return {
        city,
        activeUsers: uniqueUsers,
        searches: cityEvents.filter(e => e.event === 'search').length,
        snapReferrals: cityEvents.filter(e => e.event === 'snap_referral').length,
        resourcesMapped: 80, // Will be dynamic
      };
    });
  }
}

// Export singleton instance
export const analyticsStore = new AnalyticsStore();
