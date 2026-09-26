import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Cart from '@/lib/models/Cart';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const nombre = typeof body.nombre === 'string' ? body.nombre.trim() : '';

    // Validar datos
    if (!email || !password || !nombre || nombre.length > 100) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Crear usuario
    const user = await User.create({
      email,
      password,
      nombre,
    });

    // Crear carrito para el nuevo usuario
    await Cart.create({
      userId: user._id,
      items: [],
      total: 0,
    });

    return NextResponse.json(
      {
        message: '¡Usuario registrado exitosamente!',
        user: {
          id: user._id,
          email: user.email,
          nombre: user.nombre,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error en el servidor' },
      { status: 500 }
    );
  }
}
