import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Cart from '@/lib/models/Cart';
import { authOptions } from '../auth/[...nextauth]/route';

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

    const cart = await Cart.findOne({ userId: (session.user as any).id });

    if (!cart) {
      return NextResponse.json(
        { error: 'Carrito no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error: any) {
    console.error('Error obteniendo carrito:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { productId, nombre, precio, cantidad, imagen } = await req.json();

    if (!productId || !nombre || !precio || !cantidad) {
      return NextResponse.json(
        { error: 'Datos incompletos del producto' },
        { status: 400 }
      );
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: (session.user as any).id });

    if (!cart) {
      cart = await Cart.create({
        userId: (session.user as any).id,
        items: [],
        total: 0,
      });
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find((item: any) => item.productId === productId);

    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      cart.items.push({
        productId,
        nombre,
        precio,
        cantidad,
        imagen,
      });
    }

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + item.precio * item.cantidad,
      0
    );

    await cart.save();

    return NextResponse.json(
      {
        message: 'Producto agregado al carrito',
        cart,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error agregando al carrito:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
