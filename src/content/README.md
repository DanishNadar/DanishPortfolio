# Portfolio content system

The important portfolio pages are now content-driven and editable without touching the route logic.

## Project pages

Each project has its own file:

```txt
src/content/projectPages/<project_slug_with_underscores>.ts
```

Example:

```txt
src/content/projectPages/observ_e.ts
```

Edit that file to add:

- more summary text
- architecture cards
- implementation cards
- stack map items
- challenges and solutions
- metrics
- gallery images
- related project/post slugs
- impact takeaway
- interview talking points
- resume bullets
- links

The dynamic route `/projects/$slug` loads the correct file using the slug. The URL may be dynamic, but the page content is now unique and extensible per project.

## Post pages

Each post has its own file:

```txt
src/content/postPages/<post_slug_with_underscores>.ts
```

Portfolio posts are intended to be complete, published narrative pages with clear project context, stack links, and supporting visuals.

## Images

Place manually downloaded LinkedIn/event/project images in:

```txt
public/linkedin_images/
```

Then reference them from a project/post content file.


