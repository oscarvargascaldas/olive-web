import { Schema, model, models, Types } from 'mongoose';

interface OrderItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface IOrder {
  userId: Types.ObjectId;
  items: OrderItem[];
  total: number;
  estado: 'pending' | 'paid' | 'shipped' | 'delivered';
  shippingAddress?: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
  };
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: String,
        nombre: String,
        precio: Number,
        cantidad: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered'],
      default: 'pending',
    },
    shippingAddress: {
      nombre: String,
      email: String,
      telefono: String,
      direccion: String,
      ciudad: String,
      codigoPostal: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default models.Order || model<IOrder>('Order', orderSchema);
