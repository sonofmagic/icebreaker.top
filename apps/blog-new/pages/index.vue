<template>
  <div>
    <!-- <nav>
      <ContentNavigation v-slot="{ navigation }">
        <ul>
          <li v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </nav> -->
    <!-- <ContentQuery
      v-slot="{ data }" path="/articles" :where="{ }" :sort="{
        id:'desc'
      }"
      :limit="10"
    >
      <ContentRenderer :value="data" />
    </ContentQuery> -->
    <ContentList
      v-slot="{ list }" path="/articles" :query="{
        sort: {
          id: -1
        },
        where: {
          id: { $exists: true }
        },
        limit: 10
      }"
    >
      <div v-for="article in list" :key="article._path">
        <NuxtLink :to="article._path">
          <h2>{{ article.title }}</h2>
        </NuxtLink>

        <!-- <h3>{{ article.id }}</h3> -->
        <p>{{ article.description }}</p>
      </div>
    </ContentList>
    <button class="btn">
      Button
    </button>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped></style>
