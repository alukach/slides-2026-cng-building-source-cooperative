---
theme: default
title: Building Source Cooperative
colorSchema: dark
transition: fade
mdc: true
layout: intro
---

# Building Source Cooperative

::bottom::

CNG2026 · Oct 8, 2026 · Snowbird, Utah, USA

::right::

<LiveDemo
  src="https://ui.source.coop/iframe.html?id=features-home-liveglobe--live-traffic&viewMode=story&globals=appearance%3Adark"
  :bar="false"
  :crop="40"
  :lazy="false"
/>

<!-- Press `T` anytime to jump to the tier list -->

---
layout: default
---

# Introductions

<div class="person">
  <div class="facts">
    <div class="fact name"><span>Name</span>Anthony Lukach</div>
    <div class="fact"><span>Location</span>Nelson, BC, Canada</div>
    <div class="fact"><span>Company</span>Development Seed</div>
    <div class="fact"><span>Role</span>Cloud Engineer</div>
    <div class="fact"><span>On Source Cooperative</span>Since ~April 2025</div>
  </div>
</div>

<style>
.person { margin-top: 3rem; display: flex; flex-direction: column; gap: 2rem; }
.person .name { font-family: "Berkeley Mono", Menlo, monospace; font-size: 2.6rem; line-height: 1.1; }
.person .handle { display: inline-block; margin-top: .6rem; font-size: 1rem; }
.person .facts { display: flex; flex-direction: column; gap: 1.1rem; }
.person .fact { font-size: 1.3rem; line-height: 1.4; }
.person .fact span {
  display: block; margin-bottom: .4rem; color: #8a8a93;
  font-family: "Berkeley Mono", Menlo, monospace; font-size: .7rem;
  text-transform: uppercase; letter-spacing: .12em;
}
</style>

---
layout: default
---

# About Source Cooperative

<blockquote class="pull">
  “Data practitioners should never log into the AWS Console.”
  <cite>Jed Sundwall, yesterday</cite>
</blockquote>

<p class="tagline">Aims to be the substrate on which CNG applications are built.</p>

<div class="stats">
  <div class="stat"><span>Stored</span><b>8.3 <small>PB</small></b><em>AWS S3 · via AWS Open Data Program</em></div>
  <div class="stat"><span>Stored</span><b>120 <small>TB</small></b><em>Azure Blob Storage · via AI for Earth</em></div>
  <div class="stat"><span>Served · 28 days</span><b>912 <small>TB</small></b><em>egress through the data proxy</em></div>
  <div class="stat"><span>Requests · 28 days</span><b>218 <small>M</small></b><em>~115 per second, on average</em></div>
</div>

