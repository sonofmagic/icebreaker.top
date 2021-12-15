<template>
  <div class="flex py-4 border-b border-solid border-border-muted">
    <span class="mr-2">
      <OutSideLink
        class="inline-block"
        href="https://github.com/sonofmagic"
        raw
      >
        <img
          width="32"
          height="32"
          class="rounded-full flex-shrink-0"
          src="@/assets/img/avatar.jpg"
          alt="icebreaker"
        />
      </OutSideLink>
    </span>
    <div class="flex flex-col flex-1 pt-1">
      <div class="flex justify-between items-baseline">
        <div>
          <OutSideLink
            class="font-semibold"
            href="https://github.com/sonofmagic"
            >sonofmagic</OutSideLink
          >
          <span class="no-underline text-fg-default">
            publish <span class="break-all inline-block">an article</span>
            <span
              class="whitespace-nowrap text-xs text-fg-muted ml-1"
              :title="item.date"
            >
              {{ item.date | timespanFilter }}</span
            >
          </span>
        </div>
      </div>
      <div
        class="mt-2 bg-canvas-default rounded-md border border-solid border-border-default"
      >
        <div class="p-4">
          <nuxt-link
            class="truncate font-semibold text-base text-fg-default hover:underline hover:text-accent-fg"
            :to="item.path"
          >
            {{ item.title }}
          </nuxt-link>

          <div class="mt-1 break-all text-fg-muted mb-2.5">
            {{ item.description }}
          </div>
          <div class="flex justify-between items-baseline">
            <tags :tags="item.tags"></tags>
            <div class="text-xs text-fg-muted space-x-4">
              <span class="inline-block"
                >阅读时间 {{ item.readingMinutes }} 分钟</span
              >
              <span class="inline-block">共{{ item.readingWords }}个字</span>
            </div>
          </div>
        </div>
        <!-- <div class="p-4 border-t border-solid border-border-default"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DarkArticleCard',
  props: {
    item: {
      type: [Object],
      default: () => {},
    },
  },
}
</script>

<style></style>
