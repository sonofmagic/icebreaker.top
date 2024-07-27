import gql from 'graphql-tag'

export function gqlFindCoverList() {
  return gql`
    query findCoverList($page: Int = 1, $perPage: Int = 10) {
      pagedList: coverPagination(
        page: $page
        perPage: $perPage
        sort: _ID_DESC
      ) {
        count
        items {
          book_id
          _id
          ratingcount
          ratingval
        }
      }
    }
  `
}
