# trust.metaviews.ca Roadmap

> For Hermes: use this as the execution roadmap for building, deploying, and promoting the `trust.metaviews.ca` microsite. Keep work in small verified slices and commit each slice.

Goal: launch a commercial Metaviews microsite that converts Canada's renewed AI strategy attention into briefings, workshops, buy-in/alignment sessions, and adoption-roadmap opportunities.

Architecture: static microsite deployed through Cloudflare Pages from a GitHub repository. The first version should be one strong landing page with modular sections, then expand into offer pages and campaign assets after launch.

Tech stack: Git, GitHub, Cloudflare Pages, static HTML/CSS or Eleventy, DNS for `trust.metaviews.ca`, basic analytics, Open Graph/SEO metadata.

---

## Phase 0: Repository and decisions

### Task 0.1: Initialize local git repository

Objective: make `/home/metaviews/trust.metaviews` a standalone source-controlled project.

Files:
- Existing: `trust.docx`
- Existing: `README.md`
- Existing: `docs/opportunity-assessment.md`
- Existing: `docs/roadmap.md`

Steps:
1. Run `git init` in `/home/metaviews/trust.metaviews`.
2. Add a `.gitignore` for build output, dependencies, caches, and local environment files.
3. Commit the initial docs and source document.
4. Create an empty GitHub repository when the desired GitHub org/repo name is known.
5. Add `origin`, push `main`, and use this repo as the Cloudflare Pages source.

Verification:
- `git status --short --branch` shows a clean `main` branch after commit.
- `git remote -v` shows the GitHub remote after it is created.

Suggested repo names:
- `trust.metaviews.ca`
- `metaviews-trust`
- `trust-metaviews`

### Task 0.2: Choose the static-site implementation

Objective: decide the build system before writing production files.

Recommended default: Eleventy.

Why:
- fast static output;
- simple content-first workflow;
- easy Cloudflare Pages deployment;
- good fit for landing pages, offer pages, `sitemap.xml`, `robots.txt`, and `llms.txt`;
- avoids overbuilding a small commercial site.

Alternative: hand-authored static HTML/CSS if speed matters more than templating.

Decision gate:
- Choose Eleventy if the site will have more than one page or reusable layouts.
- Choose plain static if launch must happen in a single work session.

## Phase 1: Commercial message and information architecture

### Task 1.1: Convert the document into a landing-page structure

Objective: turn `trust.docx` into a web-native page rather than posting the full essay unchanged.

Proposed page structure:
1. Hero
   - Headline: “The Future Belongs to Curious Organizations”
   - Subhead: “Metaviews helps Canadian organizations turn AI pressure into practical curiosity, shared literacy, stakeholder buy-in, and trustworthy adoption.”
   - CTA: “Book an AI Trust Briefing”
2. Federal AI strategy context
   - Canada is pushing AI adoption, commercialization, standards, safety, skills, and sovereign compute.
   - Organizations need translation, not panic.
3. The core problem
   - AI adoption is a translation problem: staff, leaders, customers, members, procurement, governance, and communications all need a shared language.
   - AI adoption is also a buy-in problem: projects fail or stall when workers, managers, executives, boards, customers, partners, members, or regulators are asked to accept decisions they did not understand or help shape.
4. Trust begins with curiosity
   - Trust comes from testing, understanding limits, and developing judgment.
5. Buy-in before rollout
   - practical alignment work that makes AI projects understandable, discussable, governable, and easier to support before resistance hardens.
6. Why open source matters
   - open source as literacy, trust, sovereignty, inspection, adaptation, and reduced dependency.
7. Who this is for
   - short audience cards, not long prose blocks.
8. How Metaviews helps
   - briefing, workshop, use-case mapping, buy-in/change alignment, adoption roadmap, communication/positioning, learning by building.
9. Why Metaviews
   - research, media, facilitation, open-source experimentation, agriculture, organizational learning.
10. Final CTA
   - book a briefing / request a workshop.

Verification:
- A first-time visitor can understand the offer in 10 seconds.
- The page answers: who is this for, why now, what can I buy, why Metaviews, what do I do next.

### Task 1.2: Package the initial offers

Objective: make the commercial products easy to buy or inquire about.

Initial offer set:
1. AI Trust Briefing
   - 60-90 minute executive, board, or team briefing.
   - Best entry CTA.
