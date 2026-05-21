import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor define MONGODB_URI en .env.local');
}

let cached = global as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.mongoose.conn) {
    console.log('✅ MongoDB ya está conectado');
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB conectado exitosamente');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    cached.mongoose.promise = null;
    throw e;
  }

  return cached.mongoose.conn;
}

export default connectDB;
