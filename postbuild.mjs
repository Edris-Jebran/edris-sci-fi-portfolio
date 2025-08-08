// Duplicate index.html as 404.html for SPA fallback.
import fs from 'fs'
try {
  fs.copyFileSync('dist/index.html', 'dist/404.html')
  console.log('Created dist/404.html for SPA fallback.')
} catch (e) {
  console.log('Postbuild step skipped:', e?.message)
}
