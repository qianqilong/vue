export default function powerset(arr: Array<string>) {
  const newArr = [[]] as Array<string>[]
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0, len = newArr.length; j < len; j++) {
      newArr.push(newArr[j].concat(arr[i]))
      /**
       * 第一次[0]填充了 arr[0], [1] 结果 [[],[1]]
       * 第二次[0]填充了 arr[1], [2],[1,2] 结果 [[],[2],[1,2]]
       * 第三次[0]填充了 arr[2], [3],[2,3],[1,2,3] ,[1,3]
       */
    }
  }
  return newArr
}
