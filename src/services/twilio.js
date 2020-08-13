import twillio from "twilio";

import models from "../database/models";
import configVariables from "../config";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = configVariables;

class TwilioService {
  /**
   * sendAccountVerificationCode
   * @param {object} name
   * @param {object} code
   * @param {object} from
   * @param {object} to
   * @param {object} user
   * @returns null mull
   * @description This function implements the logic for sending a phone verification code.
   */
  async sendAccountVerificationCode(body, from, to, model = null, key=null) {
    const request = JSON.stringify({ body, from, to });
    try {
      const client = twillio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      const res = await client.messages.create({
        body,
        from,
        to,
      });

      if (model) {
        model[key] = true;
        await model.save();
      }
      await models.SmsLog.create({ request, response: res });
    } catch (error) {
      await models.SmsLog.create({ request, response: JSON.stringify(error) });
      // create a cron job to retry if request fails
    }
  }
}

export default TwilioService;
