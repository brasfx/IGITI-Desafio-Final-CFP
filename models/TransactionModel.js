import mongoose from 'mongoose';

const schema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value !== Number && value < 0)
        throw new Error('Não é permitido valor negativo!');
    },
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    validate(year) {
      if (year < 2019 || year > 2021) throw new Error('Périodo inválido!');
    },
  },
  month: {
    type: Number,
    required: true,
    validate(month) {
      if (month < 0 || month > 12) throw new Error('Mês inválido!');
    },
  },
  day: {
    type: Number,
    required: true,
    validate(day) {
      if (day < 0 || day > 31) throw new Error('Dia inválido!');
    },
  },
  yearMonth: {
    type: String,
    required: true,
  },
  yearMonthDay: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const TransactionModel = mongoose.model('transaction', schema);

export default TransactionModel;
