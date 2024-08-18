<template>
  <div>
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
  name: 'CommentsIndex',
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
