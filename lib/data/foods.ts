import type { FoodItem, Swap } from "../types";

/**
 * Seed catalog of common grocery items with estimated price bands
 * (midpoints, USD per serving) from local price surveys, and simplified
 * per-serving nutrition figures based on USDA FoodData Central.
 */
export const foods: FoodItem[] = [
  // breakfast
  { id: "frosted-cereal", name: "Frosted sugary cereal", category: "Breakfast", pricePerServing: 0.53, addedSugarG: 12, sodiumMg: 190, fiberG: 1, proteinG: 1 },
  { id: "oats-banana", name: "Old-fashioned oats + banana", category: "Breakfast", pricePerServing: 0.42, addedSugarG: 0, sodiumMg: 0, fiberG: 7, proteinG: 6 },
  { id: "breakfast-pastry", name: "Toaster pastries", category: "Breakfast", pricePerServing: 0.65, addedSugarG: 16, sodiumMg: 210, fiberG: 1, proteinG: 2 },
  { id: "eggs-toast", name: "Eggs + whole-wheat toast", category: "Breakfast", pricePerServing: 0.55, addedSugarG: 1, sodiumMg: 220, fiberG: 3, proteinG: 12 },
  { id: "flavored-yogurt", name: "Flavored yogurt cups", category: "Breakfast", pricePerServing: 0.95, addedSugarG: 13, sodiumMg: 95, fiberG: 0, proteinG: 5 },
  { id: "plain-yogurt-fruit", name: "Plain yogurt tub + frozen fruit", category: "Breakfast", pricePerServing: 0.6, addedSugarG: 0, sodiumMg: 80, fiberG: 2, proteinG: 9 },

  // drinks
  { id: "soda-2l", name: "Soda (2-liter)", category: "Drinks", pricePerServing: 0.4, addedSugarG: 26, sodiumMg: 30, fiberG: 0, proteinG: 0 },
  { id: "seltzer-water", name: "Store-brand seltzer or infused water", category: "Drinks", pricePerServing: 0.25, addedSugarG: 0, sodiumMg: 0, fiberG: 0, proteinG: 0 },
  { id: "juice-drink", name: "Fruit-flavored juice drink", category: "Drinks", pricePerServing: 0.5, addedSugarG: 22, sodiumMg: 25, fiberG: 0, proteinG: 0 },
  { id: "whole-fruit", name: "Whole fruit (banana, orange)", category: "Drinks", pricePerServing: 0.35, addedSugarG: 0, sodiumMg: 1, fiberG: 3, proteinG: 1 },

  // protein / dinner
  { id: "ground-beef-80", name: "Ground beef (80/20)", category: "Protein", pricePerServing: 1.4, addedSugarG: 0, sodiumMg: 75, fiberG: 0, proteinG: 19 },
  { id: "beef-lentil-blend", name: "Half beef, half lentils blend", category: "Protein", pricePerServing: 0.85, addedSugarG: 0, sodiumMg: 45, fiberG: 6, proteinG: 18 },
  { id: "chicken-nuggets", name: "Frozen chicken nuggets", category: "Protein", pricePerServing: 1.1, addedSugarG: 0, sodiumMg: 480, fiberG: 1, proteinG: 12 },
  { id: "baked-chicken-thighs", name: "Baked chicken thighs (family pack)", category: "Protein", pricePerServing: 0.75, addedSugarG: 0, sodiumMg: 90, fiberG: 0, proteinG: 21 },
  { id: "deli-lunch-meat", name: "Packaged deli lunch meat", category: "Protein", pricePerServing: 1.0, addedSugarG: 1, sodiumMg: 560, fiberG: 0, proteinG: 10 },
  { id: "canned-tuna", name: "Canned tuna (in water)", category: "Protein", pricePerServing: 0.7, addedSugarG: 0, sodiumMg: 210, fiberG: 0, proteinG: 17 },

  // sides & snacks
  { id: "instant-noodle-cups", name: "Instant noodle cups", category: "Sides & Snacks", pricePerServing: 0.6, addedSugarG: 1, sodiumMg: 1160, fiberG: 1, proteinG: 5 },
  { id: "rice-beans", name: "Rice + canned black beans", category: "Sides & Snacks", pricePerServing: 0.45, addedSugarG: 0, sodiumMg: 230, fiberG: 7, proteinG: 8 },
  { id: "potato-chips", name: "Potato chips", category: "Sides & Snacks", pricePerServing: 0.55, addedSugarG: 0, sodiumMg: 170, fiberG: 1, proteinG: 2 },
  { id: "popcorn-kernels", name: "Air-popped popcorn (kernels)", category: "Sides & Snacks", pricePerServing: 0.15, addedSugarG: 0, sodiumMg: 2, fiberG: 4, proteinG: 3 },
  { id: "fresh-berries-offseason", name: "Fresh berries (out of season)", category: "Sides & Snacks", pricePerServing: 1.25, addedSugarG: 0, sodiumMg: 1, fiberG: 4, proteinG: 1 },
  { id: "frozen-berries", name: "Frozen mixed berries", category: "Sides & Snacks", pricePerServing: 0.65, addedSugarG: 0, sodiumMg: 1, fiberG: 4, proteinG: 1 },

  // bread & grains
  { id: "white-bread", name: "White sandwich bread", category: "Bread & Grains", pricePerServing: 0.25, addedSugarG: 3, sodiumMg: 150, fiberG: 1, proteinG: 3 },
  { id: "whole-wheat-bread", name: "Whole-wheat bread", category: "Bread & Grains", pricePerServing: 0.28, addedSugarG: 1, sodiumMg: 135, fiberG: 3, proteinG: 4 },
  { id: "white-rice-packet", name: "Microwavable white rice packets", category: "Bread & Grains", pricePerServing: 0.85, addedSugarG: 0, sodiumMg: 5, fiberG: 0, proteinG: 3 },
  { id: "dry-rice-bulk", name: "Dry white rice (cooked)", category: "Bread & Grains", pricePerServing: 0.12, addedSugarG: 0, sodiumMg: 1, fiberG: 0, proteinG: 3 },

  // dairy
  { id: "shredded-cheese-bag", name: "Pre-shredded cheese bag", category: "Dairy", pricePerServing: 0.65, addedSugarG: 0, sodiumMg: 180, fiberG: 0, proteinG: 7 },
  { id: "block-cheese", name: "Block cheese (sliced at home)", category: "Dairy", pricePerServing: 0.45, addedSugarG: 0, sodiumMg: 175, fiberG: 0, proteinG: 7 },
  { id: "flavored-milk", name: "Chocolate milk (single-serve)", category: "Dairy", pricePerServing: 1.1, addedSugarG: 24, sodiumMg: 160, fiberG: 0, proteinG: 8 },
  { id: "plain-milk", name: "Whole milk (gallon, per glass)", category: "Dairy", pricePerServing: 0.3, addedSugarG: 0, sodiumMg: 105, fiberG: 0, proteinG: 8 },

  // condiments & sauces
  { id: "jarred-pasta-sauce", name: "Jarred pasta sauce (name brand)", category: "Condiments", pricePerServing: 0.75, addedSugarG: 8, sodiumMg: 480, fiberG: 2, proteinG: 2 },
  { id: "canned-tomatoes-seasoned", name: "Canned crushed tomatoes + seasoning", category: "Condiments", pricePerServing: 0.35, addedSugarG: 2, sodiumMg: 200, fiberG: 2, proteinG: 2 },

  // frozen meals
  { id: "frozen-dinner-entree", name: "Frozen dinner entrée (single-serve)", category: "Frozen", pricePerServing: 2.5, addedSugarG: 4, sodiumMg: 820, fiberG: 2, proteinG: 12 },
  { id: "homemade-bean-soup", name: "Homemade bean soup (per bowl)", category: "Frozen", pricePerServing: 0.6, addedSugarG: 0, sodiumMg: 300, fiberG: 9, proteinG: 11 },

  // beverages
  { id: "sports-drink", name: "Sports drink (20 oz bottle)", category: "Drinks", pricePerServing: 1.5, addedSugarG: 34, sodiumMg: 270, fiberG: 0, proteinG: 0 },
  { id: "coconut-water", name: "Coconut water (per cup, from carton)", category: "Drinks", pricePerServing: 0.6, addedSugarG: 0, sodiumMg: 45, fiberG: 0, proteinG: 0 },

  // snacks
  { id: "packaged-granola-bar", name: "Packaged granola bars", category: "Sides & Snacks", pricePerServing: 0.85, addedSugarG: 10, sodiumMg: 95, fiberG: 2, proteinG: 2 },
  { id: "peanut-butter-banana", name: "Peanut butter on banana", category: "Sides & Snacks", pricePerServing: 0.35, addedSugarG: 1, sodiumMg: 70, fiberG: 4, proteinG: 5 },
  { id: "flavored-crackers", name: "Flavored snack crackers", category: "Sides & Snacks", pricePerServing: 0.6, addedSugarG: 2, sodiumMg: 230, fiberG: 1, proteinG: 2 },
  { id: "carrots-hummus", name: "Baby carrots + store-brand hummus", category: "Sides & Snacks", pricePerServing: 0.5, addedSugarG: 1, sodiumMg: 120, fiberG: 4, proteinG: 3 },

  // canned goods
  { id: "canned-soup-name-brand", name: "Canned soup (name brand)", category: "Sides & Snacks", pricePerServing: 1.4, addedSugarG: 3, sodiumMg: 890, fiberG: 2, proteinG: 7 },
  { id: "dry-lentil-soup", name: "Dry lentils made into soup (per bowl)", category: "Sides & Snacks", pricePerServing: 0.3, addedSugarG: 0, sodiumMg: 220, fiberG: 8, proteinG: 9 },
];

