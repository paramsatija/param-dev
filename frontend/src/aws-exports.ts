const awsConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  // We'll add more config as needed through AWS Console
};

export default awsConfig;
