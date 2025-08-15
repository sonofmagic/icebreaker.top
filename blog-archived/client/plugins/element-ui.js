import {
  Aside,
  Autocomplete,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  CollapseItem,
  ColorPicker,
  // Container,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  Input,
  InputNumber,
  Loading,
  Main,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Popover,
  Progress,
  Row,
  Select,
  Step,
  Steps,
  Switch,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Timeline,
  TimelineItem,
  Tooltip,
  Upload,
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import Vue from 'vue'
import '@/assets/scss/element-variables.scss'
import '@/assets/scss/element-ui.scss'

export default () => {
  // Vue.use(Element, { locale })

  Vue.use(Autocomplete)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Card)
  Vue.use(Steps)
  Vue.use(Step)
  // Vue.use(Container)
  Vue.use(DatePicker)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Footer)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Dialog)
  Vue.use(Button)
  Vue.use(Icon)
  Vue.use(Popover)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Pagination)
    .use(Collapse)
    .use(CollapseItem)
    .use(Image)
    .use(Timeline)
    .use(TimelineItem)
    .use(Dropdown)
    .use(DropdownItem)
    .use(DropdownMenu)
    .use(Avatar)
    .use(Tabs)
    .use(TabPane)
    .use(Upload)
    .use(Tooltip)
    .use(Progress)
    .use(Switch)
    .use(ColorPicker)
  Vue.component(CollapseTransition.name, CollapseTransition)
  Vue.use(Loading.directive)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
}
