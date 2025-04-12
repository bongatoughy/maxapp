// src/cognitoConfig.js
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_UWxf37UVs", // Replace with your pool ID
  ClientId: "31om88f24sknsmfo4qhtl6r0r9", // Replace with your app client ID
};

export default new CognitoUserPool(poolData);
