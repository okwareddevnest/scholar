import { NextApiRequest, NextApiResponse } from 'next';
import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['en'] });
manager.addDocument('en', 'What is your return policy?', 'knowledge.return_policy');
manager.addDocument('en', 'How do I contact support?', 'knowledge.contact_support');
manager.addDocument('en', 'hello', 'greeting.hello');
manager.addDocument('en', 'hi', 'greeting.hello');
manager.addDocument('en', 'help', 'request.help');
manager.addDocument('en', 'bye', 'farewell.bye');
manager.train().then(() => {
    console.log('NLP model trained');
});

// Define interfaces for the objects
interface KnowledgeEntry {
    question: string;
    answer: string;
}

interface Greeting {
    keyword: string;
    response: string;
}

let conversationContext: { [key: string]: string } = {};
let dynamicKnowledgeBase: KnowledgeEntry[] = [];

// Function to update the knowledge base dynamically
const updateKnowledgeBase = (newEntry: KnowledgeEntry) => {
    dynamicKnowledgeBase.push(newEntry);
};

// Function to fetch answers from the knowledge base
const fetchAnswer = (question: string): string => {
    const entry = [...knowledgeBase, ...dynamicKnowledgeBase].find(k => k.question.toLowerCase() === question.toLowerCase());
    return entry ? entry.answer : "I'm sorry, I don't have an answer for that.";
};

// Define the knowledge base
const knowledgeBase: KnowledgeEntry[] = [
    { question: "What is your return policy?", answer: "You can return any item within 30 days of purchase." },
    { question: "How do I contact support?", answer: "You can contact support via email at support@example.com." },
    // ...other entries
];

const chatbotHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userInput = req.body.input;
    let response: string;

    // Use NLP for intent recognition
    const result = await manager.process('en', userInput);
    if (result.intent === 'greeting.hello') {
        response = 'Hello! How can I assist you today?';
    } else if (result.intent === 'request.help') {
        response = 'Sure! What do you need help with?';
    } else if (result.intent === 'farewell.bye') {
        response = 'Goodbye! Have a great day!';
    } else {
        response = fetchAnswer(userInput);
    }

    // Optionally log the conversation context
    conversationContext[userInput] = response;

    res.status(200).json({ response });
};

export default chatbotHandler;