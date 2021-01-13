import gql from 'graphql-tag'

export function gqlFindBookList() {
  return gql`
    query findBookList($page: Int = 1, $perPage: Int = 10, $title: String) {
      pagedList: bookPagination(
        page: $page
        perPage: $perPage
        sort: _ID_DESC
        filter: { title: $title }
      ) {
        count
        items {
          title
          _id
          isbn
          pageCount
          publishedDate
          # shortDescription
        }
      }
    }
  `
}

export function gqlGetBookById() {
  return gql`
    query getBookById($id: MongoID!) {
      book: bookById(_id: $id) {
        _id
        title
        isbn
        pageCount
        publishedDate
        status
      }
    }
  `
}
