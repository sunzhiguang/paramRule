/**
 * Created by sunzhiguang on 2018/10/19.
 */
'use strict'
/**
 * 参数校验
 * Created by sunzhiguang on 2017/11/16.
 */
const _ = require('lodash')

const validateString = function(str) {
  return typeof str === 'string' && !!str && _.trim(str) !== ''
}

const validateStringEmpty = function(str) {
  str = str || ''
  if (str) {
    return validateString(str)
  }
  return true
}
const validateMobileEmpty = function(mobile) {
  mobile = mobile || ''
  if (mobile) {
    //TODO  待添加正则验证手机号格式
    return validateString(mobile)
  }
  return true
}
const validateMail = function(email) {
  //TODO 待添加正则校验
  return typeof email === 'string' && !!email
}
//验证单个mysqlId
const validateMysqlId = function(id) {
  if (typeof id === 'string') {
    //验证是不是有非数字的字符
    let isNaN = _.isNaN(+id)
    if (isNaN) return !isNaN
    id = parseInt(id, 10)
  }
  return typeof id === 'number' && (/^[1-9]\d*$/).test(id)
}
//验证多mysqlid 如[1,2,3] ro "1,2,3"
const validateMysqlIds = function(ids) {
  let type = typeof ids
  if (type === 'number') {
    return validateMysqlId(ids)
  }
  if (type === 'object' && ids instanceof Array) {//添加数组支持
    return ids.findIndex(id => !validateMysqlId(id)) === -1
  }
  return typeof ids === 'string' && ids.split(',').findIndex(id => !validateMysqlId(id)) === -1
}

const validateNumber = function(num) {
  if (typeof num === 'string') {
    //验证是不是有非数字的字符
    // let hasStrCode = num.split("").findIndex(s => !(/^[1-9]\d*$/).test(s)) > -1;
    let isNaN = _.isNaN(+num)
    if (isNaN) return !isNaN
    num = parseInt(num, 10)
  }
  return typeof num === 'number' && +num === num
}

const validateNumberEmpty = function(num) {
  if (num) {
    return validateNumber(num)
  }
  return true
}
const validateNumberRange = function(value, args) {
  let min = parseInt(args[0], 10)
  let max = parseInt(args[1], 10)
  return min <= value && value <= max
}
//验证主键id 存在即验证mysqlId 不存在不进行验证
const validatePrimaryKey = function(key) {
  key = key || ''
  if (key) {//如果key有值 验证mysqlid
    return validateMysqlId(key)
  }
  return true//没有值 不验证
}

//验证parentId 可以包括0
const validateParentId = function(parentId) {
  if (typeof parentId === 'string') {
    //验证是不是有非数字的字符
    // let hasStrCode = parentId.split("").findIndex(s => !(/^[0-9]\d*$/).test(s)) > -1;
    let isNaN = _.isNaN(+parentId)
    if (isNaN) return !isNaN
    parentId = parseInt(parentId, 10)
  }
  return typeof parentId === 'number' && (/^[0-9]\d*$/).test(parentId)
}

const validatePassword = function(password) {
  password = password || ''
  if (password) {
    return typeof password === 'string' && !!password
  }
  return true
}

// 验证 arr是array类型 可以是空的数组
const validateArray = function(arr) {
  return _.isArray(arr)
}

// 验证 arr是array类型的且arr.length大于0 不能为空的数组
const validateArrayNotEmpty = function(arr) {
  return _.isArray(arr) && arr.length > 0
}

const validateUuid = function(uuid) {
  return /^[0-9A-Z]{8}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{12}$/.test(uuid)
}

/**
 * 验证value的长度是否等于固定的值
 * @param value
 * @param args [num]
 * @returns {boolean}
 */
const validateLenEqual = function(value, args) {
  let num = parseInt(args[0], 10)
  let length = value.length
  return num === length
}

/**
 * 验证value的长度是否在固定的范围内
 * @param value
 * @param args [min, max]
 * @returns {boolean}
 */
const validateLenRange = function(value, args) {
  let length = value.length
  let min = parseInt(args[0], 10)
  let max = parseInt(args[1], 10)
  return min < length && length < max
}

/**
 * 判断value是否是array中的一员
 * @param value
 * @param array
 */
const validateArrayIn = function(value, array) {
  let index = _.findIndex(array, item => item.toString() === value.toString())
  return index > -1
}

const validateZipCode = function(value) {
  return /^[\d-]{1,20}$/.test(value)
}

// 验证 firstName lastName
const validateName = function(value) {
  return /^[A-Za-z]{1,20}$/.test(value)
}

// noinspection JSUnresolvedVariable
module.exports = {
  'name': validateName,
  'zipCode': validateZipCode,
  'lenEqual': validateLenEqual,
  'lenRange': validateLenRange,
  'string': validateString,
  'stringEmpty': validateStringEmpty,
  'mobileEmpty': validateMobileEmpty,
  'number': validateNumber,
  'numberEmpty': validateNumberEmpty,
  'numberRange': validateNumberRange,
  'mail': validateMail,
  'mysqlId': validateMysqlId,
  'mysqlIds': validateMysqlIds,
  'primaryKey': validatePrimaryKey,
  'parentId': validateParentId,
  'password': validatePassword,
  'array': validateArray,
  'arrayNotEmpty': validateArrayNotEmpty,
  'arrayEmpty': validateArray,
  'arrayIn': validateArrayIn,
  'uuid': validateUuid
}







