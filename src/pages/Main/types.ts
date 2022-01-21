type BlockComponentProps<T> = {
  data?: T
  count: number
  pageSize: number
  loading: boolean
  onPageChange: (limit: number, offset: number) => Promise<unknown>
}

export type { BlockComponentProps };
