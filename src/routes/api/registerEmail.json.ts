 import mailchimp from '$lib/services/mailchimp';

 export async function PUT({ request }) {
   const { body } = await request.json();
   try {
     const data = await JSON.parse(body);
     console.log("and hgere");
     const result = await mailchimp.registerEmail(data.email);
     return {
       status: result.status,
       body: result
     };
   } catch (error) {
     console.error(error);
   }
 }
