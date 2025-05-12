# Chatting Up Characters: What We Learned Building a Bot to Bring Stories to Life

Ever feel like you wish you could *actually* talk to your favorite book characters? Maybe ask Harry Potter what it's *really* like to fight Voldemort, or ask Hermione Granger for study tips?

In a world where everyone's glued to short videos, getting younger folks excited about reading and long stories can be tough. Traditional reading is awesome, but sometimes, interacting with the characters only happens in your head, or *strictly* within the author's words.

We had an idea: what if we could use the latest AI magic, specifically those big Large Language Models (LLMs), to let you *chat* with these characters? Not just reading what they say in the book, but having a real back-and-forth conversation, almost like they stepped out of the pages and into your phone.

That's how **Portal-LLM** was born! Our goal was to make learning from stories more interactive, engaging, and frankly, just more fun, especially for kids who might find traditional reading a bit of a drag. Building this wasn't just about coding; it was a crash course in modern AI tools and thinking about how people, especially younger ones, learn and interact today.

Here's a peek behind the scenes at how we built it, and what skills we picked up along the way:

## Phase 1: The Interface - Making it Easy to Chat (Hint: It's Already on Your Phone!)

First, we had to figure out *where* you'd actually talk to these characters. We could build a brand new app, but let's be real – getting people to download *another* app is a barrier, especially in places where phone storage or data might be limited.

So, we looked at what people *already* use constantly. The answer was loud and clear: **chatting apps!** Specifically, we decided to build Portal-LLM as a **Telegram bot**. Why Telegram? It's super popular in many parts of the world, easy to use, and has a solid system for developers to build bots.

*   **What we learned:** How to work with messaging app APIs! Connecting our code to Telegram meant learning how to receive messages, send replies, and handle user inputs within a chat format. It's a totally different way of building an interface compared to a traditional website or app.

## Phase 2: The Server - Building the Brain (Where the AI Magic Happens)

Okay, you can send a message via Telegram, but how does that turn into a conversation with a fictional character? That's the job of the backend server – the real "brain" of Portal-LLM. This is where the LLMs live and do their thing.

We used tools like **Langchain** to help us chain together different AI steps. The core challenge here was making a powerful, general-purpose LLM (we experimented with Google's **Gemini** models) *act* specifically like Harry Potter, or Hermione, or whoever the user wanted to chat with.

*   **Making the AI a Character:** This was all about **Prompt Engineering**. We learned that *how* you ask the LLM to behave matters *a lot*. We designed special instructions (prompts) to tell the AI things like "Okay, now you *are* Rubeus Hagrid. Talk like him. Use his words." We even had one prompt just to figure out if the user was trying to tell the bot to change characters!
*   **Giving the AI Knowledge:** An LLM knows a lot about the world, but it doesn't automatically know every detail from *every* book. To make the characters sound like they actually know what they're talking about, especially about specific book details, we used a technique called **Retrieval-Augmented Generation (RAG)**. We essentially built a digital "library" of the book's text. When you ask a question about the book, the system quickly finds the relevant parts of the text and gives them to the LLM as "context."
    *   *Cool RAG trick:* We even figured out how to let users upload their *own* documents (maybe fan fiction, or notes) and add that to the AI's knowledge base for the conversation. We learned about vector databases (**Pinecone**) to store and search this information efficiently.
*   **Giving the AI a Memory:** A real conversation needs memory! The system had to remember who you were talking to (which character) and what you talked about before. We used a database (**MongoDB**) to store your chosen character and recent chat history.
*   **What we learned:** This phase was packed with learning! We dived deep into how LLMs work, the art of prompt engineering to control AI behavior, building complex AI pipelines with tools like Langchain, setting up databases for state management, and understanding the power of RAG to make AI responses specific and grounded in information.

## Phase 3: The Deployment - Getting it Out There

Having the brain and the interface code is one thing, but making it available for anyone to use is another. We had to put our server online so the Telegram bot could reach it.

We deployed our system on **Microsoft Azure**. This is where you learn the practicalities of web hosting and making sure your application is running smoothly and can handle incoming messages.

*   **What we learned:** The basics of cloud deployment! We figured out how to get our code running on a remote server, set up webhooks (so Telegram knows where to send messages), and manage resources. It was also a lesson in working with real-world constraints – our initial deployment was on a free student account, so we knew it wouldn't run forever, which is a key part of development planning.

## Phase 4: The Testing - Did it Actually Work?

Building something cool is great, but you have to check if it *actually* does what you intended. For Portal-LLM, we needed to see if the characters were accurate and if their responses were easy to understand.

*   **Accuracy Check:** We tested the characters' knowledge using Harry Potter trivia questions. We manually checked if their answers were Correct, Partially Correct, or Incorrect. This helped us see which LLMs and RAG setups worked best.
*   **Readability Check:** Since the goal is educational engagement, especially for younger audiences, the character's responses couldn't be overly complicated. We used tools to calculate standard readability scores (like Flesch and Dale-Chall) on the AI's responses.
*   **What we learned:** How to evaluate AI systems beyond just basic functionality. We learned how to set up benchmarks, analyze different AI models and techniques (like different RAG embedding types), and use established metrics (like readability scores) to judge the quality and suitability of the output for our target users.

## So, What Skills Did We Really Apply?

Looking back, this project wasn't just about one thing. It was a mix of:

*   **AI/ML:** Working directly with LLMs, understanding their capabilities and limitations, using RAG.
*   **Programming:** Building a backend server (Flask, Node.js - depending on implementation, our paper mentions Node.js and Flask is mentioned in the flow chart context), connecting different APIs (Telegram, OpenAI/Gemini), setting up databases.
*   **System Design:** Thinking about how all the different pieces (bot, app, server, database, AI) fit together and talk to each other.
*   **Problem Solving:** Figuring out how to make an AI act like a character, how to give it specific knowledge, how to handle conversation memory, and dealing with things like API rate limits.
*   **User-Centered Thinking:** Constantly thinking about *who* would use this (younger audiences) and *how* they would use it (via chat, natural language), and designing for their needs (easy interface, understandable responses).
*   **Evaluation:** Learning how to measure success and identify areas for improvement.

## The Future Looks Fun!

This was just the start! We're already dreaming up ways to make Portal-LLM even cooler:

*   **Group Chats:** Imagine Harry, Ron, and Hermione *all* in the same chat! We're looking into "agentic workflows" to make AIs interact with each other and the user simultaneously.
*   **Voice and Pictures:** What if you could *talk* to the character and they could send you pictures? Adding multi-modality (voice input, image output) would make it way more immersive.
*   **Smarter RAG:** Using more advanced ways to search and retrieve information could make the characters even more knowledgeable and less prone to making stuff up.

Overall, building Portal-LLM was a fantastic experience. It showed us how powerful and versatile LLMs can be when combined with thoughtful design and a focus on user needs. We built something that potentially makes learning narratives more interactive and engaging, and learned a ton of valuable skills along the way!