import { Schema, model, models, Types } from 'mongoose';

interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

interface ICart {
  userId: Types.ObjectId;
  items: CartItem[];
  total: number;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        productId: String,
        nombre: String,
        precio: Number,
        cantidad: Number,
        imagen: String,
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Cart || model<ICart>('Cart', cartSchema);
