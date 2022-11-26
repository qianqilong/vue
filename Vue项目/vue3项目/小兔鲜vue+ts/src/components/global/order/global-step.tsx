import './step.less'

export default defineComponent({
  name: 'GlobalSteps',
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }) {
    const items = slots.default?.()
    const dynamicitems: any[] = []
    if (items && items?.length > 0) {
      items?.forEach((item) => {
        if (item.type?.__name === 'global-step-item') {
          dynamicitems.push(item)
        } else {
          item.children?.forEach((com: any) => {
            dynamicitems.push(com)
          })
        }
      })
    }
    return () => (
      <div class="xtx-steps">
        {dynamicitems?.map((item, i) => {
          return (
            <div class={`xtx-steps-item ${i < props.active ? 'active' : ''}`}>
              <div class="step">
                <span>{i + 1}</span>
              </div>
              <div class="title">{item.props.title}</div>
              <div class="desc">{item.props.desc}</div>
            </div>
          )
        })}
      </div>
    )
  },
})
