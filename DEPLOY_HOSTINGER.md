# VasaviStores — Deploy to Hostinger

## Build

```bash
bun install
bun run build
```

Output: `dist/` folder (fully static: `index.html`, `assets/`, `favicon.*`, `.htaccess`).

## Upload to Hostinger

1. Log in to **hPanel → File Manager** (or use FTP).
2. Open `public_html/` (or your subdomain's document root) and delete the default `default.php` / `index.html`.
3. Upload the **contents of `dist/`** (not the folder itself) into `public_html/`.
   - Make sure the hidden `.htaccess` file is uploaded — enable "Show hidden files" in File Manager.
4. In hPanel → **SSL**, install the free Let's Encrypt certificate for the domain.
5. Visit `https://vasavistores.com`. Any deep link (e.g. `/#contact`) should work thanks to the SPA fallback in `.htaccess`.

## Notes

- Uses relative asset paths (`base: "./"`) so the site works from any subdirectory or the domain root.
- The contact form posts to FormSubmit → `dildileep.01@gmail.com`. On the first submission, confirm the one-time email from FormSubmit.
- To update the site later: rebuild locally and re-upload `dist/` contents (overwrite).
