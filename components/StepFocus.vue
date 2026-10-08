<script setup lang="ts">
/*
  Show every child block at once and step a highlight through them with Slidev clicks.

  <StepFocus>

  ```bash
  step one
  ```

  ```ini
  step two
  ```

  </StepFocus>

  - The first block is highlighted when the slide opens; each → moves the
    highlight to the next block (← moves it back). Others are dimmed.
  - Works with any block content (code, images, paragraphs): each direct
    child element is one step.
  - `at` works like v-click's `at` if you need to offset the clicks.
*/
import { computed, onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{ at?: string | number }>(), { at: '+1' })

const { $clicksContext: clicks } = useSlideContext()
const root = ref<HTMLElement>()
const id = `step-focus-${Math.random().toString(36).slice(2)}`
// shallowRef: keep info.currentOffset a ComputedRef (a deep ref would unwrap it)
const info = shallowRef<ReturnType<typeof clicks.calculateSince>>(null)
const count = ref(0)

const steps = () => Array.from(root.value?.children ?? []) as HTMLElement[]

onMounted(() => {
  count.value = steps().length
  if (count.value > 1) {
    info.value = clicks.calculateSince(props.at, count.value - 1)
    if (info.value) clicks.register(id, info.value)
  }
})
onUnmounted(() => clicks.unregister(id))

const active = computed(() => {
  if (!info.value) return 0
  const i = info.value.currentOffset.value + 1
  return Number.isFinite(i) ? Math.min(count.value - 1, Math.max(0, i)) : 0
})

watchEffect(() => {
  const i = active.value
  steps().forEach((el, j) => el.classList.toggle('step-dim', j !== i))
})
</script>

<template>
  <div ref="root" class="step-focus">
    <slot />
  </div>
</template>

<style scoped>
.step-focus { display: flex; flex-direction: column; gap: .75rem; }
.step-focus > :deep(*) { transition: opacity .25s ease, filter .25s ease; margin: 0 !important; }
.step-focus > :deep(.step-dim) { opacity: .3; filter: grayscale(1); }
</style>
