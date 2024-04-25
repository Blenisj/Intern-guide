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

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
