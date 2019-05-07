/**
 * @file 静态数据配置
 */

export default {
    install(Vue, options) {
        Vue.prototype.getSelectData = function (name) {


            if (name === 'protocolTypes') {

                return protocolTypes;
            } else if (name === 'connectTypes') {

                return connectTypes;
            } else if (name === 'limitCounts') {

                return limitCounts;
            } else if (name === 'sendDataTypes') {

                return sendDataTypes;
            } else if (name === 'propertiesConfigs') {

                return propertiesConfigs;
            } else if (name === 'tempTypes') {

                return tempTypes;
            } else if (name === 'transPropertiesConfigs') {

                return transPropertiesConfigs;
            }

        };

    }
}


const protocolTypes = [{
    value: 'HTTP',
    label: 'HTTP'
}, {
    value: 'HTTPS',
    label: 'HTTPS'
}];

const connectTypes = [{
    value: 'CLIENT',
    label: '客户端'
}, {
    value: 'SERVER',
    label: '服务端'
}];

const tempTypes = [{
    value: 'TEXT',
    label: 'TEXT'
}, {
    value: 'BYTE',
    label: 'BYTE'
}]

const limitCounts = [{
    value: '100',
    label: '100'
}, {
    value: '200',
    label: '200'
}, {
    value: '300',
    label: '300'
}, {
    value: '400',
    label: '400'
}, {
    value: '500',
    label: '500'
}];

const sendDataTypes = [{
    value: 'TEXT',
    label: 'TEXT'
}, {
    value: 'BYTE',
    label: 'BYTE'
}];


const propertiesConfigs = [{
    value: 'RECV_CHARSET',
    label: '接收字符编码类型'
}, {
    value: 'HTTP_REQ_TYPE',
    label: 'HTTP请求类型'
}, {
    value: 'IS_REDIRECT',
    label: '是否进行重定向'
}, {
    value: 'HTTPS_SCHEMA',
    label: 'HTTPS自定义协议类型，默认为渠道系统编号'
}, {
    value: 'SSL_CERT_PWD_TYPE',
    label: 'HTTPS使用的SSL证书的密码在BCM中的类型'
}, {
    value: 'SSL_KEY_PWD_BCM_CODE',
    label: 'HTTPS使用的证书的私钥密码在BCM中的编目'
}, {
    value: 'SSL_KEY_PWD_TYPE',
    label: 'HTTPS使用的证书的私钥密码在BCM中的类型'
}, {
    value: 'ERROR_REDIRECT_URL',
    label: '错误的重定向地址'
}, {
    value: 'NEED_COOKIE_CLEAR',
    label: '是否需要清空Cookie'
}, {
    value: 'NEED_TRUST_KS',
    label: '需要信任证书'
}, {
    value: 'HALF_DUPLEX',
    label: '是否是半双工模式'
}, {
    value: 'SSL_PROTOCOL',
    label: 'SSL协议类型'
}];


const transPropertiesConfigs = [{
    value: 'DATE_UNIQ',
    label: '需要补充日期唯一性'
}, {
    value: 'AUTO_LOGON=AUTO_LOGON',
    label: '需要自动签到'
}, {
    value: 'ASYNC_TRANS_SYNC_TIMES',
    label: '异步转同步轮询次数'
}, {
    value: 'ENCRYPT_NOTIFY_MSG',
    label: '需要加密通知消息'
}, {
    value: 'LOG_TERM_TRANS',
    label: '是否需要记录终端流水信息'
}, {
    value: 'NEED_ORG_TERM_TRANS',
    label: '是否需要原终端流水信息'
}, {
    value: 'UPDATE_CURRENT_TERM_TRANS',
    label: '是否需要更新当前终端流水信息'
}, {
    value: 'UPDATE_ORG_TERM_TRANS',
    label: '是否需要更新原终端流水信息'
}, {
    value: 'FLUX_DIRECTION',
    label: '交易码对应流水方向'
}, {
    value: 'ORG_FLUX_DIRECTION',
    label: '原交易流水方向'
}, {
    value: 'UNIQ_REENTRY_TRANS',
    label: '幂等重入是否需要支持'
}, {
    value: 'NOT_NEED_NOTIFY_SYSTEM',
    label: '不需要通知内部系统'
}, {
    value: 'TRANS_LIMIT_TOKEN_COUNT',
    label: '交易限流数'
}, {
    value: 'LB',
    label: '分流标识'
}, {
    value: 'IS_STANDED_LICAICHANNEL',
    label: '是否是理财标准机构'
}, {
    value: 'LICAI_STANDED_TRANS_CODE',
    label: '理财标准交易代号'
}, {
    value: 'IS_BATCH_TRANS_CODE',
    label: '是否是批量交易'
}, {
    value: 'BATCH_TRANS_LIMIT_COUNT',
    label: '批量交易支持最大笔数'
}];



