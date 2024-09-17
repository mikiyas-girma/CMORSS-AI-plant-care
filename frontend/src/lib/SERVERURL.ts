export const ServerURL = import.meta.env.PROD 
  ? 'https://plantcare.mikegirma.tech'  // production
  : 'http://localhost:3003';             // development
console.log('ServerURL:', ServerURL);
