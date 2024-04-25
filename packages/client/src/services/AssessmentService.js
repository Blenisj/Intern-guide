import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      console.log(assessment);
      return Axios.post(`http://localhost:4000/api/assessment/submit`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} 1- ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.get(`http://localhost:4000/api/assessment/list`)
        .then(response => {
          console.log(response.data);
          return response.data.data.assessments;
        });
    }
    catch (err) {
      console.error(`${err.response.statusText} 2- ${err.response.data.message}`);
      return [];
    }
  }
}
