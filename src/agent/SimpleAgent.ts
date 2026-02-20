import { vertexAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

export class SimpleAgent {

    async handleMessage(message: string) {

        // 2. Create the prompt for the AI with the list of names and the user input
        const ai = genkit({
            plugins: [vertexAI()],
            model: vertexAI.model('gemini-2.0-flash-lite')
        });

        const finalOutputSchema = z.object({
            items: z.array(z.string().describe("Name of the item in the grocery shopping list. Only the name.")).describe("List of items in the shopping list")
        })

        // 2.1. First iteration to get the list of items, but not in a structured way, just to let the AI do its best to interpret the user input and correct the mispelled items.
        let extractedList = await ai.generate({
            prompt: `
                You are a supermarket experts that knows all typical items that can be found in a supermarket in Denmark and Italy. 
                You know ALL the names of grocery items in English (main language), Danish and Italian (second languages). 
                You will receive lists of supermarket items (groceries shopping list) made by a user. 
                The list is made from a AI-generated transcript of an audio recording where the user recorded items to be bought at the supermarket. 

                Important: the transcript will MOST LIKELY contain errors as the user uses multiple languages, with the majority of items being dictated in English, but some in Danish and Italian. 
                The AI that transcribes the audio is english-speaking so Danish (mostly) and Italian (some) items will most likely be mispelled and look like gibberish to you. 

                Your task is to create the groceries shopping list from the transcript and CORRECT all the mispelled or misinterpreted item names. 

                ## Your task: 
                Create the groceries shopping list from the following transcription of the user's desires of items to be added to the list: 
                ${message} 
            `,
            output: {
                schema: finalOutputSchema
            }
        });

        console.log(extractedList.output!);


    }
}