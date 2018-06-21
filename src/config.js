const dev = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "the-asterisk-lounge-api-dev-attachmentsbucket-t69ampqca2nq"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://api-dev.theasterisklounge.net"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_30ggy8xHA",
    APP_CLIENT_ID: "4vli8vtus2ch3dsv73rmbodi1f",
    IDENTITY_POOL_ID: "us-west-2:d8576586-870f-49fc-b3c0-4fa2df8265b8"
  }
};

const prod = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "the-asterisk-lounge-api-prod-attachmentsbucket-aw3ivlbx9bvi"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://api-prod.theasterisklounge.net"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_hmg42FX8w",
    APP_CLIENT_ID: "5uq7tlvafoj5cde0bsr47jpr5l",
    IDENTITY_POOL_ID: "us-west-2:1d7320f8-bcc1-4ec7-be01-b46b9c81ba50"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
