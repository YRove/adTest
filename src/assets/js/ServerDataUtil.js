/*
 * Copyright (C) 2018 Baidu, Inc. All Rights Reserved.
 */
import axios from 'axios';

export default {
    install(Vue, options) {

        Vue.prototype.getValidationTempByTransCode = function (transCode) {

            axios.get('api/validation/getValidationTempByTransCode', {
                params: {
                    transCode: this.$route.query.transCode,
                    messageType: 'REQ'
                }
            }).then(res => {
                return res.data.data;
            }).catch(error => {
                // this.hideLoading();
            });
        }

        Vue.prototype.getResponseCodes = function (obj, institutionCode) {

            axios.get('api/code/getAllResponseGroup', {
                    params: {
                        instanceCode: institutionCode
                    }
                }
            ).then(res => {

                obj.codes = res.data.data;
            })

        }
    }
}
