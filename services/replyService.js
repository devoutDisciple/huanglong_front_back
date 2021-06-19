const moment = require('moment');
const sizeOf = require('image-size');
const sequelize = require('../dataSource/MysqlPoolClass');
const resultMessage = require('../util/resultMessage');
const commentRecord = require('../models/comment_record');
const user = require('../models/user');
const content = require('../models/content');
const { getHotReply, handleComment } = require('../util/commonService');

const userModal = user(sequelize);
const contentModal = content(sequelize);
const commentRecordModal = commentRecord(sequelize);
commentRecordModal.belongsTo(userModal, { foreignKey: 'user_id', targetKey: 'id', as: 'userDetail' });

const timeformat = 'YYYY-MM-DD HH:mm';
const pagesize = 10;

module.exports = {
	// 获取内容的全部评论
	getAllByContentId: async (req, res) => {
		try {
			const { content_id, current, user_id } = req.query;
			const offset = Number((current - 1) * pagesize);
			const comments = await commentRecordModal.findAll({
				where: {
					content_id,
					type: 1,
					is_delete: 1,
				},
				attributes: ['id', 'content_id', 'comment_id', 'img_urls', 'type', 'desc', 'goods', 'share', 'comment', 'create_time'],
				include: [
					{
						model: userModal,
						as: 'userDetail',
						attributes: ['id', 'username', 'photo', 'school'],
					},
				],
				order: [
					['goods', 'DESC'],
					['comment', 'DESC'],
					['create_time', 'DESC'],
				],
				limit: pagesize,
				offset,
			});
			const result = await handleComment(comments, user_id);
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 评论帖子内容
	addContentReply: async (req, res) => {
		try {
			const { user_id, content_id, type, desc, img_urls } = req.body;
			// 创建评论
			await commentRecordModal.create({
				user_id,
				content_id,
				type,
				desc,
				img_urls: img_urls ? JSON.stringify(img_urls) : '[]',
				create_time: moment().format(timeformat),
			});
			// 帖子的评论数量加1
			await contentModal.increment(['comment', 'hot'], { where: { id: content_id } });
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 添加评论的评论
	addReplyReply: async (req, res) => {
		try {
			const { user_id, content_id, comment_id, type, desc, img_urls } = req.body;
			// 此时的content_id是评论的id
			await commentRecordModal.create({
				user_id,
				content_id,
				comment_id,
				type,
				desc,
				img_urls: img_urls ? JSON.stringify(img_urls) : '[]',
				create_time: moment().format(timeformat),
			});
			// 评论的的评论数量 + 1
			await commentRecordModal.increment(['comment'], { where: { id: comment_id } });
			// 帖子的评论数量 + 1, 热度 + 1
			await contentModal.increment(['comment', 'hot'], { where: { id: content_id } });

			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取热门回复
	getHotReplyByContentId: async (req, res) => {
		try {
			const { content_id } = req.query;
			const result = await getHotReply(content_id);
			res.send(resultMessage.success(result[0] || {}));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 根据id获取评论详情
	getReplyDetailById: async (req, res) => {
		try {
			const { comment_id, user_id } = req.query;
			const detail = await commentRecordModal.findOne({
				where: { id: comment_id, is_delete: 1 },
				attributes: ['id', 'content_id', 'comment_id', 'img_urls', 'type', 'desc', 'goods', 'share', 'comment', 'create_time'],
				include: [
					{
						model: userModal,
						as: 'userDetail',
						attributes: ['id', 'username', 'photo', 'school'],
					},
				],
			});
			const result = await handleComment([detail], user_id);
			res.send(resultMessage.success(result[0] || {}));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 获取评论的评论
	getReplyListByReplyId: async (req, res) => {
		try {
			const { id, user_id } = req.query;
			const detail = await commentRecordModal.findAll({
				where: { comment_id: id, is_delete: 1 },
				include: [
					{
						model: userModal,
						as: 'userDetail',
						attributes: ['id', 'username', 'photo', 'school'],
					},
				],
				order: [
					['goods', 'DESC'],
					['create_time', 'DESC'],
				],
			});
			const result = await handleComment(detail, user_id);
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},

	// 上传评论图片
	uploadImg: async (req, res, filename) => {
		try {
			const dimensions = sizeOf(req.file.path);
			res.send(resultMessage.success({ url: filename, width: dimensions.width, height: dimensions.height }));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},
};
