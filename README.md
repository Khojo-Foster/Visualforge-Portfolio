# VisualForge portfolio (static HTML, CSS, JS)

Deploy on Vercel: import this folder, framework "Other", no build command. Output directory is the folder root.

## Common edits
- Profile photo: add `assets/profile.jpg` (4:5 works best). Until then a blue "F" shows.
- Testimonials: in `index.html`, find `class="tc"` and replace the "Add a short quote..." text with a real client quote.
- Add a design: copy a `<figure class="card" ...>` block in `#grid`, change `data-cat` (social, food, church, edu, mock), `data-full` and the `img` paths. Use a ~700px WebP for the grid and a ~1700px WebP for the full view.
- Colors and fonts: the variables at the top of `css/style.css`.
- Contact links: search `index.html` for `wa.me` and `mailto`.
