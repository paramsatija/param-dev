import { Amplify } from 'aws-amplify'

// Configure Amplify with your AWS resources
Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'cognifuseAPI',
        endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        region: process.env.NEXT_PUBLIC_AWS_REGION
      }
    ]
  },
  Storage: {
    AWSS3: {
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      region: process.env.NEXT_PUBLIC_AWS_REGION
    }
  }
}) 