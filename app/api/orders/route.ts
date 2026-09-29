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

    const cart = await Cart.findOne({ userId: session.user.id });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const address = body.shippingAddress;
    const requiredAddressFields = ['nombre', 'email', 'telefono', 'direccion', 'ciudad'];
    if (
      !address ||
      requiredAddressFields.some(
        (field) => typeof address[field] !== 'string' || !address[field].trim()
      )
    ) {
      return NextResponse.json(
        { error: 'Completa nombre, correo, teléfono, dirección y ciudad para el envío.' },
        { status: 400 }
      );
    }

    const shippingAddress = {
      nombre: address.nombre.trim(),
      email: address.email.trim().toLowerCase(),
      telefono: address.telefono.trim(),
      direccion: address.direccion.trim(),
      ciudad: address.ciudad.trim(),
      codigoPostal: typeof address.codigoPostal === 'string' ? address.codigoPostal.trim() : '',
    };

    const order = await Order.create({
      userId: session.user.id,
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
  } catch (error: unknown) {
    console.error('Error creando orden:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
      { status: 500 }
    );
  }
}

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

    const orders = await Order.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error: unknown) {
    console.error('Error obteniendo órdenes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
      { status: 500 }
    );
  }
}