2. AI Literacy Workshop
   - practical team session on use, limits, responsibility, and shared language.
3. Use-Case Mapping Sprint
   - facilitated map of real workflows and near-term experiments.
4. Open-Source AI Orientation
   - demystify models, tools, agents, local workflows, and vendor alternatives.
5. Association / Sector Session
   - member-facing briefing, salon, keynote, or conference workshop.
6. AI Buy-In and Change Alignment Session
   - help workers, management, executives, boards, customers, members, partners, funders, regulators, or other stakeholders understand what is being proposed and what role they have in making it succeed.
7. AI Communications and Positioning Review
   - help organizations explain what they are doing and why.

Decision needed before publishing:
- Whether to show prices, “starting at” ranges, or inquiry-only packaging.

Recommended launch default:
- Inquiry-only, with clear offer names and deliverables.

### Task 1.3: Define conversion path

Objective: prevent the site from becoming only thought leadership while preserving the campaign premise that buy-in is a process, not a pre-packaged product.

Primary conversion:
- a context-gathering contact form for “Start a conversation.”

The CTA should not force visitors to choose a named product before Metaviews understands their situation. The offers on the page are examples of possible interventions, not fixed packages. The form should invite visitors to describe what they are trying to understand, who needs to be involved, and where trust or buy-in is uncertain.

Minimum fields:
- name;
- organization;
- email;
- role or title;
- who needs to be part of the conversation;
- what kind of support might help;
- what they are trying to work through;
- what prompted this now;
- preferred timing.

Cloudflare Pages implementation:
- submit the form to a first-party Pages Function endpoint;
- include a honeypot field for spam;
- capture UTM fields, referrer, and landing page in hidden inputs;
- send a GA4 `generate_lead` event on form submission;
- keep `metaviews@gmail.com` as a visible fallback for people who prefer email;
- later: add Turnstile, CRM/newsletter integration, or durable submission storage if needed.

Launch requirement:
- configure the form email provider in Cloudflare Pages before driving traffic.

## Phase 2: Build the launch site

### Task 2.1: Create static-site scaffold

Objective: create the minimum production-ready static site.

If Eleventy:
- Create `package.json`.
- Create `.eleventy.js` or `eleventy.config.js`.
- Create `src/index.njk`.
- Create `src/_includes/layouts/base.njk`.
- Create `src/assets/site.css`.
- Configure output directory as `_site`.

Commands:
- `npm install --save-dev @11ty/eleventy`
- `npm run build`

Verification:
- build succeeds;
- `_site/index.html` exists;
- page can be served locally with `npx @11ty/eleventy --serve` if needed.

### Task 2.2: Write launch copy

Objective: adapt the document into concise web copy.

Source:
- `trust.docx`
- `docs/opportunity-assessment.md`

Guidance:
- preserve the “curiosity” voice;
- reduce repetition;
- make every section commercial/actionable;
- make buy-in a central service theme, not an afterthought or a synonym for persuasion;
- keep open source framed as practical trust/sovereignty/literacy;
- keep the federal strategy reference factual and restrained.

Verification:
- no section reads like generic AI-consulting boilerplate;
- CTA appears near top and bottom;
- offer names are visible without scrolling through the full essay.

### Task 2.3: Design first version

Objective: create a credible, fast, restrained commercial page.

Design direction:
- institutional, intelligent, calm;
- avoid hype gradients and AI cliché imagery;
- strong typography and readable sections;
- trust/open-source/sovereignty signals without visual clutter;
- clear cards for audiences and offers.

Minimum responsive checks:
- mobile width around 390px;
- tablet width around 768px;
- desktop width around 1280px.

### Task 2.4: Add SEO and discovery metadata

Objective: make the site shareable and crawlable at launch.

Required:
- canonical URL: `https://trust.metaviews.ca/`;
- title and description;
- Open Graph metadata;
- Twitter/X card metadata;
- JSON-LD Organization or ProfessionalService schema;
- `robots.txt`;
- `sitemap.xml`;
- `llms.txt`;
- 1200x630 link-preview image.

Suggested description:
“Metaviews helps Canadian organizations turn AI pressure into practical curiosity, shared literacy, stakeholder buy-in, and trustworthy adoption through briefings, workshops, open-source orientation, alignment sessions, and adoption roadmaps.”

