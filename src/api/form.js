import request from '@/utils/request'


export function getInfo(token) {
  return request({
    url: '/form/info',
    method: 'get',
    params: {  }
  })
}

