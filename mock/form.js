import Mock from 'mockjs'

const data = Mock.mock({
  info: {"column": [{"prop": "title", "span": 24, "type": "input", "label": "请假理由", "rules": [{"message": "请假理由必须填写", "required": true}], "display": false, "pattern": {"label": "请选择", "value": "0"}, "required": true}, {"prop": "day", "span": 24, "type": "text", "label": "请假天数", "rules": [{"message": "请假天数格式不匹配", "pattern": "^[0-9]*$", "trigger": "blur", "required": true}], "pattern": {"type": "pattern", "label": "数字", "value": "^[0-9]*$"}, "required": true}], "gutter": 0, "menuBtn": false, "emptyBtn": false, "emptySize": "medium", "emptyText": "清空", "submitBtn": false, "labelWidth": 120, "submitSize": "medium", "submitText": "提交", "menuPosition": "center", "labelPosition": "left"}
})

export default [
  {
    url: '/form/info',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          info: data.info
        }
      }
    }
  }
]
