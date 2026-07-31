# Exact GitHub and Cloudflare Deployment Steps

## Part A — Create the GitHub repository in a browser

1. Sign in to GitHub.
2. Select the plus icon in the upper-right corner.
3. Select **New repository**.
4. Repository name: `glossgrid-site`
5. Description: `Visual nail inspiration and Nail Finder website`
6. Visibility: **Public** is simplest. Private also works when Cloudflare receives repository permission.
7. Do **not** add a README, `.gitignore`, or license because the package already contains a README.
8. Select **Create repository**.

## Part B — Upload this project

1. Extract the ZIP file on your computer.
2. Open the extracted `glossgrid-cloudflare` folder.
3. In the empty GitHub repository, select **uploading an existing file**. If the repository is not empty, use **Add file → Upload files**.
4. Drag every file and folder from inside `glossgrid-cloudflare` into GitHub. Do not upload the outer ZIP file only.
5. Confirm that `index.html`, `assets`, `explore`, `finder`, and the other folders appear at the repository root.
6. Commit message: `Initial GlossGrid website`
7. Select **Commit changes**.

GitHub's browser upload currently limits each file to 25 MiB and supports up to 100 files in one upload. This package stays well below those limits.

## Part C — Connect the repository to Cloudflare Pages

1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Select **Create application** or **Create**.
4. Select **Pages** and then **Connect to Git**.
5. Select **GitHub**.
6. Authorize Cloudflare Pages. You can grant access only to `glossgrid-site` instead of all repositories.
7. Select the `glossgrid-site` repository.
8. Production branch: `main`
9. Framework preset: **None**
10. Build command: `exit 0`
11. Build output directory: `.`
12. Root directory: leave blank.
13. Select **Save and Deploy**.

Cloudflare will publish a free address similar to:

`https://glossgrid-site.pages.dev`

## Part D — Update the temporary site address

After Cloudflare shows the exact `pages.dev` address:

1. Open `assets/data.js` in GitHub.
2. Select the pencil/edit icon.
3. Change `siteUrl` from `https://glossgrid.pages.dev` to your exact address.
4. Open `robots.txt` and replace the sitemap domain.
5. Open `sitemap.xml` and replace every old domain.
6. Commit the changes.

Cloudflare automatically redeploys after every commit to the connected branch.

## Part E — Change the brand

Edit the first object in `assets/data.js`:

```js
window.GLOSSGRID_CONFIG = {
  brand: "Your Brand Name",
  tagline: "Your tagline",
  siteUrl: "https://your-project.pages.dev",
  pinterestUrl: "https://www.pinterest.com/your-account/",
  email: "hello@yourdomain.com"
};
```

Also update the page titles and descriptions inside the HTML files when the final brand is selected.

## Part F — Add or replace designs

Open `assets/data.js`. Duplicate one object inside `window.GLOSSGRID_DESIGNS`, then update:

- `slug`: lowercase words joined by hyphens; it must be unique
- `title`
- `image`
- `credit`
- `source`
- `color`
- `shape`
- `length`
- `season`
- `occasion`
- `style`
- `finish`
- `difficulty`
- `maintenance`
- `summary`
- `salonBrief`
- `why`

Keep commas between design objects. A JavaScript syntax error can stop the library from loading.

## Part G — Connect a custom domain later

1. Buy a domain from a registrar.
2. In Cloudflare Pages, open the project.
3. Open **Custom domains**.
4. Select **Set up a custom domain**.
5. Enter the domain and follow the DNS instructions.
6. Update `siteUrl`, `robots.txt`, `sitemap.xml`, canonical/meta tags and Search Console property.

## Part H — What is not automated in this starter

- GitHub and Cloudflare login/authorization
- A real newsletter database
- User accounts and cross-device favorites
- Image uploads/admin dashboard
- Active Google Analytics, Pinterest Tag or AdSense
- Consent-management platform

These require accounts, credentials, legal configuration, or a backend. The website itself is ready to upload and deploy without installing software.
