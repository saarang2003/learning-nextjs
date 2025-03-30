// pages/api/recipes.ts
'use server'
import axios from 'axios';

const APP_ID = '175f0b77'; // API credentials
const APP_KEY = '82d4f25cd0a053f1aeddcec159a0cdfb'; // API credentials

export default async function handler(req: any, res : any) {
  const { search } = req.query;

  try {
    const response = await axios.get(
      `http://edamam.com/results/recipes/?search=search`, {
        params: {
          q: search,
          app_id: APP_ID,
          app_key: APP_KEY,
        }
      }
    );
    res.status(200).json(response.data); // Send the response back to the client
  } catch (error) {
    console.error('Failed to fetch recipe', error);
    res.status(500).json({ message: 'Failed to fetch recipe data' });
  }
}
