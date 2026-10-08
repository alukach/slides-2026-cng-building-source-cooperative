<!--
  Title slide: default slot pinned to the top, `::bottom::` slot pinned to the bottom,
  optional `::right::` slot filling the right half (e.g. a live demo).

    ---
    layout: intro
    ---

    # Title

    ::bottom::

    Date | Place

    ::right::

    <LiveDemo src="https://…" :bar="false" />
-->
<script setup lang="ts">
// rightScale (frontmatter): grow the ::right:: content around its centre, e.g. 1.25.
const props = withDefaults(defineProps<{ rightScale?: number | string }>(), { rightScale: 1 })
</script>

<template>
  <div class="slidev-layout cover intro" :class="{ 'has-right': $slots.right }">
    <div class="top">
      <slot />
    </div>
    <div class="bottom">
      <slot name="bottom" />
    </div>
    <div v-if="$slots.right" class="right">
      <div class="right-inner" :style="{ '--s': Number(props.rightScale) || 1 }">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 3.5rem;
  padding-bottom: 3rem;
  /* Own the background (same as the dark slide colour) and isolate, so the
     right slot's blend mode composites against it. */
  background: #121212;
  isolation: isolate;
}
.bottom { margin-top: auto; }
/* Everything on the intro slide in the heading monospace (incl. inline <code>). */
.intro, .intro :deep(*) { font-family: "Berkeley Mono", Menlo, Consolas, monospace; }
.bottom :deep(p:first-child) { margin-top: 0; opacity: .5; } /* keep the dimmed subtitle look */
.bottom :deep(p:last-child) { margin-bottom: 0; }

/* Text keeps to the left when there's something on the right. */
.has-right .top, .has-right .bottom { max-width: 54%; position: relative; z-index: 1; }

.right {
  position: absolute; top: 0; right: 0; bottom: 0; width: 46%;
  display: flex;
  /* "lighten" keeps the lighter of each pixel: the demo's dark page background
     drops out into the slide background, the bright content stays. */
  mix-blend-mode: lighten;
}
/* Sized at rightScale × the panel, centred on it; may overflow the panel. */
.right-inner {
  position: absolute; left: 50%; top: 50%;
  width: calc(100% * var(--s)); height: calc(100% * var(--s));
  transform: translate(-50%, -50%);
  display: flex;
  /* trim a hairline off every edge: hides sub-pixel seams from the embedded page */
  clip-path: inset(2px);
}
</style>
