import traductionModel from "@databases/traductions";

export default async (req, res) => {
  traductionModel.findOneRandom((err, resultat) => {
      if (err) {
          res.end();
      }
      res.send({ resultat });
  });
};
