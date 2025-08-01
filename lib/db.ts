import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/explorerDB';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
    // Check if mongoose is already connected (existing Express app connection)
    // @ts-ignore - readyState comparison is valid
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    
    // If there's a connection attempt in progress, wait for it
    if (cached.promise) {
        cached.conn = await cached.promise;
        return cached.conn;
    }
    
    // Check if there's a cached connection
    if (cached.conn) {
        return cached.conn;
    }
    
    try {
        // Only create new connection if absolutely necessary
        // @ts-ignore - readyState comparison is valid
        if (mongoose.connection.readyState === 0) {
            cached.promise = mongoose.connect(MONGODB_URI, { 
                bufferCommands: false,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            cached.conn = await cached.promise;
        } else {
            // Use existing connection
            cached.conn = mongoose.connection;
        }
        
        return cached.conn;
    } catch (error) {
        // If connection fails, try to use existing connection if available
        // @ts-ignore - readyState comparison is valid
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }
        
        cached.promise = null;
        throw error;
    }
}
