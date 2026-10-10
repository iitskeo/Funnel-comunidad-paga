/*
  Todo lo que cambia del funnel está aquí. No hace falta tocar el HTML.
*/
window.FUNNEL = {
  // Planes de Whop (embedded checkout)
  planBiblioteca: 'plan_SzoerRi0rgRxC', // Biblioteca de prompts, gratis
  planPlus: 'plan_RhVl5CaluBGH1', // Comunidad Plus, 5 USD al mes

  // A dónde va la gente después de cada paso
  urlBiblioteca: 'https://whop.com/itskeo/exp_MoZZITX3DvCwNH/app/',
  urlComunidadPlus: 'https://whop.com/itskeo/exp_IBUci0sjUP2q1Z/app/', // después de comprar Plus
  urlComunidad: 'https://whop.com/itskeo/', // "Ya tengo acceso" y "Entrar a Plus" de la landing

  // App de Whop en las tiendas (botón "Descargar la app"; si está vacío, no se muestra)
  urlAppIOS: 'https://apps.apple.com/app/whop/id1600181492',
  urlAppAndroid: 'https://play.google.com/store/search?q=whop&c=apps',

  urlTiktok: 'https://www.tiktok.com/@itskeo5',

  // 'production' para cobrar de verdad, 'sandbox' para probar
  entorno: 'production',
};
