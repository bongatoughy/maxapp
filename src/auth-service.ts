// src/AuthService.js

const LAMBDA_SIGNUP_URL =
  "https://6kl2gnqnzgviyv4sbvofbdc36y0llevo.lambda-url.us-east-1.on.aws/"; // replace this with your deployed endpoint

const LAMBDA_SIGNIN_URL = `https://4thg37s36yaumulrfc37tg5uri0fkntc.lambda-url.us-east-1.on.aws/`;

// Sign up via Lambda proxy
export const signUp = async ({ email, password }) => {
  console.log("KKKKKKKKKK");
  const response = await fetch(LAMBDA_SIGNUP_URL, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Signup failed");
  }

  return data;
};

// Sign in directly (client secret not required)
export const signIn = async ({ email, password }) => {
  const response = await fetch(LAMBDA_SIGNIN_URL, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Signin failed");
  }

  return data;
};

export const confirmUser = async ({ email, code }) => {
  const res = await fetch(
    "https://hxqe3qqd6eyg6b3qyzzdps6szi0hwthy.lambda-url.us-east-1.on.aws/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Confirmation failed.");
  return data;
};
