import dotenv from "dotenv";
import base64 from "base-64";
import { j as json } from "../../../chunks/index.js";
const MAILCHIMP_API_KEY = "bb702b9e9a9e070199388e39c69a5356-us14";
const MAILCHIMP_LIST_ID = "b065be02b4";
dotenv.config();
const POST = async ({ request }) => {
  const url = `https://api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
  try {
    const { email } = await request.json();
    if (!email) {
      return json({ error: "Email is required" }, { status: 400 });
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode(`anystring:${MAILCHIMP_API_KEY}`)}`
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed"
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      return json({ error: errorData.detail }, { status: response.status });
    }
    const data = await response.json();
    return json({ success: true, data });
  } catch (error) {
    console.error(error);
  }
};
export {
  POST
};
