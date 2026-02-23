<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Research Prototype</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Major Hardware Complications Applied</span></strong></dd>

        <dt>Tech:</dt>
        <dd>
          <a class="ao3-tag-link">C</a>,
          <a class="ao3-tag-link">Java</a>,
          <a class="ao3-tag-link">Node.js</a>
        </dd>

        <dt>Integrations:</dt>
        <dd>
          <a class="ao3-tag-link">ESP-32</a>,
          <a class="ao3-tag-link">OpenAI / LangChain</a>,
          <a class="ao3-tag-link">Android / WhatsApp API</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Embedded Systems</a>,
          <a class="ao3-tag-link">AI for Health</a>,
          <a class="ao3-tag-link">Bluetooth Low Energy (BLE)</a>,
          <a class="ao3-tag-link">Resource Constrained Environments</a>,
          <a class="ao3-tag-link">Hardware Tinkering Angst</a>,
          <a class="ao3-tag-link">Team Leadership</a>
        </dd>

        <dt>Link:</dt>
        <dd>
          <a href="https://arxiv.org/abs/2602.08701" target="_blank" rel="noopener noreferrer"
            class="ao3-tag-link">arXiv:2602.08701</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2024-05-18</span>
          Chapters: <span>2/2</span>
          Kudos: <span>104</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Guardian Angel is a research project I worked on as a Research Assistant at the Embedded Systems & Networks
          Labs (SysNet/EmNets), LUMS. The goal was to democratize healthcare and wellness by developing an affordable
          smartwatch and backend system that could overcome economic and linguistic barriers, especially in
          resource-constrained settings.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <img class="work-image" src="@/assets/GuardianAngel/watch_image.jpg" alt="Guardian Angel Watch Prototype" />

      <h3 class="chapter-title">Chapter 1: The Hardware & Android Bridge</h3>

      <p>I designed and implemented a small-scale prototype using an ESP-32 and off-the-shelf sensors for initial
        proof-of-concept. This involved writing C code for the microcontroller and carefully selecting sensors for the
        final PCB version of the watch. Working within severe space constraints, I had to source lightweight libraries,
        at one point fixing a critical oximeter bug by completely replacing the underlying library.</p>

      <p>Data transmission was crucial for saving energy on the device. I learned about GATT Bluetooth protocols and
        used BLE modules to transmit data efficiently to an Android app I developed in Java. The mobile app handled data
        collection, intermediate processing (structuring into JSON), and secure transmission to the inference server.
      </p>

      <img class="work-image app-screenshot" src="@/assets/GuardianAngel/app-signup.jpg"
        alt="Guardian Angel App Signup Screen" />
      <p class="image-caption">Guardian Angel App Signup Screen</p>

      <h3 class="chapter-title">Chapter 2: The AI Backend & Impact</h3>

      <p>Rebuilding the project in the EmNets lab, I designed the tech stack to meet our rigorous research goals for
        affordability and intuitiveness. I wrote and deployed an inference server in Node.js, utilizing OpenAI and
        LangChain JS to implement in-context learning mechanisms like RAG and chain-of-thought prompting.</p>

      <p>We built early chatbot prototypes (including one using the Telegram Web API that earned the highest grade in
        the course) and integrated function-calling capabilities with custom tools and cron jobs for optimal, automated
        results.</p>

      <p>Working on Guardian Angel taught me how to bridge embedded hardware, mobile development, and AI-driven backend
        systems. I learned to prioritize user needs, especially for those with low digital literacy, and to design for
        real-world constraints like cost and power. The project gave me hands-on experience in leadership, technical
        troubleshooting, and deploying solutions that can make a tangible difference in healthcare accessibility.</p>
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

.tag-pg {
  background-color: #f1c40f;
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
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  padding: 4px;
  background: white;
}

.app-screenshot {
  max-width: 400px;
  display: block;
  margin: 2rem auto 0.5rem auto;
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
