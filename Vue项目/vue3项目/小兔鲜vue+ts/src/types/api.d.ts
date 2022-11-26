interface Response<T> {
  code: string
  msg: string
  result: T
}

interface Window {
  cityData: Array<cityObject>
  QC: {
    api: Function
    Login: {
      check: Function
      getMe: Function
    }
  }
}

interface VNodeTypes {
  __name: string
}
