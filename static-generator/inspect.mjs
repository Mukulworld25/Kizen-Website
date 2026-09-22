import fs from 'node:fs';
const which = process.argv[2] || 'courses_tabs';
if (which === 'courses_tabs') {
  const c = fs.readFileSync('static-site/courses/index.html', 'utf8');
  const i = c.indexOf('role="tablist"');
  console.log('tablist idx:', i);
  console.log(c.slice(Math.max(0, i - 300), i + 3000));
  console.log('\n=== section ids in order ===');
  for (const m of c.matchAll(/<section[^>]*id="([^"]+)"/g)) console.log('section id:', m[1]);
} else if (which === 'drawer') {
  const c = fs.readFileSync('static-site/index.html', 'utf8');
  const i = c.indexOf('z-40');
  console.log(c.slice(Math.max(0, i - 1500), i + 3000));
} else if (which === 'hero') {
  const c = fs.readFileSync('static-site/index.html', 'utf8');
  const i = c.indexOf('Next campus photo');
  console.log(c.slice(Math.max(0, i - 9000), i + 2500));
} else if (which === 'cta') {
  const c = fs.readFileSync('static-site/index.html', 'utf8');
  const i = c.indexOf('lg:hidden fixed bottom-0');
  console.log(c.slice(Math.max(0, i - 500), i + 2500));
}
