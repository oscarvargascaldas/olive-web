import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import Cart from '@/lib/models/Cart';
import type { CartItem } from '@/lib/models/Cart';
import { authOptions } from '../auth/[...nextauth]/route';
import { getProduct } from '@/lib/products';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: session.user.id, items: [], total: 0 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error: unknown) {
    console.error('Error obteniendo carrito:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
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

    const { productId, cantidad } = await req.json();
    const product = typeof productId === 'string' ? getProduct(productId) : undefined;

    if (!product || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > 99) {
      return NextResponse.json(
        { error: 'Datos incompletos del producto' },
        { status: 400 }
      );
    }

    await connectDB();

    let cart = await Cart.findOne({ userId: session.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: session.user.id,
        items: [],
        total: 0,
      });
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find((item: CartItem) => item.productId === productId);

    if (existingItem) {
      if (existingItem.cantidad + cantidad > 99) {
        return NextResponse.json(
          { error: 'La cantidad máxima por producto es 99' },
          { status: 400 }
        );
      }
      existingItem.cantidad += cantidad;
    } else {
      cart.items.push({
        productId,
        nombre: product.name,
        precio: product.price,
        cantidad,
      });
    }

    // Recalcular total
    cart.total = cart.items.reduce(
      (sum: number, item: CartItem) => sum + item.precio * item.cantidad,
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
  } catch (error: unknown) {
    console.error('Error agregando al carrito:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
      { status: 500 }
    );
  }
}
