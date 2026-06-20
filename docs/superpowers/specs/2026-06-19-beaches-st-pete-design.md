# BeachesStPete Design Specification

**Date:** June 19, 2026  
**Project:** BeachesStPete  
**Status:** Design Phase  

## Overview

BeachesStPete is a comprehensive beach resource guide for St. Petersburg, Florida, serving both local residents and tourists. The platform provides real-time water quality information, beach closures, amenities, nearby restaurants and accommodations, events, safety alerts, and tide/weather information.

## Project Vision

Create a standalone web application that helps users discover and plan beach visits with complete information about conditions, amenities, dining, lodging, and safety in one place.

## Target Users

- **Local residents** — Quick checks on water quality, closures, and beach conditions
- **Tourists** — Planning beach visits with accommodation and dining recommendations
- **Both equally** — Equal design consideration for frequent and occasional users

## Architecture & Tech Stack

- **Framework:** Next.js 16 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Data Storage:** JSON-based data files in `/data` directory (following NourishStPete pattern)
- **External APIs:** NOAA water quality, city event calendars, weather services, restaurant/hotel data sources
- **Deployment:** Standalone project, independent deployment from NourishStPete

## Core Features

### 1. Beach Directory
- Complete list of St. Petersburg beaches
- Each beach includes: location, description, photos, contact information
- Basic metadata for sorting and display

### 2. Water Quality & Closures
- Real-time or regularly updated water quality status
- Data sources: NOAA/local health department
- Status indicators: Safe, Caution, Closed
- Historical closure data for reference
- Prominent alert banners for active closures

### 3. Amenities Finder
- Filterable beach amenities (parking, lifeguards, restrooms, showers, wheelchair access, rentals, pet-friendly)
- Multi-select filters to find beaches matching user needs
- Visual amenity indicators on beach cards

### 4. Nearby Venues (New)
- **Restaurants** — Nearby dining options with cuisine type, ratings, hours, contact info
- **Hotels** — Lodging options with rates, amenities, booking links
- **Motels** — Budget accommodation options with similar details
- Filter by venue type when viewing beach details
- Distance-based sorting where applicable

### 5. Events Calendar
- Upcoming beach-related events (concerts, cleanups, competitions)
- Manually curated with integration points for city event calendars
- Event details: date, time, location, description, organizer

### 6. Safety Information
- Rip current warnings and swimming safety tips
- Marine life alerts (jellyfish, sharks, etc.)
- Tide information
- Seasonal weather patterns

### 7. Search & Filtering
- Find beaches by amenities
- Filter by current water quality status
- Filter by accessibility features
- Filter nearby venues by type (restaurant, hotel, motel)
- Comprehensive beach discovery experience

## Data Structure

### `/data/beaches.json`
```json
[
  {
    "id": "string",
    "name": "string",
    "location": { "lat": number, "lng": number },
    "address": "string",
    "description": "string",
    "photos": ["string"],
    "amenities": ["string"],
    "contact": { "phone": "string", "website": "string" }
  }
]
```

### `/data/amenities.json`
```json
[
  {
    "id": "string",
    "name": "string",
    "icon": "string",
    "description": "string"
  }
]
```

### `/data/restaurants.json`
```json
[
  {
    "id": "string",
    "name": "string",
    "cuisine": "string",
    "nearbyBeachIds": ["string"],
    "rating": number,
    "hours": "string",
    "address": "string",
    "phone": "string",
    "website": "string"
  }
]
```

### `/data/hotels.json`
```json
[
  {
    "id": "string",
    "name": "string",
    "type": "hotel" | "motel",
    "nearbyBeachIds": ["string"],
    "rating": number,
    "priceRange": "string",
    "amenities": ["string"],
    "address": "string",
    "phone": "string",
    "bookingLink": "string"
  }
]
```

### `/data/events.json`
```json
[
  {
    "id": "string",
    "name": "string",
    "beachId": "string",
    "date": "string",
    "time": "string",
    "description": "string",
    "organizer": "string"
  }
]
```

### `/data/water-quality.json`
```json
[
  {
    "beachId": "string",
    "status": "safe" | "caution" | "closed",
    "lastUpdated": "string",
    "reason": "string",
    "closureEnd": "string"
  }
]
```

### `/data/closures.json`
```json
[
  {
    "id": "string",
    "beachId": "string",
    "reason": "string",
    "startDate": "string",
    "endDate": "string",
    "status": "active" | "historical"
  }
]
```

