<template>
  <div>
    <CommentsList ref="commentsList" />
    <PostComment @success="refreshCommentsList" />
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
