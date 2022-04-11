type DOMType = HTMLElement | Document | null

interface CustomRect {
  left: number
  top: number
  width: number
  height: number
  right: number
  bottom: number
}

interface SelectionRects {
  selectionPageRect?: CustomRect
  selectionDOMRect?: CustomRect
}

type RefitedMouseEvent = MouseEvent & SelectionRects

interface MouseSelectionOptions {
  className?: string
  scale?: number
  zIndex?: number
  onMousemove?: (event: RefitedMouseEvent) => void
  onMousedown?: (event: MouseEvent) => void
  onMouseup?: (event: MouseEvent) => void
  disabled?: () => boolean
  stopPropagation?: boolean
  stopSelector?: string
  notSetWrapPosition?: boolean
}

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? B : A

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T]

// 非只读的CSSStyleDeclaration接口
type NotReadonlyCSSStyleDeclaration = ReadonlyKeys<CSSStyleDeclaration>

type StringTypeNotReadonlyCSSStyleDeclaration = Exclude<NotReadonlyCSSStyleDeclaration, number | (() => unknown)>

interface PositionSizeMap {
  left: number
  top: number
  width: number
  height: number
}

function isDOMType (value: DOMType | MouseSelectionOptions | undefined): value is DOMType {
  return isDOM(value)
}

function isDocument (value: DOMType): value is Document {
  return value?.nodeName === '#document'
}

/**
 * 缩放rect
 */
function scaleRect (rect: CustomRect, scale: number) {
  if (scale === 1) {
    return rect
  }

  return {
    left: rect.left * scale,
    top: rect.top * scale,
    width: rect.width * scale,
    height: rect.height * scale,
    right: rect.right * scale,
    bottom: rect.bottom * scale
  }
}

const rectangleElementInlineStyle = 'position: absolute;pointer-events: none;border: 1px solid rgb(45, 140, 240);background: rgba(45, 140, 240, 0.2);display:none;'

const getInitCustomRect = () => ({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  right: 0,
  bottom: 0
})

class MouseSelection {
  // 矩形框选元素
  public rectangleElement!: HTMLElement | null
  public targetDom!: DOMType
  public domRect: CustomRect | DOMRect = getInitCustomRect()
  public selectionPagePositionRect: CustomRect = getInitCustomRect()
  public selectionDOMPositionRect: CustomRect = getInitCustomRect()
  public config?: MouseSelectionOptions
  // 用于标记鼠标点下时的坐标
  private startX = 0
  private startY = 0
  // 是否有缩放
  private scale = 1.0
  // 当前是否在框选
  private moving = false
  // 矩形框选元素类名
  private readonly RectangleElementClassName = 'frame-selection-rectangle-element'
  // 用于计算滚动DOM，如果targetDom是document，则为document.body
  private wrapDOM: HTMLElement
  constructor (domOrConfig?: DOMType | MouseSelectionOptions, config?: MouseSelectionOptions) {
    let dom: DOMType = document
    this.config = config

    if (isDOMType(domOrConfig)) {
      dom = domOrConfig
    } else if (domOrConfig) {
      this.config = domOrConfig
    }
    this.targetDom = dom
    if (isDocument(this.targetDom)) {
      this.wrapDOM = document.body
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.wrapDOM = this.targetDom!
    }
    this.scale = this.config?.scale || 1.0 // 默认无缩放
    this._setWrapDomPositionStyle()
    this._addMousedownListener(this.targetDom)
  }

