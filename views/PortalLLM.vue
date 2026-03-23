<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-g">General Audiences</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Creator Chose Not To Use Standard Textbooks</span></strong></dd>

        <dt>Tech:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">JavaScript</a>,
          <a class="ao3-tag-link">TypeScript</a>,
          <a class="ao3-tag-link">Node.js</a>
        </dd>

        <dt>Integrations:</dt>
        <dd>
          <a class="ao3-tag-link">LangChain</a>,
          <a class="ao3-tag-link">Azure</a>,
          <a class="ao3-tag-link">Telegram API</a>
        </dd>

        <dt>Libraries & DBs:</dt>
        <dd>
          <a class="ao3-tag-link">MongoDB</a>,
          <a class="ao3-tag-link">Pinecone</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Vicarious Learning</a>,
          <a class="ao3-tag-link">RAG Pipelines</a>,
          <a class="ao3-tag-link">Prompt Engineering</a>,
          <a class="ao3-tag-link">Educational Tech</a>,
          <a class="ao3-tag-link">Making Reading Fun Again</a>,
          <a class="ao3-tag-link">Chatbots With Personalities</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2024-03-10</span>
          Chapters: <span>4/4</span>
          Bookmarks: <span>42</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Character-based vicarious learning via chatbots and RAG pipelines for education. Because sometimes the best
          way to learn from a story is to literally talk to the characters in it.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <img class="work-image" src="@/assets/Portal LLM/screenshot.jpg" alt="Portal-LLM Screenshot" />
      <p class="image-caption">Talking to characters on Telegram</p>

      <h3 class="chapter-title">Chapter 1: The Premise</h3>
      <p>What if you could literally interrogate Gatsby about his life choices? That was the premise of Portal-LLM. Designed to make reading interactive and engaging—especially for younger audiences—this project brings fictional characters to life through a standard Telegram bot, turning classic narratives into lively conversations.</p>

      <h3 class="chapter-title">Chapter 2: The Architecture</h3>
      <p>Building the illusion of talking to a fictional character requires a resilient tech stack. Instead of forcing users into a new app, I utilized the Telegram Bot Interface. The real magic happens behind the scenes: powered by models like Gemini and Langchain, heavy prompt engineering keeps the AI firmly in character.</p>
      <p>To prevent the AI from hallucinating a new plot, I implemented a Retrieval-Augmented Generation (RAG) pipeline backed by Pinecone (a vector database), ensuring answers are grounded in the actual book text. MongoDB handles the chat memory, and the entire system is deployed on Microsoft Azure using webhooks for real-time interaction.</p>

      <h3 class="chapter-title">Chapter 3: The Takeaway</h3>
      <p>This project was an intensive exercise in stringing together messaging APIs, evaluating RAG pipelines, and prompting LLMs until they behaved predictably. Beyond the technical challenges, the biggest takeaway was mastering user-centered design for younger readers—ensuring the output was always accessible, safe, and genuinely fun to interact with.</p>

      <h3 class="chapter-title">Chapter 4: What's Next</h3>
      <p>Future development aims to expand the immersion: enabling group chats where multiple book characters can argue with each other, adding voice generation for distinct character accents, and refining the RAG pipeline to capture even the most obscure lore.</p>
    </div>

  </div>
</template>

<style scoped>
/* Core AO3 CSS Reset for this component */
.ao3-work {
  font-family: 'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #2a2a2a;
  line-height: 1.6;
}

.ao3-meta-box {
  background: #f5f5f5;
  border: 1px solid #dddddd;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 2px;
}

.ao3-tags {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
  font-size: 0.95rem;
}

.ao3-tags dt {
  text-align: right;
  font-weight: bold;
  color: #111;
}

.ao3-tags dd {
  margin: 0;
  padding-bottom: 0.5rem;
}

.ao3-tags dl {
  margin: 0;
}

.tag-g {
  background-color: #008000;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.warning-tag {
  color: #990000;
}

.ao3-tag-link {
  color: #0000cc;
  text-decoration: none;
  cursor: url('/mouse2.cur'), pointer;
}

.ao3-tag-link:hover {
  text-decoration: underline;
  color: #990000;
}

.ao3-stats {
  color: #555;
}

.ao3-stats span {
  color: #111;
  font-weight: bold;
  margin-right: 15px;
}

.module {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;
}

.heading {
  font-family: 'Georgia', serif;
  color: #990000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.userstuff {
  margin-bottom: 1.5rem;
}

.userstuff p {
  margin-bottom: 1rem;
}

.userstuff ul {
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.userstuff li {
  margin-bottom: 0.5rem;
}

blockquote.userstuff {
  border-left: 2px solid #990000;
  padding-left: 1rem;
  margin: 0 0 1.5rem 1rem;
  color: #333;
}

.ao3-divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 2rem 0;
}

.chapter-title {
  font-family: 'Georgia', serif;
  text-align: center;
  color: #111;
  margin: 2.5rem 0 1.5rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.work-image {
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  padding: 4px;
  background: white;
}

.image-caption {
  text-align: center;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  margin-bottom: 2rem !important;
}

/* Make it responsive */
@media (max-width: 600px) {
  .ao3-tags {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .ao3-tags dt {
    text-align: left;
    margin-top: 0.5rem;
  }
}
</style>
