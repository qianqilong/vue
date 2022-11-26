import XtxSkeleton from '@/components/xtx-skeleton/xtx-skeleton'
import XtxCarousel from '@/components/xtx-carousel/xtx-carousel'
import { defineDirective } from './photo'
export default {
  // eslint-disable-next-line @typescript-eslint/ban-types
  install (app: any) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    defineDirective(app)
  }
}
