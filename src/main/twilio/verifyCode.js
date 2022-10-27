<<<<<<< HEAD
const twilio = require('twilio');
// const { config } from 'dotenv';
// config();
=======
import twilio from 'twilio';
import { config } from 'dotenv';

config();
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFICATION_SERVICE_SID;

const verifyCode = (body) => {
  const { mobileNumber, code } = body;
  const client = twilio(accountSid, authToken);
  return client.verify
    .services(verifySid)
    .verificationChecks.create({ to: mobileNumber, code })
    .then((data) => {
      return status;
    })
    .catch(function (err) {
      console.error('Could not check the code with Twilio API');
      console.error(err);
    });
};

/**
<<<<<<< HEAD
 * @description Function to automate adding numbers as verified outgoing call IDs via Twilio API.
 *
 * Note: the use of this API endpoint is restricted to premium Twilio Accounts.
 * So teams will need to manually add the numbers of their developers on the Twilio console.
 */
const addVerifiedNumber = (phoneNumber, status) => {
  const client = twilio(accountSid, authToken);
  client.validationRequests
    .create({ friendlyName: phoneNumber, phoneNumber })
=======
 * @description Function to automate adding numbers as verified outgoing call IDs via Twilio API. 
 * 
 * Note: the use of this API endpoint is restricted to premium Twilio Accounts. 
 * So teams will need to manually add the numbers of their developers on the Twilio console.
 */ 
const addVerifiedNumber = (phoneNumber, status) => {
  const client = twilio(accountSid, authToken);
  client.validationRequests
    .create({friendlyName: phoneNumber, phoneNumber })
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
    .then((response) => {
      console.log(response);
      return status;
    })
    .catch((err) => {
      console.log(err);
    });
};
<<<<<<< HEAD
// export default verifyCode;
=======
export default verifyCode;
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)")
