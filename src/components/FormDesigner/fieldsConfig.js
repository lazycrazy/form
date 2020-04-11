export default [
  {
    title: '基础控件',
    list: [
      {
        type: 'texttag',
        label: '文本标签',
        icon: 'icon-danhangshurukuang',
        span: 24
      },
      {
        type: 'text',
        label: '单行文本',
        icon: 'icon-danhangshurukuang',
        span: 24
      },
      {
        type: 'textarea',
        label: '多行输入框',
        icon: 'icon-duohangshurukuang',
        span: 24
      },
      {
        type: 'switch',
        label: '开关',
        icon: 'icon-Switch-',
        span: 24
      },
      {
        type: 'grid',
        label: '布局',
        icon: 'icon-Grid',
        span: 24,
        children: {
          align: 'center',
          headerAlign: 'center',
          column: []
        },
        column: 3
      },
      {
        type: 'radio',
        label: '单选',
        icon: 'icon-danxuanxuanzhong',
        radios: [
          { val: 1, text: '选项一', checked: true },
          { val: 2, text: '选项二' },
          { val: 3, text: '选项三' }
        ],
        span: 24
      },
      {
        type: 'checkbox',
        label: '多选框组',
        icon: 'icon-danxuan-',
        checkboxs: [
          {
            text: '苹果',
            value: '1'
          },
          {
            text: '橙子',
            value: 'orange'
          }
        ],
        span: 24
      },
      {
        type: 'select',
        label: '下拉框',
        icon: 'icon-xialakuang',
        options: [
          { value: 1, text: '选项一' },
          { value: 2, text: '选项二' },
          { value: 3, text: '选项三' }
        ],
        span: 24
      }
    ]
  },
  {
    title: '扩展控件',
    list: [
      {
        type: 'upload',
        label: '上传',
        icon: 'icon-shangchuan',
        span: 24,
        showFileList: true,
        multiple: true,
        limit: 10,
        props: {},
        propsHttp: {},
        canvasOption: {},
        action: 'https://jsonplaceholder.typicode.com/posts/'
      }
    ]
  },
  {
    title: '日期时间控件',
    list: [
      {
        type: 'date',
        label: '年',
        icon: 'icon-niandu',
        span: 24,
        dateType: 'year'
      },
      {
        type: 'date',
        label: '月',
        icon: 'icon-yue',
        span: 24,
        dateType: 'month'
      },
      {
        type: 'date',
        label: '日期选择',
        icon: 'icon-riqi',
        span: 24,
        dateType: 'date',
        placeholder: '日期选择'
      },
      {
        type: 'timepicker',
        label: '时间选择',
        icon: 'icon-shijian',
        span: 24,
        placeholder: '时间选择',
        format: 'HH:mm:ss'
      },
      {
        type: 'date',
        label: '日期时间',
        icon: 'icon-riqishijian',
        span: 24,
        dateType: 'datetime',
        placeholder: '日期时间',
        format: 'yyyy-MM-dd HH:mm:ss'
      },
      {
        type: 'date',
        label: '日期范围',
        icon: 'icon-iconfront-',
        span: 24,
        dateType: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      },
      {
        type: 'timepicker',
        label: '时间范围',
        icon: 'icon-shijianfenlei',
        span: 24,
        isRange: true,
        rangeSeparator: '至',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        format: 'HH:mm:ss'
      },
      {
        type: 'date',
        label: '日期时间范围',
        icon: 'icon-riqishijian',
        span: 24,
        dateType: 'datetimerange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      },
      {
        type: 'rate',
        label: '评价',
        icon: 'icon-pingfenshoucang-',
        span: 24,
        display: true,
        max: 5,
        texts: ['极差', '失望', '一般', '满意', '惊喜'],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      },
      {
        type: 'slider',
        label: '滑块',
        icon: 'icon-huakuai-',
        span: 24,
        display: true
      },

    ]
  },
  {
    title: '其他控件',
    disabled: true,
    list: [
      {
        type: 'location',
        label: '坐标拾取器',
        icon: 'icon-changyongtubiao-xianxingdaochu-zhuanqu-',
        span: 24,
        display: true
      }
    ]
  }
]
