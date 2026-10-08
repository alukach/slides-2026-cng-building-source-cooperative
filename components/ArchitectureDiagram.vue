<!--
  Source Cooperative architecture.
  Clients → services (source.coop, data.source.coop) → storage (DynamoDB, object storage).
-->
<template>
  <div class="arch-wrap">
<svg style="font-family:Berkeley Mono, Menlo, monospace" class="arch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 400" role="img" aria-label="Source Cooperative architecture">
  <defs>
    <marker id="arch-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#8a8a93"/>
    </marker>
    <linearGradient id="arch-gWeb" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fbfff" stop-opacity=".16"/>
      <stop offset="1" stop-color="#7fbfff" stop-opacity=".04"/>
    </linearGradient>
    <linearGradient id="arch-gProxy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffbf7f" stop-opacity=".16"/>
      <stop offset="1" stop-color="#ffbf7f" stop-opacity=".04"/>
    </linearGradient>
    <marker id="arch-arrB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#7fbfff"/>
    </marker>
    <marker id="arch-arrP" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#ffbf7f"/>
    </marker>
  </defs>
  
  <!-- column labels -->
  <g style="font-size:11px;letter-spacing:2px" fill="#6b6b73">
    <text style="text-anchor:middle" x="90" y="26">CLIENTS</text>
    <text style="text-anchor:middle" x="400" y="26">SERVICES</text>
    <text style="text-anchor:middle" x="790" y="26">STORAGE</text>
  </g>

  <!-- clients -->
  <g style="font-size:14px" fill="#d4d4d8">
    <rect x="20" y="78" width="140" height="64" rx="10" fill="#1b1b20" stroke="#3a3a42"/>
    <text style="text-anchor:middle" x="90" y="106">Browser</text>
    <text style="font-size:11px;text-anchor:middle" x="90" y="125" fill="#8a8a93">people</text>

    <rect x="20" y="298" width="140" height="64" rx="10" fill="#1b1b20" stroke="#3a3a42"/>
    <text style="text-anchor:middle" x="90" y="326">Tools</text>
    <text style="font-size:11px;text-anchor:middle" x="90" y="345" fill="#8a8a93">CLI · GDAL · DuckDB</text>
  </g>

  <!-- source.coop -->
  <rect x="270" y="60" width="260" height="100" rx="12" fill="url(#arch-gWeb)" stroke="#7fbfff" stroke-opacity=".7"/>
  <text style="font-size:20px;font-weight:700;text-anchor:middle" x="400" y="92" fill="#ffffff">source.coop</text>
  <text style="font-size:12px;text-anchor:middle" x="400" y="116" fill="#a7cdf2">UI + Metadata API</text>
  <text style="font-size:11px;letter-spacing:1px;text-anchor:middle" x="400" y="140" fill="#8a8a93">TypeScript & Next.js on Vercel</text>

  <!-- data.source.coop -->
  <rect x="270" y="280" width="260" height="100" rx="12" fill="url(#arch-gProxy)" stroke="#ffbf7f" stroke-opacity=".7"/>
  <text style="font-size:20px;font-weight:700;text-anchor:middle" x="400" y="312" fill="#ffffff">data.source.coop</text>
  <text style="font-size:12px;text-anchor:middle" x="400" y="336" fill="#f2cfa7">S3-like Object Storage API</text>
  <text style="font-size:11px;letter-spacing:1px;text-anchor:middle" x="400" y="360" fill="#8a8a93">Rust & Multistore on Cloudflare</text>

  <!-- DynamoDB -->
  <g>
    <rect x="660" y="60" width="260" height="100" rx="12" fill="#1b1b20" stroke="#3a3a42"/>
    <!-- table glyph -->
    <g transform="translate(684,84)" stroke="#8a8a93" fill="none" stroke-width="1.5">
      <ellipse cx="22" cy="7" rx="22" ry="7"/>
      <path d="M0,7 v38 a22,7 0 0 0 44,0 v-38"/>
      <path d="M0,20 a22,7 0 0 0 44,0" opacity=".6"/>
      <path d="M0,33 a22,7 0 0 0 44,0" opacity=".6"/>
    </g>
    <text style="font-size:18px;font-weight:700" x="748" y="104" fill="#ffffff">DynamoDB</text>
    <text style="font-size:12px" x="748" y="126" fill="#8a8a93">metadata tables</text>
  </g>

  <!-- object storage backends: stacked cards -->
  <g>
    <rect x="676" y="262" width="244" height="44" rx="10" fill="#18181c" stroke="#33333a"/>
    <rect x="668" y="272" width="252" height="44" rx="10" fill="#1a1a1f" stroke="#36363d"/>
    <rect x="660" y="282" width="260" height="98" rx="12" fill="#1b1b20" stroke="#3a3a42"/>
    <text style="font-size:16px;font-weight:700;text-anchor:middle" x="790" y="312" fill="#ffffff">Object storage</text>
    <g style="font-size:12px" fill="#d4d4d8">
      <rect x="676" y="328" width="72" height="30" rx="6" fill="#26262c"/>
      <text style="text-anchor:middle" x="712" y="347">AWS S3</text>
      <rect x="754" y="328" width="82" height="30" rx="6" fill="#26262c"/>
      <text style="text-anchor:middle" x="795" y="347">Azure</text>
      <rect x="842" y="328" width="62" height="30" rx="6" fill="#26262c"/>
      <text style="text-anchor:middle" x="873" y="347">…</text>
    </g>
  </g>

  <!-- arrows -->
  <g stroke="#8a8a93" stroke-width="1.6" fill="none" marker-end="url(#arch-arr)">
    <path d="M160,110 H266"/>
    <path d="M160,330 H266"/>
    <path d="M530,110 H656"/>
    <path d="M530,330 H656"/>
    <path d="M350,280 V164" stroke="#ffbf7f" stroke-opacity=".8" stroke-dasharray="5 4" marker-end="url(#arch-arrP)"/>
    <path d="M450,160 V276" stroke="#7fbfff" stroke-opacity=".8" marker-end="url(#arch-arrB)"/>
  </g>

  <!-- edge labels -->
  <g style="font-size:11px;text-anchor:middle" fill="#8a8a93">
    <text x="213" y="102">HTTPS</text>
    <text x="213" y="322">S3 API</text>
    <text x="593" y="102">reads</text>
    <text x="593" y="322">reads / writes</text>
  </g>
  <g style="font-size:11px;text-anchor:end" fill="#f2cfa7">
    <text x="338" y="216">reads API:</text>
    <text x="338" y="231">product metadata</text>
  </g>
  <g style="font-size:11px" fill="#a7cdf2">
    <text x="462" y="216">reads/writes S3:</text>
    <text x="462" y="231">objects</text>
  </g>
</svg>

  </div>
</template>

<style scoped>
.arch-wrap { width: 100%; display: flex; justify-content: center; }
/* Width-driven: height follows the 940×400 viewBox, capped to fit under a slide title. */
.arch { width: 100%; height: auto; max-height: 400px; }
</style>
