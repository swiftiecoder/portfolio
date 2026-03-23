<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Production Ready</span></dd>

        <dt>Role:</dt>
        <dd><strong><span class="warning-tag">Developer Advocate @ Educative</span></strong></dd>

        <dt>Technologies:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">Chrome Extensions</a>,
          <a class="ao3-tag-link">Automation</a>
        </dd>

        <dt>Highlights:</dt>
        <dd>
          <a class="ao3-tag-link">System Design</a>,
          <a class="ao3-tag-link">Cloud Labs</a>,
          <a class="ao3-tag-link">Trustpilot Turnaround</a>
        </dd>

        <dt>Tenure:</dt>
        <dd>June 2025 - Present</dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>As a Developer Advocate at Educative, I bridge the gap between engineering and marketing to build tools, generate insights, and curate high-fidelity technical content.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: The Automation Engine</h3>
      <p>It started with a simple desire: stop doing repetitive tasks. That desire birthed an array of custom automation tools—including Python scripts and a custom Chrome Extension—that successfully clawed back roughly 20 hours of lost time every month.</p>

      <h3 class="chapter-title">Chapter 2: The Trustpilot Turnaround</h3>
      <p>A major focus became reputation management. By analyzing customer sentiment and feedback patterns, I helped orchestrate a strategic turnaround that elevated our Trustpilot score from 2.5 to a solid 4.1 stars. These insights didn't just look good on paper; they directly guided the Product team's development roadmap.</p>

      <h3 class="chapter-title">Chapter 3: Content Architecture</h3>
      <p>Content creation needed to scale, so I architected an executive pipeline using Opal automation to source industry trends. This allowed me to ghostwrite technical thought leadership for the CEO, significantly amplifying page impressions and reader engagement.</p>
      <p>Beyond writing, I produced high-fidelity technical demos for Cloud Labs and System Design, leading product marketing efforts across social and email campaigns. By shifting to persona-based technical content, we drove a 26.3% increase in LinkedIn page views and fostered better alignment between our Engineering and Marketing teams.</p>
    </div>
  </div>
</template>

<style scoped>
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
