const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getBaseUrl() {
  return process.env.BASE_URL || 'http://localhost:3000'
}

async function createCheckoutSession({ name, amountDollars }) {
  const baseUrl = getBaseUrl()
  const amountCents = Math.round(Number(amountDollars) * 100)


  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/checkout/success`,
    cancel_url: `${baseUrl}/checkout/cancel`,
  })
}

module.exports = { createCheckoutSession }
