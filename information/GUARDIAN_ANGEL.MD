# Lessons from Building Guardian Angel: Skills Gained Developing a Low-Cost Health Monitoring System

Working on Guardian Angel—a health monitoring system designed for resource-constrained settings—was a transformative experience that pushed me to grow as both an engineer and a problem-solver. This project wasn’t just about building a device; it was about understanding real-world constraints, making tough trade-offs, and applying a wide range of technical and human-centered skills.

## Embracing Constraints: Designing the Watch

One of my biggest takeaways was the importance of ruthless prioritization. Designing the wearable band, I learned how to optimize for cost and simplicity. Choosing to go screenless wasn’t just a technical decision—it was about empathy for users with low digital literacy and limited resources. I honed my skills in hardware selection, balancing the need for meaningful health data with the realities of budget and power consumption. Working with components like the ADXL345 accelerometer and MAX30102 PPG sensor, I deepened my understanding of sensor integration and low-power design. Developing firmware around a strict state machine taught me how to write efficient, reliable embedded code.

## Bridging Hardware and Software: Building the App

Developing the companion Android app was a crash course in cross-platform thinking. I had to ensure seamless BLE communication, robust background data collection, and user-friendly onboarding—all while keeping the interface minimal. I sharpened my skills in mobile development (Java, FastBLE), signal processing (applying filters and anomaly detection), and designing for users who might be new to digital health tools. Handling unreliable connectivity and implementing local caching taught me resilience in software design.

## Orchestrating Intelligence: Architecting the Backend

The backend was where I truly stretched my abilities. Building a system that could process continuous sensor data, manage user interactions, and leverage LLMs for personalized insights required me to master Node.js, MongoDB, and orchestration frameworks like LangChain. I learned how to design dual data pipelines, implement adaptive model selection for cost efficiency, and dynamically contextualize LLM prompts. Integrating agentic tools and WhatsApp APIs pushed me to think beyond traditional backend logic, blending AI with real-world user needs.

## Meeting Users Where They Are: Deployment and User Research

Deploying Guardian Angel via WhatsApp was a lesson in user-centered design. I realized that technology adoption isn’t just about features—it’s about meeting people on platforms they already trust. Conducting a micro-longitudinal study in Lahore, I gained hands-on experience in user research, data collection, and ethical considerations like informed consent and anonymization. Analyzing interaction logs and survey data helped me appreciate the value of both quantitative and qualitative feedback.

## Validating Impact: Testing and Evaluation

Testing Guardian Angel was where everything came together. Benchmarking our LLM-based approach against traditional algorithms taught me how to design fair, rigorous evaluations. I learned to interpret metrics like MAE, data availability, and user engagement, and to communicate findings in a way that highlighted both technical performance and real-world impact. Seeing positive shifts in user perceptions and engagement was incredibly rewarding.

## Final Reflections

Building Guardian Angel was more than a technical challenge—it was a journey in empathy, adaptability, and holistic problem-solving. I learned to prioritize affordability, design for simplicity, and leverage platforms users already trust. Most importantly, I saw firsthand how thoughtful engineering can bridge gaps in health literacy and access. These lessons and skills will shape how I approach every project going forward.
