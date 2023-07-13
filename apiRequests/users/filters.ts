import QueryString from "qs"

export const userFilters = (search: string) =>
  QueryString.stringify({
    filters: {
      $or: [
        {
          username: {
            $startsWith: search,
          },
        },
        {
          email: {
            $eq: search,
          },
        },
      ],
    },
  })
