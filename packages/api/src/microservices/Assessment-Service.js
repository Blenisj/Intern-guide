const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  try {
    // use the sequelize model Assessments from packages/api/src/database/models to save
    // the assessment data in the PostgreSQL database
    const result = await Assessment.create({
      catDateOfBirth: assessment.catDateOfBirth,
      catName: assessment.catName,
      instrumentType: assessment.instrumentType,
      riskLevel: assessment.riskLevel,
      score: assessment.score,
    });
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error submitting assessment:`, error);
    throw error;
  }
};

exports.getList = async () => {
  try {
    // Use the Sequelize model to fetch the assessment data from the database
    const assessments = await Assessment.findAll();
    // const assessments = await Assessment.findAll({ paranoid: false });
    return assessments;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching assessments:`, error);
    return [];
  }
};

exports.delete = async (id) => {
  try {
    // Use the Sequelize model to delete the assessment from the database
    const result = await Assessment.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error deleting assessment:`, error);
    throw error;
  }
};