  /**
   * @description 获取框选元素以作用DOM为准的偏移和尺寸信息
   * @param left 距离页面左侧距离
   * @param top 距离页面顶部距离
   * @param width 宽度
   * @param height 高度
   */
  public getSelectionPagePosition (x: number, y: number): CustomRect {
    const domRect = this.domRect
    x = x - 2
    y = y - 2
    const left = Math.max(domRect.left, Math.min(this.startX, x))
    const top = Math.max(domRect.top, Math.min(this.startY, y))
    const width = Math.max(this.startX, Math.min(x, this.wrapDOM?.scrollWidth + domRect.left - 2)) - left
    const height = Math.max(this.startY, Math.min(y, this.wrapDOM?.scrollHeight + domRect.top - 2)) - top
    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height
    }
  }

  /**
   * @description 获取矩形框选元素以传入的DOM为准的偏移和尺寸信息
   * @param selectionPagePositionRect getSelectionPagePosition返回的值
   */
  public getSelectionDOMPosition (selectionPagePositionRect: CustomRect): CustomRect {
    const { left, top, width, height, right, bottom } = selectionPagePositionRect
    const { left: DOMLeft, top: DOMTop } = this.domRect
    return {
      left: left - DOMLeft,
      top: top - DOMTop,
      width,
      height,
      right: right - DOMLeft,
      bottom: bottom - DOMTop
    }
  }

  /**
   * @description 工具方法，传入一个包含left/top/width/height字段的对象，返回这个参数描述的矩形是否与框选矩形相交
   * @param positionSizeMap {left,top,width,height} 要判断的
   */
  public isInTheSelection ({ left, top, width, height }: PositionSizeMap) {
    const { left: x, top: y, width: w, height: h } = this.selectionDOMPositionRect
    return left + width > x && x + w > left && top + height > y && y + h > top
  }

  /**
   * @description 注销方法
   */
  public destroy (): void {
    this.rectangleElement && this.wrapDOM.removeChild(this.rectangleElement)
    this._removeMousedownListener(this.targetDom)
    this.rectangleElement = null
    this.targetDom = null
    // @ts-ignore
    this.domRect = null
    // @ts-ignore
    this.selectionPagePositionRect = null
    // @ts-ignore
    this.selectionDOMPositionRect = null
    // @ts-ignore
    this.startX = null
    // @ts-ignore
    this.startY = null
    // @ts-ignore
    this.moving = null
    // @ts-ignore
    this.wrapDOM = null
  }

  /**
   * @description 如果未明确设置notSetWrapPosition为true，则给作用容器加position: relative属性
   */
  private _setWrapDomPositionStyle (): void {
    if (this.config?.notSetWrapPosition) {
      return
    }
    const position = getComputedStyle(this.wrapDOM).position
    if (position === 'static') {
      this.wrapDOM.style.position = 'relative'
    }
  }

  /**
   * @description 在document.body中创建矩形框选元素
   *              不管事件绑定到哪个DOM，矩形框选元素都添加到document.body
   * @returns 矩形框选元素
   */
  private _createRectangleElement (): HTMLElement {
    let ele = (Array.from(this.wrapDOM?.children) as HTMLElement[]).find((node) => Array.from(node.classList).includes(this.RectangleElementClassName))
    if (ele) {
      this.wrapDOM?.removeChild(ele)
    }
    ele = document.createElement('div') as HTMLElement
    const customClassName = this.config?.className
    ele.className = this.RectangleElementClassName + (customClassName ? ` ${customClassName}` : '')
    ele.style.cssText = rectangleElementInlineStyle + `z-index: ${this.config?.zIndex || 99999999}`
    this.wrapDOM?.appendChild(ele)
    return ele
  }

  /**
   * @description 设置鼠标按下时起始坐标
   * @param x
   * @param y
   */
  private _setStartPosition (x: number, y: number) {
    this.startX = x
    this.startY = y
  }

  /**
   * @description 绑定mousedown事件
   * @param dom 要绑定事件的dom
   */
  private _addMousedownListener (dom: DOMType) {
    dom?.addEventListener('mousedown', this._selectStart as (event: Event) => void)
  }

  /**
   * @description 解绑mousedown事件
   * @param dom 要解绑事件的dom
   */
  private _removeMousedownListener (dom: DOMType) {
    dom?.removeEventListener('mousedown', this._selectStart as (event: Event) => void)
  }

  /**
   * @description 获取DOM的Rect信息，如果是document，只返回6个值
   * @param dom 要获取Rect信息的dom
   */
  private _getDOMRect (dom: DOMType): DOMRect | CustomRect {
    const domRect = isDocument(dom)
      ? {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight
        }
      : dom?.getBoundingClientRect()
    // @ts-ignore
    return scaleRect(domRect, 1 / this.scale)
  }

  /**
   * @description mousedown事件回调
   * @param event 鼠标事件对象
   */
  private _selectStart = (event: MouseEvent) => {
    // console.log('[_selectStart]:', event)
    // @ts-ignore
    const nodeList = this.targetDom.querySelectorAll(this.config.stopSelector)
    const isStopNode = findNode(event.target as Element, Array.from(nodeList) as DOMType[])
    // @ts-ignore
    if (this.config.stopSelector && isStopNode) {
      return
    }
    if (this.config?.stopPropagation) {
      event.stopPropagation()
    }
    // 如果不是鼠标左键按下不操作
    if (event.button !== 0) {
      return
    }
    // 如果设置了disabled钩子函数，并且返回值为true，不操作
    if (this.config?.disabled && this.config?.disabled()) {
      return
    }
    this.rectangleElement = this._createRectangleElement()
    this.moving = true
    // 设置所作用的DOM的定位及尺寸信息
    this.domRect = this._getDOMRect(this.targetDom)
    // 鼠标点下时距离作用DOM的偏移，需要考虑滚动，还需要考虑缩放
    const x = (event.pageX + this.wrapDOM?.scrollLeft - window.pageXOffset) / this.scale
    const y = (event.pageY + this.wrapDOM?.scrollTop - window.pageYOffset) / this.scale
    // 显示矩形框选元素
    // 有了小幅度的偏移量再显示
    // this._setRectangleElementStyle('display', 'block')
    // 设置起始点坐标
    this._setStartPosition(x - 2, y - 2)
    // 更新矩形框选元素
    this.selectionPagePositionRect = this.getSelectionPagePosition(x, y)
    this.selectionDOMPositionRect = this.getSelectionDOMPosition(this.selectionPagePositionRect)
    this._updateRectangleElementStyle(this.selectionDOMPositionRect)
    const callback: ((event: MouseEvent) => void) | undefined = this.config?.onMousedown
    callback && callback(event)
    document.addEventListener('mouseup', this._selectEnd)
    document.addEventListener('mousemove', this._selecting)
  }

  /**
   * @description mousemove事件回调
   * @param event 鼠标事件对象
   */
  private _selecting = (event: MouseEvent) => {
    // console.log('[_selecting]:', event, this.moving)
    if (!this.moving) {
      return
    }

    // 鼠标当前距离作用DOM的偏移，需要考虑滚动, 还需要考虑缩放
    const x = (event.pageX + this.wrapDOM?.scrollLeft - window.pageXOffset) / this.scale
    const y = (event.pageY + this.wrapDOM?.scrollTop - window.pageYOffset) / this.scale

    this.selectionPagePositionRect = this.getSelectionPagePosition(x, y)
    // 开始拖动再显示
    this._setRectangleElementStyle('display', 'block')
    const refitedMouseEvent: RefitedMouseEvent = event
    this.selectionDOMPositionRect = this.getSelectionDOMPosition(this.selectionPagePositionRect)
    refitedMouseEvent.selectionDOMRect = JSON.parse(JSON.stringify(this.selectionDOMPositionRect))
    this._updateRectangleElementStyle(this.selectionDOMPositionRect)

    const callback: ((event: RefitedMouseEvent) => void) | undefined = this.config?.onMousemove
    callback && callback(refitedMouseEvent)
  }

  /**
   * @description mouseup事件回调
   * @param event 鼠标事件对象
   */
  private _selectEnd = (event: MouseEvent) => {
    // console.log('[_selectEnd]:', event)
    document.removeEventListener('mousemove', this._selecting)
    document.removeEventListener('mouseup', this._selectEnd)
    this._setRectangleElementStyle('display', 'none')
    this.moving = false
    const callback: ((event: MouseEvent) => void) | undefined = this.config?.onMouseup
    callback && callback(event)
  }

  /**
   * @description 设置矩形框选元素样式
   * @param props CSS属性名
   * @param value CSS属性值
   */
  private _setRectangleElementStyle (this: MouseSelection, props: StringTypeNotReadonlyCSSStyleDeclaration, value: string): void {
    // @ts-ignore
    (this.rectangleElement as HTMLElement).style[props] = value
  }

  /**
   * @description 更新矩形框选元素样式
   * @param currentX 当前鼠标event.pageX值
   * @param currentY 当前鼠标event.pageY值
   */
  private _updateRectangleElementStyle (rect: CustomRect) {
    const { left, top, width, height } = rect
    this._setRectangleElementStyle('left', `${left}px`)
    this._setRectangleElementStyle('top', `${top}px`)
    this._setRectangleElementStyle('width', `${width}px`)
    this._setRectangleElementStyle('height', `${height}px`)
  }
}

/**
 * @description 判断一个值是否是DOM对象
 * @param object 要判断的值
 * @returns {boolean}
 */
function isDOM (object: unknown) {
  if (!object || typeof object !== 'object') {
    return false
  }
  if (typeof HTMLElement === 'function') {
    return object instanceof HTMLElement || object instanceof Document
  } else {
    // @ts-ignore
    return object && typeof object === 'object' && object.nodeType && typeof object.nodeName === 'string'
  }
}

/**
 * @description 判断当前点击的元素是否是给定的元素，或其父级是否是给定的元素
 * @param target 当前鼠标点中的节点
 * @param dom 要找的节点
 */
function findNode (target: Element, nodeList: DOMType[]): boolean {
  if (nodeList.some((node) => target === node)) {
    return true
  } else {
    if (target.parentNode) {
      return findNode(target.parentNode as Element, nodeList)
    } else {
      return false
    }
  }
}

export default MouseSelection
