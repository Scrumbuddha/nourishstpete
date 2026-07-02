import { Place } from "./types";
import type { EligibilityFilters } from "@/app/finder/benefit-checker";

export function matchesEligibility(place: Place, filters: EligibilityFilters): boolean {
  // If no filters are active, show everything
  if (!Object.values(filters).some((v) => v)) {
    return true;
  }

  // Check SNAP eligibility
  if (filters.hasSNAP && !place.acceptsSnap && !place.acceptsFreshAccessBucks) {
    // User has SNAP but place doesn't accept it
    // However, if place is free, it's still relevant
    if (!place.isFree) {
      return false;
    }
  }

  // Check WIC eligibility
  if (filters.hasWIC && !place.acceptsWic) {
    if (!place.isFree) {
      return false;
    }
  }

  // Check student resources - look for "student" in notes or type
  if (filters.isStudent) {
    const isStudentResource =
      place.notes?.toLowerCase().includes("student") ||
      place.name.toLowerCase().includes("feed-a-bull") ||
      place.name.toLowerCase().includes("titans care") ||
      place.name.toLowerCase().includes("mosaic pantry") ||
      place.notes?.toLowerCase().includes("college") ||
      place.notes?.toLowerCase().includes("university") ||
      place.notes?.toLowerCase().includes("usf") ||
      place.notes?.toLowerCase().includes("spc");

    // Only filter to student resources if user selected it
    if (!isStudentResource && !place.isFree) {
      return false;
    }
  }

  // Check senior resources - look for age 60+ requirements
  if (filters.isSenior) {
    const isSeniorResource =
      place.notes?.toLowerCase().includes("60+") ||
      place.notes?.toLowerCase().includes("age 60") ||
      place.notes?.toLowerCase().includes("seniors") ||
      place.notes?.toLowerCase().includes("elderly") ||
      place.notes?.toLowerCase().includes("hope");

    // If marked as senior-specific but user isn't filtering for seniors, it's fine
    // But if user IS filtering for seniors, only show senior resources OR free resources
    if (!isSeniorResource && !place.isFree) {
      return false;
    }
  }

  // Check formerly incarcerated/homeless - look for "justice" or similar keywords
  if (filters.isFormerlyIncarcerated) {
    const isJusticeResource =
      place.notes?.toLowerCase().includes("incarcerat") ||
      place.notes?.toLowerCase().includes("homeless") ||
      place.notes?.toLowerCase().includes("formerly") ||
      place.notes?.toLowerCase().includes("justice") ||
      place.notes?.toLowerCase().includes("unbroken dreams") ||
      place.notes?.toLowerCase().includes("project home");

    // Only show justice-focused resources if that's what user needs
    // OR show any free resource since it's accessible to them
    if (!isJusticeResource && !place.isFree) {
      return false;
    }
  }

  // Check no-ID requirement
  if (filters.needsNoID) {
    const noIDRequired =
      place.notes?.toLowerCase().includes("no id") ||
      place.notes?.toLowerCase().includes("no photo id") ||
      place.notes?.toLowerCase().includes("without id") ||
      place.notes?.toLowerCase().includes("no eligibility") ||
      place.notes?.toLowerCase().includes("no paperwork") ||
      place.isFree; // Free resources typically don't require ID

    if (!noIDRequired) {
      return false;
    }
  }

  return true;
}
