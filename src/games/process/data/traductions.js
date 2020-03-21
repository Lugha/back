import traductionModel from "@databases/traductions";

export default new Promise((resolve, reject) => {
  traductionModel.findOneRandom((err, result) => {
    err ? reject(err) : resolve(result);
  });
});
