<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Enterprise Production</span></dd>

        <dt>Roles:</dt>
        <dd>
          <strong><span class="warning-tag">Associate Software Engineer @ GoSaaS, Inc.</span></strong> (Sep 2026 – Present)<br />
          <strong><span class="warning-tag">Developer Advocate @ Educative, Inc.</span></strong> (Jun 2025 – Jul 2026)
        </dd>

        <dt>Technologies:</dt>
        <dd>
          <a class="ao3-tag-link">Oracle Fusion AI Agent Studio</a>,
          <a class="ao3-tag-link">Model Context Protocol (MCP)</a>,
          <a class="ao3-tag-link">Oracle FusionClaw</a>,
          <a class="ao3-tag-link">RAG Pipelines</a>,
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">Claude API</a>,
          <a class="ao3-tag-link">HubSpot</a>
        </dd>

        <dt>Highlights:</dt>
        <dd>
          <a class="ao3-tag-link">Oracle AI World 2026 Showcase</a>,
          <a class="ao3-tag-link">3.4M+ LinkedIn Impressions</a>,
          <a class="ao3-tag-link">30 Days of Code (595% Traffic Surge)</a>,
          <a class="ao3-tag-link">Trustpilot 2.5★ → 4.1★</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Impressions: <span>3.4M+</span>
          Webinar Reach: <span>17,000+</span>
          Campaign Signups: <span>~7,000</span>
          Email Opens: <span>1.5M+</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>From building production agentic AI workflows featured at <strong>Oracle AI World 2026</strong> as an Associate Software Engineer at GoSaaS, to scaling technical advocacy to <strong>3.4M+ LinkedIn impressions</strong> and spearheading <em>30 Days of Code</em> at Educative.</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: Enterprise Agentic AI @ GoSaaS &amp; Oracle AI World 2026</h3>
      <p>At GoSaaS, I co-developed an agentic <strong>Engineering Change Orders (ECO)</strong> application featured at <strong>Oracle AI World 2026</strong>. The system unifies live Oracle Fusion change queues, natural-language redline summaries, and automated engineering risk detection (catching skipped revisions and downstream work-order collisions), paired with <strong>Oracle FusionClaw</strong> autonomous multi-step workflows that triage urgent changes, draft approver follow-ups, and auto-generate leadership slide decks.</p>
      <p>Alongside ECO workflows, I architect and harden enterprise AI agents for official pre-release submission to Oracle across core Fusion modules—financials, supply chain, HR, customer experience, and product data—inside <strong>Oracle Fusion AI Agent Studio</strong>. Every agent integrates database business objects, REST APIs, <strong>Model Context Protocol (MCP)</strong> servers, and document RAG pipelines while enforcing strict citation grounding, role-based access control (RBAC) inheritance, and prompt-injection resilience.</p>

      <h3 class="chapter-title">Chapter 2: Scaling DevRel &amp; 30 Days of Code @ Educative</h3>
      <p>Previously at Educative, I scaled technical content and growth across LinkedIn, X, Instagram, and email lifecycles—generating <strong>3.4M+ LinkedIn impressions, 33K+ clicks, and 7,400+ new followers at a 5.9% CTR</strong>, while hosting <strong>8 live technical webinars reaching 17,000+ developers</strong>.</p>
      <p>I co-led Educative's flagship <strong>30 Days of Code</strong> campaign to revitalize interactive coding challenges, onboarding <strong>~7,000 new participants</strong>, driving a <strong>595% surge in site sessions</strong>, and generating <strong>1.5M+ email opens</strong> at a <strong>&gt;25% open rate</strong>, alongside ghostwriting CEO thought leadership and producing technical videos across Cloud Labs and System Design.</p>

      <h3 class="chapter-title">Chapter 3: AI Analytics &amp; The Trustpilot Turnaround (2.5★ → 4.1★)</h3>
      <p>To eliminate manual reporting bottlenecks, I engineered an AI-assisted social workflow, a team-wide <strong>HubSpot + Claude</strong> analytics dashboard, and a LinkedIn-monitoring Chrome Extension with Python scrapers—saving roughly <strong>20+ hours every month</strong>.</p>
      <p>I also built an NLP-based customer sentiment pipeline to diagnose user pain points and guide the Engineering product roadmap, orchestrating a reputation turnaround that elevated Educative's Trustpilot rating from <strong>2.5 to 4.1 stars</strong>.</p>
    </div>
  </div>
</template>

<style scoped>
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
