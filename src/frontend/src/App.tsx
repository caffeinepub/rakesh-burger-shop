import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ChevronUp,
  CreditCard,
  Flame,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const MENU = [
  {
    id: 1,
    name: "Veg Burger",
    price: 100,
    description:
      "Crispy veggie patty, fresh lettuce, tomato & special green chutney",
    image: "/assets/generated/veg-burger.dim_400x300.jpg",
    tag: "Pure Veg",
    tagColor: "bg-green-100 text-green-800",
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
  },
  {
    id: 3,
    name: "Cheese Burger",
    price: 120,
    description: "Double cheese melt, beef patty, caramelized onions & mustard",
    image: "/assets/generated/cheese-burger.dim_400x300.jpg",
    tag: "Cheesy",
    tagColor: "bg-yellow-100 text-yellow-800",
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
  },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(item: (typeof MENU)[0]) {
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

  function sendOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all fields before ordering.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add some burgers first!");
      return;
    }
    const itemLines = cart
      .map((c) => `${c.name} x${c.qty} = Rs.${c.price * c.qty}`)
      .join("%0A");
    const waUrl = `https://wa.me/916002296217?text=Burger Order%0A${itemLines}%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0ATotal: Rs.${totalPrice}`;
    window.open(waUrl, "_blank");
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
            <span className="font-bold">&#8377;{totalPrice}</span>
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
                              onClick={() =>
                                addToCart(MENU.find((m) => m.id === item.id)!)
                              }
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
                      <span className="text-primary">&#8377;{totalPrice}</span>
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
                Rakesh Burger Shop
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

        {/* Wave divider */}
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
          <div className="flex items-center justify-center gap-8 py-4">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => scrollTo("home")}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              type="button"
              data-ocid="nav.menu.link"
              onClick={() => scrollTo("menu")}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Menu
            </button>
            <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
              &#x1F354; Rakesh
            </div>
            <button
              type="button"
              data-ocid="nav.contact.link"
              onClick={() => scrollTo("contact")}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => scrollTo("order")}
              className="font-semibold text-accent hover:opacity-80 transition-opacity"
            >
              Order
            </button>
          </div>
        </div>
      </nav>

      {/* ── MENU SECTION ── */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENU.map((item, idx) => {
            const qty = getQty(item.id);
            const ocidIdx = idx + 1;
            return (
              <motion.div
                key={item.id}
                data-ocid={`menu.item.${ocidIdx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
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
                  <p className="text-muted-foreground text-sm mt-1 flex-1 leading-relaxed">
                    {item.description}
                  </p>
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

          {/* Cart Summary in Order Form */}
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
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-base">
                <span className="text-foreground">Total Amount</span>
                <span className="text-primary">&#8377;{totalPrice}</span>
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
              <p className="opacity-80 text-sm">Lumbing Kaliya Road</p>
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
            &#x1F354; Rakesh Burger Shop
          </p>
          <p className="opacity-60 text-sm mb-4">
            Fresh &amp; Tasty Burgers Everyday
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="text-sm opacity-50">
              &copy; {new Date().getFullYear()} Rakesh Burger Shop. All rights
              reserved.
            </p>
            <p className="text-xs opacity-40 mt-2">
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
    </div>
  );
}
