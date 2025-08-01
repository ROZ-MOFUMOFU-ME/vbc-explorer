import mongoose, { Schema, Document } from 'mongoose';

// 環境変数の設定
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = 'mongodb://localhost/explorerDB';
}

// Interfaces for TypeScript
export interface IBlock extends Document {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  size: number;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  blockTime: number;
  uncles: string[];
}

export interface ITransaction extends Document {
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  status: number;
  from: string;
  to: string;
  creates: string;
  value: string;
  gas: number;
  gasUsed: number;
  gasPrice: string;
  timestamp: number;
  input: string;
}

export interface IAccount extends Document {
  address: string;
  balance: number;
  blockNumber: number;
  type: number; // address: 0x0, contract: 0x1
}

export interface IBlockStat extends Document {
  number: number;
  timestamp: number;
  difficulty: string;
  hashrate: string;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  miner: string;
  blockTime: number;
  uncleCount: number;
}

export interface IContract extends Document {
  address: string;
  blockNumber: number;
  ERC: number; // 0:normal contract, 2:ERC20, 3:ERC223
  creationTransaction: string;
  contractName: string;
  tokenName: string;
  symbol: string;
  owner: string;
  decimals: number;
  totalSupply: number;
  compilerVersion: string;
  optimization: boolean;
  sourceCode: string;
  abi: string;
  byteCode: string;
}

export interface ITokenTransfer extends Document {
  hash: string;
  blockNumber: number;
  method: string;
  from: string;
  to: string;
  contract: string;
  value: string;
  timestamp: number;
}

export interface IMarket extends Document {
  symbol: string;
  timestamp: number;
  quoteBTC: number;
  quoteUSD: number;
}

// Schema definitions
const BlockSchema = new Schema({
  'number': { type: Number, index: { unique: true } },
  'hash': String,
  'parentHash': String,
  'nonce': String,
  'sha3Uncles': String,
  'logsBloom': String,
  'transactionsRoot': String,
  'stateRoot': String,
  'receiptRoot': String,
  'miner': { type: String, lowercase: true },
  'difficulty': String,
  'totalDifficulty': String,
  'size': Number,
  'extraData': String,
  'gasLimit': Number,
  'gasUsed': Number,
  'timestamp': Number,
  'blockTime': Number,
  'uncles': [String],
}, { collection: 'Block' });

const AccountSchema = new Schema({
  'address': { type: String, index: { unique: true } },
  'balance': Number,
  'blockNumber': Number,
  'type': { type: Number, default: 0 }, // address: 0x0, contract: 0x1
}, { collection: 'Account' });

const ContractSchema = new Schema({
  'address': { type: String, index: { unique: true } },
  'blockNumber': Number,
  'ERC': { type: Number, index: true }, //0:normal contract, 2:ERC20, 3:ERC223
  'creationTransaction': String,
  'contractName': String,
  'tokenName': String,
  'symbol': String,
  'owner': String,
  'decimals': Number,
  'totalSupply': Number,
  'compilerVersion': String,
  'optimization': Boolean,
  'sourceCode': String,
  'abi': String,
  'byteCode': String,
}, { collection: 'Contract' });

const TransactionSchema = new Schema({
  'hash': { type: String, index: { unique: true }, lowercase: true },
  'nonce': Number,
  'blockHash': String,
  'blockNumber': Number,
  'transactionIndex': Number,
  'status': Number,
  'from': { type: String, lowercase: true },
  'to': { type: String, lowercase: true },
  'creates': { type: String, lowercase: true },
  'value': String,
  'gas': Number,
  'gasUsed': Number,
  'gasPrice': String,
  'timestamp': Number,
  'input': String,
}, { collection: 'Transaction' });

const TokenTransferSchema = new Schema({
  'hash': { type: String, index: { unique: true }, lowercase: true },
  'blockNumber': Number,
  'method': String,
  'from': { type: String, lowercase: true },
  'to': { type: String, lowercase: true },
  'contract': { type: String, lowercase: true },
  'value': String,
  'timestamp': Number,
}, { collection: 'TokenTransfer' });

const BlockStatSchema = new Schema({
  'number': { type: Number, index: { unique: true } },
  'timestamp': Number,
  'difficulty': String,
  'hashrate': String,
  'txCount': Number,
  'gasUsed': Number,
  'gasLimit': Number,
  'miner': String,
  'blockTime': Number,
  'uncleCount': Number,
}, { collection: 'BlockStat' });

const MarketSchema = new Schema({
  'symbol': String,
  'timestamp': Number,
  'quoteBTC': Number,
  'quoteUSD': Number,
}, { collection: 'Market' });

// Create indices
TransactionSchema.index({ blockNumber: -1 });
TransactionSchema.index({ from: 1, blockNumber: -1 });
TransactionSchema.index({ to: 1, blockNumber: -1 });
TransactionSchema.index({ creates: 1, blockNumber: -1 });
AccountSchema.index({ balance: -1 });
AccountSchema.index({ balance: -1, blockNumber: -1 });
AccountSchema.index({ type: -1, balance: -1 });
BlockSchema.index({ miner: 1 });
BlockSchema.index({ miner: 1, blockNumber: -1 });
BlockSchema.index({ hash: 1, number: -1 });
MarketSchema.index({ timestamp: -1 });
TokenTransferSchema.index({ blockNumber: -1 });
TokenTransferSchema.index({ from: 1, blockNumber: -1 });
TokenTransferSchema.index({ to: 1, blockNumber: -1 });
TokenTransferSchema.index({ contract: 1, blockNumber: -1 });

// Database connection
export const connectDB = async (): Promise<void> => {
  // Check if mongoose is already connected (from Express app)
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    
    // Only connect if not connected and not connecting
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('MongoDB connected via models/index.ts');
    }
  } catch (error) {
    // If connection fails but there's an existing connection, use it
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
      return;
    }
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Models
export const Block = mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema);
export const Account = mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema);
export const Contract = mongoose.models.Contract || mongoose.model<IContract>('Contract', ContractSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
export const TokenTransfer = mongoose.models.TokenTransfer || mongoose.model<ITokenTransfer>('TokenTransfer', TokenTransferSchema);
export const BlockStat = mongoose.models.BlockStat || mongoose.model<IBlockStat>('BlockStat', BlockStatSchema);
export const Market = mongoose.models.Market || mongoose.model<IMarket>('Market', MarketSchema);

// Default export for convenience
export default {
  connectDB,
  Block,
  Account,
  Contract,
  Transaction,
  TokenTransfer,
  BlockStat,
  Market,
};
