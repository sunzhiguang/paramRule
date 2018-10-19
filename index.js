/**
 * Created by sunzhiguang on 2018/10/19.
 */
const rule = require('./rule')
const _ = require('lodash')

const verify = function(rules, key, paramValue) {
  let b = true
  let errorMsg = ''
  for (let i = 0; i < rules.length; i++) {
    b = verifyParamValue(rules[i], key, paramValue)
    if (!b) {
      errorMsg = 'parameter ' + key + ' error!'
      break
    }
  }
  return errorMsg
}

const verifyParamValue = function(rule, key, paramValue) {
  let [ruleFn, args] = rule.split(':')
  if (rule[ruleFn] && _.isFunction(rule[ruleFn])) {
    // 验证paramValue
    return rule[ruleFn].call(null, paramValue, args && JSON.parse(args))
  }
  // 没有验证方法 不进行验证
  return true
}
/**
 * 验证请求body
 * @param params
 * @param requireParam
 * @param otherCheckFn
 * @returns {*}
 */
const checkReqParam = function(params, requireParam, otherCheckFn) {
  let data = {}
  let errorMsg = ''
  let keys = _.keys(requireParam)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    // 调用验证方法
    let result = verify(requireParam[key].split('+'), key, params[key])
    if (_.isString(result) && result !== '') {
      errorMsg = result
      break
    }
    data[key] = params[key]
  }
  if (errorMsg !== '') return errorMsg
  if (otherCheckFn && _.isFunction(otherCheckFn)) {
    return otherCheckFn.call(null, data)
  }
  return data
}

//验证请求body
const checkPostReqParam = function(params, requireParam, otherCheckFn) {
  let data = {}
  for (let key in requireParam) {
    let bodyValue = ''//请求体key对应的value
    if (key.indexOf('.') > -1) {
      let keys = key.split('.')
      bodyValue = params[keys[0]][keys[1]]
    } else {
      bodyValue = params[key]
    }
    let ruleKey = requireParam[key]//验证规则key
    if (ruleKey) {//进行规则验证
      let b = rule[ruleKey].call(null, bodyValue)//验证bodyValue
      if (!b) {
        //验证失败 返回错误内容
        return 'parameter ' + key + ' error!'
      }
      data[key] = bodyValue
    } else {//不进行任何验证
      data[key] = bodyValue
    }
  }
  if (otherCheckFn && _.isFunction(otherCheckFn)) {
    return otherCheckFn.call(null, data)
  }
  return data
}

// 单一验证规则
exports.checkPostReqParam = checkPostReqParam
// 支持多验证规则
exports.checkReqParam = checkReqParam
