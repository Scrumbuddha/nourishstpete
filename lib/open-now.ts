import { Place } from "./types";

// Helper to parse time strings like "9:00am–1:00pm" or "2pm–5pm"
function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
  if (!match) return null;

  let hours = parseInt(match[1]);
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const period = match[3]?.toLowerCase() || (hours <= 6 ? "pm" : "am");

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return { hours, minutes };
}

// Extract hours from a hours string and determine if open
export function isOpenNow(hoursStr: string): boolean | null {
  if (!hoursStr || hoursStr.toLowerCase().includes("call") || hoursStr.toLowerCase().includes("verify")) {
    return null; // Unknown
  }

  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);
  const dayNum = now.getDay(); // 0 = Sunday, 6 = Saturday

  // Parse day from hours string (e.g., "Mon–Fri 9am–1pm")
  const dayMap: Record<string, number[]> = {
    Sun: [0],
    Mon: [1],
    Tue: [2],
    Wed: [3],
    Thu: [4],
    Fri: [5],
    Sat: [6],
  };

  // Check if today is mentioned in the hours string
  let matchesToday = false;
  for (const [day, dayNums] of Object.entries(dayMap)) {
    if (hoursStr.includes(day)) {
      // Parse day range if applicable (Mon–Fri, etc.)
      const dayRange = hoursStr.match(new RegExp(`(\\w{3})\\s*(?:–|to|-|\\s)\\s*(\\w{3})`));
      if (dayRange) {
        const [, startDay, endDay] = dayRange;
        const startNum = dayMap[startDay]?.[0] ?? -1;
        const endNum = dayMap[endDay]?.[0] ?? -1;
        if (startNum <= dayNum && dayNum <= endNum) {
          matchesToday = true;
        }
      } else if (dayNums.includes(dayNum)) {
        matchesToday = true;
      }
    }
  }

  // Special handling for "24/7" or "Open 365"
  if (hoursStr.includes("24/7") || hoursStr.includes("365")) {
    return true;
  }

  // Special handling for monthly markets, seasonal, etc.
  if (hoursStr.toLowerCase().includes("monthly") || hoursStr.toLowerCase().includes("seasonal")) {
    return null; // Can't determine reliably
  }

  // Monthly on specific day (e.g., "2nd Saturday monthly")
  if (hoursStr.toLowerCase().includes("monthly")) {
    // Too complex to reliably calculate, return null
    return null;
  }

  if (!matchesToday) {
    return false;
  }

  // Extract time range from hours string
  const timeMatch = hoursStr.match(/(\d{1,2}):?(\d{2})?\s*(?:am|pm)?[\s–-]*(\d{1,2}):?(\d{2})?\s*(am|pm)?/i);
  if (!timeMatch) {
    return null; // Couldn't parse times
  }

  const openTime = parseTime(`${timeMatch[1]}:${timeMatch[2] || "00"}${timeMatch[5] || "am"}`);
  const closeTime = parseTime(`${timeMatch[3]}:${timeMatch[4] || "00"}${timeMatch[5]}`);

  if (!openTime || !closeTime) {
    return null;
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openTime.hours * 60 + openTime.minutes;
  const closeMinutes = closeTime.hours * 60 + closeTime.minutes;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function filterByOpenNow(places: Place[]): Place[] {
  return places.filter((p) => {
    const status = isOpenNow(p.hours);
    return status === true;
  });
}
