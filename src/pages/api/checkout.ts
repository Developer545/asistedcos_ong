import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (!amount || amount < 1 || amount > 50000) {
      return new Response(JSON.stringify({ error: 'Monto inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donación — Fundación ASISTEDCOS',
              description: 'Tu donación restaura ecosistemas y transforma comunidades en El Salvador.',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://asistedcos.org/gracias?donated=true',
      cancel_url: 'https://asistedcos.org/donar',
      metadata: { source: 'website_donation' },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return new Response(JSON.stringify({ error: 'Error al procesar la donación' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
