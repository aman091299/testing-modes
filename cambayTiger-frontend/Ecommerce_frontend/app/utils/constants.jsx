
console.log("inside constant")

export const categories = [
  {
    name: "Exclusive Deals",
    icon: "/img/Rectangle_28_3.png",
    // dropdown: ["ALL", "Limited Time", "Top Picks", "Festive Offers"],
    categoryIcon:
      "/img/Rectangle_28_3.png",

    items: 21,
  },
  {
    name: "Combos",
       icon: "/img/Combo_Category_Image_522_x_522_px.png",
    dropdown: [
      "All",
      "Party Starter",
      "Grill Master",
      "Breakfast Bounty",
      "Spice Kit",
    ],
    categoryIcon:
    "/img/Combo_Category_Image_522_x_522_px.png",
    items: 55,
  },
  {
    name: "Fish & Seafood",
      icon: "/img/Rectangle_28_3.png",
    dropdown: [
      "ALL",
      "Fresh water fish",
      "Ready To Cook Seafood",
      "Seafood bundles",
    ],
    categoryIcon:
"/img/Rectangle_28_3.png",
    items: 33,
  },
  {
    name: "Prawns",
       icon: "/img/Prawns_Category_Image_522_x_522_px.png",
    dropdown: ["Sea Prawns", "Farmed Prawns", "Bundles"],
    categoryIcon:
 "/img/Prawns_Category_Image_522_x_522_px.png",
    items: 34,
  },
  {
    name: "Poultry",
      icon: "/img/Rectangle_28_3.png",
    dropdown: ["Chicken Cuts", "Whole Chicken", "Wings"],
    categoryIcon:
"/img/Rectangle_28_3.png",
    items: 21,
  },
  {
    name: "Mutton",
       icon: "/img/Mutton_Category_Image_522_x_522_px.png",
    dropdown: ["Goat", "Lamb", "Minced"],
    categoryIcon:
"/img/Mutton_Category_Image_522_x_522_px.png",
    items: 21,
  },
  {
    name: "Ready To Cook",
      icon: "/img/RTC_Category_Image_4.png",
    dropdown: ["ALL","Chicken RTC", "Seafood RTC", "Prawn RTC"],
    categoryIcon:
"/img/RTC_Category_Image_4.png",
    items: 21,
  },
  {
    name: "Frozen Seafood",
       icon: "/img/Frozen_Category_Image_522_x_522_px.png",
    dropdown: ["Pomfret", "Frozen Prawns", "Frozen Fillets"],
    categoryIcon:
"/img/Frozen_Category_Image_522_x_522_px.png",
    items: 21,
  },
  {
    name: "Kebabs",
      icon: "/img/shop_by_category_-_kebab_522_x_522_px.png",
    dropdown: ["Chicken Kebabs", "Mutton Kebabs", "Seafood Kebabs"],
    categoryIcon:
"/img/shop_by_category_-_kebab_522_x_522_px.png",
    items: 21,
  },
  {
    name: "Deli",
       icon: "/img/Eggs_Category_Icon.png",
    dropdown: ["Cold Cuts", "Smoked Meats", "Sliced Sausages"],
    categoryIcon:
"/img/Eggs_Category_Icon.png",
    items: 21,
  },
  {
    name: "Eggs",
       icon: "/img/Eggs_Category_Icon.png",
    // dropdown: ["White Eggs", "Brown Eggs", "Organic Eggs"],
    categoryIcon:
 "/img/Eggs_Category_Icon.png",
    items: 21,
  },
  {
    name: "Curries",
      icon: "/img/Moilee_Curry_Category_Images_522x522.png",
    // dropdown: ["Chicken Curry", "Fish Curry", "Mutton Curry"],
    categoryIcon:
 "/img/Moilee_Curry_Category_Images_522x522.png",
    items: 21,
  },
  {
    name: "Marinades",
       icon: "/img/Eggs_Category_Icon.png",
    // dropdown: ["Tikka Marinade", "Spicy Marinade", "Herb Marinade"],
    categoryIcon:
 "/img/Eggs_Category_Icon.png",
    items: 21,
  },
  {
    name: "Parathas",
      icon: "/img/Rectangle_28_3.png",
    // dropdown: ["Plain Paratha", "Stuffed Paratha", "Mini Paratha"],
    categoryIcon:
"/img/Rectangle_28_3.png",
    items: 21,
  },
];

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const excludeDropdowns = ["Parathas", "Marinades", "Curries", "Eggs","Exclusive Deals"];

export const filterValues = [
  {
    name: "Health Benefits",
    dropdownList: [
      "Heart Healthy",
      "Lean Protein",
      "Weight Loss",
      "Diabetic Friendly",
      "Stupendous Eyesight",
      "Low Fat",
      "Aids Metabolism",
      "Vitamin B12 Rich",
      "Sturdy Bones",
      "Stress Killer",
    ],
  },
  {
    name: "Best Suited for",
    dropdownList: [
      "Grill",
      "Fry",
      "Roast",
      "Curry",
      "Biryani",
      "Steam",
      "Raw",
      "Soup",
    ],
  },
  {
    name: "Bone type",
    dropdownList: ["Boneless", "Bone-In"],
  },
  {
    name: "Cuts",
    dropdownList: [
      "Whole",
      "Steaks",
      "Fillet",
      "Whole cleaned",
      "DVC",
      "DVT",
      "Moon cut",
      "Bengali Cut",
      "Curry Cut",
      "Breast",
      "Drumstick",
      "Leg",
      "Lollipop",
      "Raan",
      "Chops",
      "Nalli",
    ],
  },
];

export const formattedValue = (name) => {
  if (typeof name === "string") {
    const formattedNameSlug = name
      .trim()
      .replace(/&/g, "and")
      .replace(/'/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return formattedNameSlug;
  }
  return name?.map((tag) =>
    tag
      .trim()
      .replace(/&/g, "and")
      .replace(/'/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
  );
};

export const validate=(value)=>{

}

export  const createCart=async(productId,quantity)=>{

    try{
    console.log("inside cart create");

     const res = await fetch(BASE_URL + "/cart/addItem", {
      method: "POST", 
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity })
    });
    const data=await res.json();
    if(!data.success){
     return null
    }
    return data.data;
    }
    catch(err){
          console.log("Error while creating or updating cart",err);
          return null;
    }
   
   }



