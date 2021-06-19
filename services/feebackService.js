const moment = require('moment');
const sequelize = require('../dataSource/MysqlPoolClass');
const resultMessage = require('../util/resultMessage');
const circleFeedback = require('../models/circle_feedback');

const circleFeedbackModal = circleFeedback(sequelize);
const timeformat = 'YYYY-MM-DD HH:mm:ss';
module.exports = {
	// 关于圈子的意见反馈
	aboutCircle: async (req, res) => {
		try {
			const { plate_id, user_id, desc } = req.body;
			// const result = await circleFeedbackModal.findAll({
			// 	where: {
			// 		topic_ids: {
			// 			[Op.like]: `%${1}%`,
			// 		},
			// 	},
			// });
			await circleFeedbackModal.create({ user_id, plate_id, desc, create_time: moment().format(timeformat) });
			res.send(resultMessage.success('success'));
		} catch (error) {
			console.log(error);
			res.send(resultMessage.error());
		}
	},
};
