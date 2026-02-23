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

      <h3 class="chapter-title">Chapter 1: About Portal-LLM</h3>
      <p>Portal-LLM lets you chat with your favorite book characters using the latest AI magic! Our Telegram bot brings
        fictional characters to life, making learning from stories interactive, engaging, and fun—especially for kids
        who might find traditional reading a drag.</p>

      <h3 class="chapter-title">Chapter 2: How It Works</h3>
      <ul>
        <li><strong>Telegram Bot Interface:</strong> No new app needed—just chat where you already do.</li>
        <li><strong>AI Brain:</strong> Powered by LLMs (like Gemini) and Langchain, with prompt engineering to make the
          AI act like your chosen character.</li>
        <li><strong>Knowledge & Memory:</strong> Uses Retrieval-Augmented Generation (RAG) and a vector database
          (Pinecone) to ground answers in real book content, plus MongoDB for chat memory.</li>
        <li><strong>Cloud Deployed:</strong> Runs on Microsoft Azure, with webhooks for real-time chat.</li>
      </ul>

      <h3 class="chapter-title">Chapter 3: What We Learned</h3>
      <p>Building this meant navigating messaging APIs, prompt engineering, RAG, vector databases, and cloud deployment.
        We also had to evaluate AI for accuracy and readability. A huge focus was on user-centered design for younger
        audiences, ensuring responses are always fun and easy to understand.</p>

      <h3 class="chapter-title">Chapter 4: Future Ideas</h3>
      <p>We're not stopping here. Next steps include adding group chats with multiple characters interacting at once,
        adding voice and image support to literally see and hear the characters, and developing an even smarter RAG
        pipeline for hyper-accurate lore answers.</p>
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
