import Vue from 'vue'
import {
  Autocomplete,
  Input,
  InputNumber,
  Form,
  FormItem,
  Row,
  Col,
  Card,
  Steps,
  Step,
  // Container,
  DatePicker,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Select,
  Option,
  Dialog,
  Button,
  Icon,
  Popover,
  Table,
  TableColumn,
  Pagination,
  Collapse,
  CollapseItem,
  Image,
  Timeline,
  TimelineItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar,
  Tabs,
  TabPane,
  Upload,
  Tooltip,
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import '@/assets/scss/element-ui.scss'
import '@/assets/scss/element-variables.scss'
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
