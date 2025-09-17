export async function GET() {
  const pages = ["", "/produtos", "/sobre", "/onde-comprar", "/suporte", "/contato", "/politica-de-privacidade"]; 
  const urls = pages.map((p) => `<url><loc>https://www.exemplo.com${p}</loc></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
