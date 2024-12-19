const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config(); // Secure access token

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;
const DEFAULT_HASHTAGS = '#kerala #india #keralagram #love #instagram #photography #mallu #malayalam #kochi #instagood #keralagodsowncountry #keralatourism #malayali #godsowncountry #mallugram #likeforlikes #malappuram #kozhikode #mumbai #trending #chennai #gainwithmchina #mollywood #keralam #bhfyp #likes #nature #kannur #keralagallery #tamilnadu';

async function postToInstagram(imageUrl, discription = '') {
    try {
        // Validate environment variables
        if (!ACCESS_TOKEN || !INSTAGRAM_ACCOUNT_ID) {
            throw new Error('Missing required environment variables: ACCESS_TOKEN or INSTAGRAM_ACCOUNT_ID');
        }

        // Construct caption
        const CAPTION = `${discription.trim()} ${DEFAULT_HASHTAGS}`;

        // Prepare form data
        const form = new FormData();
        form.append('image_url', imageUrl);
        form.append('caption', CAPTION);
        form.append('access_token', ACCESS_TOKEN);

        // Step 1: Upload the image
        const uploadResponse = await axios.post(
            `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media`,
            form,
            { headers: form.getHeaders() }
        );

        const { id: mediaId } = uploadResponse.data;
        console.log(`Media uploaded successfully. Media ID: ${mediaId}`);

        // Step 2: Publish the post
        await axios.post(
            `https://graph.facebook.com/v18.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
            { creation_id: mediaId, access_token: ACCESS_TOKEN }
        );

        console.log('Post published successfully.');
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = { postToInstagram };
