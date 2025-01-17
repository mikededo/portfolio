import type { Action } from '@sveltejs/kit';

export const POST: Action = async ({ cookies, request }) => {
  const { name, value } = await request.json();

  cookies.set(name, value, { path: '/' });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
