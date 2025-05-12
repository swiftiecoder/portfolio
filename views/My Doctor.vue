<template>
  <div class="px-4 md:px-16 lg:px-32 pt-8 pb-8">
    <h2 class="font-bold text-2xl py-5">Khpaltabib: AI Medical Chatbot</h2>
    <h4 class="text-gray-600 font-medium text-xs" style="padding-bottom: 10px">
      AI-powered healthcare advice in local languages • Data Collection • LLM Finetuning • NLP for Social Good
    </h4>
    <div class="flex flex-wrap mt-5 gap-2 items-center">
      <img class="w-auto h-5 rounded-none text-xs" alt="Python" src="https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="PRAW" src="https://img.shields.io/badge/-PRAW-FF4500?logo=reddit&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Regex" src="https://img.shields.io/badge/-Regex-000000?logo=regex&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Gemma LLM" src="https://img.shields.io/badge/-Gemma%20LLM-4285F4?logo=google&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Unsloth" src="https://img.shields.io/badge/-Unsloth-00BFFF?logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="LoRA" src="https://img.shields.io/badge/-LoRA-8A2BE2?logoColor=white" />
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">About Khpaltabib</h3>
      <p class="font-thin text-sm pb-2.5">
        Khpaltabib means 'My Doctor' in Pashto. is an AI-powered medical chatbot designed to provide accessible healthcare advice, especially for people who might not have easy access to doctors or clinics, and in their own language (like Pashto). My role was to build a high-quality dataset and train a state-of-the-art AI model to act like a helpful medical professional. I worked on this project as a Research Intern at the Center for Speech and Language Technologies (CSaLT) at LUMS.
      </p>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">How I Built It</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1"><b>Data Collection:</b> Scraped real medical Q&A from r/AskDocs on Reddit using Python and PRAW, filtering for verified physician responses and handling quirks like auto-moderator comments and flair variations.</li>
        <li class="mb-1"><b>Data Cleaning:</b> Used regex and <code>clean_text</code> to remove edits, links, and messy formatting, ensuring the data was AI-friendly.</li>
        <li class="mb-1"><b>Model Training:</b> Finetuned Google's open-source Gemma LLM (7B) using Unsloth and LoRA for efficient training on limited hardware. Data was formatted in the Alpaca prompt style for best results.</li>
        <li class="mb-1"><b>Testing:</b> Ran inference on the finetuned model to check its ability to answer new medical questions in a helpful, doctor-like tone.</li>
        <li class="mb-1"><b>Exporting:</b> Saved the LoRA adapter for easy sharing and deployment, making the model portable and efficient.</li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Skills & Tools Learned</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1">API interaction, data filtering, and error handling in Python</li>
        <li class="mb-1">Text preprocessing and regex for data cleaning</li>
        <li class="mb-1">LLM finetuning with LoRA and Unsloth</li>
        <li class="mb-1">Prompt formatting (Alpaca style) and model inference</li>
        <li class="mb-1">Saving and sharing LoRA adapters for efficient deployment</li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Reflection</h3>
      <p class="font-thin text-sm pb-2.5">
        This project was a fantastic hands-on experience in building a real-world AI application, from data scraping to deploying a specialized chatbot. It was exciting to contribute to making healthcare more accessible and to learn the full pipeline of modern AI development!
      </p>
    </div>
  </div>
</template>

<style scoped>
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
