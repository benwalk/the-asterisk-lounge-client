export default {

    MAX_ATTACHMENT_SIZE: 5000000,

    cognito: {
        USER_POOL_ID: "us-west-2_Kk5TEXLQD",
        APP_CLIENT_ID: "3l2ijdtdldb9vjkik7gufeijqf",
        IDENTITY_POOL_ID: "us-west-2:ee07e870-c8d1-4015-803e-53f61813eb30",
        REGION: "us-west-2"
    },
    s3: {
      BUCKET: "ss-notes-uploads-bucket"
    },
    apiGateway: {
      URL: "https://q8gyipol40.execute-api.us-west-2.amazonaws.com/prod",
      REGION: "us-west-2"
    }
}