export const swaps: Swap[] = [
  {
    fromId: "frosted-cereal",
    toId: "oats-banana",
    rationale: "Same warm-bowl breakfast, 12g less added sugar, and oats keep you full longer.",
  },
  {
    fromId: "breakfast-pastry",
    toId: "eggs-toast",
    rationale: "Six times the protein for less money — and no sugar crash before lunch.",
  },
  {
    fromId: "flavored-yogurt",
    toId: "plain-yogurt-fruit",
    rationale: "A big plain tub plus frozen fruit costs ~35% less per bowl and skips 13g of added sugar.",
  },
  {
    fromId: "soda-2l",
    toId: "seltzer-water",
    rationale: "Keeps the fizz, drops 26g of sugar per glass, and saves about $13/month per person.",
  },
  {
    fromId: "juice-drink",
    toId: "whole-fruit",
    rationale: "Whole fruit gives you the sweetness plus fiber that juice drinks strip out.",
  },
  {
    fromId: "ground-beef-80",
    toId: "beef-lentil-blend",
    rationale: "Stretch one pound of beef into two meals — tacos and pasta sauce taste the same, cost 40% less.",
  },
  {
    fromId: "chicken-nuggets",
    toId: "baked-chicken-thighs",
    rationale: "Family-pack thighs cost less per serving with double the protein and a fifth of the sodium.",
  },
  {
    fromId: "deli-lunch-meat",
    toId: "canned-tuna",
    rationale: "Cheaper sandwich filling with more protein and half the sodium.",
  },
  {
    fromId: "instant-noodle-cups",
    toId: "rice-beans",
    rationale: "Costs less, has 7g fiber instead of 1g, and one-fifth the sodium of a noodle cup.",
  },
  {
    fromId: "potato-chips",
    toId: "popcorn-kernels",
    rationale: "Still salty and crunchy — about a quarter of the price per bowl when you pop it yourself.",
  },
  {
    fromId: "fresh-berries-offseason",
    toId: "frozen-berries",
    rationale: "Frozen berries are picked ripe, equally nutritious, and roughly half the price year-round.",
  },
  {
    fromId: "white-bread",
    toId: "whole-wheat-bread",
    rationale: "Just a few cents more per slice — you get twice the fiber and an extra gram of protein.",
  },
  {
    fromId: "white-rice-packet",
    toId: "dry-rice-bulk",
    rationale: "A bag of dry rice costs about the same as two microwavable packets but makes 20+ servings.",
  },
  {
    fromId: "shredded-cheese-bag",
    toId: "block-cheese",
    rationale: "Block cheese costs 30% less per serving — slice or shred it yourself in under a minute.",
  },
  {
    fromId: "flavored-milk",
    toId: "plain-milk",
    rationale: "A glass from a gallon costs a third the price of a single chocolate milk bottle and skips 24g of sugar.",
  },
  {
    fromId: "jarred-pasta-sauce",
    toId: "canned-tomatoes-seasoned",
    rationale: "Canned crushed tomatoes with garlic and Italian seasoning cost less than half the price and cut added sugar by 75%.",
  },
  {
    fromId: "frozen-dinner-entree",
    toId: "homemade-bean-soup",
    rationale: "A pot of bean soup costs about a quarter of a frozen entrée per serving, has more fiber, and almost no added sodium.",
  },
  {
    fromId: "sports-drink",
    toId: "coconut-water",
    rationale: "Coconut water replaces electrolytes naturally for 60% less money and zero added sugar.",
  },
  {
    fromId: "packaged-granola-bar",
    toId: "peanut-butter-banana",
    rationale: "More fiber, more protein, less added sugar, and about half the cost — no wrapper needed.",
  },
  {
    fromId: "flavored-crackers",
    toId: "carrots-hummus",
    rationale: "Similar crunch and cost per serving, but with four times the fiber and a real vegetable.",
  },
  {
    fromId: "canned-soup-name-brand",
    toId: "dry-lentil-soup",
    rationale: "A bag of dry lentils makes a week of soup for under $2 total — a fifth of the sodium and four times the fiber per bowl.",
  },
  {
    fromId: "chicken-nuggets",
    toId: "canned-tuna",
    rationale: "Swapping nuggets for tuna on sandwich days saves about 40 cents a serving with more protein and a lot less sodium.",
  },
  {
    fromId: "soda-2l",
    toId: "whole-fruit",
    rationale: "When you want something sweet, whole fruit satisfies the craving with fiber and no added sugar — and costs less per serving than soda.",
  },
];
