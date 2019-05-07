/**
 * @file 字段规则配置
 */

/*
 * Copyright (C) 2018 Baidu, Inc. All Rights Reserved.
 */
export default {
    install(Vue, options) {

        Vue.prototype.getRule = function (name) {

            return rules;
        };
    }
}


const rules =
    {
        institutionCode: [
            {required: true, message: '请输入机构编码', trigger: 'blur'}
        ],
        institutionName:
            [
                {required: true, message: '请输入机构名称', trigger: 'blur'}
            ],
        memo:
            [
                {required: true, message: '请输入接口人', trigger: 'blur'}
            ],
        connectType: [
            {required: true, message: '链接类型必填', trigger: 'blur'}
        ],
        protocolType: [
            {required: true, message: '协议类型必填', trigger: 'blur'}
        ],
        limitCount: [
            {required: true, message: '限流必填', trigger: 'blur'}
        ]
    }
;

