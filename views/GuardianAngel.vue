<template>
  <div class="px-1 md:px-4 lg:px-8 pt-4 pb-4">
    <img
      class="w-full h-auto mb-4"
      src="@/assets/GuardianAngel/watch_image.jpg"
      alt="Guardian Angel Watch Prototype"
    />
    <h2 class="font-bold text-2xl py-5">
      Guardian Angel: Building a Low-Cost Health Monitoring System
    </h2>
    <h4 class="text-gray-600 font-medium text-xs pb-2">
      Research Project • Embedded Systems • AI for Health • LUMS
    </h4>
    <div class="flex flex-wrap mt-5 gap-2 items-center">
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="ESP32"
        src="https://img.shields.io/badge/-ESP32-3C3C3C?logo=espressif&logoColor=white"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="C"
        src="https://img.shields.io/badge/-C-A8B9CC?logo=c&logoColor=black"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="Java"
        src="https://img.shields.io/badge/-Java-007396?logo=java&logoColor=white"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="Node.js"
        src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="OpenAI"
        src="https://img.shields.io/badge/-OpenAI-412991?logo=openai&logoColor=white"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="LangChain"
        src="https://img.shields.io/badge/-LangChain-000000?logo=langchain&logoColor=white"
      />
      <img
        class="w-auto h-5 rounded-none text-xs"
        alt="Android"
        src="https://img.shields.io/badge/-Android-3DDC84?logo=android&logoColor=white"
      />
    <img
      class="w-auto h-5 rounded-none text-xs"
      alt="WhatsApp"
      src="https://img.shields.io/badge/-WhatsApp-25D366?logo=whatsapp&logoColor=white"
    />
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Project Overview</h3>
      <p class="font-thin text-sm pb-2.5">
        Guardian Angel is a research project I worked on as a Research Assistant
        at the Embedded Systems & Networks Labs (SysNet/EmNets), LUMS. The goal
        was to democratize healthcare and wellness by developing an affordable
        smartwatch and backend system that could overcome economic and
        linguistic barriers, especially in resource-constrained settings.
      </p>
    </div>
    <div class="pt-7">
      <img
        class="w-full h-auto mb-2"
        src="@/assets/GuardianAngel/app-signup.jpg"
        alt="Guardian Angel App Signup Screen"
      />
      <h6 class="text-gray-600 font-medium text-xs text-center pb-2">
        Guardian Angel App Signup Screen
      </h6>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">
        What I Learned & Skills Applied
      </h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1">
          Designed and implemented a small-scale prototype using an ESP-32 and
          off-the-shelf sensors for initial proof-of-concept.
        </li>
        <li class="mb-1">
          Learned about GATT Bluetooth protocols and used BLE modules to
          transmit data efficiently, saving energy on the device.
        </li>
        <li class="mb-1">
          Helped write C code for the microcontroller and selected sensors for
          the final PCB version of the watch.
        </li>
        <li class="mb-1">
          Sourced lightweight libraries for a space-constrained MCU, including
          fixing a critical oximeter bug by replacing a library.
        </li>
        <li class="mb-1">
          Led a team of three, managed the project budget, and coordinated with
          research supervisors to keep progress on track.
        </li>
        <li class="mb-1">
          Developed an Android app in Java for data collection, intermediate
          processing (structuring into JSON), and secure transmission to the
          inference server.
        </li>
        <li class="mb-1">
          Used the Telegram Web API and Gemini's free plan to build an early
          chatbot prototype, which earned the highest grade in the course.
        </li>
        <li class="mb-1">
          Rebuilt the project in the EmNets lab, designing the tech stack to
          meet research goals for affordability and intuitiveness.
        </li>
        <li class="mb-1">
          Wrote and deployed an inference server in Node.js, using OpenAI and
          LangChain JS, and implemented in-context learning mechanisms like RAG
          and chain-of-thought prompting.
        </li>
        <li class="mb-1">
          Added function-calling capabilities to the server with custom tools,
          cron jobs, and prompt engineering for optimal results.
        </li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Impact & Reflection</h3>
      <p class="font-thin text-sm pb-2.5">
        Working on Guardian Angel taught me how to bridge embedded hardware,
        mobile development, and AI-driven backend systems. I learned to
        prioritize user needs, especially for those with low digital literacy,
        and to design for real-world constraints like cost and power. The
        project also gave me hands-on experience in team leadership, technical
        troubleshooting, and deploying solutions that can make a tangible
        difference in healthcare accessibility.
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
.text-center {
  text-align: center;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
