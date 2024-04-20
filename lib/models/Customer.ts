import { Schema, model, models } from 'mongoose'

const CustomerSchema = new Schema(
	{
		clerkId: String,
		name: String,
		email: String,
		orders: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Order',
				},
			],
		},
	},
	{
		timestamps: true,
	}
)

const Customer = models.Customer || model('Customer', CustomerSchema)

export default Customer
