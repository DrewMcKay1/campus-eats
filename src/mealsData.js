/**
 * ============================================================
 *  CAMPUS EATS — MEAL DATABASE  (mealsData.js)
 * ============================================================
 *
 *  This is the ONLY file you need to edit to add, remove, or
 *  update default meals. App.jsx imports MEALS from here.
 *
 * ── HOW TO ADD A MEAL ──────────────────────────────────────
 *  Copy one of the entries below and paste it before the
 *  closing "];" at the bottom. Fill in each field:
 *
 *    id        Unique string: "b" breakfast, "l" lunch, "d" dinner
 *              + a number not already used. e.g. "b29", "l31", "d18"
 *    type      "Breakfast" | "Lunch" | "Dinner"
 *    name      Display name shown on meal cards
 *    budget    1 = under $3 · 2 = $3–$5 · 3 = $5+
 *    effort    1 = <10 min · 2 = 10–20 min · 3 = <30 min
 *    prepTime  Human-readable string e.g. "12 min"
 *    tags      Array of strings from: "Vegetarian" "Vegan"
 *              "American" "Italian" "Mexican" "Asian" "Mediterranean"
 *    desc      One–two sentence description shown on the card
 *    ings      Array of ingredient objects, each with:
 *                item     ingredient name
 *                qty      amount used, e.g. "2 tbsp"
 *                use      cost of that quantity in dollars (number)
 *                pkg      package you would buy, e.g. "16 oz jar"
 *                pkgCost  full package price (number)
 *                cat      one of: "Produce" "Meat & Fish"
 *                         "Dairy & Eggs" "Grains & Bread"
 *                         "Canned & Jarred" "Pantry & Spices"
 *                owned    (optional) true = pre-checked in Pantry
 *    steps     Array of instruction strings
 *
 * ── HOW TO REMOVE A MEAL ───────────────────────────────────
 *  Delete the entire object for that meal (from { to the
 *  closing },). Make sure no trailing comma is left on the
 *  last item in the array.
 *
 * ── ADD NEW MEALS BELOW THIS LINE ─────────────────────────
 * ============================================================
 */

