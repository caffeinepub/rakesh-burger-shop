import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ChevronUp,
  CreditCard,
  Flame,
  Lock,
  MapPin,
  MessageCircle,
  Minus,
  Pencil,
  Phone,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  tagColor: string;
  category: "burgers" | "drinks" | "shakes";
}

const DEFAULT_BURGERS: MenuItem[] = [
  {
    id: 1,
    name: "Veg Burger",
    price: 100,
    description:
      "Crispy veggie patty, fresh lettuce, tomato & special green chutney",
    image: "/assets/generated/veg-burger.dim_400x300.jpg",
    tag: "Pure Veg",
    tagColor: "bg-green-100 text-green-800",
    category: "burgers",
  },
  {
    id: 2,
    name: "Chicken Burger",
    price: 150,
    description:
      "Juicy grilled chicken, coleslaw, chipotle mayo & crunchy pickles",
    image: "/assets/generated/chicken-burger.dim_400x300.jpg",
    tag: "Bestseller",
    tagColor: "bg-orange-100 text-orange-800",
    category: "burgers",
  },
  {
    id: 3,
    name: "Cheese Burger",
    price: 120,
    description: "Double cheese melt, beef patty, caramelized onions & mustard",
    image: "/assets/generated/cheese-burger.dim_400x300.jpg",
    tag: "Cheesy",
    tagColor: "bg-yellow-100 text-yellow-800",
    category: "burgers",
  },
  {
    id: 4,
    name: "Double Burger",
    price: 180,
    description:
      "Two loaded patties, special house sauce, crispy onion rings & fries",
    image: "/assets/generated/double-burger.dim_400x300.jpg",
    tag: "Loaded",
    tagColor: "bg-red-100 text-red-800",
    category: "burgers",
  },
  {
    id: 5,
    name: "Spicy Paneer Burger",
    price: 130,
    description:
      "Crispy paneer patty, jalapeños, red chili sauce & fresh veggies",
    image: "/assets/generated/spicy-paneer-burger.dim_400x300.jpg",
    tag: "Spicy Veg",
    tagColor: "bg-green-100 text-green-800",
    category: "burgers",
  },
  {
    id: 6,
    name: "Egg Burger",
    price: 120,
    description:
      "Perfectly fried egg, melted cheese, fresh lettuce & tangy mayo",
    image: "/assets/generated/egg-burger.dim_400x300.jpg",
    tag: "Popular",
    tagColor: "bg-yellow-100 text-yellow-800",
    category: "burgers",
  },
  {
    id: 7,
    name: "Chicken Zinger",
    price: 170,
    description:
      "Golden crispy chicken fillet, coleslaw, spicy mayo & crunchy pickles",
    image: "/assets/generated/chicken-zinger.dim_400x300.jpg",
    tag: "Crispy",
    tagColor: "bg-orange-100 text-orange-800",
    category: "burgers",
  },
  {
    id: 8,
    name: "BBQ Burger",
    price: 160,
    description:
      "Smoky BBQ patty, caramelized onions, cheddar & signature BBQ sauce",
    image: "/assets/generated/bbq-burger.dim_400x300.jpg",
    tag: "BBQ Flavor",
    tagColor: "bg-red-100 text-red-800",
    category: "burgers",
  },
  {
    id: 9,
    name: "Aloo Tikki Burger",
    price: 90,
    description:
      "Spiced potato tikki, mint chutney, fresh onions & crispy veggies",
    image: "/assets/generated/aloo-tikki-burger.dim_400x300.jpg",
    tag: "Budget Pick",
    tagColor: "bg-green-100 text-green-800",
    category: "burgers",
  },
  {
    id: 10,
    name: "Mushroom Burger",
    price: 140,
    description:
      "Grilled portobello mushroom, swiss cheese, caramelized onions & garlic aioli",
    image: "/assets/generated/mushroom-burger.dim_400x300.jpg",
    tag: "Veg",
    tagColor: "bg-green-100 text-green-800",
    category: "burgers",
  },
];

