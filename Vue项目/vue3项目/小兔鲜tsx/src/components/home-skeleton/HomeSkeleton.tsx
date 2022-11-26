import { defineComponent } from 'vue'
import './HomeSkeleton.less'
import XtxSkeleton from '../xtx-skeleton/xtx-skeleton'
export default defineComponent({
  name: 'HomeSkeleton',
  setup () {
    const arr = ['', '', '', '']
    return () => (
        <div class='home-skeleton'>
         {
           arr.map(() => {
             return (
        <div>
          <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
          <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
          <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
        </div>
             )
           })
         }
      </div>
    )
  }
})
