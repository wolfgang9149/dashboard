import mongoose from 'mongoose';

const SensorDataSchema = new mongoose.Schema({
  dateTime: { type: Date },
  temperature: { type: Number },
  pressure: { type: Number },
  humidity: { type: Number },
  envSensor: { type: String },
  spectV: { type: Number },
  spectB: { type: Number },
  spectG: { type: Number },
  spectY: { type: Number },
  spectD: { type: Number },
  spectR: { type: Number },
  spectSensor: { type: String },
  acx: { type: Number },
  acy: { type: Number },
  acz: { type: Number },
  agSensor: { type: String },
  signal: { type: String }
});

const SensorData = mongoose.model('SensorData', SensorDataSchema);

export default SensorData;
