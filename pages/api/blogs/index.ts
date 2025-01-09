import { NextApiRequest, NextApiResponse } from 'next';

let blogs = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
  { id: 3, title: 'Mastering the Art of Academic Writing', content: `Academic writing is a formal style of writing used in universities and scholarly publications. It is characterized by a clear focus on the research question, a structured approach, and a formal tone. This blog post aims to provide insights into the essential elements of academic writing, tips for improving your writing skills, and common pitfalls to avoid.

Understanding Academic Writing
Academic writing serves several purposes, including the presentation of research findings, the analysis of existing literature, and the argumentation of a thesis. It is crucial for students and researchers to master this skill, as it is often a requirement for academic success. The primary characteristics of academic writing include:

1. Clarity and Precision: Academic writing should be clear and precise. Avoid vague language and ensure that your arguments are well-supported by evidence.

2. Formal Tone: Use a formal tone and avoid colloquial language. Academic writing should be objective and free from personal bias.

3. Structured Format: Academic papers typically follow a structured format, including an introduction, literature review, methodology, results, discussion, and conclusion.

4. Citations and References: Properly cite all sources used in your research. This not only gives credit to the original authors but also strengthens your arguments.

Key Elements of Academic Writing
To excel in academic writing, it is essential to understand and implement the following key elements:

1. Thesis Statement: A strong thesis statement is the foundation of any academic paper. It should clearly state your main argument and guide the direction of your writing.

2. Research and Evidence: Academic writing relies heavily on research. Use credible sources to support your arguments and provide evidence for your claims.

3. Organization: Organize your writing logically. Each paragraph should focus on a single idea, and transitions between paragraphs should be smooth to maintain the flow of the paper.

4. Editing and Proofreading: Always revise your work. Editing and proofreading are crucial steps in the writing process. Look for grammatical errors, awkward phrasing, and ensure that your writing adheres to the required style guide.

Tips for Improving Academic Writing Skills
Improving your academic writing skills takes time and practice. Here are some tips to help you enhance your writing:

1. Read Academic Papers: Familiarize yourself with academic writing by reading scholarly articles in your field. Pay attention to the structure, tone, and style used by other authors.

2. Practice Writing Regularly: The more you write, the better you will become. Set aside time each week to practice writing on various topics.

3. Seek Feedback: Share your writing with peers or mentors and ask for constructive feedback. This can help you identify areas for improvement.

4. Utilize Writing Resources: Take advantage of writing centers, online resources, and workshops offered by your institution. These can provide valuable guidance and support.

Common Pitfalls to Avoid
While writing academically, it is essential to be aware of common pitfalls that can undermine your work:

1. Plagiarism: Always give credit to the original authors of the ideas and research you use. Plagiarism can have serious consequences in academia.

2. Overly Complex Language: While academic writing should be formal, avoid using overly complex language that may confuse readers. Aim for clarity and simplicity.

3. Neglecting the Audience: Consider your audience when writing. Tailor your writing style and content to meet the expectations of your readers.

4. Ignoring Guidelines: Adhere to the specific guidelines provided by your institution or publisher. This includes formatting, citation styles, and word limits.

Conclusion
Mastering the art of academic writing is essential for success in higher education and research. By understanding the key elements of academic writing, practicing regularly, and avoiding common pitfalls, you can improve your writing skills and produce high-quality academic papers. Remember, writing is a skill that can be developed over time, so be patient and persistent in your efforts.` },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(blogs);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const newBlog = { id: blogs.length + 1, title, content };
    blogs.push(newBlog);
    res.status(201).json(newBlog);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
