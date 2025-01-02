import { NextApiRequest, NextApiResponse } from 'next';

// Define the knowledge base
const knowledgeBase = [
    { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
    { question: "How can I contact support?", answer: "You can contact support at support@example.com." },
    { question: "What services do you offer?", answer: "We provide academic writing services including essays, research papers, dissertations, and editing services." },
    { question: "How do I place an order?", answer: "You can place an order by visiting our website and filling out the order form." },
    { question: "What is your pricing structure?", answer: "Our pricing depends on the type of service, academic level, and deadline." },
    // Add more entries as needed
];

// Define greetings
const greetings = [
    { keyword: "hello", response: "Hello! How can I assist you today?" },
    { keyword: "hi", response: "Hi there! How can I help you?" },
    { keyword: "good morning", response: "Good morning! How can I assist you today?" },
    { keyword: "good afternoon", response: "Good afternoon! How can I help you?" },
    { keyword: "good evening", response: "Good evening! How can I assist you today?" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Check for greetings
        const foundGreeting = greetings.find(greeting => message.toLowerCase().includes(greeting.keyword));
        if (foundGreeting) {
            return res.status(200).json({ reply: foundGreeting.response });
        }

        // Check knowledge base for a matching question
        const foundEntry = knowledgeBase.find(entry => message.toLowerCase().includes(entry.question.toLowerCase()));
        if (foundEntry) {
            return res.status(200).json({ reply: foundEntry.answer });
        }

        // Call OpenAI API if no match found
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                }),
            });

            const data = await response.json();
            const reply = data.choices[0].message.content; // Get the reply from the API response

            res.status(200).json({ reply });
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(500).json({ error: 'Failed to get a response from OpenAI API' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}