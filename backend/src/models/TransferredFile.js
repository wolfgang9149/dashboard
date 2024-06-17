import mongoose from 'mongoose';

const TransferredFileSchema = new mongoose.Schema({
  fileName: { type: String, required: true, unique: true },
  processedAt: { type: Date, default: Date.now }
});

const TransferredFile = mongoose.model('TransferredFile', TransferredFileSchema);

export default TransferredFile;
