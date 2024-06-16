import mongoose from 'mongoose';

const SensorDataSchema = new mongoose.Schema({
  dateTime: { type: Date, required: true },
  temperature: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  envSensor: { type: String, required: true },
  spectV: { type: Number, required: true },
  spectB: { type: Number, required: true },
  spectG: { type: Number, required: true },
  spectY: { type: Number, required: true },
  spectD: { type: Number, required: true },
  spectR: { type: Number, required: true },
  spectSensor: { type: String, required: true },
  acx: { type: Number, required: true },
  acy: { type: Number, required: true },
  acz: { type: Number, required: true },
  agSensor: { type: String, required: true },
  signal: { type: String, required: true }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

export default SensorData;
