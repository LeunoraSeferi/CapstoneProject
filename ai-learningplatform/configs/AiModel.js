const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const generationConfig2={
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}


  export const courseOutlineAIModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Generate a study material for the book "Laravel: Up & Running – A Framework for Building Modern PHP Apps" as a "Coding Prep" course.  
                  The difficulty level is "Moderate".  
                   Please include:
              - A brief summary of the entire course/book.
              - A list of chapters with a short summary for each chapter.
              - A topic breakdown for each chapter (key concepts or subtopics).
              - Return the response in structured JSON format.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```json\n" +
              JSON.stringify({
                courseTitle: "Laravel: Up & Running - Coding Prep",
                difficulty: "Moderate",
                summary: "This course prepares you for a deep dive into \"Laravel: Up & Running - A Framework for Building Modern PHP Apps.\" We'll cover the fundamental concepts and components of the Laravel framework, enabling you to effectively learn and apply the knowledge from the book. The course focuses on practical understanding and prepares you to build modern, robust PHP applications using Laravel.",
                chapters: [
                  {
                    chapterNumber: 1,
                    title: "Introduction to Laravel and PHP Fundamentals",
                    summary: "This chapter establishes a solid foundation in PHP and introduces the Laravel framework, its advantages, and its ecosystem.",
                    topics: [
                      "PHP basics (variables, data types, operators, control structures)",
                      "Object-Oriented Programming (OOP) in PHP",
                      "Introduction to MVC architecture",
                      "Overview of Laravel's features and benefits",
                      "Setting up a Laravel development environment"
                    ]
                  },
                  {
                    chapterNumber: 2,
                    title: "Routing and Controllers",
                    summary: "This chapter covers routing mechanisms and controller usage.",
                    topics: [
                      "Defining routes (GET, POST, etc.)",
                      "Route parameters and wildcards",
                      "Creating and using controllers",
                      "Route groups and middleware"
                    ]
                  },
                  {
                    chapterNumber: 3,
                    title: "Views and Blade Templating",
                    summary: "Learn to create dynamic front-ends using Laravel's Blade engine.",
                    topics: [
                      "Using Blade directives",
                      "Passing data to views",
                      "Layouts and reusable components"
                    ]
                  },
                  {
                    chapterNumber: 4,
                    title: "Eloquent ORM and Databases",
                    summary: "This chapter focuses on database interactions using Eloquent ORM.",
                    topics: [
                      "Defining models",
                      "Migrations",
                      "CRUD operations",
                      "Relationships (one-to-many, many-to-many)"
                    ]
                  },
                  {
                    chapterNumber: 5,
                    title: "Forms and Validation",
                    summary: "Creating and validating user input forms.",
                    topics: [
                      "Form creation and submission",
                      "Validation rules",
                      "Custom validation messages"
                    ]
                  },
                  {
                    chapterNumber: 6,
                    title: "Authentication and Authorization",
                    summary: "Implementing login, registration, and access control.",
                    topics: [
                      "Laravel Breeze/Jetstream authentication",
                      "Middleware for route protection",
                      "Roles and permissions"
                    ]
                  }
                ]
              }, null, 2) +
              "\n```"
          },
        ],
      },
    ],
  });


  export const generateNotesAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Generate exam material detail content for each chapter, make sure to use heading and paragraph structure. The chapter is "Introduction to Laravel".`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `
<h3>Chapter 1: Introduction to Laravel</h3>

<p>This chapter introduces the Laravel framework, its key features, and benefits compared to other PHP frameworks. It also covers setting up your development environment.</p>

<h4>1.1 What is Laravel?</h4>
<p>Define Laravel. Discuss its purpose and role in web application development. Explain its popularity and the community support available.</p>

<h4>1.2 Key Features and Benefits</h4>
<p>List and explain the core features of Laravel. This includes, but is not limited to: routing, templating (Blade), Eloquent ORM, database migrations, controllers, middleware, and built-in security features. Compare and contrast Laravel's features with those of other popular PHP frameworks (e.g., Symfony, CodeIgniter).</p>

<h4>1.3 Setting up a Development Environment</h4>
<p>Provide step-by-step instructions on setting up a Laravel development environment. This includes:</p>
<ul>
  <li>Installing PHP (specify required version)</li>
  <li>Installing Composer</li>
  <li>Setting up a web server (e.g., Apache, Nginx)</li>
  <li>Installing a database system (e.g., MySQL, PostgreSQL)</li>
  <li>Configuring your database connection</li>
  <li>Verifying the installation</li>
</ul>

