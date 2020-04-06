var svcCommon = {
    createCommonCode: async function (param) {
        let [err, result] = await bs.to(bs.contract.submitTransaction("createCommonCode", param));
        if (err) return `{"status": 500, "message": "${err.message}"}`;
        return result.toString();
    },
    retrieveCommonCodeList: async function (param) {
        let [err, result] = await bs.to(bs.contract.evaluateTransaction("retrieveCommonCodeList", param));
        if (err) return `{"status": 500, "message": "${err.message}"}`;
        return result.toString();
    }
}


module.exports = svcCommon;
