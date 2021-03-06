module.exports = {
	/**
	 * 连表查询,并返回第一条数据
	 * @url template/db_api/pub/selects_getOne 前端调用的url参数地址
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		// 演示3表连接
		res.info = await vk.baseDao.selects({
			dbName:"uni-id-users",
			getOne:true,
			getMain:true,
			// 主表where条件
			whereJson:{
				_id:"001"
			},
			// 主表字段显示规则
			fieldJson:{ token:false, password:false },
			// 副表列表
			foreignDB:[
				{
					dbName:"vk-test",
					localKey:"_id",
					foreignKey:"user_id",
					as:"testList",
					limit:1
				},
				{
					dbName:"gy-shop",
					localKey:"_id",
					foreignKey:"user_id",
					as:"shopList",
					limit:1
				},
			]
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