<style>
.pull {
  margin: 1.5rem 0 0 !important; padding: 1.4rem 1.8rem !important;
  background: #18181c !important; border: 0 !important; border-left: 4px solid #d4d4d8 !important;
  border-radius: 2px !important;
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size: 1.75rem; line-height: 1.35; font-style: italic;
}
.pull cite {
  display: block; margin-top: .8rem; font-style: normal; color: #8a8a93;
  font-family: "Berkeley Mono", Menlo, monospace; font-size: .75rem;
  text-transform: uppercase; letter-spacing: .12em;
}
.tagline { margin: 1.25rem 0 0 !important; font-size: 1.1rem; color: #c9c9cf; }
.stats { margin-top: 1.25rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.stat {
  display: flex; flex-direction: column; gap: .35rem;
  background: #16161a; border: 1px solid #3a3a42; border-radius: 2px; padding: .9rem 1rem;
}
.stat span {
  color: #8a8a93; font-family: "Berkeley Mono", Menlo, monospace; font-size: .65rem;
  text-transform: uppercase; letter-spacing: .12em;
}
.stat b { font-family: "Berkeley Mono", Menlo, monospace; font-size: 2.2rem; font-weight: 400; line-height: 1.05; letter-spacing: -.02em; }
.stat b small { font-size: 1rem; }
.stat em { font-style: normal; font-family: "Berkeley Mono", Menlo, monospace; font-size: .62rem; line-height: 1.4; color: #8a8a93; }
</style>

---
layout: default
---

<LiveDemo url src="https://source.coop" :scale="0.5" />

---
layout: default
---

# Architecture

<ArchitectureDiagram />

<!--
Two services: source.coop (Next.js UI + API, backed by DynamoDB) and data.source.coop (data proxy).
The proxy asks the source.coop API where a product's data lives, then reads/writes the object storage backend directly.
-->

---
layout: full
routeAlias: tiers
class: '!p-1'
---

<TierList />

<!--
Start with everything in the Unranked drawer. Drag each topic into its tier as you present it.
-->

---
layout: concept
routeAlias: frontend-rebuild
concept:
  title: Full rebuild of source.coop UI
  emoji: 🏗️
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## What

Rebuild UI from scratch

## Why

- Next.js v13 → v15 (pages router → app router)
- SPA → SSR
- New UI toolkit (Radix UI)

## Credits

- UI Design via Lane Goodman

</div>

<LiveDemo src="https://source.coop/products" :scale="0.5" />

</div>

---
layout: concept
routeAlias: rest-api-teardown
concept:
  title: Tearing down REST API
  emoji: 🧨
---

## Why

* Wanted to minimize scope as we moved from a SPA to Next.js SSR w/ Server Actions
* User pool was small at the time

## Lesson

* Cut the REST API to reduce scope; now re-adding it for the CLI


---
layout: concept
routeAlias: proxy-stabilization
concept:
  title: Stabilizing Proxy
  emoji: 🩹
---

## Why

* Prior to CNG 2025, many users were uploading data to Source Cooperative through the data proxy.
* Data proxy was crashing (returning 500s), despite available load balancing capacity

## How

* Improved error handling in Rust-based app
* **Culprit**: Vercel-hosted API was serving "Are you human?"
* **Solution**: Disable Vercel's firewall for API

## Outcome

* Uploads stable through CNG 2025

## Credits

* Pete Gadomski

---
layout: concept
routeAlias: proxy-rewrite
concept:
  title: Proxy rewrite
  emoji: ♻️
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## What

* Rewrote `data.source.coop` to run on Cloudflare Workers

## Why

* Proxy adoption took off 🎉
* Proxy ran on ECS: all traffic egressed through an ALB
* ALB egress not covered by the AWS Open Data Program
* **March 2026**: egress spikes of **38+ TB / day**
* AWS bills egress @ **$0.09 / GB**

<div class="text-2xl mt-3">

→ <span v-mark.highlight.orange>**$3.5K per day**</span>

</div>

</div>

![](/media/alb-costs.png)

</div>

---
layout: concept
conceptOf: proxy-rewrite
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Requirements

* Able to support bursty traffic (20 -> 5000 RPS)
* Adds little-to-no egress fees

## How

* Rewrote in Rust, compiled to WASM
* Brought in `object-store` to interface with backends
* Abstracted reusable tooling into `multistore`
  
## Outcome

* Serverless, no cold-start
* Serves data close to user
* HTTP/3 support
* Costs ~$8/day (was ~$3,500/day)

</div>

<video
  src="/media/proxy-traffic.mp4"
  autoplay muted loop playsinline controls
  class="w-full h-full object-contain rounded-lg"
/>

</div>


---
layout: concept
routeAlias: sts
concept:
  title: STS Implementation
  emoji: 🔑
---

## Why

* Replace long-lived access keys with short-lived credentials
  
## How

* AWS STS-like endpoint @ `data.source.coop/.sts`

## What

* Exchange identity tokens for temporary credentials
* ID tokens can come from Source, GitHub, ...


::right::

```yaml
# GitHub Actions + Service Accounts: OIDC → temporary credentials
- name: Sign in to Source Cooperative as your-org--nightly-sync
  uses: aws-actions/configure-aws-credentials@v6
  with:
    role-to-assume: arn:aws:iam::your-org--nightly-sync:role/FullAccess
    audience: https://data.source.coop
    sts-endpoint: https://data.source.coop/.sts
    aws-region: us-west-2
```

---
layout: concept
routeAlias: globe
concept:
  title: Spinning Globe
  emoji: 🌍
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Why

* Flashy visualization of real-time traffic

## How

* Log requests in Cloudflare Durable Object, serve to frontend via WebSocket

## Outcome

* 🪩Flash🪩

</div>

<LiveDemo src="https://source.coop" :scale="0.5" />

</div>

---
layout: concept
routeAlias: object-viewers
concept:
  title: Object Viewers
  emoji: 🔍
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Why

* Better understand contents of products

## What

* Built-in viewers for common CNG filetypes

## How

* Format-specific viewer apps, embedded via iframe

</div>

<DemoReel :demos="[
  { label: 'COG',   src: 'https://source.coop/luddaludwig/potential-agc-combustion-ssp585-v0/AGC_final.tif' },
  { label: 'STAC',  src: 'https://source.coop/wildland-almanac/california/catalog.json', scale: 0.6 },
  { label: 'PMTiles', src: 'https://source.coop/protomaps/openstreetmap/v4.pmtiles', scale: 0.6 },
  { label: 'Zarr', src: 'https://source.coop/alukach/firesmoke/forecasts.zarr', scale: 0.6 },
  { label: 'Parquet', src: 'https://source.coop/giswqs/nwi/wetlands/AK_Wetlands.parquet', scale: 0.6 },
]" />

</div>

---
layout: concept
routeAlias: byob
concept:
  title: Bring Your Own Bucket
  emoji: 🪣
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Why

* Bring Source features (viewers, auth, analytics) to data you already host

## What

* Register your own S3, Azure or GCS buckets

</div>

<DemoReel :demos="[
  { label: 'AWS S3', src: 'https://ui.source.coop/iframe.html?id=features-settings-data-connections-dataconnectionform--edit-with-stored-key&viewMode=story&globals=appearance%3Adark', scale: 0.6 },
  { label: 'Azure Blobstore', src: 'https://ui.source.coop/iframe.html?id=features-settings-data-connections-dataconnectionform--azure&viewMode=story&globals=appearance%3Adark', scale: 0.6 },
  { label: 'GCS', src: 'https://ui.source.coop/iframe.html?id=features-settings-data-connections-dataconnectionform--google-cloud&viewMode=story&globals=appearance%3Adark', scale: 0.6 },
]" />

</div>
---
layout: concept
routeAlias: cli
concept:
  title: Source Coop CLI
  emoji: ⌨️
---

## Why

* Scripted & large uploads
* No copy-pasting short-lived keys

## How

* Browser login, cached in OS keyring
* `credential_process` → any AWS tool

## Outcome

* ~30 days between logins
* Scoped to your products

::right::

<StepFocus>

```bash
# 1. Install
brew install source-cooperative/tap/source-coop
```

```bash
# 2. Log in (opens your browser)
source-coop login
```

```ini
# 3. ~/.aws/config
[profile source-coop]
credential_process = source-coop creds
endpoint_url = https://data.source.coop
```

```bash
# 4. Use any AWS tooling
aws s3 sync ./data s3://your-org/product-id/ \
  --profile source-coop
```

</StepFocus>

---
layout: concept
routeAlias: analytics
concept:
  title: Usage Analytics
  emoji: 📈
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Why

Data providers want to know:

* How many people use my product?
* Where are they located?
* Which parts are they accessing?

## How

* Proxy logs each request
* Cloudflare Workers Analytics Engine (hosted ClickHouse)

## Credits

* Lane Goodman

</div>

<DemoReel :demos="[
  { label: 'Simple', src: 'https://ui.source.coop/iframe.html?id=features-product-page-analytics-usagepanel--high-volume&viewMode=story&globals=appearance%3Adark', scale: 1 },
  { label: 'Detailed', src: 'https://ui.source.coop/iframe.html?id=features-product-page-analytics-productanalyticsview--default&viewMode=story&globals=appearance%3Adark', scale: 0.6 },
]" />