const DEFAULT_DRINKS: MenuItem[] = [
  {
    id: 101,
    name: "Cola",
    price: 40,
    description: "Chilled refreshing cola with ice, the classic crowd pleaser",
    image: "/assets/generated/cola-drink.dim_400x300.jpg",
    tag: "Refreshing",
    tagColor: "bg-blue-100 text-blue-800",
    category: "drinks",
  },
  {
    id: 102,
    name: "Lemon Soda",
    price: 40,
    description: "Zesty lemon soda with fresh lemon, chilled and fizzy",
    image: "/assets/generated/lemon-soda.dim_400x300.jpg",
    tag: "Cool",
    tagColor: "bg-lime-100 text-lime-800",
    category: "drinks",
  },
  {
    id: 103,
    name: "Orange Soda",
    price: 45,
    description: "Fizzy orange soda bursting with citrus flavor, ice cold",
    image: "/assets/generated/orange-soda.dim_400x300.jpg",
    tag: "Fizzy",
    tagColor: "bg-orange-100 text-orange-800",
    category: "drinks",
  },
];

const DEFAULT_SHAKES: MenuItem[] = [
  {
    id: 201,
    name: "Chocolate Shake",
    price: 90,
    description:
      "Rich creamy chocolate shake with whipped cream and chocolate drizzle",
    image: "/assets/generated/choco-shake.dim_400x300.jpg",
    tag: "Creamy",
    tagColor: "bg-amber-100 text-amber-800",
    category: "shakes",
  },
  {
    id: 202,
    name: "Mango Shake",
    price: 80,
    description:
      "Tropical fresh mango shake, thick and sweet with real mango pulp",
    image: "/assets/generated/mango-shake.dim_400x300.jpg",
    tag: "Tropical",
    tagColor: "bg-yellow-100 text-yellow-800",
    category: "shakes",
  },
  {
    id: 203,
    name: "Strawberry Shake",
    price: 85,
    description:
      "Sweet strawberry shake with fresh berries, cream and strawberry drizzle",
    image: "/assets/generated/strawberry-shake.dim_400x300.jpg",
    tag: "Sweet",
    tagColor: "bg-pink-100 text-pink-800",
    category: "shakes",
  },
];

const CUSTOMIZATIONS = [
  { id: "extra-cheese", label: "Extra Cheese", price: 20 },
  { id: "extra-patty", label: "Extra Patty", price: 30 },
  { id: "no-onions", label: "No Onions", price: 0 },
  { id: "no-mayo", label: "No Mayo", price: 0 },
  { id: "extra-sauce", label: "Extra Sauce", price: 0 },
  { id: "make-it-spicy", label: "Make it Spicy 🌶️", price: 0 },
];

const STORAGE_KEY = "usha_menu_extras";

function loadExtras(): {
  burgers: MenuItem[];
  drinks: MenuItem[];
  shakes: MenuItem[];
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // ignore
  }
  return { burgers: [], drinks: [], shakes: [] };
}

