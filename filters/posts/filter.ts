import QueryString from "qs"

export interface QueryProps {
  page: string
  pageSize: string
  search?: string
  filters?: string
}

export const postQuery = ({ page, pageSize, search, filters }: QueryProps) => {
  if (search) {
    return QueryString.stringify(
      {
        sort: ["id:desc"],
        filters: {
          $or: [
            {
              title: {
                $startsWith: search,
              },
            },
            {
              body: {
                $startsWith: search,
              },
            },
          ],
        },
        populate: {
          user: {
            fields: ["username"],
          },
        },
        pagination: {
          page: page ?? "1",
          pageSize: pageSize ?? "10",
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
  }
  if (filters) {
    let users = JSON.parse(filters!).users
    return QueryString.stringify(
      {
        sort: ["createdAt:desc"],
        filters: {
          $or: users?.map((user: number) => {
            return {
              user: {
                id: {
                  $eq: user,
                },
              },
            }
          }),
        },
        populate: {
          user: {
            fields: ["username"],
          },
        },
        pagination: {
          page: page ?? "1",
          pageSize: pageSize ?? "10",
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
  }
  if (!search && !filters) {
    return QueryString.stringify(
      {
        sort: ["createdAt:desc"],
        populate: {
          user: {
            fields: ["username"],
          },
        },
        pagination: {
          page: page ?? "1",
          pageSize: pageSize ?? "10",
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
  }
}
