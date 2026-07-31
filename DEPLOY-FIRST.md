# Deploy GlossGrid — fastest method

## Option 1: GitHub + automatic Cloudflare deployments

1. Create a new empty GitHub repository named `glossgrid-site`.
2. Extract the ZIP and upload **the contents inside** `glossgrid-cloudflare` to the repository root.
3. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
4. Connect GitHub and select `glossgrid-site`.
5. Use these settings:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `exit 0`
   - Build output directory: `.`
   - Root directory: leave blank
6. Select **Save and Deploy**.
7. Cloudflare will issue a free address similar to `glossgrid-site.pages.dev`.

Every later GitHub commit will automatically publish a new deployment.

## Option 2: Cloudflare drag-and-drop without GitHub

1. Open **Workers & Pages → Create → Pages → Drag and drop your files**.
2. Enter a project name, such as `glossgrid-site`.
3. Extract the ZIP. Drag the **entire `glossgrid-cloudflare` folder contents** into the uploader.
4. Select **Deploy site**.

Direct Upload is fastest, but Cloudflare does not let an existing Direct Upload project switch to Git integration later. Create a separate Git-integrated project if you later want automatic deployments.

## After Cloudflare gives you the URL

Replace `https://glossgrid.pages.dev` with your exact address in:

- `assets/data.js`
- `robots.txt`
- `sitemap.xml`
- `index.html` structured data

Also replace the demo email, Pinterest URL, brand details, and sample imagery before commercial launch.
