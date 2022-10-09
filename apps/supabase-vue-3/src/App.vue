<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition ?? 'fade'" mode="out-in">
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </keep-alive>
      <!-- <suspense>
          <template #default>

          </template>
          <template #fallback> Loading... </template>
        </suspense> -->
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>
