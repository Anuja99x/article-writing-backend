const { SESClient,SendEmailCommand } = require( "@aws-sdk/client-ses");

require('dotenv').config();

const ses = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async () => {
    console.log("Sending email");
  const sendEmailCommand = createSendEmailCommand(
    "anujawij@gmail.com",
    "anujawij@gmail.com",
  );

  try {
    const result = await ses.send(sendEmailCommand).promise();
    console.log("Email sent", result);
  } catch (e) {
    console.error("Failed to send email.");
    return e;
  }
};

module.exports = {
    run
}

