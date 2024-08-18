import gql from 'graphql-tag'

export function gqlCreateBook() {
  return gql`
    mutation createBook($record: CreateOneBookInput!) {
      bookCreateOne(record: $record) {
        recordId
      }
    }
  `
}

export function gqlCreateBookWithCover() {
  return gql`
    mutation createBook(
      $record: CreateOneBookInput!
      $hasSub: Boolean!
      $subRecords: [CreateManyCoverInput!]!
    ) {
      bookCreateOne(record: $record) {
        recordId
      }
      coverCreateMany(records: $subRecords) @include(if: $hasSub) {
        recordIds
      }
    }
  `
}

export function gqlUpdateBook() {
  return gql`
    mutation updateBook($id: MongoID!, $record: UpdateByIdBookInput!) {
      bookUpdateById(_id: $id, record: $record) {
        recordId
        error {
          message
        }
      }
    }
  `
}

export function gqlDeleteBook() {
  return gql`
    mutation deleteBook($id: MongoID!) {
      bookRemoveById(_id: $id) {
        recordId
        error {
          message
        }
      }
    }
  `
}
