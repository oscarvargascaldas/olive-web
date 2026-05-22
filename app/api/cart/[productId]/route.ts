import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Cart from '@/lib/models/Cart';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
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

    cart.items = cart.items.filter((item: any) => item.productId !== params.productId);

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + item.precio * item.cantidad,
      0
    );

    await cart.save();

    return NextResponse.json(
      {
        message: 'Producto eliminado del carrito',
        cart,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error eliminando del carrito:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { cantidad } = await req.json();

    if (!cantidad || cantidad < 1) {
      return NextResponse.json(
        { error: 'Cantidad inválida' },
        { status: 400 }
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

    const item = cart.items.find((item: any) => item.productId === params.productId);

    if (!item) {
      return NextResponse.json(
        { error: 'Producto no encontrado en el carrito' },
        { status: 404 }
      );
    }

    item.cantidad = cantidad;

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum: number, item: any) => sum + item.precio * item.cantidad,
      0
    );

    await cart.save();

    return NextResponse.json(
      {
        message: 'Cantidad actualizada',
        cart,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error actualizando carrito:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
