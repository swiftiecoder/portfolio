<template>
  <div class="px-4 md:px-16 lg:px-32 pt-8 pb-8">
    <h2 class="font-bold text-2xl py-5">Portal-LLM: Chatting Up Characters</h2>
    <h4 class="text-gray-600 font-medium text-xs" style="padding-bottom: 10px">
      Character-based vicarious learning via chatbots and RAG pipelines for education
    </h4>
    <div class="flex flex-wrap mt-5 gap-2 items-center">
      <img class="w-auto h-5 rounded-none text-xs" alt="Python" src="https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black" />
      <img class="w-auto h-5 rounded-none text-xs" alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white" />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="LangChain"
        src="https://img.shields.io/badge/-LangChain-000000?logo=langchain&logoColor=white"
      />
      <img class="w-auto h-5 rounded-none text-xs" alt="Azure" src="https://img.shields.io/badge/-Azure-0078D4?logo=microsoftazure&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Pinecone" src="https://img.shields.io/badge/-Pinecone-5FD3F3?logo=pinecone&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Telegram" src="https://img.shields.io/badge/-Telegram-26A5E4?logo=telegram&logoColor=white" />
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">About Portal-LLM</h3>
      <p class="font-thin text-sm pb-2.5">
        Portal-LLM lets you chat with your favorite book characters using the latest AI magic! Our Telegram bot brings fictional characters to life, making learning from stories interactive, engaging, and fun—especially for kids who might find traditional reading a drag.
      </p>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">How it Works</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1"><b>Telegram Bot Interface:</b> No new app needed—just chat where you already do.</li>
        <li class="mb-1"><b>AI Brain:</b> Powered by LLMs (like Gemini) and Langchain, with prompt engineering to make the AI act like your chosen character.</li>
        <li class="mb-1"><b>Knowledge & Memory:</b> Uses Retrieval-Augmented Generation (RAG) and a vector database (Pinecone) to ground answers in real book content, plus MongoDB for chat memory.</li>
        <li class="mb-1"><b>Cloud Deployed:</b> Runs on Microsoft Azure, with webhooks for real-time chat.</li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">What We Learned</h3>
      <p class="font-thin text-sm pb-2.5">
        Messaging APIs, prompt engineering, RAG, vector databases, cloud deployment, and how to evaluate AI for accuracy and readability. We focused on user-centered design for younger audiences, ensuring responses are fun and easy to understand.
      </p>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Future Ideas</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1">Group chats with multiple characters</li>
        <li class="mb-1">Voice and image support</li>
        <li class="mb-1">Even smarter RAG for more accurate answers</li>
      </ul>
    </div>
    <div class="pt-7">
      <img
        src="@/assets/Portal LLM/screenshot.jpg"
        alt="Portal-LLM Screenshot"
        class="hero"
      />
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  border: 1px solid rgb(0, 0, 0, 0.1);
}
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.gap-2 {
  gap: 0.5rem;
}
.items-center {
  align-items: center;
}
.mt-5 {
  margin-top: 1.25rem;
}
.pt-7 {
  padding-top: 1.75rem;
}
.font-bold {
  font-weight: bold;
}
.text-2xl {
  font-size: 1.5rem;
}
.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.text-gray-600 {
  color: #4b5563;
}
.font-medium {
  font-weight: 500;
}
.text-xs {
  font-size: 0.75rem;
}
.underline {
  text-decoration: underline;
}
.text-md {
  font-size: 1rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.font-thin {
  font-weight: 300;
}
.text-sm {
  font-size: 0.875rem;
}
.pb-2.5 {
  padding-bottom: 0.625rem;
}
.list-disc {
  list-style-type: disc;
}
.pl-5 {
  padding-left: 1.25rem;
}
.ml-4 {
  margin-left: 1rem;
}
ul {
  list-style-type: "* ";
  padding-left: 0.5rem !important;
}
ul li {
  display: list-item !important;
  list-style-type: "* ";
}
</style>