export const MEALS =
[
  /* ══ BREAKFAST ══ */
  {id:"b1",type:"Breakfast",name:"Bagel with Cream Cheese",budget:1,effort:1,prepTime:"3 min",tags:["Vegetarian","American"],
   desc:"Split, toast, and load with cream cheese. Reliable, filling, zero thinking required.",
   ings:[{item:"Bagels",qty:"1",use:.67,pkg:"6-pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Cream cheese",qty:"2 tbsp",use:.44,pkg:"8 oz block",pkgCost:3.49,cat:"Dairy & Eggs"}],
   steps:["Toast bagel until deep golden.","Spread cream cheese generously over both halves.","Eat while warm."]},

  {id:"b2",type:"Breakfast",name:"Banana Oatmeal",budget:1,effort:1,prepTime:"6 min",tags:["Vegetarian","American"],
   desc:"Rolled oats cooked creamy with milk, topped with banana, honey, and cinnamon. Warm and filling for almost nothing.",
   ings:[{item:"Rolled oats",qty:"½ cup",use:.19,pkg:"42 oz canister",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Milk",qty:"1 cup",use:.37,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Banana",qty:"1",use:.25,pkg:"Bunch (~5)",pkgCost:1.29,cat:"Produce"},
         {item:"Honey",qty:"1 tbsp",use:.50,pkg:"12 oz bottle",pkgCost:5.99,cat:"Pantry & Spices",owned:true},
         {item:"Cinnamon",qty:"pinch",use:.02,pkg:"2.37 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true}],
   steps:["Combine oats and milk with a pinch of salt in a small pot.","Cook over medium heat, stirring, 4–5 min until creamy.","Top with sliced banana, honey, and cinnamon."]},

  {id:"b3",type:"Breakfast",name:"Scrambled Eggs & Toast",budget:1,effort:1,prepTime:"8 min",tags:["Vegetarian","American"],
   desc:"Soft, buttery scrambled eggs folded slowly over low heat — creamy, not rubbery. Classic protein-packed start.",
   ings:[{item:"Eggs",qty:"3",use:1.25,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Butter",qty:"1 tbsp",use:.31,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Milk",qty:"1 tbsp",use:.05,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"}],
   steps:["Whisk eggs with milk, salt, and pepper.","Melt butter in a non-stick pan over low heat.","Pour in eggs and fold gently — remove while still slightly glossy.","Serve alongside toast."]},

  {id:"b4",type:"Breakfast",name:"Cereal & Milk",budget:1,effort:1,prepTime:"2 min",tags:["Vegetarian","American"],
   desc:"Open the box, pour the milk. The most honest breakfast. Add a banana if you want to feel good about yourself.",
   ings:[{item:"Cereal",qty:"1½ cups",use:.70,pkg:"Family-size box",pkgCost:4.99,cat:"Grains & Bread"},
         {item:"Milk",qty:"¾ cup",use:.28,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"}],
   steps:["Pour cereal into bowl.","Add cold milk.","Eat before it gets soggy."]},

  {id:"b5",type:"Breakfast",name:"PB Banana Smoothie",budget:1,effort:1,prepTime:"4 min",tags:["Vegetarian","American"],
   desc:"Frozen banana, peanut butter, and milk blended thick and creamy. Breakfast done in 4 minutes.",
   ings:[{item:"Banana",qty:"1 frozen",use:.25,pkg:"Bunch (~5)",pkgCost:1.29,cat:"Produce"},
         {item:"Peanut butter",qty:"2 tbsp",use:.56,pkg:"16 oz jar",pkgCost:4.49,cat:"Pantry & Spices"},
         {item:"Milk",qty:"1 cup",use:.37,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Honey",qty:"1 tsp",use:.17,pkg:"12 oz bottle",pkgCost:5.99,cat:"Pantry & Spices",owned:true}],
   steps:["Freeze banana the night before (or use fresh + 5 ice cubes).","Blend all ingredients on high until smooth.","Drink immediately."]},

  {id:"b6",type:"Breakfast",name:"Toast with Peanut Butter",budget:1,effort:1,prepTime:"3 min",tags:["Vegetarian","American"],
   desc:"Two slices of toast with a thick spread of peanut butter. Optionally a drizzle of honey or sliced banana on top.",
   ings:[{item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Peanut butter",qty:"2 tbsp",use:.56,pkg:"16 oz jar",pkgCost:4.49,cat:"Pantry & Spices"}],
   steps:["Toast bread to your liking.","Spread peanut butter generously on each slice.","Optionally add banana slices or a drizzle of honey."]},

  {id:"b7",type:"Breakfast",name:"Avocado Toast & Fried Egg",budget:2,effort:2,prepTime:"10 min",tags:["Vegetarian","American"],
   desc:"Smashed avocado with lemon and red pepper flakes on toasted sourdough, topped with a crispy fried egg.",
   ings:[{item:"Sourdough bread",qty:"2 slices",use:.99,pkg:"1 loaf",pkgCost:4.99,cat:"Grains & Bread"},
         {item:"Avocado",qty:"1",use:1.29,pkg:"Each",pkgCost:1.29,cat:"Produce"},
         {item:"Eggs",qty:"1",use:.42,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Lemon",qty:"½",use:.40,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Red pepper flakes",qty:"pinch",use:.02,pkg:"2.5 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Olive oil",qty:"1 tsp",use:.05,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true}],
   steps:["Toast sourdough until firm and golden.","Mash avocado with lemon juice, salt, and pepper.","Fry egg in a small pan with olive oil.","Spread avocado on toast. Top with egg and red pepper flakes."]},

  {id:"b8",type:"Breakfast",name:"Yogurt Parfait",budget:2,effort:1,prepTime:"4 min",tags:["Vegetarian","American"],
   desc:"Layers of Greek yogurt, crunchy granola, and mixed berries with a honey drizzle. No cooking. Actually tastes great.",
   ings:[{item:"Greek yogurt",qty:"1 cup",use:.94,pkg:"32 oz tub",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Granola",qty:"¼ cup",use:.62,pkg:"12 oz bag",pkgCost:5.99,cat:"Grains & Bread"},
         {item:"Frozen mixed berries",qty:"½ cup",use:.75,pkg:"12 oz bag",pkgCost:3.99,cat:"Produce"},
         {item:"Honey",qty:"1 tbsp",use:.50,pkg:"12 oz bottle",pkgCost:5.99,cat:"Pantry & Spices",owned:true}],
   steps:["Microwave frozen berries 30 seconds, or thaw overnight.","Layer yogurt, granola, and berries in a bowl.","Repeat layers and drizzle honey on top."]},

  {id:"b9",type:"Breakfast",name:"Instant Oatmeal Packet",budget:1,effort:1,prepTime:"3 min",tags:["Vegetarian","American"],
   desc:"Tear open a packet, add hot water or microwave with milk. Top with banana. The fastest warm breakfast possible.",
   ings:[{item:"Instant oatmeal packets",qty:"2",use:.50,pkg:"12-count box",pkgCost:3.49,cat:"Grains & Bread"},
         {item:"Milk",qty:"¾ cup",use:.28,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Banana",qty:"1",use:.25,pkg:"Bunch (~5)",pkgCost:1.29,cat:"Produce"}],
   steps:["Pour oatmeal packet into a bowl.","Add milk and microwave 90 seconds, stirring halfway.","Top with sliced banana."]},

  {id:"b10",type:"Breakfast",name:"Pancakes from the Box",budget:1,effort:2,prepTime:"15 min",tags:["Vegetarian","American"],
   desc:"Box pancake mix, egg, and milk. Makes fluffy stacks. Butter and maple syrup turn this into a Sunday ritual.",
   ings:[{item:"Pancake mix",qty:"1 cup",use:.62,pkg:"32 oz box",pkgCost:3.49,cat:"Grains & Bread"},
         {item:"Eggs",qty:"1",use:.42,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Milk",qty:"¾ cup",use:.28,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Butter",qty:"1 tbsp",use:.31,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Maple syrup",qty:"2 tbsp",use:.75,pkg:"12 oz bottle",pkgCost:5.49,cat:"Pantry & Spices"}],
   steps:["Mix pancake mix, egg, and milk until just combined — lumps are fine.","Heat buttered pan over medium. Pour ¼ cup batter per pancake.","Cook until bubbles form (~2 min). Flip and cook 1 min more.","Stack and serve with butter and maple syrup."]},

  {id:"b11",type:"Breakfast",name:"Fried Egg Sandwich",budget:1,effort:1,prepTime:"6 min",tags:["American"],
   desc:"A fried egg on toasted bread with a slice of American cheese. Quick, filling, and better than you expect.",
   ings:[{item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Eggs",qty:"1",use:.42,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"American cheese",qty:"1 slice",use:.21,pkg:"16-count pack",pkgCost:3.29,cat:"Dairy & Eggs"},
         {item:"Butter",qty:"1 tsp",use:.10,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true}],
   steps:["Toast bread.","Fry egg in butter over medium until whites are set.","Lay cheese over egg to melt.","Slide onto toast with salt, pepper, or hot sauce."]},

  {id:"b12",type:"Breakfast",name:"Veggie Breakfast Burrito",budget:2,effort:2,prepTime:"12 min",tags:["Vegetarian","Mexican"],
   desc:"Scrambled eggs with sautéed peppers and onion wrapped in a warm flour tortilla with cheese and salsa.",
   ings:[{item:"Flour tortilla (large)",qty:"1",use:.40,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Eggs",qty:"3",use:1.25,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Bell pepper",qty:"½",use:.65,pkg:"Each",pkgCost:1.29,cat:"Produce"},
         {item:"Onion",qty:"¼",use:.20,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Shredded cheese",qty:"2 tbsp",use:.25,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Salsa",qty:"2 tbsp",use:.25,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"}],
   steps:["Sauté diced peppers and onion with oil until softened, ~4 min.","Whisk eggs, pour over veggies, scramble gently.","Warm tortilla 20 sec in microwave.","Fill with egg mix, cheese, and salsa. Fold sides in and roll tight."]},

  {id:"b13",type:"Breakfast",name:"Overnight Oats",budget:1,effort:1,prepTime:"5 min + overnight",tags:["Vegetarian","American"],
   desc:"Mix oats and yogurt the night before — wake up to a creamy, ready-to-eat breakfast. Zero morning effort.",
   ings:[{item:"Rolled oats",qty:"½ cup",use:.19,pkg:"42 oz canister",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Greek yogurt",qty:"½ cup",use:.47,pkg:"32 oz tub",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Milk",qty:"¼ cup",use:.09,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Honey",qty:"1 tbsp",use:.50,pkg:"12 oz bottle",pkgCost:5.99,cat:"Pantry & Spices",owned:true},
         {item:"Banana",qty:"½",use:.13,pkg:"Bunch (~5)",pkgCost:1.29,cat:"Produce"}],
   steps:["Combine oats, yogurt, milk, and honey in a jar. Stir well.","Cover and refrigerate at least 6 hours.","Top with sliced banana and eat cold."]},

  {id:"b14",type:"Breakfast",name:"Toaster Strudel",budget:1,effort:1,prepTime:"3 min",tags:["Vegetarian","American"],
   desc:"Pull a Toaster Strudel from the freezer, toast it golden, then pipe on the icing packet. Warm pastry in three minutes flat.",
   ings:[{item:"Toaster Strudel",qty:"2 pastries",use:1.12,pkg:"6-count box",pkgCost:3.39,cat:"Grains & Bread"}],
   steps:["Toast both pastries per package instructions until golden.","Let cool 1 minute — filling is hot.","Pipe the icing packet on top in zigzags."]},

  {id:"b15",type:"Breakfast",name:"Frozen Breakfast Sandwich",budget:1,effort:1,prepTime:"2 min",tags:["American"],
   desc:"A Jimmy Dean frozen egg, cheese, and sausage sandwich microwaved in two minutes. Wrap in a paper towel so the bread stays soft.",
   ings:[{item:"Frozen breakfast sandwich",qty:"1",use:1.99,pkg:"Each (Jimmy Dean)",pkgCost:1.99,cat:"Canned & Jarred"}],
   steps:["Remove from wrapper and wrap in a paper towel.","Microwave per package instructions, usually 90 sec on 50% then 40 sec on full.","Let sit 1 minute before eating — filling will be very hot."]},

  /* ══ LUNCH ══ */
  {id:"l1",type:"Lunch",name:"PB&J Sandwich",budget:1,effort:1,prepTime:"3 min",tags:["Vegan","Vegetarian","American"],
   desc:"Peanut butter and jam on soft bread. The original. Pairs well with an apple or chips. No explanation needed.",
   ings:[{item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Peanut butter",qty:"2 tbsp",use:.56,pkg:"16 oz jar",pkgCost:4.49,cat:"Pantry & Spices"},
         {item:"Strawberry jam",qty:"1 tbsp",use:.22,pkg:"18 oz jar",pkgCost:3.99,cat:"Pantry & Spices"}],
   steps:["Spread peanut butter on one slice.","Spread jam on the other.","Press together and cut diagonally."]},

  {id:"l2",type:"Lunch",name:"Cup Noodles",budget:1,effort:1,prepTime:"3 min",tags:["Asian"],
   desc:"The original college survival food. Boiling water, 3 minutes, done. Add a soft-boiled egg or hot sauce for extra credit.",
   ings:[{item:"Cup Noodles",qty:"1 cup",use:.89,pkg:"Pack of 6",pkgCost:5.29,cat:"Grains & Bread"}],
   steps:["Fill cup to fill line with just-boiled water.","Cover and let sit 3 minutes.","Stir and eat."]},

  {id:"l3",type:"Lunch",name:"Canned Soup & Toast",budget:1,effort:1,prepTime:"5 min",tags:["American"],
   desc:"Open a can of soup, heat it up, serve with buttered toast for dunking. Some days this is exactly what you need.",
   ings:[{item:"Canned soup",qty:"1 can",use:1.99,pkg:"~18 oz can",pkgCost:1.99,cat:"Canned & Jarred"},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Butter",qty:"1 tsp",use:.10,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true}],
   steps:["Pour soup into a pot, add a splash of milk if desired.","Heat over medium, stirring, until hot.","Toast and butter bread. Serve alongside for dipping."]},

  {id:"l4",type:"Lunch",name:"Grilled Cheese & Tomato Soup",budget:2,effort:2,prepTime:"12 min",tags:["Vegetarian","American"],
   desc:"Golden buttery grilled cheese with fully melted American cheese. A can of tomato soup alongside for dunking.",
   ings:[{item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"American cheese",qty:"2 slices",use:.41,pkg:"16-count pack",pkgCost:3.29,cat:"Dairy & Eggs"},
         {item:"Butter",qty:"1 tbsp",use:.31,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Tomato soup (can)",qty:"1 can",use:1.99,pkg:"10.75 oz can",pkgCost:1.99,cat:"Canned & Jarred"},
         {item:"Milk",qty:"¼ cup",use:.09,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"}],
   steps:["Butter one side of each bread slice.","Place butter-side down in cold pan. Add cheese. Top with second slice butter-side up.","Cook medium-low, 3–4 min per side, until deep golden and melted.","Heat soup with a splash of milk. Serve alongside for dunking."]},

  {id:"l5",type:"Lunch",name:"Upgraded Ramen Bowl",budget:1,effort:2,prepTime:"10 min",tags:["Asian"],
   desc:"Instant ramen elevated with a soft-boiled egg, sesame oil, soy sauce, and green onions.",
   ings:[{item:"Instant ramen",qty:"1 pack",use:.49,pkg:"6-pack Maruchan",pkgCost:2.79,cat:"Grains & Bread"},
         {item:"Eggs",qty:"1",use:.42,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Green onions",qty:"2 stalks",use:.20,pkg:"1 bunch",pkgCost:.99,cat:"Produce"},
         {item:"Sesame oil",qty:"½ tsp",use:.16,pkg:"16 oz bottle",pkgCost:4.99,cat:"Pantry & Spices"},
         {item:"Soy sauce",qty:"1 tsp",use:.12,pkg:"10 oz bottle",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Sriracha",qty:"to taste",use:.10,pkg:"17 oz bottle",pkgCost:3.99,cat:"Pantry & Spices"}],
   steps:["Soft-boil egg 6.5 minutes. Move to ice water, peel, and halve.","Cook ramen with only half the seasoning packet.","Stir in soy sauce and sesame oil.","Top with egg, sliced green onions, and sriracha."]},

  {id:"l6",type:"Lunch",name:"Cheese Quesadillas",budget:1,effort:1,prepTime:"8 min",tags:["Vegetarian","Mexican"],
   desc:"Flour tortillas crisped in a dry pan with gooey melted cheese. Serve with salsa and sour cream. Zero skill required.",
   ings:[{item:"Flour tortillas (large)",qty:"2",use:.80,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Shredded cheese blend",qty:"¾ cup",use:.75,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Salsa",qty:"¼ cup",use:.50,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Sour cream",qty:"2 tbsp",use:.31,pkg:"16 oz tub",pkgCost:2.49,cat:"Dairy & Eggs"}],
   steps:["Place tortilla in a dry pan over medium.","Add cheese to one half and fold over.","Cook 2–3 min per side until golden and melted.","Cut into triangles and serve with salsa and sour cream."]},

  {id:"l7",type:"Lunch",name:"Turkey Avocado Wrap",budget:2,effort:1,prepTime:"8 min",tags:["American"],
   desc:"Deli turkey, avocado, romaine, and honey mustard rolled in a large flour tortilla. Tight roll, diagonal cut.",
   ings:[{item:"Flour tortilla (large)",qty:"1",use:.40,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Deli turkey",qty:"3 oz",use:1.66,pkg:"9 oz pack",pkgCost:4.99,cat:"Meat & Fish"},
         {item:"Avocado",qty:"½",use:.65,pkg:"Each",pkgCost:1.29,cat:"Produce"},
         {item:"Romaine lettuce",qty:"2 leaves",use:.30,pkg:"Hearts 3-pack",pkgCost:2.99,cat:"Produce"},
         {item:"Honey mustard",qty:"1 tbsp",use:.27,pkg:"12 oz bottle",pkgCost:3.29,cat:"Pantry & Spices"}],
   steps:["Lay tortilla flat and spread honey mustard.","Layer turkey, sliced avocado, and romaine.","Fold sides in and roll tightly. Slice diagonally."]},

  {id:"l8",type:"Lunch",name:"Tuna Salad Sandwich",budget:2,effort:1,prepTime:"8 min",tags:["American"],
   desc:"Canned tuna with mayo, celery, and a touch of dijon on toasted bread. Protein-rich and underrated.",
   ings:[{item:"Canned tuna (5 oz)",qty:"1 can",use:1.20,pkg:"5 oz can",pkgCost:1.79,cat:"Canned & Jarred"},
         {item:"Mayonnaise",qty:"2 tbsp",use:.30,pkg:"30 oz jar",pkgCost:4.99,cat:"Pantry & Spices"},
         {item:"Celery",qty:"1 stalk",use:.15,pkg:"1 bunch",pkgCost:1.99,cat:"Produce"},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Dijon mustard",qty:"1 tsp",use:.08,pkg:"12 oz jar",pkgCost:2.99,cat:"Pantry & Spices",owned:true}],
   steps:["Drain tuna and flake into a bowl.","Dice celery. Mix with tuna, mayo, mustard, salt, and pepper.","Toast bread. Pile tuna onto one slice, top, and cut in half."]},

  {id:"l9",type:"Lunch",name:"Hummus & Veggie Wrap",budget:2,effort:1,prepTime:"7 min",tags:["Vegan","Vegetarian","Mediterranean"],
   desc:"Hummus spread thick in a large tortilla with cucumber, shredded carrot, spinach, and lemon.",
   ings:[{item:"Flour tortilla (large)",qty:"1",use:.40,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Hummus",qty:"3 tbsp",use:.75,pkg:"10 oz tub",pkgCost:3.49,cat:"Canned & Jarred"},
         {item:"Cucumber",qty:"¼ cup sliced",use:.37,pkg:"Each",pkgCost:.99,cat:"Produce"},
         {item:"Shredded carrot",qty:"¼ cup",use:.19,pkg:"2 lb bag",pkgCost:1.99,cat:"Produce"},
         {item:"Baby spinach",qty:"handful",use:.37,pkg:"5 oz bag",pkgCost:3.49,cat:"Produce"}],
   steps:["Spread hummus across the tortilla.","Layer spinach, cucumber, and carrot.","Roll tightly and slice in half."]},

  {id:"l10",type:"Lunch",name:"Bean & Cheese Burrito",budget:1,effort:1,prepTime:"6 min",tags:["Vegetarian","Mexican"],
   desc:"Canned refried beans and shredded cheese in a warm tortilla. Add salsa. Filling, fast, and nearly free.",
   ings:[{item:"Flour tortilla (large)",qty:"1",use:.40,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Refried beans (can)",qty:"½ cup",use:.62,pkg:"16 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Shredded cheese",qty:"¼ cup",use:.25,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Salsa",qty:"2 tbsp",use:.25,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"}],
   steps:["Heat refried beans in microwave until warm.","Warm tortilla 20 sec.","Spread beans down the center. Top with cheese and salsa.","Fold sides in and roll."]},

  {id:"l11",type:"Lunch",name:"Chicken Caesar Salad",budget:2,effort:2,prepTime:"15 min",tags:["American"],
   desc:"Crisp romaine with creamy Caesar dressing, parmesan, croutons, and sliced pan-seared chicken.",
   ings:[{item:"Chicken breast",qty:"4 oz",use:1.60,pkg:"2 lb pack",pkgCost:7.99,cat:"Meat & Fish"},
         {item:"Romaine lettuce",qty:"3 cups",use:.99,pkg:"Hearts 3-pack",pkgCost:2.99,cat:"Produce"},
         {item:"Caesar dressing",qty:"2 tbsp",use:.61,pkg:"13 oz bottle",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Parmesan (grated)",qty:"2 tbsp",use:.60,pkg:"5 oz tub",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Croutons",qty:"¼ cup",use:.37,pkg:"5 oz bag",pkgCost:2.99,cat:"Grains & Bread"}],
   steps:["Season chicken with salt and pepper. Cook in a pan 4–5 min per side.","Rest 3 min, then slice thin.","Toss romaine with Caesar dressing.","Top with parmesan, croutons, and sliced chicken."]},

  {id:"l12",type:"Lunch",name:"Pita & Hummus Plate",budget:1,effort:1,prepTime:"3 min",tags:["Vegan","Vegetarian","Mediterranean"],
   desc:"Pita triangles for dipping in hummus with cucumber and carrot sticks. Fast, filling, no cooking.",
   ings:[{item:"Pita bread",qty:"1 round",use:.40,pkg:"6-count pack",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Hummus",qty:"4 tbsp",use:1.00,pkg:"10 oz tub",pkgCost:3.49,cat:"Canned & Jarred"},
         {item:"Cucumber",qty:"½ cup sliced",use:.50,pkg:"Each",pkgCost:.99,cat:"Produce"},
         {item:"Baby carrots",qty:"½ cup",use:.37,pkg:"1 lb bag",pkgCost:1.99,cat:"Produce"}],
   steps:["Cut pita into triangles.","Scoop hummus into a bowl.","Slice vegetables. Arrange everything on a plate and dip."]},

  {id:"l13",type:"Lunch",name:"Egg Salad Sandwich",budget:1,effort:2,prepTime:"15 min",tags:["Vegetarian","American"],
   desc:"Hard-boiled eggs mashed with mayo and a bit of mustard on toasted bread. Protein-rich and underrated.",
   ings:[{item:"Eggs",qty:"3",use:1.25,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Mayonnaise",qty:"2 tbsp",use:.30,pkg:"30 oz jar",pkgCost:4.99,cat:"Pantry & Spices"},
         {item:"Dijon mustard",qty:"1 tsp",use:.08,pkg:"12 oz jar",pkgCost:2.99,cat:"Pantry & Spices",owned:true},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"}],
   steps:["Hard-boil eggs 10 min. Cool in ice water, peel, and chop.","Mix with mayo, mustard, salt, and pepper.","Toast bread. Pile egg salad on one slice, top, and serve."]},

  {id:"l14",type:"Lunch",name:"Chicken Nugget Wrap",budget:2,effort:1,prepTime:"10 min",tags:["American"],
   desc:"Frozen chicken nuggets, shredded lettuce, cheese, and ranch wrapped in a flour tortilla. Fast-food vibes at dorm-food prices.",
   ings:[{item:"Frozen chicken nuggets",qty:"6",use:1.50,pkg:"32 oz bag",pkgCost:7.99,cat:"Meat & Fish"},
         {item:"Flour tortilla (large)",qty:"1",use:.40,pkg:"10-count pack",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Shredded lettuce",qty:"¼ cup",use:.25,pkg:"10 oz bag",pkgCost:2.49,cat:"Produce"},
         {item:"Shredded cheese",qty:"2 tbsp",use:.25,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Ranch dressing",qty:"2 tbsp",use:.38,pkg:"16 oz bottle",pkgCost:3.49,cat:"Pantry & Spices"}],
   steps:["Cook nuggets per package (oven or microwave).","Warm tortilla in microwave 20 seconds.","Add nuggets, lettuce, cheese, and ranch down the center.","Fold sides in and roll. Eat while warm."]},

  {id:"l15",type:"Lunch",name:"Corn Dog & Tater Tots",budget:2,effort:1,prepTime:"18 min",tags:["American"],
   desc:"Frozen corn dogs and tater tots baked together on one sheet pan. Dip in ketchup and mustard. A certified comfort lunch.",
   ings:[{item:"Frozen corn dogs",qty:"2",use:1.25,pkg:"16-count box",pkgCost:5.99,cat:"Meat & Fish"},
         {item:"Frozen tater tots",qty:"1½ cups",use:1.05,pkg:"32 oz bag",pkgCost:3.49,cat:"Produce"},
         {item:"Ketchup",qty:"2 tbsp",use:.16,pkg:"32 oz bottle",pkgCost:3.49,cat:"Pantry & Spices",owned:true},
         {item:"Mustard",qty:"1 tbsp",use:.10,pkg:"14 oz bottle",pkgCost:1.99,cat:"Pantry & Spices",owned:true}],
   steps:["Preheat oven to 375°F.","Spread corn dogs and tater tots on a baking sheet.","Bake 15–18 min, flipping tots halfway, until golden.","Serve with ketchup and mustard."]},

  {id:"l16",type:"Lunch",name:"Frozen Taquitos & Salsa",budget:2,effort:1,prepTime:"14 min",tags:["Mexican","American"],
   desc:"Rolled frozen taquitos baked until crispy, served with salsa and sour cream. Crunchy, satisfying, and almost zero effort.",
   ings:[{item:"Frozen taquitos",qty:"6",use:1.87,pkg:"20-count box",pkgCost:5.49,cat:"Canned & Jarred"},
         {item:"Salsa",qty:"¼ cup",use:.50,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Sour cream",qty:"2 tbsp",use:.31,pkg:"16 oz tub",pkgCost:2.49,cat:"Dairy & Eggs"}],
   steps:["Preheat oven to 400°F (or air fry at 380°F).","Arrange taquitos in a single layer on a baking sheet.","Bake 10–12 min until golden and crispy, flipping halfway.","Serve with salsa and sour cream."]},

  {id:"l17",type:"Lunch",name:"Dorm Nachos",budget:1,effort:1,prepTime:"5 min",tags:["Vegetarian","Mexican"],
   desc:"Tortilla chips loaded with beans, shredded cheese, salsa, and jalapeños — nuked until melted. Lunch of champions.",
   ings:[{item:"Tortilla chips",qty:"2 cups",use:.62,pkg:"13 oz bag",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Refried beans (can)",qty:"¼ cup",use:.31,pkg:"16 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Shredded cheese blend",qty:"½ cup",use:.50,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Salsa",qty:"3 tbsp",use:.37,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Jalapeño slices",qty:"to taste",use:.20,pkg:"12 oz jar",pkgCost:2.49,cat:"Canned & Jarred"}],
   steps:["Spread chips in a single layer on a microwave-safe plate.","Spoon beans over chips. Sprinkle cheese on top.","Microwave 60–90 seconds until cheese is fully melted.","Top with salsa and jalapeños."]},

  /* ══ DINNER ══ */
  {id:"d1",type:"Dinner",name:"Pasta with Jarred Sauce",budget:1,effort:1,prepTime:"15 min",tags:["Vegan","Vegetarian","Italian"],
   desc:"Boil pasta, heat sauce from a jar, combine. Add parmesan. The easiest dinner that still satisfies.",
   ings:[{item:"Spaghetti or penne",qty:"100g",use:.40,pkg:"1 lb box",pkgCost:1.99,cat:"Grains & Bread"},
         {item:"Marinara sauce (jar)",qty:"¾ cup",use:.75,pkg:"24 oz jar",pkgCost:3.49,cat:"Canned & Jarred"},
         {item:"Parmesan (grated)",qty:"2 tbsp",use:.60,pkg:"5 oz tub",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Olive oil",qty:"1 tsp",use:.05,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true}],
   steps:["Boil pasta in salted water per package directions.","Heat marinara in a small pot over medium.","Drain pasta, toss with sauce.","Plate and top with parmesan and a drizzle of olive oil."]},

  {id:"d2",type:"Dinner",name:"Box Mac & Cheese",budget:1,effort:1,prepTime:"12 min",tags:["Vegetarian","American"],
   desc:"Kraft mac and cheese from the box. Butter, milk, the cheese packet. No shame. Sometimes this is exactly right.",
   ings:[{item:"Mac & cheese (Kraft)",qty:"1 box",use:1.29,pkg:"7.25 oz box",pkgCost:1.29,cat:"Grains & Bread"},
         {item:"Butter",qty:"2 tbsp",use:.62,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Milk",qty:"¼ cup",use:.09,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"}],
   steps:["Cook pasta per box instructions.","Drain and stir in butter, milk, and the cheese packet until smooth.","Eat immediately while creamy."]},

  {id:"d3",type:"Dinner",name:"Loaded Mac & Cheese",budget:2,effort:2,prepTime:"18 min",tags:["American"],
   desc:"Box mac upgraded with bacon bits, hot sauce, and a broiled cheesy breadcrumb crust. The glow-up.",
   ings:[{item:"Mac & cheese (Kraft)",qty:"1 box",use:1.29,pkg:"7.25 oz box",pkgCost:1.29,cat:"Grains & Bread"},
         {item:"Butter",qty:"2 tbsp",use:.62,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Milk",qty:"¼ cup",use:.09,pkg:"½ gallon",pkgCost:2.99,cat:"Dairy & Eggs"},
         {item:"Bacon bits",qty:"2 tbsp",use:.37,pkg:"4 oz bag",pkgCost:2.99,cat:"Meat & Fish"},
         {item:"Sriracha",qty:"1 tsp",use:.08,pkg:"17 oz bottle",pkgCost:3.99,cat:"Pantry & Spices"},
         {item:"Shredded cheddar",qty:"2 tbsp",use:.25,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Breadcrumbs",qty:"2 tbsp",use:.16,pkg:"15 oz canister",pkgCost:2.49,cat:"Pantry & Spices"}],
   steps:["Make mac per box. Stir in bacon bits and sriracha.","Transfer to an oven-safe dish.","Top with shredded cheddar and breadcrumbs.","Broil on high 2–3 min until golden and bubbling."]},

  {id:"d4",type:"Dinner",name:"Spaghetti Aglio e Olio",budget:1,effort:2,prepTime:"20 min",tags:["Vegan","Vegetarian","Italian"],
   desc:"Roman classic — golden garlic oil tossed through al dente spaghetti with chili flakes and parsley.",
   ings:[{item:"Spaghetti",qty:"100g",use:.40,pkg:"1 lb box",pkgCost:1.99,cat:"Grains & Bread"},
         {item:"Garlic",qty:"4 cloves",use:.15,pkg:"3-head bag",pkgCost:.99,cat:"Produce"},
         {item:"Olive oil",qty:"3 tbsp",use:.24,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true},
         {item:"Red pepper flakes",qty:"½ tsp",use:.04,pkg:"2.5 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Fresh parsley",qty:"handful",use:.65,pkg:"Fresh bunch",pkgCost:1.29,cat:"Produce"},
         {item:"Parmesan (grated)",qty:"2 tbsp",use:.60,pkg:"5 oz tub",pkgCost:3.99,cat:"Dairy & Eggs"}],
   steps:["Boil spaghetti in salted water. Reserve ½ cup pasta water before draining.","Slice garlic thin. Sauté in olive oil over low heat until pale golden, ~5 min.","Add red pepper flakes and a splash of pasta water.","Toss pasta through the garlic oil. Season well.","Plate with parsley and parmesan."]},

  {id:"d5",type:"Dinner",name:"Fried Rice",budget:1,effort:2,prepTime:"18 min",tags:["Vegan","Vegetarian","Asian"],
   desc:"Day-old rice fried with egg, soy sauce, sesame oil, and frozen vegetables. Better with leftovers.",
   ings:[{item:"Cooked rice (day old)",qty:"1½ cups",use:.30,pkg:"5 lb bag rice",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Eggs",qty:"2",use:.83,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Frozen peas & carrots",qty:"½ cup",use:.37,pkg:"12 oz bag",pkgCost:1.99,cat:"Produce"},
         {item:"Soy sauce",qty:"2 tbsp",use:.25,pkg:"10 oz bottle",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Sesame oil",qty:"1 tsp",use:.31,pkg:"16 oz bottle",pkgCost:4.99,cat:"Pantry & Spices"},
         {item:"Green onions",qty:"2 stalks",use:.20,pkg:"1 bunch",pkgCost:.99,cat:"Produce"},
         {item:"Garlic",qty:"2 cloves",use:.07,pkg:"3-head bag",pkgCost:.99,cat:"Produce"}],
   steps:["Heat a large pan or wok over high heat with oil.","Add garlic and frozen vegetables. Stir-fry 2 min.","Push to side. Crack eggs into center and scramble until just set.","Add cold rice and toss everything together, breaking up clumps.","Add soy sauce and sesame oil. Toss 2 min. Top with green onions."]},

  {id:"d6",type:"Dinner",name:"Black Bean Tacos",budget:1,effort:1,prepTime:"10 min",tags:["Vegan","Vegetarian","Mexican"],
   desc:"Warm black beans spiced with cumin and chili powder in corn tortillas with salsa and shredded cabbage.",
   ings:[{item:"Corn tortillas (small)",qty:"4",use:.40,pkg:"30-count pack",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Black beans (can)",qty:"1 can",use:1.49,pkg:"15 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Salsa",qty:"¼ cup",use:.50,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Shredded cabbage",qty:"½ cup",use:.37,pkg:"1 lb coleslaw bag",pkgCost:1.99,cat:"Produce"},
         {item:"Cumin",qty:"½ tsp",use:.03,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Lime",qty:"1",use:.59,pkg:"Each",pkgCost:.59,cat:"Produce"}],
   steps:["Drain beans, warm in pan with cumin, chili powder, salt, and a splash of water.","Warm tortillas over a dry pan or flame 30 sec per side.","Fill tortillas with beans, cabbage, and salsa.","Squeeze lime over all tacos."]},

  {id:"d7",type:"Dinner",name:"Red Lentil Soup",budget:1,effort:3,prepTime:"30 min",tags:["Vegan","Vegetarian","Mediterranean"],
   desc:"Deeply spiced lentil soup with cumin, turmeric, canned tomatoes, and lemon. One pot, great smell.",
   ings:[{item:"Red lentils",qty:"½ cup",use:.37,pkg:"1 lb bag",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Vegetable broth",qty:"2 cups",use:.87,pkg:"32 oz carton",pkgCost:2.49,cat:"Canned & Jarred"},
         {item:"Diced tomatoes (can)",qty:"½ can",use:.75,pkg:"15 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Onion",qty:"½",use:.25,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Garlic",qty:"2 cloves",use:.07,pkg:"3-head bag",pkgCost:.99,cat:"Produce"},
         {item:"Cumin",qty:"1 tsp",use:.06,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Turmeric",qty:"½ tsp",use:.05,pkg:"1.75 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Olive oil",qty:"1 tbsp",use:.08,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true},
         {item:"Lemon",qty:"½",use:.40,pkg:"Each",pkgCost:.79,cat:"Produce"}],
   steps:["Sauté diced onion in olive oil 5 min. Add garlic, cumin, and turmeric — stir 1 min.","Add rinsed lentils, broth, and tomatoes. Bring to a boil.","Reduce heat and simmer 18–20 min until lentils break down.","Finish with lemon juice, salt, and pepper."]},

  {id:"d8",type:"Dinner",name:"Chicken & Rice Bowl",budget:2,effort:3,prepTime:"25 min",tags:["American"],
   desc:"Cumin-spiced chicken over fluffy white rice with black beans, corn, lime, and cilantro.",
   ings:[{item:"Chicken thighs",qty:"2 pieces",use:1.80,pkg:"2 lb pack",pkgCost:5.99,cat:"Meat & Fish"},
         {item:"White rice",qty:"½ cup dry",use:.25,pkg:"5 lb bag",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Black beans (can)",qty:"½ can",use:.75,pkg:"15 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Corn (can)",qty:"¼ cup",use:.32,pkg:"15 oz can",pkgCost:1.29,cat:"Canned & Jarred"},
         {item:"Cumin",qty:"1 tsp",use:.06,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Lime",qty:"½",use:.30,pkg:"Each",pkgCost:.59,cat:"Produce"},
         {item:"Cilantro",qty:"handful",use:.33,pkg:"Fresh bunch",pkgCost:.99,cat:"Produce"}],
   steps:["Cook rice per package.","Season chicken with cumin, salt, and pepper. Cook in skillet 6–7 min per side. Rest and slice.","Warm beans and corn in a small pot.","Plate rice with beans and corn. Top with chicken. Squeeze lime and add cilantro."]},

  {id:"d9",type:"Dinner",name:"Chicken Stir Fry & Rice",budget:2,effort:2,prepTime:"22 min",tags:["Asian"],
   desc:"Thin chicken strips with broccoli, bell pepper, and carrot in a soy-ginger-sesame sauce over rice.",
   ings:[{item:"Chicken breast",qty:"6 oz",use:2.40,pkg:"2 lb pack",pkgCost:7.99,cat:"Meat & Fish"},
         {item:"Broccoli florets",qty:"1 cup",use:.75,pkg:"12 oz bag",pkgCost:2.99,cat:"Produce"},
         {item:"Bell pepper",qty:"1",use:1.29,pkg:"Each",pkgCost:1.29,cat:"Produce"},
         {item:"Soy sauce",qty:"2 tbsp",use:.25,pkg:"10 oz bottle",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Sesame oil",qty:"1 tsp",use:.31,pkg:"16 oz bottle",pkgCost:4.99,cat:"Pantry & Spices"},
         {item:"Garlic",qty:"2 cloves",use:.07,pkg:"3-head bag",pkgCost:.99,cat:"Produce"},
         {item:"White rice",qty:"½ cup dry",use:.25,pkg:"5 lb bag",pkgCost:3.99,cat:"Grains & Bread"}],
   steps:["Cook rice per package.","Slice chicken thin, chop vegetables.","Stir-fry chicken in hot oiled pan until golden, ~4 min. Set aside.","Stir-fry vegetables 3–4 min.","Return chicken. Add soy sauce, sesame oil, and garlic. Toss 1 min. Serve over rice."]},

  {id:"d10",type:"Dinner",name:"Sheet Pan Sausage & Peppers",budget:2,effort:3,prepTime:"30 min",tags:["American"],
   desc:"Italian sausages and caramelized peppers, zucchini, and onion roasted on one sheet pan.",
   ings:[{item:"Italian sausage links",qty:"2",use:1.58,pkg:"19 oz pack",pkgCost:4.99,cat:"Meat & Fish"},
         {item:"Bell peppers",qty:"2",use:2.58,pkg:"3-pack",pkgCost:3.99,cat:"Produce"},
         {item:"Zucchini",qty:"1 medium",use:1.49,pkg:"Each",pkgCost:1.49,cat:"Produce"},
         {item:"Red onion",qty:"½",use:.40,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Olive oil",qty:"2 tbsp",use:.16,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true},
         {item:"Italian seasoning",qty:"1 tsp",use:.07,pkg:"0.75 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true}],
   steps:["Preheat oven to 425°F.","Slice sausages diagonally. Chop peppers, zucchini, and onion into 1-inch pieces.","Toss everything with olive oil and Italian seasoning on a sheet pan.","Roast 22–26 min, stirring halfway, until caramelized."]},

  {id:"d11",type:"Dinner",name:"Street-Style Chicken Tacos",budget:2,effort:2,prepTime:"20 min",tags:["Mexican"],
   desc:"Spiced chicken in warm corn tortillas with cabbage, salsa, sour-cream-lime drizzle, and cilantro.",
   ings:[{item:"Chicken breast",qty:"6 oz",use:2.40,pkg:"2 lb pack",pkgCost:7.99,cat:"Meat & Fish"},
         {item:"Corn tortillas (small)",qty:"4",use:.40,pkg:"30-count pack",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Shredded cabbage",qty:"½ cup",use:.37,pkg:"1 lb coleslaw bag",pkgCost:1.99,cat:"Produce"},
         {item:"Salsa",qty:"¼ cup",use:.50,pkg:"16 oz jar",pkgCost:3.99,cat:"Canned & Jarred"},
         {item:"Sour cream",qty:"2 tbsp",use:.31,pkg:"16 oz tub",pkgCost:2.49,cat:"Dairy & Eggs"},
         {item:"Lime",qty:"1",use:.59,pkg:"Each",pkgCost:.59,cat:"Produce"},
         {item:"Cumin",qty:"1 tsp",use:.06,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Cilantro",qty:"handful",use:.33,pkg:"Fresh bunch",pkgCost:.99,cat:"Produce"}],
   steps:["Season chicken with cumin, salt, and pepper. Cook in a hot pan 5–6 min per side. Rest and dice.","Mix sour cream with half the lime juice for crema.","Warm tortillas over flame or dry pan.","Fill tacos: chicken, cabbage, salsa, crema, cilantro. Squeeze remaining lime over."]},

  {id:"d12",type:"Dinner",name:"Rice & Beans",budget:1,effort:2,prepTime:"20 min",tags:["Vegan","Vegetarian","American"],
   desc:"Fluffy white rice and seasoned black beans. Filling, nearly free, and adaptable with whatever you have.",
   ings:[{item:"White rice",qty:"½ cup dry",use:.25,pkg:"5 lb bag",pkgCost:3.99,cat:"Grains & Bread"},
         {item:"Black beans (can)",qty:"1 can",use:1.49,pkg:"15 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Onion",qty:"¼",use:.20,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Garlic",qty:"2 cloves",use:.07,pkg:"3-head bag",pkgCost:.99,cat:"Produce"},
         {item:"Cumin",qty:"½ tsp",use:.03,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Olive oil",qty:"1 tbsp",use:.08,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true},
         {item:"Lime",qty:"½",use:.30,pkg:"Each",pkgCost:.59,cat:"Produce"}],
   steps:["Cook rice per package.","Sauté diced onion and garlic in olive oil 4 min.","Drain beans, add to pan with cumin, salt, and a splash of water. Simmer 5 min.","Plate rice topped with beans. Squeeze lime over everything."]},

  {id:"d13",type:"Dinner",name:"Shakshuka",budget:2,effort:2,prepTime:"20 min",tags:["Vegetarian","Mediterranean"],
   desc:"Eggs poached in a spiced tomato and pepper sauce. Served with crusty bread for scooping. Looks impressive, actually easy.",
   ings:[{item:"Diced tomatoes (can)",qty:"1 can",use:1.49,pkg:"15 oz can",pkgCost:1.49,cat:"Canned & Jarred"},
         {item:"Bell pepper",qty:"1",use:1.29,pkg:"Each",pkgCost:1.29,cat:"Produce"},
         {item:"Onion",qty:"½",use:.25,pkg:"Each",pkgCost:.79,cat:"Produce"},
         {item:"Eggs",qty:"3",use:1.25,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Garlic",qty:"3 cloves",use:.11,pkg:"3-head bag",pkgCost:.99,cat:"Produce"},
         {item:"Cumin",qty:"1 tsp",use:.06,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Paprika",qty:"1 tsp",use:.06,pkg:"2.5 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true},
         {item:"Olive oil",qty:"1 tbsp",use:.08,pkg:"33.8 oz bottle",pkgCost:7.99,cat:"Pantry & Spices",owned:true},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"}],
   steps:["Dice onion and pepper. Sauté in olive oil 5 min.","Add garlic, cumin, and paprika — cook 1 min.","Add tomatoes and simmer 8 min. Season well.","Make wells in sauce. Crack an egg into each.","Cover and cook 5–7 min until whites are set. Serve with bread."]},

  {id:"d14",type:"Dinner",name:"Frozen Pizza",budget:2,effort:1,prepTime:"18 min",tags:["American"],
   desc:"A frozen pizza cooked in the oven. Add extra cheese on top if you have it. This is a legitimate Friday night dinner, no notes.",
   ings:[{item:"Frozen pizza",qty:"1",use:5.99,pkg:"Each (Red Baron/Tombstone)",pkgCost:5.99,cat:"Canned & Jarred"},
         {item:"Shredded mozzarella",qty:"¼ cup",use:.37,pkg:"8 oz bag",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Red pepper flakes",qty:"pinch",use:.02,pkg:"2.5 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true}],
   steps:["Preheat oven to temperature on the box (usually 400–425°F).","Add extra cheese if desired.","Bake per package, usually 14–16 minutes.","Let cool 2 minutes before slicing."]},

  {id:"d15",type:"Dinner",name:"Frozen Chicken Tenders & Fries",budget:2,effort:2,prepTime:"25 min",tags:["American"],
   desc:"Frozen chicken tenders and fries roasted together on one sheet pan. Dip in ketchup and ranch. Simple, filling, reliably good.",
   ings:[{item:"Frozen chicken tenders",qty:"4",use:2.00,pkg:"25 oz bag",pkgCost:7.99,cat:"Meat & Fish"},
         {item:"Frozen french fries",qty:"1½ cups",use:1.05,pkg:"32 oz bag",pkgCost:3.49,cat:"Produce"},
         {item:"Ketchup",qty:"2 tbsp",use:.16,pkg:"32 oz bottle",pkgCost:3.49,cat:"Pantry & Spices",owned:true},
         {item:"Ranch dressing",qty:"2 tbsp",use:.38,pkg:"16 oz bottle",pkgCost:3.49,cat:"Pantry & Spices"}],
   steps:["Preheat oven to 400°F.","Spread chicken tenders and fries in a single layer on a baking sheet.","Bake 20–24 min, flipping halfway, until tenders are golden and fries crispy.","Serve with ketchup and ranch."]},

  {id:"d16",type:"Dinner",name:"Canned Beef Stew",budget:1,effort:1,prepTime:"6 min",tags:["American"],
   desc:"A can of beef stew heated up and served with buttered bread. Hearty and filling, ready in 6 minutes on the worst days.",
   ings:[{item:"Canned beef stew",qty:"1 can",use:2.49,pkg:"20 oz can",pkgCost:2.49,cat:"Canned & Jarred"},
         {item:"Bread",qty:"2 slices",use:.30,pkg:"20-slice loaf",pkgCost:2.99,cat:"Grains & Bread"},
         {item:"Butter",qty:"1 tsp",use:.10,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true}],
   steps:["Pour stew into a pot or microwave-safe bowl.","Heat until hot (~4 min stovetop, ~3 min microwave).","Toast and butter bread. Serve alongside for dipping."]},

  {id:"d17",type:"Dinner",name:"Ramen Carbonara",budget:1,effort:2,prepTime:"12 min",tags:["Asian","Italian"],
   desc:"Ramen noodles tossed with a creamy egg-and-parmesan sauce — skip the seasoning packet entirely. Genuinely impressive for $1.50.",
   ings:[{item:"Instant ramen",qty:"2 packs (noodles only)",use:.98,pkg:"6-pack Maruchan",pkgCost:2.79,cat:"Grains & Bread"},
         {item:"Eggs",qty:"2",use:.83,pkg:"1 dozen",pkgCost:4.99,cat:"Dairy & Eggs"},
         {item:"Parmesan (grated)",qty:"3 tbsp",use:.90,pkg:"5 oz tub",pkgCost:3.99,cat:"Dairy & Eggs"},
         {item:"Butter",qty:"1 tbsp",use:.31,pkg:"1 lb (4 sticks)",pkgCost:4.99,cat:"Dairy & Eggs",owned:true},
         {item:"Black pepper",qty:"½ tsp",use:.03,pkg:"2 oz jar",pkgCost:2.49,cat:"Pantry & Spices",owned:true}],
   steps:["Cook ramen noodles only (skip seasoning packet). Reserve ¼ cup pasta water before draining.","Whisk eggs, parmesan, and lots of black pepper in a bowl.","While noodles are still hot but off heat, stir in butter until melted.","Pour egg mix over noodles and toss constantly, adding pasta water a little at a time, until creamy — not scrambled.","Serve immediately with extra parmesan."]},

];
