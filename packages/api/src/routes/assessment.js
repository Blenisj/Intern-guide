const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      // eslint-disable-next-line no-console
      console.log(assessment);
      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters
      const result = await AssessmentService.submit(assessment);

      ResponseHandler(
        res,
        `Submitted assessment`,
        result,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js

      const assessments = await AssessmentService.getList();
      // eslint-disable-next-line no-console
      console.log(req.query);
      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.delete(
  `/:id`,
  async (req, res) => {
    try {
      const { id } = req.params;
      const result = await AssessmentService.delete(id);
      res.json(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to delete assessment:`, error);
      res.status(500).send(`Server error`);
    }
  },
);

module.exports = { assessmentRouter };
