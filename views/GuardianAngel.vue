<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">arXiv Preprint &amp; EWSN '24</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Sub-$13 Hardware &amp; Real-World Clinical Noise Applied</span></strong></dd>

        <dt>Tech &amp; Hardware:</dt>
        <dd>
          <a class="ao3-tag-link">ATmega328P</a>,
          <a class="ao3-tag-link">MAX30102 &amp; ADXL345</a>,
          <a class="ao3-tag-link">C / C++ Firmware</a>,
          <a class="ao3-tag-link">Java (Android BLE)</a>,
          <a class="ao3-tag-link">Node.js</a>
        </dd>

        <dt>AI &amp; Voice:</dt>
        <dd>
          <a class="ao3-tag-link">GPT-4o-mini / o3-mini / o1 Router</a>,
          <a class="ao3-tag-link">Pinecone Medical RAG</a>,
          <a class="ao3-tag-link">OpenAI Whisper (Urdu, Punjabi, English)</a>,
          <a class="ao3-tag-link">WhatsApp Bot</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">ICT4D / LMIC Health</a>,
          <a class="ao3-tag-link">Signal Restoration</a>,
          <a class="ao3-tag-link">Micro-Longitudinal Study</a>,
          <a class="ao3-tag-link">PhysioNet Validation</a>,
          <a class="ao3-tag-link">Senior Capstone Thesis</a>
        </dd>

        <dt>Link:</dt>
        <dd>
          <a href="https://arxiv.org/abs/2602.08701" target="_blank" rel="noopener noreferrer"
            class="ao3-tag-link">arXiv:2602.08701</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2026-02 (arXiv:2602.08701)</span>
          BOM Cost: <span>$12.72</span>
          Traces: <span>1,003 PhysioNet</span>
          Field Study: <span>20 Users (96h · 4,644 Logs)</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Built in the Embedded AI Lab (SysNet / EmNets) at LUMS, Guardian Angel (<em>"LLM-Enhanced Wearables for Comprehensible Health Guidance in LMICs"</em>) pairs a <strong>$12.72 screenless biometric wristband</strong> with a complexity-routed multilingual WhatsApp LLM agent to make vital-sign tracking genuinely usable for digitally low-literate populations. Featured as a poster at <strong>EWSN '24 (Abu Dhabi)</strong> and released on <a class="ao3-external-link" href="https://arxiv.org/abs/2602.08701" target="_blank" rel="noopener">arXiv:2602.08701</a>.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <img class="work-image" src="@/assets/GuardianAngel/watch_image.jpg" alt="Guardian Angel Watch Prototype" />

      <h3 class="chapter-title">Chapter 1: $12.72 Screenless Hardware &amp; Waveform Restoration</h3>

      <p>The constraints were unforgiving: build a wearable that actually works in low-income settings, yet keep bill-of-materials cost down to <strong>$12.72</strong>. Ditching expensive OLED screens, our team designed a screenless wristband around an <strong>ATmega328P MCU</strong>, MAX30102 PPG optical sensor, ADXL345 accelerometer, and thermistor wired with custom C/C++ duty-cycled firmware achieving <strong>&lt;500 μA sleep current</strong>.</p>

      <p>An Android companion app in Java handles custom Bluetooth Low Energy (BLE) framing and a 3rd-order Butterworth bandpass filter before relaying waveform windows to our LLM interpreter. Evaluated across <strong>1,003 PhysioNet clinical traces</strong> (BIDMC and Cuff-Less BP), our pipeline cut <strong>heart-rate MAE by 67% (11.96 vs. 36.10 BPM)</strong> and <strong>SpO₂ MAE by 41.6%</strong>, while boosting valid sensor availability from <strong>47.26% to 100%</strong>.</p>

      <img class="work-image app-screenshot" src="@/assets/GuardianAngel/app-signup.jpg"
        alt="Guardian Angel App Signup Screen" />
      <p class="image-caption">Guardian Angel Android BLE Companion Bridge</p>

      <h3 class="chapter-title">Chapter 2: Complexity-Routed Multi-LLM Agent &amp; Multilingual Voice</h3>

      <p>Instead of dumping raw BPM graphs onto users, I built a Node.js inference server backed by <strong>Pinecone medical-literature RAG</strong> and a dynamic query-complexity router dispatching across <strong>GPT-4o-mini, o3-mini, and o1</strong>. Compared to an o1-only baseline across <strong>N = 150 blind human evaluations</strong>, our router cut LLM API costs by <strong>56.57%</strong> while earning a <strong>63.33% blind user preference</strong>.</p>

      <p>To eliminate literacy barriers entirely, WhatsApp voice messages are transcribed through an <strong>OpenAI Whisper</strong> pipeline supporting <strong>Urdu, Punjabi, and English</strong>—turning conversational voice notes into structured clinical telemetry checks and personalized guidance.</p>

      <h3 class="chapter-title">Chapter 3: 96-Hour Field Deployment (4,644 Interactions)</h3>

      <p>Leading a 3-member student research team, I ran a <strong>96-hour micro-longitudinal in-the-wild deployment with 20 digitally low-literate participants</strong>, logging <strong>4,644 real-world interactions</strong> alongside pre/post surveys, semi-structured interviews, and thematic coding. The deployment yielded measurable gains in both participant health-data accessibility (<strong>+1.85 / 5.0 Likert</strong>) and daily heart-rate mindfulness (<strong>+1.70 / 5.0 Likert</strong>).</p>
    </div>

    <!-- Final Notes -->
    <div class="userstuff module end-notes">
      <h3 class="landmark heading">End Notes:</h3>
      <blockquote class="userstuff">
        <p>Read the full preprint and EWSN '24 poster proceedings:</p>
        <p>&rsaquo; <a class="ao3-external-link" href="https://arxiv.org/abs/2602.08701" target="_blank" rel="noopener">Read the Preprint on arXiv (arXiv:2602.08701)</a></p>
      </blockquote>
    </div>

  </div>
</template>

<style scoped>
/* Core AO3 CSS Reset for this component */
.ao3-work {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
.ao3-external-link {
  color: #990000;
  font-weight: bold;
  text-decoration: underline;
  cursor: url('/mouse2.cur'), pointer;
}

.ao3-external-link:hover {
  color: #cc0000;
}

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
