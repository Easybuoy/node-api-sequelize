class BaseController {
    /**
     * success
     * @param {object} res
     * @param {number} status
     * @param {string} message
     * @param {array} data
     * @returns {object} response with status and data
     */
    success(res, status, message = '', data = '') {
      const response = {
        status: 'success',
      };
  
      if (message) {
        response.message = message;
      }
  
      if (data) {
        response.data = data;
      }
      return res.status(status).json(response);
    }
  
    /**
     * success
     * @param {object} res
     * @param {number} status
     * @param {string} message
     * @param {object} errors
     * @returns {object} response with status and data
     */
    error(res, status, message = '', errors = '') {
      const response = {
        status: 'error',
      };
  
      if (message) {
        response.message = message;
      }
  
      if (errors) {
        response.errors = errors;
      }
      return res.status(status).json(response);
    }
  }
  
  export default BaseController;