function saveExtras(extras: {
  burgers: MenuItem[];
  drinks: MenuItem[];
  shakes: MenuItem[];
}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(extras));
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Admin state
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [adminTab, setAdminTab] = useState<"burgers" | "drinks" | "shakes">(
    "burgers",
  );
  const [extras, setExtras] = useState<{
    burgers: MenuItem[];
    drinks: MenuItem[];
    shakes: MenuItem[];
  }>(loadExtras);

  // Admin form
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formCategory, setFormCategory] = useState<
    "burgers" | "drinks" | "shakes"
  >("burgers");

  useEffect(() => {
    saveExtras(extras);
  }, [extras]);

  // Combined menus
  const allBurgers = [...DEFAULT_BURGERS, ...extras.burgers];
  const allDrinks = [...DEFAULT_DRINKS, ...extras.drinks];
  const allShakes = [...DEFAULT_SHAKES, ...extras.shakes];
  const allItems = [...allBurgers, ...allDrinks, ...allShakes];

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const customizationExtra = CUSTOMIZATIONS.filter((c) =>
    selectedCustomizations.includes(c.id),
  ).reduce((s, c) => s + c.price, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = totalPrice + customizationExtra;

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, qty: 1 },
      ];
    });
    toast.success(`${item.name} added to cart!`, { duration: 1500 });
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing || existing.qty <= 1)
        return prev.filter((c) => c.id !== id);
      return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
    });
  }

  function getQty(id: number) {
    return cart.find((c) => c.id === id)?.qty ?? 0;
  }

  function toggleCustomization(id: string) {
    setSelectedCustomizations((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function sendOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all fields before ordering.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add some items first!");
      return;
    }
    const itemLines = cart
      .map((c) => `${c.name} x${c.qty} = Rs.${c.price * c.qty}`)
      .join("%0A");

    let customLines = "";
    if (selectedCustomizations.length > 0) {
      const custLabels = CUSTOMIZATIONS.filter((c) =>
        selectedCustomizations.includes(c.id),
      ).map((c) => (c.price > 0 ? `${c.label} (+Rs.${c.price})` : c.label));
      customLines = `%0A%0ACustomizations: ${custLabels.join(", ")}`;
    }
    if (customizationExtra > 0) {
      customLines += `%0ACustomization Extra: Rs.${customizationExtra}`;
    }
    let instrLines = "";
    if (specialInstructions.trim()) {
      instrLines = `%0ASpecial Instructions: ${encodeURIComponent(specialInstructions.trim())}`;
    }
    const postcodeStr = postcode.trim()
      ? `%0APostcode: ${encodeURIComponent(postcode.trim())}`
      : "";

    const waUrl = `https://wa.me/916002296217?text=Order from USHA Burger Pointe%0A${itemLines}${customLines}${instrLines}%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}${postcodeStr}%0ATotal: Rs.${grandTotal}`;
    window.open(waUrl, "_blank");
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  // Admin handlers
  function handleAdminLogin() {
    if (adminPassword === "usha123") {
      setAdminAuthed(true);
      setAdminPasswordError("");
      setAdminPassword("");
    } else {
      setAdminPasswordError("Incorrect password. Please try again.");
    }
  }

  function handleAdminLogout() {
    setAdminAuthed(false);
    setAdminPassword("");
    setAdminPasswordError("");
    setEditItem(null);
    resetForm();
  }

  function resetForm() {
    setFormName("");
    setFormPrice("");
    setFormImage("");
    setFormCategory("burgers");
    setEditItem(null);
  }

  function handleAddOrUpdate() {
    if (!formName.trim() || !formPrice.trim()) {
      toast.error("Name and price are required.");
      return;
    }
    const price = Number(formPrice);
    if (Number.isNaN(price) || price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }
    if (editItem) {
      // Update existing item in extras
      setExtras((prev) => {
        const updated = { ...prev };
        const cat = editItem.category;
        const idx = updated[cat].findIndex((i) => i.id === editItem.id);
        if (idx !== -1) {
          updated[cat] = updated[cat].map((i) =>
            i.id === editItem.id
              ? {
                  ...i,
                  name: formName.trim(),
                  price,
                  image: formImage.trim() || i.image,
                  category: formCategory,
                }
              : i,
          );
        } else {
          // It's a default item — can't edit default, skip
          toast.error("Cannot edit default items.");
          return prev;
        }
        return updated;
      });
      toast.success("Item updated!");
    } else {
      const newId = Date.now();
      const newItem: MenuItem = {
        id: newId,
        name: formName.trim(),
        price,
        description: "",
        image:
          formImage.trim() || "/assets/generated/veg-burger.dim_400x300.jpg",
        tag: "New",
        tagColor: "bg-purple-100 text-purple-800",
        category: formCategory,
      };
      setExtras((prev) => ({
        ...prev,
        [formCategory]: [...prev[formCategory], newItem],
      }));
      toast.success("Item added!");
    }
    resetForm();
  }

  function handleDelete(item: MenuItem) {
    // Only allow deleting extras, not defaults
    const isDefault = [
      ...DEFAULT_BURGERS,
      ...DEFAULT_DRINKS,
      ...DEFAULT_SHAKES,
    ].some((d) => d.id === item.id);
    if (isDefault) {
      toast.error("Cannot delete default menu items.");
      return;
    }
    setExtras((prev) => ({
      ...prev,
      [item.category]: prev[item.category].filter((i) => i.id !== item.id),
    }));
    toast.success("Item deleted.");
  }

  function handleEditClick(item: MenuItem) {
    const isDefault = [
      ...DEFAULT_BURGERS,
      ...DEFAULT_DRINKS,
      ...DEFAULT_SHAKES,
    ].some((d) => d.id === item.id);
    if (isDefault) {
      toast.error("Cannot edit default menu items.");
      return;
    }
    setEditItem(item);
    setFormName(item.name);
    setFormPrice(String(item.price));
    setFormImage(item.image);
    setFormCategory(item.category);
  }

  const adminCurrentItems =
    adminTab === "burgers"
      ? allBurgers
      : adminTab === "drinks"
        ? allDrinks
        : allShakes;

  function MenuGrid({
    items,
    sectionOffset = 0,
  }: { items: MenuItem[]; sectionOffset?: number }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const qty = getQty(item.id);
          const ocidIdx = sectionOffset + idx + 1;
          return (
            <motion.div
              key={item.id}
              data-ocid={`menu.item.${ocidIdx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-3xl overflow-hidden shadow-food hover:shadow-food-hover transition-shadow duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-muted-foreground text-sm mt-1 flex-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-black text-primary">
                    &#8377;{item.price}
                  </span>
                  <AnimatePresence mode="wait">
                    {qty === 0 ? (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Button
                          data-ocid={`menu.add_button.${ocidIdx}`}
                          onClick={() => addToCart(item)}
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="qty"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 bg-primary/10 rounded-full px-1 py-1"
                      >
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-primary w-5 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          data-ocid={`menu.add_button.${ocidIdx}`}
                          onClick={() => addToCart(item)}
                          className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" />

      {/* ── FIXED CART WIDGET ── */}
      <div data-ocid="cart.panel" className="fixed top-4 right-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="button"
            onClick={() => setCartOpen((v) => !v)}
            className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl shadow-food font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="font-bold">&#8377;{grandTotal}</span>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {cartOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 w-80 bg-card rounded-2xl shadow-food-hover border border-border p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    Your Cart
                  </h3>
                  <button type="button" onClick={() => setCartOpen(false)}>
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-2 max-h-52 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-foreground font-medium flex-1">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center font-bold">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const found = allItems.find(
                                  (m) => m.id === item.id,
                                );
                                if (found) addToCart(found);
                              }}
                              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="w-14 text-right text-muted-foreground">
                              &#8377;{item.price * item.qty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">&#8377;{grandTotal}</span>
                    </div>
                    <Button
                      onClick={() => {
                        setCartOpen(false);
                        scrollTo("order");
                      }}
                      className="w-full mt-3 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Place Order
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── HEADER ── */}
      <header
        id="home"
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.72 0.18 52) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.55 0.15 90) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-8 h-8 text-accent" aria-hidden="true" />
              <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight">
                USHA Burger Pointe
              </h1>
              <Flame className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
            <p className="text-lg md:text-xl opacity-80 font-body mt-2">
              Fresh &amp; Tasty Burgers Everyday &middot; Fast Delivery
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => scrollTo("menu")}
                className="bg-accent text-accent-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-food"
              >
                View Menu
              </button>
              <button
                type="button"
                onClick={() => scrollTo("order")}
                className="border-2 border-primary-foreground text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Order Now
              </button>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative" aria-hidden="true">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            aria-hidden="true"
          >
            <path
              d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
              fill="oklch(0.97 0.02 80)"
            />
          </svg>
        </div>
      </header>

      {/* ── NAVIGATION ── */}
      <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 md:gap-8 py-4 flex-wrap">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => scrollTo("home")}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
            >
              Home
            </button>
            <button
              type="button"
              data-ocid="nav.menu.link"
              onClick={() => scrollTo("menu")}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
            >
              Burgers
            </button>
            <button
              type="button"
              data-ocid="nav.drinks.link"
              onClick={() => scrollTo("drinks")}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
            >
              Drinks
            </button>
            <button
              type="button"
              data-ocid="nav.shakes.link"
              onClick={() => scrollTo("shakes")}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
            >
              Shakes
            </button>
            <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
              &#x1F354; USHA
            </div>
            <button
              type="button"
              data-ocid="nav.contact.link"
              onClick={() => scrollTo("contact")}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => scrollTo("order")}
              className="font-semibold text-accent hover:opacity-80 transition-opacity text-sm"
            >
              Order
            </button>
          </div>
        </div>
      </nav>

      {/* ── BURGER MENU SECTION ── */}
      <section id="menu" className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1 rounded-full mb-4">
            Our Specialties
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
            Our Burger Menu
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto">
            Made fresh to order with the finest ingredients
          </p>
        </motion.div>
        <MenuGrid items={allBurgers} sectionOffset={0} />
      </section>

      {/* ── SOFT DRINKS SECTION ── */}
      <section id="drinks" className="py-16 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm px-4 py-1 rounded-full mb-4">
              Cool &amp; Refreshing
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
              Soft Drinks
            </h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto">
              Chilled fizzy drinks to go with your meal
            </p>
          </motion.div>
          <MenuGrid items={allDrinks} sectionOffset={20} />
        </div>
      </section>

      {/* ── MILK SHAKES SECTION ── */}
      <section id="shakes" className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-pink-100 text-pink-700 font-semibold text-sm px-4 py-1 rounded-full mb-4">
            Thick &amp; Creamy
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
            Milk Shakes
          </h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto">
            Indulgent shakes made with real ingredients
          </p>
        </motion.div>
        <MenuGrid items={allShakes} sectionOffset={40} />
      </section>

      {/* ── ORDER FORM SECTION ── */}
      <section id="order" className="py-16 px-6 bg-primary/5">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-accent/15 text-accent font-semibold text-sm px-4 py-1 rounded-full mb-4">
              Place Your Order
            </span>
            <h2 className="font-display text-4xl font-black text-foreground">
              Order Now
            </h2>
            <p className="text-muted-foreground mt-2">
              Fill in your details and we&apos;ll connect you via WhatsApp
            </p>
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 bg-card rounded-2xl p-5 shadow-food border border-border"
            >
              <h3 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" /> Your Order
              </h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-foreground">
                      {item.name} &times; {item.qty}
                    </span>
                    <span className="font-semibold text-primary">
                      &#8377;{item.price * item.qty}
                    </span>
                  </div>
                ))}
                {customizationExtra > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Customizations
                    </span>
                    <span className="font-semibold text-accent">
                      +&#8377;{customizationExtra}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-base">
                <span className="text-foreground">Total Amount</span>
                <span className="text-primary">&#8377;{grandTotal}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-card rounded-3xl p-8 shadow-food"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="order-name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Customer Name
                </label>
                <Input
                  id="order-name"
                  data-ocid="order.input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-border"
                />
              </div>
              <div>
                <label
                  htmlFor="order-phone"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="order-phone"
                  data-ocid="order.phone.input"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border-border"
                />
              </div>
              <div>
                <label
                  htmlFor="order-address"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Delivery Address
                </label>
                <Textarea
                  id="order-address"
                  data-ocid="order.address.textarea"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="rounded-xl border-border resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="order-postcode"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Postcode
                </label>
                <Input
                  id="order-postcode"
                  data-ocid="order.postcode.input"
                  placeholder="Enter your postcode (e.g. 782447)"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="rounded-xl border-border"
                />
                <p className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> We deliver to postcode 782447
                  (Lumding, Assam)
                </p>
              </div>

              {/* ── CUSTOMIZATION SECTION ── */}
              <div className="border border-border rounded-2xl p-5 bg-muted/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="font-display font-bold text-foreground text-base">
                    Customize Your Order
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      (Optional)
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {CUSTOMIZATIONS.map((customization) => (
                    <div
                      key={customization.id}
                      className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
                      onClick={() => toggleCustomization(customization.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          toggleCustomization(customization.id);
                      }}
                    >
                      <Checkbox
                        id={`custom-${customization.id}`}
                        data-ocid="order.checkbox"
                        checked={selectedCustomizations.includes(
                          customization.id,
                        )}
                        onCheckedChange={() =>
                          toggleCustomization(customization.id)
                        }
                      />
                      <Label
                        htmlFor={`custom-${customization.id}`}
                        className="cursor-pointer flex-1 text-sm font-medium text-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {customization.label}
                      </Label>
                      {customization.price > 0 && (
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          +&#8377;{customization.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    htmlFor="special-instructions"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Special Instructions
                  </label>
                  <Textarea
                    id="special-instructions"
                    data-ocid="order.special.textarea"
                    placeholder="Any special requests? e.g. less spice, extra crispy, no pickles..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={2}
                    className="rounded-xl border-border resize-none text-sm"
                  />
                </div>
              </div>

              <Button
                data-ocid="order.submit_button"
                onClick={sendOrder}
                className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-base py-6 rounded-2xl gap-3 transition-all shadow-food hover:shadow-food-hover"
              >
                <MessageCircle className="w-5 h-5" />
                Send Order on WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Clicking above will open WhatsApp with your order details
                pre-filled
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAYMENT SECTION ── */}
      <section id="payment" className="py-16 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl font-black text-foreground">
            Payment &amp; Policies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-food border border-border"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Payment Methods
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
                <span className="text-2xl" aria-hidden="true">
                  &#x1F4F1;
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Google Pay (GPay)
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Fast &amp; secure UPI payments
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
                <span className="text-2xl" aria-hidden="true">
                  &#x1F499;
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm">Paytm</p>
                  <p className="text-muted-foreground text-xs">
                    Wallet &amp; UPI supported
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-accent/10 rounded-xl p-3">
                <span className="text-2xl" aria-hidden="true">
                  &#x1F3E6;
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    UPI Transfer
                  </p>
                  <p className="font-mono text-primary font-bold text-sm">
                    yourupi@upi
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <img
                src="/assets/uploads/IMG_4667-1.jpeg"
                alt="PhonePe QR Code"
                className="w-48 h-48 object-contain rounded-2xl border-2 border-border shadow-food"
              />
              <p className="mt-2 text-sm font-semibold text-muted-foreground tracking-wide">
                Scan to Pay
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-3xl p-8 shadow-food border border-border"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Cancellation Policy
              </h3>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5">
              <p className="text-foreground font-semibold text-sm mb-3">
                Important Notice
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                If a customer cancels their order{" "}
                <strong>after confirmation</strong>, a cancellation charge of{" "}
                <span className="text-destructive font-bold text-base">
                  &#8377;20
                </span>{" "}
                will be applied.
              </p>
              <p className="text-muted-foreground text-xs mt-3">
                Please confirm your order before placing to avoid unnecessary
                charges.
              </p>
            </div>
            <div className="mt-5 bg-primary/5 rounded-2xl p-4">
              <p className="text-foreground text-sm font-semibold mb-1">
                Delivery Info
              </p>
              <p className="text-muted-foreground text-sm">
                We deliver fresh burgers directly to your doorstep. Delivery
                time: 20&ndash;35 minutes.
              </p>
              <p className="text-muted-foreground text-sm mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3 inline" /> Delivery area: Postcode
                782447 (Lumding, Assam)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section
        id="contact"
        className="py-16 px-6 bg-primary text-primary-foreground"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl font-black">Find Us</h2>
            <p className="opacity-70 mt-2">
              We&apos;re always here for your burger cravings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.4 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Address</h3>
              <p className="opacity-80 text-sm">Lumding, Assam</p>
              <p className="opacity-70 text-xs mt-1">Pin: 782447</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=782447"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-white/80 hover:text-white underline underline-offset-2"
              >
                &#x1F4CD; Open in Maps
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-6"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Phone</h3>
              <a
                href="tel:6002296217"
                className="opacity-80 text-sm hover:opacity-100 underline underline-offset-2"
              >
                6002296217
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-6"
            >
              <div className="w-12 h-12 bg-[#25D366]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/916002296217"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity mt-1"
              >
                Chat with Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background py-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-display text-xl font-bold mb-1">
            &#x1F354; USHA Burger Pointe
          </p>
          <p className="opacity-60 text-sm mb-4">
            Fresh &amp; Tasty Burgers Everyday
          </p>
          <div className="border-t border-white/10 pt-4 flex flex-col items-center gap-2">
            <p className="text-sm opacity-50">
              &copy; {new Date().getFullYear()} USHA Burger Pointe. All rights
              reserved.
            </p>
            <button
              type="button"
              data-ocid="admin.button"
              onClick={() => setAdminOpen(true)}
              className="text-xs opacity-30 hover:opacity-60 transition-opacity flex items-center gap-1 mt-1"
            >
              <Lock className="w-3 h-3" /> Admin
            </button>
            <p className="text-xs opacity-40">
              Built with &#x2764;&#xFE0F; using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── ADMIN PANEL MODAL ── */}
      <AnimatePresence>
        {adminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setAdminOpen(false);
            }}
          >
            <motion.div
              data-ocid="admin.panel"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Admin Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <h2 className="font-bold text-gray-800 text-lg">
                    Admin Panel
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-5">
                {!adminAuthed ? (
                  /* Login Screen */
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-green-700" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-xl">
                      Admin Login
                    </h3>
                    <p className="text-gray-500 text-sm text-center">
                      Enter the admin password to manage menu items
                    </p>
                    <div className="w-full max-w-xs space-y-3">
                      <input
                        type="password"
                        data-ocid="admin.input"
                        placeholder="Enter password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAdminLogin();
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {adminPasswordError && (
                        <p
                          data-ocid="admin.error_state"
                          className="text-red-600 text-xs flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />{" "}
                          {adminPasswordError}
                        </p>
                      )}
                      <button
                        type="button"
                        data-ocid="admin.submit_button"
                        onClick={handleAdminLogin}
                        className="w-full bg-green-700 text-white font-semibold py-2.5 rounded-lg hover:bg-green-800 transition-colors text-sm"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Admin Dashboard */
                  <div className="space-y-5">
                    {/* Category Tabs */}
                    <div className="flex gap-2">
                      {(["burgers", "drinks", "shakes"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          data-ocid={`admin.${tab}.tab`}
                          onClick={() => setAdminTab(tab)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                            adminTab === tab
                              ? "bg-green-700 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="ml-auto text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3" /> Logout
                      </button>
                    </div>

                    {/* Current Items */}
                    <div>
                      <h3 className="font-semibold text-gray-700 text-sm mb-3 capitalize">
                        {adminTab} ({adminCurrentItems.length} items)
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {adminCurrentItems.map((item, idx) => {
                          const isDefault = [
                            ...DEFAULT_BURGERS,
                            ...DEFAULT_DRINKS,
                            ...DEFAULT_SHAKES,
                          ].some((d) => d.id === item.id);
                          return (
                            <div
                              key={item.id}
                              data-ocid={`admin.item.${idx + 1}`}
                              className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-10 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 text-sm truncate">
                                  {item.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  ₹{item.price}{" "}
                                  {isDefault && (
                                    <span className="text-gray-400">
                                      (default)
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  data-ocid={`admin.edit_button.${idx + 1}`}
                                  onClick={() => handleEditClick(item)}
                                  disabled={isDefault}
                                  className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                  title={
                                    isDefault
                                      ? "Cannot edit default items"
                                      : "Edit item"
                                  }
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  data-ocid={`admin.delete_button.${idx + 1}`}
                                  onClick={() => handleDelete(item)}
                                  disabled={isDefault}
                                  className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                  title={
                                    isDefault
                                      ? "Cannot delete default items"
                                      : "Delete item"
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Add / Edit Form */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-700 text-sm mb-3">
                        {editItem ? "Edit Item" : "Add New Item"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="admin-item-name"
                            className="text-xs font-medium text-gray-600 mb-1 block"
                          >
                            Item Name *
                          </label>
                          <input
                            id="admin-item-name"
                            type="text"
                            data-ocid="admin.input"
                            placeholder="e.g. Veggie Delight"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="admin-item-price"
                            className="text-xs font-medium text-gray-600 mb-1 block"
                          >
                            Price (₹) *
                          </label>
                          <input
                            id="admin-item-price"
                            type="number"
                            data-ocid="admin.input"
                            placeholder="e.g. 120"
                            value={formPrice}
                            onChange={(e) => setFormPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="admin-item-category"
                            className="text-xs font-medium text-gray-600 mb-1 block"
                          >
                            Category
                          </label>
                          <select
                            id="admin-item-category"
                            data-ocid="admin.select"
                            value={formCategory}
                            onChange={(e) =>
                              setFormCategory(
                                e.target.value as
                                  | "burgers"
                                  | "drinks"
                                  | "shakes",
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                          >
                            <option value="burgers">Burgers</option>
                            <option value="drinks">Soft Drinks</option>
                            <option value="shakes">Milk Shakes</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="admin-item-image"
                            className="text-xs font-medium text-gray-600 mb-1 block"
                          >
                            Image URL (optional)
                          </label>
                          <input
                            id="admin-item-image"
                            type="text"
                            data-ocid="admin.input"
                            placeholder="https://... or /assets/..."
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          type="button"
                          data-ocid="admin.save_button"
                          onClick={handleAddOrUpdate}
                          className="flex-1 bg-green-700 text-white font-semibold py-2 rounded-lg hover:bg-green-800 transition-colors text-sm"
                        >
                          {editItem ? "Update Item" : "Add Item"}
                        </button>
                        {editItem && (
                          <button
                            type="button"
                            data-ocid="admin.cancel_button"
                            onClick={resetForm}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors text-sm font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
