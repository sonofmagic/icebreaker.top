<template>
  <div>
    <h2 class="font-semibold text-sm mb-1">Explore comments</h2>
    <div>
      <CommentsList ref="commentsList" />
    </div>
    <div>
      <PostComment @success="refreshCommentsList" />
    </div>
  </div>
</template>

<script>
import PostComment from './PostComment'
import CommentsList from './CommentsList'
export default {
  name: 'DarkParadise',
  components: {
    PostComment,
    CommentsList,
  },
  methods: {
    refreshCommentsList() {
      this.$refs.commentsList.refresh()
    },
  },
}
</script>
