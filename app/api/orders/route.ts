import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Order from '@/lib/models/Order';
import Cart from '@/lib/models/Cart';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId: (session.user as any).id });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      );
    }

    const { shippingAddress } = await req.json();

    const order = await Order.create({
      userId: (session.user as any).id,
      items: cart.items,
      total: cart.total,
      shippingAddress,
      estado: 'pending',
    });

    // Limpiar el carrito
    cart.items = [];
    cart.total = 0;
    await cart.save();

    return NextResponse.json(
      {
        message: '¡Orden creada exitosamente!',
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creando orden:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({ userId: (session.user as any).id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error obteniendo órdenes:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
