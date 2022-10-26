import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, '카테고리를 추가해주세요'],
			trim: true,
			unique: true,
			maxLength: [50, '이름은 최대 50자입니다.'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('category', categorySchema);
