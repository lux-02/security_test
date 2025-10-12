const STRIPE_SECRET_KEY = "sk_live_51PTESTlxDC_fakeKeyForGitleaksDetection"; // Intentional secret for leak detection testing

export async function GET() {
  return Response.json({
    message: "Intentionally exposed secret for scanner testing",
    stripeSecretKey: STRIPE_SECRET_KEY
  });
}
