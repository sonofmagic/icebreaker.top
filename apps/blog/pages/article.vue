<template>
  <div class="antialiased">
    <main>
      <div class="container mx-auto flex max-w-max">
        <!-- <div>
          <ContentList path="/articles" v-slot="{ list }">
            <div v-for="article in list" :key="article._path">
              <h2>{{ article.title }}</h2>
              <p>{{ article.description }}</p>
            </div>
          </ContentList>
        </div> -->
        <div class="pt-10">
          <ContentDoc path="/" class="prose dark:prose-invert" />
        </div>
        <div />
      </div>
    </main>
  </div>
</template>
