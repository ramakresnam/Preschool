import express from "express";
import path from "path";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  const isProduction = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "preview";

  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key || key.trim() === "" || key === "100" || !key.startsWith("sk_")) {
        throw new Error("Invalid or missing STRIPE_SECRET_KEY. Please provide a valid Stripe Secret Key (starting with sk_test_ or sk_live_) in the AI Studio Settings.");
      }
      stripe = new Stripe(key);
    }
    return stripe;
  };

  app.use(express.json());

  // Health check for deployment
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // API routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { amount, currency = "usd", name } = req.body;
      const stripeClient = getStripe();

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: `Donation: ${name || "Support our mission"}`,
              },
              unit_amount: amount * 100, // Stripe expects cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || "http://localhost:3000" }?payment=success`,
        cancel_url: `${process.env.APP_URL || "http://localhost:3000" }?payment=cancel`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve("dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