<h4>1.4 Laravel's Directory Structure</h4>
<p>Explain the organization of files and folders within a typical Laravel application. Describe the purpose of each key directory (e.g., <code>app</code>, <code>config</code>, <code>database</code>, <code>public</code>, <code>resources</code>, <code>routes</code>, <code>storage</code>, <code>tests</code>).</p>

<h4>1.5 Understanding MVC Architecture in Laravel</h4>
<p>Explain the Model-View-Controller (MVC) architectural pattern. Illustrate how Laravel implements MVC. Describe the roles and responsibilities of Models, Views, and Controllers in a Laravel application. Provide examples of how data flows through the MVC components.</p>
            `,
          },
        ],
      },
    ],
  });

  
  export const GenerateStudyTypeContentAiModel = model.startChat({
    generationConfig, 
    history: [
      {
        role: "user",
        parts: [
          {
            text:
              "Generate the flashcard on topic: Chapter 1: Introduction, Chapter 2: Automata and Languages, Chapter 3: Computability, Chapter 4: Turing Machines, Chapter 5: Computability, Chapter 6: Complexity Theory, Chapter 7: Additional Topics (if applicable depending on the course) in JSON format with front back content, Maximum 25",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```json\n[\n  {\n    \"front\": \"Chapter 1: Introduction - What is the main goal of this chapter?\",\n    \"back\": \"To provide an overview of the course, defining key concepts like computation, algorithms, and the scope of theoretical computer science.\"\n  },\n  {\n    \"front\": \"Chapter 2: Automata and Languages - What are finite automata?\",\n    \"back\": \"Mathematical models of computation that can represent simple machines with finite memory. They accept or reject strings based on a set of rules.\"\n  },\n  {\n    \"front\": \"Chapter 2: Automata and Languages - What is a regular language?\",\n    \"back\": \"A language that can be accepted by a finite automaton.\"\n  },\n  {\n    \"front\": \"Chapter 3: Computability - What is the Church-Turing thesis?\",\n    \"back\": \"The assertion that any function which is intuitively computable can be computed by a Turing machine.\"\n  },\n  {\n    \"front\": \"Chapter 3: Computability - Define 'decidable' and 'undecidable' problems.\",\n    \"back\": \"Decidable: A problem for which an algorithm exists that can always provide a correct yes/no answer. Undecidable: A problem for which no such algorithm exists.\"\n  },\n  {\n    \"front\": \"Chapter 4: Turing Machines - Describe a Turing machine.\",\n    \"back\": \"A theoretical model of computation consisting of an infinitely long tape, a read/write head, and a finite state control. It can perform computations based on its current state and the symbol read from the tape.\"\n  },\n  {\n    \"front\": \"Chapter 4: Turing Machines - What is a Turing-acceptable language?\",\n    \"back\": \"A language for which there exists a Turing machine that halts and accepts all strings in the language and rejects or loops infinitely for strings not in the language.\"\n  },\n  {\n    \"front\": \"Chapter 5: Computability - What is the Halting Problem?\",\n    \"back\": \"The problem of determining, from a description of an arbitrary computer program and its input, whether the program will eventually halt or run forever. It's proven to be undecidable.\"\n  },\n  {\n    \"front\": \"Chapter 5: Computability - Give an example of an undecidable problem.\",\n    \"back\": \"The Halting Problem.\"\n  },\n  {\n    \"front\": \"Chapter 6: Complexity Theory - What is 'P' in complexity theory?\",\n    \"back\": \"The class of decision problems solvable in polynomial time by a deterministic Turing machine.\"\n  },\n  {\n    \"front\": \"Chapter 6: Complexity Theory - What is 'NP' in complexity theory?\",\n    \"back\": \"The class of decision problems for which a solution can be verified in polynomial time by a deterministic Turing machine.\"\n  },\n  {\n    \"front\": \"Chapter 6: Complexity Theory - What is the P vs NP problem?\",\n    \"back\": \"The central unsolved question in theoretical computer science asking whether every problem whose solution can be quickly verified can also be solved quickly.\"\n  },\n  {\n    \"front\": \"Chapter 6: Complexity Theory - Define NP-complete.\",\n    \"back\": \"A problem in NP that is at least as hard as any other problem in NP. If a polynomial-time algorithm were found for any NP-complete problem, then P=NP.\"\n  },\n  {\n    \"front\": \"Chapter 7: Additional Topics - What are some potential additional topics?\",\n    \"back\": \"Examples could include: Complexity classes beyond P and NP, Cryptography, Quantum Computation, or specific applications of Automata theory.\"\n  }\n]\n```"
          },
        ],
        
      },
    ],
  });

  export const GenerateQuizAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Quiz on topic: Introduction, Automata and Languages, Computability, Turing Machines, Computability, Complexity Theory, Additional Topics (if applicable depending on the course) with Question and Options along with correct answer in JSON format",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```json\n{\n  \"title\": \"Introduction to Automata Theory and Formal Languages\",\n  \"questions\": [\n    {\n      \"question\": \"What is a finite automaton (FA)?\",\n      \"options\": [\n        \"A machine that can store an infinite amount of data.\",\n        \"A machine with a finite number of states and transitions.\",\n        \"A machine that always halts.\",\n        \"A machine that can solve any computational problem.\"\n      ],\n      \"answer\": \"A machine with a finite number of states and transitions.\"\n    },\n    {\n      \"question\": \"Which of the following is NOT a type of finite automaton?\",\n      \"options\": [\n        \"Deterministic Finite Automaton (DFA)\",\n        \"Nondeterministic Finite Automaton (NFA)\",\n        \"Pushdown Automaton (PDA)\",\n        \"Finite State Machine (FSM)\"\n      ],\n      \"answer\": \"Pushdown Automaton (PDA)\"\n    },\n    {\n      \"question\": \"What is a regular language?\",\n      \"options\": [\n        \"A language that can be recognized by a Turing machine.\",\n        \"A language that can be recognized by a finite automaton.\",\n        \"A language that is context-free.\",\n        \"A language that is recursively enumerable.\"\n      ],\n      \"answer\": \"A language that can be recognized by a finite automaton.\"\n    },\n    {\n      \"question\": \"What is the Church-Turing thesis?\",\n      \"options\": [\n        \"Any algorithm can be implemented on a Turing machine.\",\n        \"All Turing machines are equivalent in power.\",\n        \"All problems are solvable by a Turing machine.\",\n        \"Turing machines are the most efficient computational model.\"\n      ],\n      \"answer\": \"Any algorithm can be implemented on a Turing machine.\"\n    },\n    {\n      \"question\": \"What is a Turing machine primarily used for?\",\n      \"options\": [\n        \"Modeling real-world machines.\",\n        \"Solving linear equations efficiently.\",\n        \"Defining the limits of computation.\",\n        \"Processing images.\"\n      ],\n      \"answer\": \"Defining the limits of computation.\"\n    },\n    {\n      \"question\": \"Which of the following problems is undecidable?\",\n      \"options\": [\n        \"Sorting a list of numbers.\",\n        \"Adding two numbers.\",\n        \"The Halting Problem.\",\n        \"Finding the shortest path in a graph.\"\n      ],\n      \"answer\": \"The Halting Problem.\"\n    },\n    {\n      \"question\": \"What does P vs NP problem refer to?\",\n      \"options\": [\n        \"The difference between deterministic and nondeterministic Turing machines.\",\n        \"Whether problems verifiable in polynomial time can also be solved in polynomial time.\",\n        \"The relationship between regular and context-free languages.\",\n        \"The complexity of sorting algorithms.\"\n      ],\n      \"answer\": \"Whether problems verifiable in polynomial time can also be solved in polynomial time.\"\n    },\n    {\n      \"question\": \"What is the complexity class NP?\",\n      \"options\": [\n        \"Problems solvable in polynomial time by a deterministic Turing machine.\",\n        \"Problems verifiable in polynomial time by a nondeterministic Turing machine.\",\n        \"Problems solvable in exponential time.\",\n        \"Problems that are undecidable.\"\n      ],\n      \"answer\": \"Problems verifiable in polynomial time by a nondeterministic Turing machine.\"\n    },\n    {\n      \"question\": \"What is a context-free grammar (CFG)?\",\n      \"options\": [\n        \"A grammar that defines regular languages.\",\n        \"A grammar that defines context-sensitive languages.\",\n        \"A grammar that defines context-free languages.\",\n        \"A grammar that defines recursively enumerable languages.\"\n      ],\n      \"answer\": \"A grammar that defines context-free languages.\"\n    },\n    {\n      \"question\": \"Which of the following is an example of a context-free language?\",\n      \"options\": [\n        \"{a^n b^n | n ≥ 0}\",\n        \"{a^n b^m | n, m ≥ 0}\",\n        \"{a^n b^n c^n | n ≥ 0}\",\n        \"{ww | w ∈ {a,b}*}\"\n      ],\n      \"answer\": \"{a^n b^n | n ≥ 0}\"\n    }\n  ]\n}\n```"
          },
        ],
      },
    ],
  });
  
     // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());