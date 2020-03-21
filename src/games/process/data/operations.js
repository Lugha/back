import operationsModel from "@databases/operations";

export default new Promise((resolve, reject) => {
  operationsModel.findOneRandom((err, result) => {
    err ? reject(err) : resolve(result);
  });
});
