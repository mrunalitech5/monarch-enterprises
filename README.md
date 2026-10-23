# Monarch Enterprises Website

Static website (HTML, CSS, JavaScript). No build step, no dependencies.

## Folder structure
```
index.html          main page
404.html            page-not-found page
css/style.css       all styling
js/main.js          menu, slideshow, gallery, WhatsApp enquiry form
assets/             logo and favicon
images/thumbs/      small gallery photos
images/full/        large photos (slideshow and enlarged view)
robots.txt  .nojekyll
```

## Publish on GitHub Pages (free)
1. Create a new public repository on github.com (for example `monarch-enterprises`).
2. Upload everything inside this folder (Add file > Upload files), then Commit.
3. Settings > Pages > Source: **Deploy from a branch** > Branch: **main**, folder **/ (root)** > Save.
4. After 1-2 minutes the site is live at `https://YOUR-USERNAME.github.io/monarch-enterprises/`.

Custom domain: buy a domain, add it under Settings > Pages > Custom domain, and set the DNS records your provider shows.

## Change the WhatsApp number
Enquiries from the form open WhatsApp with the message ready. To change the number:
1. In `js/main.js` edit `whatsapp: '919867337664'` (country code 91 + 10-digit number, no + or spaces).
2. In `index.html` search for `919867337664` and replace it (used as a fallback link when JavaScript is off).
Also update the `tel:` links and the phone numbers shown on the page if needed.

## Add or replace photos
Save the large photo in `images/full/` (about 1600 px wide) and a small copy in `images/thumbs/` (about 700 px wide), using the same file name (.webp or .jpg). Then add a `<figure>` block in the gallery section of `index.html`, copying an existing one.

## Notes
- Add `<link rel="canonical">`, Open Graph image and a `sitemap.xml` once the final domain is known.
- Fonts (Lora and Figtree) load from Google Fonts; the site still works with fallback fonts offline.
