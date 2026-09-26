import mongoose from 'mongoose';

const cached = global as typeof global & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Por favor define MONGODB_URI en .env.local');
  }

  if (cached.mongoose!.conn) {
    console.log('✅ MongoDB ya está conectado');
    return cached.mongoose!.conn;
  }

  if (!cached.mongoose!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongoose!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB conectado exitosamente');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.mongoose!.conn = await cached.mongoose!.promise;
  } catch (error) {
    cached.mongoose!.promise = null;
    throw error;
  }

  return cached.mongoose!.conn;
}

export default connectDB;
