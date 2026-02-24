<template>
  <div class="microfiche-record">
    <div class="mf-header-section">
      <div class="mf-title-block">
        <h1>SPECIMEN FILE</h1>
        <div class="mf-id">RECORD ID: BI-VII-169</div>
      </div>
      <div class="mf-photo-box">
        <img src="@/assets/Biography/self2.png" alt="Subject Photo" />
      </div>
    </div>

    <table class="mf-table">
      <tbody>
        <tr>
          <td class="mf-label">SUBJECT</td>
          <td>SHAHARYAR AHSAN (SHERRY)</td>
          <td class="mf-label">LOCATION</td>
          <td>LAHORE, PAKISTAN 📍</td>
        </tr>
        <tr>
          <td class="mf-label">EDUCATION</td>
          <td colspan="3">B.S. COMPUTER SCIENCE, LAHORE UNIVERSITY OF MANAGEMENT SCIENCES (LUMS) <br/> GRADUATED: SUMMER 2025</td>
        </tr>
        <tr>
          <td class="mf-label">ACADEMICS</td>
          <td colspan="3">GPA: 3.80/4.00 (MAJOR: 3.87) | DEAN'S HONOR LIST | MERIT SCHOLARSHIP</td>
        </tr>
      </tbody>
    </table>

    <div class="mf-section">
      <div class="mf-section-title">SKILL DATABANK</div>
      <div class="mf-skills-grid">
        <div class="mf-skill-row">
          <span class="mf-skill-cat">LANGUAGES</span>
          <span class="mf-skill-list">PYTHON, R, JAVA, JAVASCRIPT, TYPESCRIPT, C, C++, HTML5, CSS3, LATEX</span>
        </div>
        <div class="mf-skill-row">
          <span class="mf-skill-cat">FRAMEWORKS & LIB</span>
          <span class="mf-skill-list">MERN STACK, REACT, NODE.JS, PANDAS, MATPLOTLIB, NLTK, SCI-KIT LEARN, HUGGING FACE</span>
        </div>
        <div class="mf-skill-row">
          <span class="mf-skill-cat">DB & TOOLS</span>
          <span class="mf-skill-list">SQL, MONGODB, MATLAB, FIGMA, LUCIDCHART, GITHUB, CURSOR, ANTIGRAVITY, GIT, AGILE</span>
        </div>
      </div>
    </div>

    <div class="mf-section">
      <div class="mf-section-title">SUBJECT SUMMARY</div>
      <p class="mf-text">
        Subject is a CS graduate passionate about data science, machine learning, and NLP—especially computational hermeneutics and linguistic analysis for social impact. Currently serving as a Developer Advocate at Educative. Driven by a desire to build impactful, accessible technology and to contribute to research and open-source communities.
      </p>
    </div>

    <div class="mf-section">
      <div class="mf-section-title">EMPLOYMENT RECORD</div>
      <table class="mf-employment-table">
        <thead>
          <tr>
            <th>ROLE</th>
            <th>ORGANIZATION</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TEACHING ASSISTANT</td>
            <td>LUMS (CS 100, SS 100, MGMT 348)</td>
            <td>SEP 23 - DEC 24</td>
          </tr>
          <tr>
            <td colspan="3" class="mf-subtext">Assisted in creating/grading lab tasks, led project groups, taught citation skills.</td>
          </tr>
          
          <tr>
            <td>RESEARCH ASSISTANT</td>
            <td>LUMS (CSALT & EMBEDDED AI LABS)</td>
            <td>JAN 24 - JULY 25</td>
          </tr>
          <tr>
            <td colspan="3" class="mf-subtext">AI-driven healthcare, NLP for low-resource langs. Built prototypes/designed tech stacks.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mf-section">
      <div class="mf-section-title">KEY DIRECTORIES</div>
      <ul class="mf-file-list">
        <li>&gt; <a href="/files/shaharyar_resume.pdf" target="_blank" rel="noopener">DOWNLOAD // RESUME.PDF</a></li>
        <li>&gt; <a href="/files/shaharyar_acad_cv.pdf" target="_blank" rel="noopener">DOWNLOAD // ACADEMIC_CV.PDF</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Microfiche Aesthetic Styles */
.microfiche-record {
  font-family: 'Courier Prime', monospace;
  color: #1a2035;
  text-transform: uppercase;
  max-width: 800px;
  margin: 0 auto;
}

.mf-header-section {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #1a2035;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.mf-title-block h1 {
  font-size: clamp(1.6rem, 5vw, 2.5rem);
  margin: 0 0 10px 0;
  letter-spacing: -1px;
  font-weight: bold;
}

.mf-id {
  background: #1a2035;
  color: #e8f4f8;
  display: inline-block;
  padding: 4px 10px;
  font-weight: bold;
}

.mf-photo-box {
  width: 120px;
  border: 2px solid #1a2035;
  padding: 4px;
}

.mf-photo-box img {
  width: 100%;
  height: auto;
  filter: grayscale(100%) contrast(1.5) sepia(0.2); /* Make the photo match the aesthetic */
}

/* Tables */
.mf-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.mf-table td {
  border: 1px solid #1a2035;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.mf-label {
  font-weight: bold;
  background: rgba(26, 32, 53, 0.1);
  width: 120px;
}

/* Sections */
.mf-section {
  margin-bottom: 30px;
}

.mf-section-title {
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 1px dashed #1a2035;
  margin-bottom: 10px;
  padding-bottom: 4px;
}

/* Skills */
.mf-skills-grid {
  border: 1px solid #1a2035;
}

.mf-skill-row {
  display: flex;
  border-bottom: 1px solid #1a2035;
}

.mf-skill-row:last-child {
  border-bottom: none;
}

.mf-skill-cat {
  min-width: 120px;
  width: 140px;
  flex-shrink: 0;
  padding: 8px;
  background: rgba(26, 32, 53, 0.1);
  font-weight: bold;
  border-right: 1px solid #1a2035;
}

.mf-skill-list {
  padding: 8px;
  flex: 1;
}

/* Text & Employment */
.mf-text {
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
}

.mf-employment-table {
  width: 100%;
  border-collapse: collapse;
}

.mf-employment-table th {
  text-align: left;
  border-bottom: 2px solid #1a2035;
  padding: 8px;
  font-weight: bold;
}

.mf-employment-table td {
  padding: 8px;
  font-size: 0.95rem;
}

.mf-subtext {
  padding: 0 8px 16px 8px !important;
  font-size: 0.85rem !important;
  font-style: italic;
  color: #444;
}

/* File Links */
.mf-file-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mf-file-list li {
  margin-bottom: 8px;
}

.mf-file-list a {
  color: #1a2035;
  text-decoration: none;
  font-weight: bold;
}

.mf-file-list a:hover {
  background: #1a2035;
  color: #e8f4f8;
}

@media (max-width: 600px) {
  .mf-header-section {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .mf-photo-box {
    width: 80px;
    margin-bottom: 12px;
  }

  .mf-table td {
    font-size: 0.8rem;
    padding: 6px 8px;
  }

  .mf-skill-row {
    flex-direction: column;
  }

  .mf-skill-cat {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #1a2035;
  }

  .mf-employment-table th,
  .mf-employment-table td {
    font-size: 0.8rem;
    padding: 5px 6px;
  }
}
</style>
