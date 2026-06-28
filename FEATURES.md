# Nourish St. Petersburg — New Features

## Feature #1: Benefit Eligibility Checker 📋

### What It Does
Users can tell the app about themselves to see resources that match their situation. All data stays on their phone—nothing is sent to servers or saved anywhere.

### How It Works
1. User clicks **"Personalize Your Results"** (blue box)
2. Check boxes for their situation:
   - ✓ I receive SNAP/EBT benefits
   - ✓ I receive WIC benefits
   - ✓ I'm a college/university student
   - ✓ I'm 60 years old or older
   - ✓ I've been formerly incarcerated or experienced homelessness
   - ✓ I can't provide photo ID

3. App instantly shows only relevant resources
4. Click **"Clear all"** to reset

### Why It Matters
- **Reduces friction:** Users don't visit pantries that don't accept their benefits
- **Honest about data:** No sign-up, no account, no tracking
- **Flexible:** Users can explore different scenarios by toggling checkboxes

### Technical Details
- **Privacy:** All logic runs in-browser (client-side)
- **Matching:** Checks place eligibility requirements against user selections
- **Composable:** Works alongside existing benefit/type filters

---

## Feature #2: Open Right Now Filter ⏰

### What It Does
Show only food resources that are currently open, based on the user's phone's time and day.

### How It Works
1. Click the **"Open Right Now"** button (toggles to **🔴 Open Right Now** when active)
2. See only locations that are open at this very moment
3. See a disclaimer: "⏰ Based on current time. Hours may vary—call ahead to confirm."

### Why It Matters
- **Solves immediate need:** "I need food today" becomes actionable
- **Time-aware:** Understands complex hours like "Mon–Fri 9am–1pm, Thu closed"
- **Special cases:** Handles 24/7 locations, monthly markets, seasonal hours
- **Safe:** Shows disclaimer so users know to call ahead

### What It Understands
✅ Daily hours: "Mon–Fri 9am–1pm"  
✅ 24/7 access: "Open 24/7 / Open 365 days"  
✅ Split days: "Mon/Wed/Fri 10am–12pm, Tue/Thu 1pm–4pm"  
❓ Monthly markets: "2nd Saturday monthly" (shows as unknown)  
❓ Variable schedules: "Call to verify" (shows as unknown)  

### Technical Details
- **Time parsing:** Converts 12-hour/24-hour time formats
- **Graceful handling:** Returns `null` for unparseable hours (not filtered out)
- **Geographic:** Uses device system time; no geolocation needed
- **No external calls:** All logic runs locally

---

## How They Work Together

### Scenario: A student with SNAP, looking for fresh food right now

1. **Open the Finder** → All 82 resources shown
2. **Expand "Personalize Your Results"** → Check "I'm a student" + benefit has SNAP
3. **Click "Open Right Now"** → Shows only student-friendly + SNAP-accepting places that are open now
4. **Result:** 2-3 hyper-relevant resources instead of 82

### Scenario: A senior looking for comprehensive services

1. **Check "I'm 60+ years old"** 
2. Filter by **"Free food"**
3. Result: Shows Neighborly Care Network (congregate meals), community fridges, food pantries designed for seniors

---

## Data Privacy & Transparency

🔒 **Your information never leaves your phone**
- No sign-up required
- No account created
- No cookies or tracking
- No analytics collected
- Browser localStorage only (cleared if user clears browser data)

---

## Roadmap

### Future Enhancements
- [ ] Distance sorting ("Closest to me right now")
- [ ] Distance-aware result ordering
- [ ] Mobile market schedule widget (rotating stops)
- [ ] Notifications when community gardens open for plot sign-ups
- [ ] SNAP enrollment companion flow (link to Healing Tampa Bay resources)
- [ ] Resource review/rating system (with privacy controls)

---

## Testing Checklist

- [ ] Benefit checker saves/restores filter state correctly
- [ ] "Open Right Now" accurately reflects current time
- [ ] Complex hours strings parse correctly (e.g., "Mon/Wed/Fri 10am–noon, Tue/Thu 1–4pm")
- [ ] Filters compose correctly (eligibility + benefit + type + open-now)
- [ ] "Clear all" button resets all filters
- [ ] Mobile responsive (tested on small screens)
- [ ] No console errors or warnings
- [ ] Accessibility: keyboard navigation works for all buttons
- [ ] Accessibility: screen reader can read checkbox labels
- [ ] 24/7 locations always show when "Open Right Now" is active

---

Generated: 2026-06-28  
Next: Pre-launch verification phase
