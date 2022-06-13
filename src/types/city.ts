 type City = {
    id: string,
    name: string,
    country?: string
  };

  type ResponseError = {
    isError: boolean,
    error?: any
}

type GetResponse = {
    cities: Array<City>,
    error: ResponseError,
    isLoading: boolean
}

export type { ResponseError, GetResponse, City }
