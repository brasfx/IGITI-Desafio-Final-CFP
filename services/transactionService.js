import TransactionModel from '../models/TransactionModel.js';

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erro ao salvar!' });
  }
};

const findAllMonths = async (_, res) => {
  try {
    const months = await TransactionModel.distinct('yearMonth');
    if (months.length < 1) {
      res.status(404).send({ message: 'Nenhuma transação encontrada!' });
      return;
    }

    res.send(months);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erro ao listar meses!' });
  }
};

const findAll = async (req, res) => {
  const { description, yearMonth } = req.query;
  const condition = description
    ? {
        description: { $regex: new RegExp(description), $options: 'i' },
        yearMonth: yearMonth,
      }
    : { yearMonth: yearMonth };

  try {
    const transaction = await TransactionModel.find(condition).sort({ day: 1 });
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar transasções!' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await TransactionModel.findById(id, { _id: 0 });
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao buscar a transação de id: ' + id });
  }
};

const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Dados para atualização não encontrados!',
    });
  }
  if (req.body.hasOwnProperty('type')) {
    return res.status(400).send({
      message: 'Impossível editar despesa!',
    });
  }
  const id = req.params.id;

  try {
    await TransactionModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.send({ message: 'Transação atualizada com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transação de id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      throw new Error();
    }
    res.send({ message: 'Transação excluida com sucesso!' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Não foi possivel deletar o registro de id: ' + id });
  }
};

export default {
  create,
  findAllMonths,
  findAll,
  findOne,
  update,
  remove,
};