</div>


---
layout: default
routeAlias: up-next
---

# Up Next

a non-committal list of ideas...

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="up-next"><span>🧰</span><b>Build out API + CLI</b><p>Full functionality outside the UI</p></div>
  <div class="up-next"><span>🤖</span><b>MCP</b><p>Better AI integration</p></div>
  <div class="up-next"><span>🗂️</span><b>Cataloging system</b><p>Automated STAC catalog via introspection</p></div>
  <div class="up-next"><span>📊</span><b>Storage analytics</b><p>Understand size of products</p></div>
  <div class="up-next"><span>🚦</span><b>Usage controls</b><p>Limit product size or data egress</p></div>
  <div class="up-next"><span>💸</span><b>Vending data ($$$)</b><p>Recoup costs for generating data</p></div>
</div>

<style>
.up-next {
  display: flex; flex-direction: column; gap: .6rem;
  min-height: 7.5rem; padding: 1.1rem 1.2rem;
  background: #1b1b20; border: 1px solid #3a3a42; border-radius: 10px;
  font-size: 1.15rem; line-height: 1.35;
}
.up-next span { font-size: 1.8rem; line-height: 1; }
.up-next b { font-weight: 600; }
.up-next p { margin: 0 !important; font-size: .9rem; line-height: 1.35; color: #8a8a93; }
.up-next p:empty { display: none; }
</style>

---
layout: intro
---

# Thank You


::bottom::

Please come see me if you would like to start using Source Cooperative!

Questions?