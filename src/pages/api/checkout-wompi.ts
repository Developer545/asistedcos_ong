export const prerender = false;

import type { APIRoute } from 'astro';

const WOMPI_TOKEN_URL = 'https://id.wompi.sv/connect/token';
const WOMPI_API_URL   = 'https://api.wompi.sv/EnlacePago';
const CLIENT_ID       = import.meta.env.WOMPI_CLIENT_ID as string;
const CLIENT_SECRET   = import.meta.env.WOMPI_CLIENT_SECRET as string;
const BASE_URL        = 'https://asistedcosong.vercel.app';

async function getToken(): Promise<string> {
  const res = await fetch(WOMPI_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'client_credentials',
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience:      'wompi_api',
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body   = await request.json();
    const amount = Number(body.amount);

    if (!amount || amount < 1 || amount > 50000) {
      return new Response(JSON.stringify({ error: 'Monto inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = await getToken();

    const ref = `DON-${Date.now()}`;

    const wompiRes = await fetch(WOMPI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        identificadorEnlaceComercio: ref,
        monto: amount,
        nombreProducto: 'Donación — Fundación ASISTEDCOS',
        formaPago: {
          permitirTarjetaCreditoDebido: true,
          permitirPagoConPuntoAgricola: false,
          permitirPagoEnCuotasAgricola: false,
          permitirPagoEnBitcoin:        false,
          permitePagoQuickPay:          false,
        },
        configuracion: {
          urlRedirect:                `${BASE_URL}/gracias?donated=true`,
          notificarTransaccionCliente: true,
        },
      }),
    });

    const wompiData = await wompiRes.json();

    if (!wompiRes.ok || !wompiData.urlEnlace) {
      console.error('Wompi error:', wompiData);
      return new Response(JSON.stringify({ error: 'Error al crear enlace de pago' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: wompiData.urlEnlace }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Wompi error:', err);
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