Verification:
- rendered HTML contains absolute canonical and Open Graph URLs;
- sitemap XML parses;
- preview image is 1200x630;
- `robots.txt` references sitemap and `llms.txt`.

## Phase 3: GitHub and Cloudflare Pages deployment

### Task 3.1: Create GitHub remote

Objective: publish the project source to GitHub.

Steps:
1. Create a private or public GitHub repo.
2. Add it as `origin`.
3. Push `main`.

Recommended visibility:
- private until launch copy/contact paths are approved;
- public only if there is a strategic reason to show source.

Verification:
- GitHub repo has latest `main` commit.

### Task 3.2: Create Cloudflare Pages project

Objective: deploy the site from GitHub.

Cloudflare Pages settings if Eleventy:
- Framework preset: Eleventy or None.
- Build command: `npm run build`.
- Build output directory: `_site`.
- Node version: set if required by build, otherwise use Cloudflare default.

Cloudflare Pages settings if plain static:
- Build command: blank or simple copy command.
- Output directory: project root or `dist`, depending on layout.

Verification:
- Cloudflare preview deployment succeeds.
- The preview URL serves the homepage.

### Task 3.3: Connect custom subdomain

Objective: serve the production site at `trust.metaviews.ca`.

Steps:
1. Add custom domain in Cloudflare Pages.
2. Confirm DNS record for `trust` under `metaviews.ca` points to the Pages project.
3. Wait for SSL certificate provisioning.
4. Set canonical origin to `https://trust.metaviews.ca/`.

Verification:
- `https://trust.metaviews.ca/` loads with valid HTTPS.
- `curl -I https://trust.metaviews.ca/` returns a 200 or expected redirect.
- canonical URL in page source matches the production domain.

## Phase 4: Launch and promotion

### Task 4.1: Prepare launch assets

Objective: make outreach easy on launch day.

Create:
- short launch post for Metaviews channels;
- longer article tying Canada's AI strategy to organizational trust/literacy;
- LinkedIn/X thread variants;
- email note for warm contacts;
- one-page briefing PDF or web page;
- short outreach list segmented by audience.

Core launch angle:
“Canada is investing in AI adoption, commercialization, standards, skills, safety, and sovereign compute. Organizations now need the literacy, trust, and buy-in capacity to act wisely.”

### Task 4.2: Targeted outreach

Objective: convert the site into conversations.

Audience lists:
1. associations and sector bodies;
2. professional firms;
3. cross-functional change leaders preparing AI pilots, procurement, workforce adoption, or stakeholder-facing rollout;
4. agri-food and rural organizations;
5. existing Metaviews/open-source/intelligence network.

Outreach offer:
- “Would a focused AI Trust Briefing help your board/team/members make sense of the federal AI strategy, build early buy-in, and understand what it means for your organization?”

### Task 4.3: Publish supporting content

Objective: give the microsite more authority than a sales page alone.

First three content pieces:
1. “AI adoption is a translation problem.”
2. “AI buy-in starts before rollout.”
3. “Why open source changes the trust conversation.”
4. “What Canadian organizations should ask before buying AI tools.”

Each piece should link back to the briefing CTA.

### Task 4.4: Measure and iterate

Objective: improve the site based on real response.

Track:
- visits to homepage;
- outbound email/form clicks;
- source of inquiries;
- audience segment;
- most requested offer;
- objections/questions from calls.

First iteration after 2-3 weeks:
- tighten hero if conversion is weak;
- add dedicated offer page for the most-requested package;
- add FAQ from real sales conversations;
- add proof/case-study material if available.

## Phase 5: Expansion after first conversations

Potential additions:
- `/briefing/` dedicated AI Trust Briefing page;
- `/workshops/` package page;
- `/open-source-ai/` orientation page;
- `/agriculture/` sector-specific page;
- `/associations/` sector convening page;
- downloadable briefing sheet;
- newsletter or event signup;
- lightweight case studies or “sample agenda” pages.

Do not build all of these before launch. Let the first conversations decide which page is most useful.

## Immediate next actions

1. Commit the assessment and roadmap.
2. Decide: Eleventy vs plain static.
3. Decide: mailto CTA vs form handler.
4. Decide: GitHub repo name and visibility.
5. Build the first landing page.
6. Deploy preview on Cloudflare Pages.
7. Review copy/design.
8. Connect `trust.metaviews.ca`.
9. Publish launch/outreach assets.
