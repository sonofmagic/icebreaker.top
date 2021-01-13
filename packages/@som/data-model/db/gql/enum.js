export const QueryFuncMap = {
  ById: 'findById',
  ByIds: 'findByIds',
  One: 'findOne',
  Many: 'findMany',
  DataLoader: 'dataLoader',
  DataLoaderMany: 'dataLoaderMany',
  Count: 'count',
  Connection: 'connection',
  Pagination: 'pagination',
}

export const MutationFuncMap = {
  CreateOne: 'createOne',
  CreateMany: 'createMany',
  UpdateById: 'updateById',
  UpdateOne: 'updateOne',
  UpdateMany: 'updateMany',
  RemoveById: 'removeById',
  RemoveOne: 'removeOne',
  RemoveMany: 'removeMany',
}

export const hasLeanOption = (value) =>
  [
    'dataLoader',
    'dataLoaderMany',
    'findById',
    'findByIds',
    'findMany',
    'findOne',
  ].includes(value)
