//import dotenv from 'dotenv';
import base64 from "base-64";
import { MAILCHIMP_API_KEY } from "$env/static/private";
//dotenv.config();
//const MAILCHIMP_API_KEY = process.env['MAILCHIMP_API_KEY'];

async function registerEmail(email) {
  console.log("im here");
  try {
    const list_id = "b065be02b4";
    const url = `https://api.mailchimp.com/3.0/lists/${list_id}/members`;
    const password = MAILCHIMP_API_KEY;

    const data = {
      email_address: email,
      status: "subscribed",
    };

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Basic ${base64.encode(`anystring: ${password}`)}`,
    );

    const response: Response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });

    const mailchimpResponse = response; //.json();
    if (mailchimpResponse) {
      return mailchimpResponse;
    }
  } catch (error) {
    console.error(error);
  }
}

const mailchimp = {
  registerEmail,
};

export default mailchimp;
