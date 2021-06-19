const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../dataSource/MysqlPoolClass');
const resultMessage = require('../util/resultMessage');
const config = require('../config/config');
const responseUtil = require('../util/responseUtil');
const circle = require('../models/circle');
const userAttentionCircle = require('../models/user_attention_circle');
const plate = require('../models/plate');

const Op = Sequelize.Op;
const circleModal = circle(sequelize);
const userAttentionCircleModal = userAttentionCircle(sequelize);
const plateModal = plate(sequelize);

userAttentionCircleModal.belongsTo(circleModal, { foreignKey: 'circle_id', targetKey: 'id', as: 'circleDetail' });
plateModal.hasMany(circleModal, { foreignKey: 'plate_id', targetKey: 'id', as: 'circles' });

const INIT_CIRCLE_NUM = 5;
const timeformat = 'YYYY-MM-DD HH:mm:ss';

module.exports = {
	// 获取个人圈子  凑齐五个推荐圈子 适用于首页推荐
	getAllByUserId: async (req, res) => {
		try {
			const { user_id } = req.query;
			const myCircles = [];
			if (user_id) {
				const myCir = await userAttentionCircleModal.findAll({
					where: {
						user_id,
						is_delete: 1,
					},
					include: [
						{
							model: circleModal,
							as: 'circleDetail',
							attributes: ['id', 'name'],
						},
					],
					order: [['create_time', 'DESC']],
					limit: Number(INIT_CIRCLE_NUM),
					offset: Number(0),
				});
				if (myCir) {
					myCir.forEach((item) => {
						myCircles.push({ id: item.circleDetail.id, name: item.circleDetail.name });
					});
				}
			}
			const newCircles = myCircles || [];
			// 关注的圈子少于5
			// if (myCircles && myCircles.length < INIT_CIRCLE_NUM) {
			// 	const circles = await circleModal.findAll({
			// 		where: {
			// 			is_delete: 1,
			// 		},
			// 		order: [['hot', 'DESC']],
			// 		limit: Number(INIT_CIRCLE_NUM),
			// 		offset: Number(0),
			// 	});
			// 	newCircles = [...myCircles, ...circles];
			// 	newCircles = newCircles.slice(0, INIT_CIRCLE_NUM);
			// 	// 将其设置为默认关注
			// 	const attentionCircles = [];
			// 	if (Array.isArray(circles)) {
			// 		circles.forEach((item) => {
			// 			attentionCircles.push({ user_id, circle_id: item.id, create_time: moment().format(timeformat) });
			// 		});
			// 	}
			// 	await userAttentionCircleModal.bulkCreate(attentionCircles);
			// }
			const result = responseUtil.renderFieldsAll(newCircles, ['id', 'name']);
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取学校圈子，通过地区
	getAllByAddress: async (req, res) => {
		try {
			const { addressName } = req.query;
			const circleList = await circleModal.findAll({
				where: {
					[Op.or]: {
						province: {
							[Op.like]: `%${addressName}%`,
						},
						city: {
							[Op.like]: `%${addressName}%`,
						},
						country: {
							[Op.like]: `%${addressName}%`,
						},
					},
					type: 1, // 学校圈子
				},
			});
			const result = responseUtil.renderFieldsAll(circleList, ['id', 'name']);
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 关注单个学校圈子，并且默认为自己本校
	attentionSchoolCircle: async (req, res) => {
		try {
			const { schoolName, user_id } = req.body;
			// 学校圈子的详细信息
			const result = await circleModal.findOne({ where: { name: schoolName, type: 1, is_delete: 1 } });
			// 判断是否已经关注了
			const detail = await userAttentionCircleModal.findOne({
				where: { user_id, circle_id: result.id, is_delete: 1 },
			});
			// 已经关注了，则删除这条记录
			if (detail) {
				await userAttentionCircleModal.destroy({ where: { id: detail.id } });
			}
			// 判断是否已经存在过默认为本校的圈子
			const self_scool = await userAttentionCircleModal.findOne({
				where: {
					user_id,
					self_school: 1,
				},
			});
			// 存在的话，将其设为普通关注圈子
			if (self_scool) {
				await userAttentionCircleModal.update({ self_school: 2 }, { where: { user_id, circle_id: self_scool.circle_id } });
			}
			await userAttentionCircleModal.create({
				user_id,
				circle_id: result.id,
				create_time: moment().format(timeformat),
				self_school: 1,
			});
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 关注多个圈子
	attentionCircles: async (req, res) => {
		try {
			const { circles, user_id } = req.body;
			if (!circles || !Array.isArray(circles)) {
				return res.send(resultMessage.success('未选择圈子'));
			}
			// 清除所有关注
			await userAttentionCircleModal.destroy({ where: { user_id } });
			const newAttentions = [];
			// 保存现有的关注
			circles.forEach((item) => {
				const self_school = item.self_school === 1 ? 1 : 2;
				newAttentions.push({ user_id, circle_id: item.id, self_school, create_time: moment().format(timeformat) });
			});
			if (newAttentions.length !== 0) {
				await userAttentionCircleModal.bulkCreate(newAttentions);
			}
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取个人关注圈子
	getCirclesByUserId: async (req, res) => {
		try {
			const { user_id } = req.query;
			const myCircles = [];
			const myCir = await userAttentionCircleModal.findAll({
				where: {
					user_id,
					is_delete: 1,
				},
				include: [
					{
						model: circleModal,
						as: 'circleDetail',
						attributes: ['id', 'name'],
					},
				],
				order: [['create_time', 'DESC']],
				limit: Number(INIT_CIRCLE_NUM),
				offset: Number(0),
				attributes: ['id', 'self_school'],
			});
			if (myCir) {
				myCir.forEach((item) => {
					myCircles.push({
						id: item.circleDetail.id,
						name: item.circleDetail.name,
						self_school: item.self_school,
					});
				});
			}
			res.send(resultMessage.success(myCircles));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取所有板块，以及板块下的圈子
	getAllCirclesByPlate: async (req, res) => {
		try {
			const plates = await plateModal.findAll({
				where: {
					is_delete: 1,
				},
				include: [
					{
						model: circleModal,
						as: 'circles',
					},
				],
				order: [['hot', 'DESC']],
				attributes: ['id', 'name', 'url'],
			});
			const result = [];
			plates.forEach((pla) => {
				const cruPla = { plate_id: pla.id, plate_name: pla.name, plate_url: pla.url };
				if (Array.isArray(pla.circles) && pla.circles.length !== 0) {
					cruPla.circles = [];
					pla.circles.forEach((item) => {
						cruPla.circles.push({ id: item.id, name: item.name, type: item.type, self_school: item.self_school });
					});
				}
				result.push(cruPla);
			});
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取个人学校圈子
	getPersonSchoolCircle: async (req, res) => {
		try {
			const { user_id } = req.query;
			const myCir = await userAttentionCircleModal.findOne({
				where: {
					user_id,
					self_school: 1,
					is_delete: 1,
				},
				include: [
					{
						model: circleModal,
						as: 'circleDetail',
					},
				],
			});
			let personCir = {};
			if (myCir && myCir.circleDetail) {
				personCir = {
					circle_id: myCir.circleDetail.id,
					circle_name: myCir.circleDetail.name,
				};
			}
			res.send(resultMessage.success(personCir));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取热度最高的十个圈子
	getMostHot: async (req, res) => {
		try {
			const { plate_id } = req.query;
			const where = { is_delete: 1 };
			if (plate_id) {
				where.plate_id = plate_id;
			}
			const circles = await circleModal.findAll({
				where,
				order: [['hot', 'DESC']],
				attributes: ['id', 'name', 'hot', 'logo', 'bg_url'],
				limit: 10,
				offset: 0,
			});
			const result = responseUtil.renderFieldsAll(circles, ['id', 'name', 'hot', 'logo', 'bg_url']);
			result.forEach((item) => {
				item.logo = config.preUrl.circleUrl + item.logo;
				item.bg_url = config.preUrl.circleUrl + item.bg_url;
			});
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取个人关注圈子以及热度
	getMyAttentionCircles: async (req, res) => {
		try {
			const { user_id } = req.query;
			const myCircles = [];
			const myCir = await userAttentionCircleModal.findAll({
				where: {
					user_id,
					is_delete: 1,
				},
				include: [
					{
						model: circleModal,
						as: 'circleDetail',
					},
				],
				order: [['create_time', 'DESC']],
				limit: 6,
				offset: Number(0),
				attributes: ['id'],
			});
			if (myCir) {
				myCir.forEach((item) => {
					myCircles.push({
						id: item.circleDetail.id,
						name: item.circleDetail.name,
						hot: item.circleDetail.hot,
						logo: config.preUrl.circleUrl + item.circleDetail.logo,
					});
				});
			}
			res.send(resultMessage.success(myCircles));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 根据板块id获取圈子列表
	getCirclesByPlateId: async (req, res) => {
		try {
			const { plate_id, user_id } = req.query;
			const myCir = await circleModal.findAll({
				where: {
					plate_id,
					is_delete: 1,
				},
				order: [['hot', 'DESC']],
				attributes: ['id', 'name', 'hot', 'fellow', 'blogs', 'posts', 'battle', 'vote', 'videos', 'logo'],
			});
			const result = [];
			if (myCir && myCir.length !== 0) {
				let len = myCir.length;
				while (len > 0) {
					len -= 1;
					const curItem = myCir[len];
					curItem.logo = config.preUrl.circleUrl + curItem.logo;
					curItem.txtNum = Number(
						Number(curItem.blogs) + Number(curItem.posts) + Number(curItem.battle) + Number(curItem.vote),
					).toFixed(0);
					const newItem = responseUtil.renderFieldsObj(curItem, ['id', 'name', 'hot', 'fellow', 'logo', 'txtNum', 'videos']);
					newItem.hadAttention = false;
					if (user_id) {
						const attentionDetail = await userAttentionCircleModal.findOne({
							where: { user_id, circle_id: newItem.id, is_delete: 1 },
						});
						if (attentionDetail) newItem.hadAttention = true;
					}
					result.push(newItem);
				}
			}
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 关注或者取消关注单个圈子
	attentionCircleByUser: async (req, res) => {
		try {
			const { circle_id, user_id } = req.body;
			if (!circle_id) {
				return res.send();
			}
			// 查看是否已经关注
			const attentionDetail = await userAttentionCircleModal.findOne({
				where: {
					user_id,
					circle_id,
					is_delete: 1,
				},
			});
			if (attentionDetail) {
				userAttentionCircleModal.destroy({ where: { id: attentionDetail.id } });
				// 圈子粉丝 - 1， 热度 - 2
				circleModal.decrement({ fellow: 1, hot: config.USER_ATTENTION_CIRCLE }, { where: { id: circle_id } });
			} else {
				userAttentionCircleModal.create({
					user_id,
					circle_id,
					create_time: moment().format(timeformat),
				});
				// 圈子粉丝 + 1， 热度 + 2
				circleModal.increment({ fellow: 1, hot: config.USER_ATTENTION_CIRCLE }, { where: { id: circle_id } });
			}
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取圈子详细信息通过id
	getCircleDetailById: async (req, res) => {
		try {
			const { circle_id, user_id } = req.query;
			if (!circle_id) {
				return res.send('no circle_id');
			}
			const circleDetail = await circleModal.findOne({
				where: {
					id: circle_id,
					is_delete: 1,
				},
				attributes: ['id', 'name', 'desc', 'fellow', 'blogs', 'posts', 'vote', 'battle', 'videos', 'hot', 'type', 'logo', 'bg_url'],
			});
			const txtNum = Number(
				Number(circleDetail.blogs) + Number(circleDetail.posts) + Number(circleDetail.vote) + Number(circleDetail.battle),
			).toFixed(0);
			const result = responseUtil.renderFieldsObj(circleDetail, [
				'id',
				'name',
				'desc',
				'fellow',
				'videos',
				'hot',
				'type',
				'logo',
				'bg_url',
			]);
			result.txtNum = txtNum || 0;
			result.logo = config.preUrl.circleUrl + result.logo;
			result.bg_url = config.preUrl.circleUrl + result.bg_url;
			result.hadAttention = false;
			if (user_id) {
				const attentionDetail = await userAttentionCircleModal.findOne({
					where: {
						user_id,
						circle_id: result.id,
						is_delete: 1,
					},
				});
				if (attentionDetail) result.hadAttention = true;
			}

			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取我关注的圈子通过模块id
	getCircleDetailByPlateId: async (req, res) => {
		try {
			const { plate_id, user_id } = req.query;
			if (!plate_id) {
				return res.send('no plate_id');
			}
			const circles = await userAttentionCircleModal.findAll({
				where: {
					user_id,
					is_delete: 1,
				},
				include: [
					{
						model: circleModal,
						as: 'circleDetail',
						attributes: ['id', 'plate_id', 'name', 'hot', 'logo'],
						where: { plate_id },
					},
				],
				order: [['create_time', 'DESC']],
				attributes: ['id', 'self_school'],
				limit: 6,
				offset: 0,
			});
			const result = [];
			if (circles) {
				circles.forEach((item) => {
					item.logo = config.preUrl.circleUrl + item.logo;
					const curItem = responseUtil.renderFieldsObj(item.circleDetail, ['id', 'plate_id', 'name', 'hot', 'logo']);
					curItem.logo = config.preUrl.circleUrl + curItem.logo;
					result.push(curItem);
				});
			}
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},
};
