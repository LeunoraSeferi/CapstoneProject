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


 // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
 // console.log(result.response.text());