## Component Structure

### Core Components
- **BeachCard** — Compact display of beach with name, location, water quality status, key amenities
- **WaterQualityStatus** — Visual indicator (color-coded: safe/caution/closed) with last update time
- **AmenitiesFilter** — Multi-select filter for amenities, updates beach list in real-time
- **EventsList** — Grid or list view of upcoming events at a specific beach
- **SafetyAlerts** — Prominent banner component for closures and warnings
- **NearbyVenues** — Container displaying nearby restaurants, hotels, and motels with filter toggles
- **VenueCard** — Individual venue card with name, type, rating, distance, contact info
- **BeachDetail** — Full-page view with all beach information, events, safety alerts, and nearby venues

### Page Structure
- **Homepage** — Beach grid/list with filters, current water quality overview
- **Beach Detail Page** — Complete beach information with amenities, events, nearby venues, water quality history
- **Events Page** — Calendar or list view of all upcoming beach events
- **Dining & Lodging Page** — Browse all restaurants, hotels, and motels with beach proximity filters

## Data Management Strategy

### Data Sources
- **Manual Curation:** Beaches, amenities, basic venue information (maintained in JSON files)
- **API Integrations:** 
  - NOAA for water quality and closures
  - City event calendars for events
  - Weather services for tide and safety data
  - Potential restaurant/hotel APIs for enriched venue data
- **User Contributions:** Future capability for reviews, photos, and real-time closure reports

### Data Maintenance
- Water quality updates: Automated from NOAA API (daily or real-time)
- Events: Manual curation with API integration capability
- Venues: Manual curation with periodic API syncs for ratings/hours
- Amenities: Curated dataset, updated as needed

## User Workflows

### Workflow 1: Quick Water Quality Check
1. User lands on homepage
2. Sees all beaches with current water quality status
3. Identifies safe beaches at a glance
4. Can click for more details

### Workflow 2: Plan a Beach Day (Resident)
1. User opens BeachesStPete
2. Filters by desired amenities (parking, lifeguards)
3. Checks water quality status
4. Reviews upcoming events
5. Navigates to beach

### Workflow 3: Plan a Vacation (Tourist)
1. User browses beaches to find preferred location
2. Checks water quality and safety info
3. Explores nearby restaurants and hotels
4. Views events and activities
5. Books accommodation and makes reservations
6. Plans itinerary with multiple beaches

### Workflow 4: Find Dining & Lodging
1. User selects a beach they want to visit
2. Views all nearby restaurants filtered by cuisine
3. Checks hotel/motel options with ratings
4. Clicks through to booking/contact info

## Future Enhancements (Out of Scope for MVP)

- User accounts and saved beaches/restaurants
- Real-time user reviews and photos
- Crowdsourced water quality reporting
- Mobile app version
- Integration with booking platforms (OpenTable, Booking.com)
- Tide prediction calendars
- Webcam feeds from beaches
- Parking availability data
- Accessibility ratings and detailed access information

## Success Criteria

- ✅ All St. Pete beaches catalogued with complete information
- ✅ Water quality status displays current and accurate data
- ✅ Users can filter beaches by amenities and find matches
- ✅ Nearby restaurants, hotels, and motels are discoverable
- ✅ Safety alerts and closures are prominently displayed
- ✅ Site is responsive and accessible (WCAG compliant)
- ✅ Load time < 2 seconds for homepage
- ✅ All data is easily maintainable in JSON format

## Technical Considerations

- Follow NourishStPete directory structure and patterns for consistency
- Implement responsive design for mobile and desktop
- Use server components where appropriate for performance
- Implement proper error handling for API integrations
- Add loading states and fallbacks for dynamic data
- Consider caching strategy for static data (beaches, venues)
- Implement proper TypeScript typing throughout

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Water quality API unavailability | Fallback to manually updated status, cache recent data |
| Venue data becoming stale | Automated periodic updates from APIs, manual review schedule |
| High traffic impacting performance | Implement caching, optimize images, consider CDN |
| Incomplete beach/venue database | Start with MVP beaches, expand iteratively |

## Project Scope

**In Scope:**
- Beach directory and details
- Water quality and closures
- Amenities filtering
- Nearby restaurants, hotels, motels
- Events calendar
- Safety information
- Search and filtering

**Out of Scope:**
- User accounts and authentication
- Real-time collaborative features
- Mobile app (web-responsive only)
- Payment processing
- Advanced booking integrations
