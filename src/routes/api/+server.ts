import mailchimp from "$lib/services/mailchimp";
import { json } from "@sveltejs/kit";
import base64 from "base-64";
//import { MAILCHIMP_API_KEY } from "$env/static/private";
//import { MAILCHIMP_LIST_ID } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
  const url = `https://api.mailchimp.com/3.0/lists/${process.env["MAILCHIMP_LIST_ID"]}/members`;
  try {
    const { email } = await request.json();

    if (!email) {
      return json({ error: "Email is required" }, { status: 400 });
    }
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode(`anystring:${process.env["MAILCHIMP_EPI_KEY"]}`)}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json({ error: errorData.detail }, { status: response.status });
    }

    const data = await response.json();
    return json({ success: true, data });
    /*{
      status: result.status,
      body: result
    };*/
  } catch (error) {
    console.error(error);
  }
};
