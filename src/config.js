export default {

    MAX_ATTACHMENT_SIZE: 5000000,

    cognito: {
        USER_POOL_ID: "us-west-2_uGxuULyYL",
        APP_CLIENT_ID: "osptsaf1h06bcpct8janiee8t",
        IDENTITY_POOL_ID: "us-west-2:ead8a2cc-701c-4e7f-9764-0bc71697a7b5",
        REGION: "us-west-2"
    },
    s3: {
      REGION: "us-west-2",
      BUCKET: "the-asterisk-lounge-uploads-bucket"
    },
    apiGateway: {
      URL: "https://ev3xka3863.execute-api.us-west-2.amazonaws.com/prod",
      REGION: "us-west-2"
    }
}
