/*
  Todo lo que cambia del funnel está aquí. No hace falta tocar el HTML.
*/
window.FUNNEL = {
  // Planes de Whop (embedded checkout)
  planBiblioteca: 'plan_SzoerRi0rgRxC', // Biblioteca de prompts, gratis
  planPlus: 'plan_RhVl5CaluBGH1', // Comunidad Plus, 5 USD al mes

  // A dónde va la gente después de cada paso. Pasan por el login de Whop
  // (next=) porque el checkout no les deja la sesión abierta en whop.com.
  urlBiblioteca: 'https://whop.com/login/?next=/itskeo/exp_MoZZITX3DvCwNH/app/',
  urlComunidadPlus: 'https://whop.com/login/?next=/itskeo/exp_IBUci0sjUP2q1Z/app/', // después de comprar Plus

  // Login de Whop: para quien ya se unió (no volver a pasar por el checkout)
  urlLogin: 'https://whop.com/login/?next=/itskeo/',

  urlTiktok: 'https://www.tiktok.com/@itskeo5',

  // 'production' para cobrar de verdad, 'sandbox' para probar
  entorno: 'production',
};
