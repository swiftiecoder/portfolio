<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-g">General Audiences</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Medical Advice Provided By AI </span></strong></dd>

        <dt>Tech:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">PRAW</a>,
          <a class="ao3-tag-link">Regex</a>
        </dd>

        <dt>AI Models:</dt>
        <dd>
          <a class="ao3-tag-link">Gemma LLM (7B)</a>
        </dd>

        <dt>Tools & Methods:</dt>
        <dd>
          <a class="ao3-tag-link">Unsloth</a>,
          <a class="ao3-tag-link">LoRA</a>,
          <a class="ao3-tag-link">Alpaca Prompt Formatting</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Data Collection</a>,
          <a class="ao3-tag-link">LLM Finetuning</a>,
          <a class="ao3-tag-link">NLP for Social Good</a>,
          <a class="ao3-tag-link">Healthcare Accessibility</a>,
          <a class="ao3-tag-link">Reddit Scraping</a>,
          <a class="ao3-tag-link">Automoderator Angst</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2024-04-15</span>
          Chapters: <span>3/3</span>
          Kudos: <span>201</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Khpaltabib means 'My Doctor' in Pashto. It is an AI-powered medical chatbot designed to provide accessible
          healthcare advice, especially for people who might not have easy access to doctors or clinics, and in their
          own language. I worked on this project as a Research Intern at the Center for Speech and Language Technologies
          (CSaLT) at LUMS.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: The Data Hunt</h3>
      <p>My role was to build a high-quality dataset and train a state-of-the-art AI model to act like a helpful medical
        professional. To do this, I started by scraping real medical Q&A from r/AskDocs on Reddit using Python and PRAW.
        I had to filter specifically for verified physician responses and handle quirks like auto-moderator comments and
        flair variations.</p>
      <p>Once the raw data was collected, I jumped into data cleaning. I used regex and custom text-cleaning scripts to
        remove edits, links, and messy formatting, ensuring the data was perfectly AI-friendly.</p>

      <h3 class="chapter-title">Chapter 2: Training the Doctor</h3>
      <p>For the model itself, I finetuned Google's open-source Gemma LLM (7B). To do this efficiently on limited
        hardware, I utilized Unsloth and LoRA. The data was formatted in the Alpaca prompt style for best results.</p>
      <p>Testing involved running inference on the finetuned model to check its ability to answer new, open-ended
        medical questions in a helpful, doctor-like tone. Finally, I exported and saved the LoRA adapter for easy
        sharing and deployment, making the model portable and highly efficient.</p>

      <h3 class="chapter-title">Chapter 3: Reflection</h3>
      <p>This project was a fantastic hands-on experience in building a real-world AI application, from data scraping
        all the way to deploying a specialized chatbot. It was exciting to contribute to making healthcare more
        accessible and to learn the full pipeline of modern AI development!</p>
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
