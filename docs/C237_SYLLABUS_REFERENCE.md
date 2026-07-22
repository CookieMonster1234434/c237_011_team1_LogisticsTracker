# C237 Software Application Development — Syllabus Reference

Converted from the merged lecture slide deck (541 slides, Lessons 01–20).

**This is the only set of techniques permitted in CA2.** The specification states: *"Code must reflect what was taught in class."*

Code blocks were auto-extracted from slide images, so indentation may be imperfect. Treat them as the canonical **pattern**, not copy-paste-ready source.

## Contents

- [Lesson 01 — Introduction to HTML & CSS](#lesson-01--introduction-to-html-css)
- [Lesson 02 — Introduction to BootStrap](#lesson-02--introduction-to-bootstrap)
- [Lesson 03 — Introduction to JavaScript](#lesson-03--introduction-to-javascript)
- [Lesson 04 — Using JavaScript with HTML](#lesson-04--using-javascript-with-html)
- [Lesson 05 — Introduction to NodeJS](#lesson-05--introduction-to-nodejs)
- [Lesson 06 — Introduction to Express](#lesson-06--introduction-to-express)
- [Lesson 07 — Dynamic Content with Templating Engines (EJS)](#lesson-07--dynamic-content-with-templating-engines-ejs)
- [Lesson 08 — Form processing in node.js with express and ejs](#lesson-08--form-processing-in-node-js-with-express-and-ejs)
- [Lesson 09 — Debugging Fundamentals](#lesson-09--debugging-fundamentals)
- [Lesson 11 — Application Design & Planning](#lesson-11--application-design-planning)
- [Lesson 12 — Application Implementation](#lesson-12--application-implementation)
- [Lesson 13 — Enhancing DOM](#lesson-13--enhancing-dom)
- [Lesson 14 — Introduction to Database Integration in Applications](#lesson-14--introduction-to-database-integration-in-applications)
- [Lesson 15 — Database Integration with Express I](#lesson-15--database-integration-with-express-i)
- [Lesson 16 — Database Integration with Express I](#lesson-16--database-integration-with-express-i)
- [Lesson 17 — Database Integration with Express II – Update & Delete](#lesson-17--database-integration-with-express-ii-update-delete)
- [Lesson 18 — Database Integration with Express II – Activity](#lesson-18--database-integration-with-express-ii-activity)
- [Lesson 19 — Authentication and Authorisation](#lesson-19--authentication-and-authorisation)
- [Lesson 20 — Deployment](#lesson-20--deployment)

---


## Lesson 01 — Introduction to HTML & CSS


### Lesson Objectives

- By the end of this lesson, you will be able to:
  - Describe what HTML and CSS are used for
  - Create a simple webpage using HTML
  - Build a basic HTML form
  - Apply CSS styling using an external stylesheet
  - Use AI tools responsibly to support learning

### What is HTML?

- HTML = HyperText Markup Language
- Used to structure content on a webpage
- NOT a programming language
- Uses tags to define elements

### Basic HTML Document

- Every HTML page follows this structure:
- Use an AI tool (e.g., ChatGPT, Claude, Copilot) to help you understand the code.
1. Copy the HTML code
2. Paste it into AI tool
3. Ask the AI: “Explain this HTML structure in simple terms.”

### HTML Document

- <html>…</html>
- Tells the browser the content of the
file is HTML
- <head>…</head>
  - Contains information about the web
page such as the <title>…</title>,
<script>…</script>,
<style>…</style>
- <body>…</body>
  - Contains the content and structure of
the web page that viewers see in the
browser

### HTML Elements

- It also allows tags within an element.
- For Example:
CONTENT of PARAGRAPH element
Start tag of                           Start tag of              CONTENT End tag   End tag of
PARAGRAPH                              BOLD                      of BOLD of BOLD   PARAGRAPH
element                                element                   element element   element

- Some HTML elements do no require explicit end tag.
- For Example:
  - <br/> for line breaks
  - <hr/> for horizontal ruler
  - <img src= “images/Batman.jpg” alt= “Batman Poster” title= “Batman”/> for images
- For more HTML elements refer to https://www.w3schools.com/html/

### Mini Activity 1 - Create a Self

Introduction Page (AI Assisted) ~ 10 mins
- Task: Create a webpage called SelfIntro.html that introduces yourself.
- Your page should include:
  - A profile image
  - Your hobbies or interests
  - Modules you have taken in school
  - A link to your LinkedIn or social media profile
- Using AI:
  - You may use an AI tool (e.g., ChatGPT, Perplexity, Copilot, or Claude) to help generate a starting HTML
template.
  - Example prompt:
    - Generate a simple HTML self introduction page with a profile image, hobbies, modules studied, and a LinkedIn link.

### Mini Activity 1

- Important:
  - Do not copy and paste the code directly. You must:
    - Read and understand the HTML
    - Modify the content to include your own information
    - Make sure the page works correctly in the browser
- Learning Goals:
  - Understand how HTML structures a webpage
  - Practice reading and editing HTML code
  - Use AI as a learning assistant, not just for copying code
  - When using AI tools:
    - Always read the code
    - Understand what you are using
    - Modify it to suit your needs

### HTML Forms

- HTML forms allows collection of data from users
- Forms are created using the <form> element and can contain various types of form controls, such
as text fields, checkboxes, radio buttons, and buttons.
- Form code is located within the <body></body> element of an HTML page.
- For example:
Form
codes

1
The action attribute
Form
opening tag
the form data                                   Here the method is POST.
```javascript
<form action="/actionPage" method="POST">
    All the form contents go here
</form>
```
form closing tag – it ends the form

### Form Elements

For more HTML Form elements refer to https://www.w3schools.com/html/html_forms.asp

For more HTML Form elements refer to https://www.w3schools.com/html/html_forms.asp

### Mini Activity 2 - Create a Self Introduction

Form ~ 10 mins
- Task: Create a webpage called form.html that contains a Self Introduction Form.
- Your form should include the following fields:
  - Name
  - Gender
  - Email
  - Phone Number
  - Date of Birth
  - About Me (text area)
  - Feel free to add on more relevant input types in your form.
- Using AI:
  - You may use an AI tool (e.g., ChatGPT, Perplexity, Copilot, or Claude) to generate a starting form.
  - Example Prompt:
    - Generate an HTML form with name, email, phone, gender, and date of birth.

### Mini Activity 2

- Important:
  - Do not copy and paste the code directly. You must:
    - Read and modify the code yourself.
- Linking the pages:
  - Add a link in your SelfIntro.html page (from Activity 1) that leads to form.html.
  - Add a link in form.html that allows users to go back to SelfIntro.html.
- Learning Goals:
  - Practice creating HTML forms
  - Understand different form input types
  - Learn to edit and improve AI-generated code

### Mini Activity 2 – Sample Screenshots

SelfIntro.html                                       Form.html

### What is CSS?

- CSS = Cascading Style Sheets
- Controls the appearance of webpages
- Separates content (HTML) from design(CSS)
- One CSS file can style many pages.

### Introduction to CSS

- 3 Types of CSS - Inline, Internal, and External
  - Inline: Inside HTML tag
    - E.g.    <p style="color: blue;">Blue text</p>
  - Internal: Inside <style>
    - E.g.     <style> p { color: blue; } </style>
  - External: separate .css file(s) (recommended)
    - E.g. <link rel="stylesheet" href="styles.css">
- While inline and internal CSS can be useful for quick fixes and small-scale projects,
external CSS is generally recommended for larger, more complex websites due to its
scalability and reusability.

### Order of Precedence

Highest
Priority
Inline CSS
Internal CSS
External CSS
Lowest
Priority
Browser Default

### CSS Syntax

Property – element that you want to change
Value – the type / amount of change
selector {property1:value1; property2:value2;... ;}
Selector – name of the style or html tag
Examples:
P { font-size: 2px ; color: blue ; }
h1 { background-color: yellow ; font-weight: bold ;
color: #000000 ; }
- 
- 

### Understanding CSS Selector

- Element, class, and ID selectors
- Element Selectors: Target HTML elements,
  - e.g.    p { color: red; } /* All <p> elements will have red text */
- Class Selectors: Target elements with a specific class attribute,
  - e.g.    /* Any element with class="highlight" will have a yellow background. */
.highlight { background-color: yellow; }
Prefixed with a dot
- ID Selectors: Target a unique element with a specific id attribute,
  - e.g.     /* Element with id="navbar" will have a solid border */
#navbar { border: 1px solid #333333; }
Prefixed with a hash

### Mini Activity 3 – Styling your pages with

CSS
- Task: Create an external CSS file called styles.css and use it to style the webpages you created in
Activity 1 (SelfIntro.html) and Activity 2 (form.html).
- Requirements:
  - Your CSS file should include the following styles:
    - Change the font of the entire page (<body>) to Arial
    - Change the colour of all <h1> headings to blue
    - Set the background colour of the module list in SelfIntro.html to light grey
    - Use a pseudo-class to change the colour of links when hovered
    - Use an attribute selector to:
      - Change the background colour of the submit button to orange
      - Change the text colour to white
- Using AI:
  - You may use an AI tool (e.g., ChatGPT, Perplexity, Copilot, or Claude) to generate a starting form.
  - Example Prompt:
    - Generate CSS to style a simple HTML page with Arial font, blue headings, hover effects for links, and an orange submit
button.

### Mini Activity 3

- Important:
  - Do not copy and paste the code directly. You must:
    - Read and modify the CSS code yourself.
    - Ensure it works correctly with your HTML pages.
- Linking the CSS File:
  - Make sure you link styles.css to both pages created earlier:
    - SelfIntro.html (Activity 1)
    - form.html (Activity 2)
- Learning Goals:
  - Understand how external CSS files work
  - Practice linking CSS to HTML pages
  - Learn to edit and adapt AI-generated CSS code

### Mini Activity 3 – Sample Screenshots

Selfintro.html                                               form.html
- Use the remaining time to explore and improve your website.
- You should use your own pictures and all information should be changed to something related to
yourself.
- Feel free to add more CSS styles to enhance the look and feel — be creative and have fun with it!

### Deliverables

- Mini Activities 1, 2 and 3
  - 
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- Introduction to HTML
- HTML Structure
- HTML Elements
- HTML Forms
- Form Elements
- Introduction to CSS
- CSS Syntax
- CSS Selector
- Responsible use of AI for learning


## Lesson 02 — Introduction to BootStrap


### Introduction to

BootStrap

### Introduction to BootStrap

- Bootstrap is a popular open-source front-end framework developed by Twitter.
- It is a collection of HTML, CSS, and JavaScript components.
- Helps developers quickly build responsive and visually appealing web pages.
- Includes pre-designed styles and UI components for consistent website design.

### Key Features of Bootstrap

- Responsive Design:
  - Mobile-first framework that works well on different screen sizes.
- CSS Framework:
  - Ready-made styles that can be easily applied to HTML elements.
- Component Library:
  - Includes UI components such as navbars, buttons, forms, modals, and cards.
- JavaScript Plugins:
  - Adds interactive features like dropdowns, modals, and carousels.

### Getting Started with Bootstrap

- One easy way to use Bootstrap is through a CDN (Content Delivery Network) such as
jsDelivr.
- Add the following lines inside the <head></head> section of your HTML file:
```javascript
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

### Bootstrap Features

- Bootstrap provides many predefined classes and components, such as:
- Responsive Grid System
- Navigation Bars
- Forms
- Cards and Buttons
- Theme Customisation
- Reference: https://www.w3schools.com/bootstrap5/index.php

### Nav Menu

- A simple menu

### More Nav Menus

- Tab Menu
```javascript
        <ul class = “nav nav-tabs”>
• Pills Menu
                                                                <ul class = “nav flex-column”>
       <ul class = “nav nav-pills”>
```

### Navigation bar

- A navigation bar is a navigation header that is placed at the top of the page
https://www.w3schools.com/bootstrap5/bootstrap_navbar.php

### Let’s try - Navigation Bar with dropdown

- Go to the following link:
https://www.w3schools.com/bootstrap5/tryit.asp?filename=trybs_navbar_dropdown&stacked=h
- Edit the navigation bar in the code editor so that it matches the example shown below.
  - Remember to click “Run” to preview your changes.

### Bootstrap Tables

- A basic Bootstrap 5 table has a light padding and horizontal dividers. The .table class adds basic
styling to a table:
https://www.w3schools.com/bootstrap5/bootstrap_tables.php

### Example – Bootstrap Table

- Go to the following link:
https://www.w3schools.com/bootstrap5/tryit.asp?filename=trybs_table_striped&stacked=h
- Edit the table in the code editor so that it matches the example shown below.
  - Remember to click “Run” to preview your changes.

### Images

https://www.w3schools.com/bootstrap5/bootstrap_images.php

### Cards

- A card in Bootstrap 5 is a bordered box with some padding around its content. It includes options for
headers, footers, content, colors, etc.
https://www.w3schools.com/bootstrap5/bootstrap_cards.php

### Bootstrap Grid System

- Bootstrap includes a responsive, mobile first fluid grid system that appropriately scales up to 12
columns as the device or viewport size increases.

https://youtu.be/Wqu-d_b3K-0?si=GcHJ_dBqXYbC1SqE

### Example – Bootstrap Grid Structure

```javascript
               <div class = “col-6”>  <div class = “col-6”>
<div class = “col-3”>
    <div class = “col-4”>  <div class = “col-4”>  <div class = “col-4”>
   <div class = “col”>
<div class = “col”>
```

### Mini Activity – Build a Supermarket

Website
- Task: Create a bootstrap-based supermarket website.
- Your website should eventually include:
- Homepage
- Product Page (at least 3 products)
- Product Description Page
- Contact Us Page

Website
- Bootstrap Requirements
- Your website must include the following Bootstrap components:
  - Navigation Bar
  - Grid System with spacing utilities
  - Cards to display products
- Example uses:
  - Navbar → website navigation
  - Grid System → arrange products in rows and columns
  - Cards → display product image, name, and details
- Challenge
- Explore and try out additional Bootstrap features from: https://www.w3schools.com/bootstrap5/

Website
- To get started, refer to the starter guide (L02 Mini Activity Starter Guide.pdf) provided
and follow the steps to set up your project.
- Important Rules
  - Do not copy the AI code directly.
  - You must:
    - Read and understand the code
    - Modify the layout or content
    - Ensure the website runs correctly
- After Completing the Activity
  - Complete the Activity Reflection Journal: L02 Activity Reflection Journal.docx
  - Fill in the journal to demonstrate that you understand the code you used.

### Deliverables

- You must submit the following:
- A ZIP folder of your completed Supermarket website
  - Make sure your site:
    - Uses at least the 3 required Bootstrap components
    - Has proper folder structure (index.html, images folder, etc.)
- L02 Activity Reflection Journal.docx
- Upload all deliverables to POLITEMall before the next lesson.

### What have you learnt?

- Introduction to Bootstrap
- Getting started with bootstrap
- Nav Menu
- Navigation bar
- Tables
- Images
- Cards
- Bootstrap Grid System


## Lesson 03 — Introduction to JavaScript


### Introduction to

JavaScript

### What is JavaScript?

- JavaScript is a programming language used to create interactive web pages.
- Examples:
- Form validation
- Dynamic content updates
- Interactive buttons
- Difference between HTML, CSS and JavaScript
- HTML creates the button
- CSS styles the button
- JavaScript controls what happens when the button is clicked

### Install Node.js on Windows

- Download Node.js:
  - Visit the official Node.js website: https://nodejs.org/ .
  - Download the LTS (Long Term Support) version, which is recommended for most users.
- Run the installer:
  - Double-click on the downloaded installer file to run it.
  - Follow the installation prompts, accepting the default settings.
- Verify Installation:
  - Open Visual Studio Code
  - Click on Terminal -> New Terminal
  - Type the commands below to check if Node.js and npm (Node Package manager) are installed.
    - “node -v”
    - “npm -v”
- These commands will display the installed versions of Node.js and npm
  - Note: Your version number might be different. That’s ok.

### Datatypes

- Common datatypes:
  - Numbers
  - String
  - Boolean
  - Array
  - Object
- Example:

### Variables

- Use var, let and const to declare variables.
  - Example:
    - let
      - Values can change
    - const
      - Values cannot be reassigned

### JavaScript String Operators

- The + operator can also be used to add (concatenate) strings.
- The result of fullName will be: Peter Tan
- The += assignment operator can also be used to add (concatenate) strings:
- The result of intro will be: Hello, my name is Peter

### Adding Strings and Numbers

- Adding two numbers, will return the sum, but adding a number and a string will return a string:
- If you add a number and a string, the result will be a string!

### JavaScript Comparison Operators

- Comparison Operators allows you to compare values to produce a Boolean result (true or false):

### Strict Equality Operator ( === )

- Compares two values for equality – both the value and the type must be the same.
  - If the operands are of the same type AND have the same value, the “===“ operator returns true.
  - If the operands are of different types OR have different values, the “===“ operator returns
false.

### Conditional Statements

- Conditional statement is a set of rules performed if a certain condition is met.
- The if statement execute its block of code only if its condition statement is equals to true.
- else keyword is needed so that if the other condition fail, it is handled
- Example:
- If the value of age is more than or equals to 18 the result will be: You are an adult
- If the value of age is less than 18 the result will be: You are a minor

- Two or more expressions can be evaluated together using logical operators AND or OR
- The AND operator &&
  - check if both expressions evaluate to true
- The OR operator ||
  - check if either one of the expressions evaluates to true
- Example:

### For and While Loops

- Loops repeat code multiple times.
- Instead of writing:
- You can write:
- or

### Let’s Try!

Step 1: Create Your Module Folder
1. Open File Explorer.
2. In your C:\ drive, create a folder named C237.
3. This folder will store all files for this module.
Step 2: Create a Lesson Folder
1. Open the C237 folder.
2. Create a new folder named L03.
3. All files created for Lesson 03 will be saved here.

Step 3: Open the Folder in VS Code
1. Open Visual Studio Code..
2. Click File → Open Folder.
3. Select the L03 folder you just created.
Step 4: Create a JavaScript File
1. In the Explorer panel, click New File.
2. Name the file: L03Exercises.js.
3. Press Enter to create the file.

### Let’s Try! - Loops

- Key in the following code to display all odd numbers between 1 to 10:
- In the terminal, key in “node L03Exercises.js” to run your file.
- You should see the following output:

### Arrays

- Arrays store multiple values.
- Syntax:
- Example:
  - A list of cars (without array).
  - A list of cars using array

### Accessing Array Elements

- You access an array element by referring to the index number:
- Array indexes start with 0.
  - [0] is the first element
  - [1] is the second element
  - Etc…

### Let’s Try! – Creating an Array

- In the same L03Exercises.js file,
- Key in the following code to create an array named, myArr, to store the following values:
  - A string that has the value “I love RP!”
  - A Boolean that has a value of true
* Remember to comment out your earlier code first.
- In the terminal, key in “node L03Exercises.js” to run your file.
- You should see the following output:

### Array length Property

- Arrays have built-in properties and methods:
- The length property:
  - returns the length of an array (the number of array elements).
  - The length is always one more than the highest array index.

### Let’s Try! – Accessing Array Elements

- In the same L03Exercises.js file,
- Key in the following code to iterate the myArr Variable and display each element in the array.
* Remember to comment out your earlier code first.
- In the terminal, key in “node L03Exercises.js” to run your file.
- You should see the following output:

### Manipulating Arrays – push()

- push() – adds item to an array
- Example:
- Output:
- There are also other functions like:
  - pop – removes last element of an array
  - splice – insert an element into a particular point somewhere in the array
  - shift – removes first element of an array
  - unshift – adds new items to the front of an array

### JavaScript Functions

- Functions allow code reuse
- To define a function, use function statement:
- The myFunction function takes the argument num1 and num2 when it is called.
- This function can be called with any values for num1 and num2.
  - Example:

### Let’s Try! – Functions

- In the same L03Exercises.js file,
- Key in the following code to define a function called multiplyTen which accepts a number and returns
that number multiplied by 10.
* Remember to comment out your earlier code first.
- In the terminal, key in “node L03Exercises.js” to run your file.
- You should see the following output:

### JavaScript Objects

- Objects store related data:
- To access the properties of an object, we can use the dot . .
- Example:
- Output:

### Deliverables

- L03Exercises.js
- Upload your deliverable to POLITEMall before the next lesson.

### What have you learnt?

- Introduction to JavaScript
- Why JavaScript?
- JavaScript Syntax
- JavaScript Basics
- Variables and Datatypes
- Operators
- Conditional Statements
- Loops
- Arrays


## Lesson 04 — Using JavaScript with HTML


### JavaScript and the

DOM

### What is DOM?

- DOM = Document Object Model
- The DOM is a tree structure of HTML elements
- JavaScript can use the DOM to:
  - Access HTML elements
  - Modify Content
  - Respond to user actions

### Where Does JavaScript Go?

- JavaScript can be placed inside an HTML file using the <script> tag.
- Place JavaScript before the closing </body> tag

### Selecting Elements in HTML Page

- HTML elements can have IDs or classes.
- JavaScript can use these to select elements.
- JavaScript can select HTML elements to modify them.
  - Example: This selects the element with id title and updates the text to “Hello World”

### Let’s Try! – Changing Text

- Open Visual Studio Code and create a new file L04Exercise.html in your L04 folder.
- Key in the following script to display a “Welcome” heading in the page:
- Modify the file to change the “Welcome” text to “Hello Students!” using JavaScript.

### JavaScript Events

- Events occur when users interact with a webpage.
- Example:
- Click
- Hover
- Typing
- JavaScript can respond to these event.

### Common JavaScript Events

Mouse Events
Event                                              When It Happens
onclick
onmouseover
onmouseout
Input / Form Events
Event                                              When It Happens
onchange
Keyboard Events
Event                                                When It Happens
onkeydown
onkeyup

### JavaScript Events

- Example:

### Let’s Try! – JavaScript Event

- In the same L04Exercises.html file,
- Create a button that displays an alert box which shows “Welcome to C237” when clicked.

### Changing Styles

- JavaScript can change CSS styles.
- Example:

### Let’s Try! – JavaScript Event

- In the same L04Exercises.html file,
- Change the text color of “Hello Students” to blue when the button is clicked.

### Input Fields

- JavaScript can read user input.
- Example:
  - HTML Input:
  - JavaScript
    - .value retrieves text from the input field.

### Let’s Try! – Input field

- In the same L04Exercises.html file,
- Display the user’s name after clicking submit.

### Mini Activity

- Task: Create a simple Counter App
- Create a new file L04Deliverables.html in your L04 folder
- Your page should include:
  - A number displayed on the page
  - A + button to increase the number
  - A – button to decrease the number

- Instructions:
  - Display the number 0 on the page.
  - Create two buttons:
    - Increase button
    - Decrease button
  - When the user clicks a button:
    - Update the number displayed on the page.
When page first loads       Increase button clicked                       Decrease button clicked

### Deliverables

- L04Exercises.js
- L04Deliverables.js
- L04 Activity Reflection Journal.docx
- Upload all your deliverables to POLITEMall before the next lesson.

### What have you learnt?

- JavaScript in webpages
- Where to place the <script> tag
- How JavaScript runs in a webpage
- DOM (Document Object Model)
- Accessing HTML elements
- Modifying webpage content
- JavaScript Interaction
- Events (e.g. button clicks)
- Functions triggered by user actions
- Working with Webpage Data
- Updating text using .innerText
- Getting input values using .value


## Lesson 05 — Introduction to NodeJS


### Introduction to

NodeJS

### What is Node.JS?

- Node.js uses JavaScript as its main programming language
- It is a runtime environment that runs JavaScript outside the browser
- It allows developers to build server-side applications using JavaScript

### Who uses Node.JS?

- Used by large-scale platforms for speed, scalability, and handling many users
    - Uses Node.js for a fast, responsive user               •     Uses Node.js to improve performance
experience
      - Enables faster development and efficient
    - Handles high traffic with asynchronous                       data processing
operations ((multiple requests handled at
the same time))

### Why Node.JS?

- JavaScript on Server
- Traditionally used in browsers (client-side)
- Node.js allows JavaScript to run on the server.
- Event-Driven and Asynchronous
- Uses event-driven architecture
- Non-blocking: handles multiple requests without waiting
- Improves performance and scalability.
- Fast Execution
- Enables high-speed execution

### What can Node.JS do?

- Generate dynamic page content
- Handle files on the server (read, write, delete)
- Process form data
- Manage database operations (Add, Update, Delete)

### NodeJS Architecture

Requests
  - Requests coming from client side.
Event Queue
  - Stores the request and passes them
one by one into the event loop
Event Loop
  - Receives the request, process the
request and returns the response to
the particular client.
Thread Pool
  - Consists of the Available threads in
NodeJS server which will take some
tasks to complete the client request.

### An Overview of How the Web Works

Do watch this video when you can—it'll help you better understand the topic.
https://youtu.be/zFRuGk52X-c?si=CrtYIfD0Xo9mXzwQ

### NodeJS Packages

- NodeJS packages are code libraries provided by third party programmers to solve
specific problems.
- NPM - node package manager
- Used to install update and remove packages for our application

### Setting up Visual Studio Code for Node.js

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a L05 folder in your C237 folder.
- Create a new folder (e.g. “MyFirstNodeJS”) in L05 folder.

- Open the folder which you just created in VS Code:
  - Open VS Code and use the "File" menu to open your newly created folder.
  - Open a terminal within VS Code (Terminal > New Terminal).                   Before “npm init -y”
  - Run the following command to create a package.json file for your project:
    - npm init -y
After “npm init -y”

### Creating a new JS file

- Create a New JavaScript File:
  - Inside the folder, create a new file with a ‘.js’ extension (e.g. app.js)
  - Click on the new file icon
  - Double click on the file in VS Code to open the file.

- Write your First Node.js Code:
  - In app.js, type or paste the following code and save the file.
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello, World!\n');
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```
  - Save the file

- Write your First Node.js Code (continued):
  - Open the terminal in VS Code
  - Run your first Node.js app by typing the following command in your terminal: node app.js
  - You should see the message “Server running at http://localhost:3000/”

### Basic Node.JS script

- This script creates a simple HTTP server using the built-in http module and listens on
port 3000. When you access http://localhost:3000 in your web browser, it will respond
with "Hello, World!".

http module
      - is a built-in module in Node.js for
creating servers
createServer()
      - Handles incoming requests
      - (req, res) -> request & response
PORT
      - Defines server port (e.g. 3000)
listen()
      - Starts the server
      - Runs on the specified port
res.writeHead() sets the response status and headers.
res.write() sends parts of the response body and can be called multiple times.
res.end() ends the response and can optionally send the final chunk of data.

### Let’s Try!

- Make Changes and Save:
  - Modify the code in app.js to include information about yourself.
- Run the project:
  - To refresh your page, stop your server (Ctrl + C)
  - Run your first Node.js app by typing the following command in your terminal: node app.js
  - You should see the message “Server running at http://localhost:3000/”
- Sample Screenshot:

### NodeJS App

Routes Handling

### Node.JS script – Routes

- Routes
- Paths (URLs) that the server can handle
- How Routing Works?
- User enters a URL
- Server matches it to a route
- Runs the corresponding code
- Sends a response
- Example
- / - leads to Home
- /about - leads to About Page

### Setting up Visual Studio Code for Node.js

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a new folder (e.g. “RouteHandling”) in the L05 folder which you created earlier.

- Open the folder which you just created in VS Code:
- Open VS Code and use the "File" menu to open your newly created folder.
- Open a terminal within VS Code (Terminal > New Terminal).
- Run the following command to create a package.json file for your project:
  - npm init -y
After “npm init -y”

### Write your Node.js Code

- Copy your Node.js Code:
- In your student folder, you will see a folder named “Activity Files”.
- Copy the following files and paste it into your “RouteHanding” folder.
  - app.js
  - about.html
  - index.html

### Run your Node.js file

- Run your Node.js Code:
- Open the terminal in VS Code
- Run your Node.js app by typing the following command in your terminal: node app.js
- You should see the message “Server running at http://localhost:3000/”

### Discussion

- On localhost try changing the route
  - E.g instead of http://localhost:3000/about change to http://localhost:3000/login.
  - What happens?
- Try accessing this link: http://google.com/test.
- What do you see?

- http://google.com/test
- The page shows the 404 Not Found error
- This means the route does not exist on the server.
- What users see depends on how routes are defined in your code
- If the route exists → page loads (200 OK)
- If the route does not exist → error page (404 Not Found)

### Node.JS script – Routes Handling

- This code demonstrates a basic server with routing capabilities in Node.js, handling
different routes and responding with corresponding content.

Core Modules
- http module - server
- Create web servers
- Handle requests & responses
- url module – URL handling
- Work with URLs
- Extract parts (e.g. /about)
- fs (File System) module – file handling
  - Read/Write files

- routeHandlers
  - Maps URL - function
- url.parse()
- Gets info from request URL
- pathname:
- Extracts the path (e.g. /about)
- routeHandlers[path]
  - Finds matching handler

Handler functions:
- Each route is a function
- Handles request & sends response
routeHandlers[path]:
- homeHandler -> sends index.html
- aboutHandler -> sends about.html
- notFoundHandler -> sends 404
Routing Logic
- / → 200 OK → Home
- /about → 200 OK → About
- Others → 404 Not Found
Other Common Status Codes
- 201 Created → New resource created
- 400 Bad Request → Invalid request
- 401 Unauthorized → Not logged in
- 403 Forbidden → No permission
- 500 Internal Server Error → Server error
For bigger apps → use Express.js

### Let’s Try! – NodeJS Routes Handling

- Task
  - Update app.js to add a new route for Contact
  - Create a new HTML file named contact.html
  - Add a hyperlink so users can open the Contact page.
- Use AI as support:
  - You may ask AI for help to:
    - create the contact.html page
    - suggest code for the new route
    - suggest how to add the hyperlink/
- Use AI responsibly
  - Do not copy blindly
  - Read and test the code before using it
  - Make sure you understand what was added or changed

- Run your project:
  - Run your Node.js app by typing the following command in your terminal: node app.js
  - You should see the message “Server running at http://localhost:3000/”
- Sample Screenshot:

### HTTP Status Code Explained

Do watch this video when you can—it'll help you better understand the topic.
https://youtu.be/qmpUfWN7hh4?si=eeTuSsJ8iyIZ5LoS

### Deliverables

- Activity
- 
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- Introduction to Node.JS
  - Who? What? Why? Node.JS
  - Basics of Node.JS
  - Route Handling in Node.JS
  - Routing using route handler functions
  - Setting up a NodeJS Environment


## Lesson 06 — Introduction to Express


### Introduction to

Express

### What is Express?

- Web application framework for Node.js.
- Makes building web apps easier
- Handles routes and requests
request                                            request   Database
Frontend                                  Express
response                                           response

### L05 Recap (with Express)

Advantages of Node.JS with Express
- Simplifies routing:
- (app.get(‘/route’,…) is
easier and cleaner than writing raw
if statements checks
- Built-in helpers:
- res.send() and req.params
- Modular and Scalable:
- Cleaner code, better for large apps
- Middleware support
- Form handling (express.urlencoded)

### What is Express, and Why use it?

Do watch this video when you can—it'll help you better understand the topic.
https://youtu.be/0QRFOsrBtXw?si=puP-AMXlqL_OqwNa

### Node.JS with

Express Environment

### Setting up VS Code for Node.js Express

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a L06 folder in your C237 folder.
- Create a new folder (e.g. “MyFirstExpressApp”) in L06 folder.

- Open the folder which you just created in VS Code:
  - Open VS Code and use the "File" menu to open your newly created folder.
  - Open a terminal within VS Code (Terminal > New Terminal).                   Before “npm init -y” &
“npm install express”
  - Run the following command to create a package.json file for your project:
    - npm init –y
    - npm install express
After “npm init -y” &
“npm install express”

### Creating a new JS file

- Create a New JavaScript File:
  - Inside the folder, create a new file with a ‘.js’ extension (e.g. app.js)
  - Click on the new file icon
  - Double click on the file in VS Code to open the file.

- Write your First Node.js Express Code:
  - In the app.js file, type or paste the following Node.js Express code and save the file.
// Import the Express module
```javascript
const express = require('express');
// Create an Express application
const app = express();
// Define the port number the server will run on
const port = 3000;
// Define a route for the homepage "/"
// When a user visits http://localhost:3000/
app.get('/', function(req, res) {
    // Send a response back to the browser
    res.send('Hello, World!');
});
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

- Write your First Node.js Code (continued):
  - Open the terminal in VS Code
  - Run your first Node.js Express app by typing the following command in your terminal: node
app.js
  - You should see the message “Server running at http://localhost:3000/”

### Routing

- Apps need to know what exactly to do when a request is made to a particular path.
- Example:
  - http://localhost:3000/ - ‘/’ is the path
  - http://localhost:3000/students - ‘/students’ is the path
  - http://localhost:3000/addStudents - ‘/addStudent’ is the path
- We do this by defining routes.

### Response Structure

- app.METHOD (PATH, HANDLER)
  - PATH is the URL
  - HANDLER is what we want to do
    - E.g: When user visits http://localhost:3000/students, the server responds using res.send(“Students
page”)
  - (req, res) are two important parameters:
    - req = the request object (what the user sends to us)
    - res = the response object (what the server sends back to user)
  - This function runs every time the route is matched.

### Understanding HTTP methods

- We will focus on 2 HTTP methods in this lesson:
- GET
  - Used to request and retrieve data from the server.
  - It is typically used to display or read information, like showing a list of books.
- POST
  - Used to send data to the server.
  - It is commonly used when submitting forms, such as adding a new book to the list.
- These 2 methods allow us to perform basic CRUD operations in a simplified web app.

### Response Structure – Code Example

- app.get: set up route
- res.send: send a response

### Setting up VS Code for Node.js Express

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a new folder (e.g. “ExpressRoutingApp”) in L06 folder.

- Open the folder which you just created in VS Code:
  - Open VS Code and use the "File" menu to open your newly created folder.
Before “npm init -y” &
  - Open a terminal within VS Code (Terminal > New Terminal).                   “npm install express”
  - Run the following command to create a package.json file for your project:
    - npm init –y
    - npm install express
After “npm init -y” &
“npm install express”

### Creating a new JS file

- Create a New JavaScript File:
  - Inside the folder, create a new file with a ‘.js’ extension (e.g. app.js)
  - Click on the new file icon
  - Double click on the file in VS Code to open the file.

### Displaying a list of books to the user

- The following code prints all the book titles in the list of books array.
Discussion
      - What is the problem with
writing the code this way?

- In your app.js file, add the following code and save the file.
```javascript
const express = require('express');
const app = express();
const port = 3000;
let books = [
    { id: 1, title: 'Book A', author: 'Peter Tan' },
    { id: 2, title: 'Book B', author: 'Mary Lee' },
    { id: 3, title: 'Book C', author: 'Sam Ho' }
];
app.get('/books', (req, res) => {
    let list = '';
    for (let i = 0; i < books.length; i++) {
        list +=
        `<li>  GET request at /books.
            ${books[i].title} (Author: ${books[i].author})
        </li>`;
    }
    res.send(`<h1>Book List</h1><ul>${list}</ul>`);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

- Write your Express Routing JS Code (continued):
  - Open the terminal in VS Code
  - Run your Express Routing JS app by typing the following command in your terminal: node app.js
  - You should see the message “Server running at http://localhost:3000/”
  - Open your browser and enter http://localhost:3000/books in the address bar

### Add a book (Show Add Book Form) - GET

- In the app.js file, paste the /addBook route below the /books route.
```javascript
app.get('/addBook', (req, res) => {
  res.send(`
    <h1>Add a Book</h1>
    <form action="/addBook" method="POST">
      Book Title: <input name="title" placeholder="Book title" /> <br><br>  visits /addBook
      Author: <input name="author" placeholder="Author" /> <br><br>
      <button type="submit">Add Book</button>
    </form>
  `);
});
```

- Run your Express Routing JS app by typing the following command in your terminal: node
app.js
- You should see the message “Server running at http://localhost:3000/”
- Open your browser and enter http://localhost:3000/addBook in the address bar

### Add a book (Processing Form Data) - POST

- In the app.js file, paste the /addBook route (POST) below the /addBook route (GET).
// Middleware to parse form data from POST requests
```javascript
app.use(express.urlencoded({ extended: true }));
app.post('/addBook', (req, res) => {
  const newId = books.length + 1;
  books.push({ id: newId, title: req.body.title, author: req.body.author });
  res.redirect('/books');
});
```

- Run your Express Routing JS app by typing the following command in your terminal: node
app.js
- You should see the message “Server running at http://localhost:3000/”
- Open your browser and enter http://localhost:3000/addBook in the address bar. Add a
book.

### Discussion

- What is GET used for?
- Used to request and retrieve data from the server
(e.g. loading a webpage)
- What is POST used for?
- Used to send data to the server
(e.g. submitting a form)
- Which method is used when submitting a form?

### Route Parameters

- a placeholder in the URL that captures values from the user
- Used to create dynamic routes
- In Express, written using a colon (:) followed by a parameter name in the route definition.
  - For example, in the route /users/:id
- :id will store the value from the URL
  - /users/5 -> id = 5

### Utilizing Route Parameters

- Define route parameters using colon( : )
- For example: /users/:id
- Access the value using req.params
- For example: req.params.id

### Delete a book - POST

- In the app.js file, add the /deleteBook route below the /addBook route (POST).
Discussion
```javascript
app.post('/deleteBook/:id', (req, res) => {
    // TODO: get id from URL
    // TODO: remove the book from the array
    // TODO: redirect to /books
});
```
- Use AI of your choice (e.g. ChatGPT, Copilot, Claude, or Gemini) to help complete the
missing code
- Do NOT copy blindly. Understand each line.

### Delete a book – POST (one possible solution)

- In the app.js file, add the /deleteBook route below the /addBook route (POST).
- This route Delete a book using its id
- This route is triggered when a delete button is clicked. It filters out the selected book from
the array.

### Delete a book

- In the app.js file, edit the /books route to add a delete button for each book.

- Run your Express Routing JS app by typing the following command in your terminal: node
app.js
- You should see the message “Server running at http://localhost:3000/”
- Open your browser and enter http://localhost:3000/books in the address bar. Delete a
book.

### Edit a book (Show Edit Book Form) - GET

// Edit Book Form Page
- In the app.js file, paste the   app.get('/editBook/:id', (req, res) => {
```javascript
                                      const id = parseInt(req.params.id);
    /editBook route below the  let book = null;
    /deleteBook route.
•   This route sends a HTML  for (let i = 0; i < books.length; i++) {
                                       if (books[i].id === id) {
    form to the browser when the  book = books[i];
    user clicks on edit link  break;
                                       }
•   Displays a form with the  }
    selected book’s details pre-
    filled.  if (!book) {
                                       return res.send('<p>Book not found.</p><a href="/books">Back to List</a>');
                                     }
                                      res.send(`
                                        <h1>Edit Book</h1>
                                        <form action="/editBook/${book.id}" method="POST">
                                          Book Title: <input name="title" value="${book.title}" required /> <br><br>
                                          Author: <input name="author" value="${book.author}" required /> <br><br>
                                          <button type="submit">Update Book</button>
                                        </form>
                                        <a href="/books">Back to List</a>
                                      `);
                                    });
```

### Edit a book (Processing Form Data) - POST

- In the app.js file, paste the /editBook route (POST) below the /editBook route (GET).
// Edit Book POST route
```javascript
app.post('/editBook/:id', (req, res) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      books[i].title = req.body.title;
      books[i].author = req.body.author;
      break;
    }
  }
  res.redirect('/books');
});
                                                                         req.body
```

### Edit a book

- In the app.js file, edit the /books route to add an edit link for each book.

- Run your Express Routing JS app by typing the following command in your terminal: node
app.js
- You should see the message “Server running at http://localhost:3000/”
- Open your browser and enter http://localhost:3000/books in the address bar. Edit a book.

### Deliverables

- Activity
- 
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- Introduction to Express
  - Basics of Express
  - Setting up a NodeJS with Express Environment
  - Handling forms
  - How route parameters work


## Lesson 07 — Dynamic Content with Templating Engines (EJS)


### From Express to EJS

- EJS helps keep your code clean by separating logic and HTML
Without EJS (Express only)                                       With EJS
- app.js
      - views/users.ejs

### Template Engines

- Used to generate HTML dynamically.
- Create templates with placeholders for data and logic
- Benefits
- Code reusability,
- Easier to maintain,
- Cleaner, more readable code.
- There are many template engines used in web development:
- EJS (Embedded Javascript)
- Pug (formerly Jade)
- Handlebars
- Mustache

### Embedded JavaScript (EJS)

- Used to create dynamic web pages
- Allows JavaScript within HTML using special tags
- The most common tags used are:
- <% %>
  - Run JavaScript code (no output)
  - For example, you can use these tags to define variables or call functions.
- <%# %>
  - These tags add template comments.
- <%= %> and <%- %>                          <%= %>                                               <%- %>
To output the value. (with escaping)                   To output value (no escaping)
Example:

### Why EJS?

- Templating allows us to pass something from our server to be rendered in a HTML file.
form.ejs                                                 submitted.ejs

### How does EJS work?

- HTML with JavaScript inside
- File type: .ejs extension
- Example, in this case, we are able to insert a for loop into our HTML file which loops
through an array of fruits that’s been sent into this EJS file.
fruitsList.ejs

- Another example of how information entered in a form can be displayed after the form
have been submitted.
form.ejs                                             submitted.ejs

### How is the data/information passed?

- Data/information can be passed using a method called res.render().
- This will be done in the controller (app.js)
- Controller for fruitsList Page:
- Controller for form submission Page:

- Controller for form submission Page:
- In this case, we are rendering the submitted.ejs page
- An object with key of name and email (which came from the form input in the form page)
will be passed over at the same time.

The action attribute                               The method attribute determines
form
opening tag
data                                               POST.
```javascript
<form action= " /endpoint" method="POST">
   // All the form contents go here
</form>
```
form closing tag – it ends the form

submitted.ejs
form.ejs                                            app.js
 Notice how the names (name and email) matches in the 3 files

### EJS in

Express Environment

### Setting up EJS in Express.js

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a L07 folder in your C237 folder
- Create a new folder (e.g. “MyFirstEJSApp”) in L07 Folder

- Open the folder which you just created in VS Code:
- Open VS Code and use the "File" menu to open your newly created folder.
- Open a terminal within VS Code (Terminal > New Terminal).
- Run the following commands in sequence to initialize your project and install the required
packages:
1. npm init –y
      - creates a package.json file
2. npm install express
      - installs the express framework
3. npm install ejs
      - installs EJS templating engine for your project

- Inside the ‘MyFirstEJSApp’ folder, create a new file with a ‘.js’ extension (e.g. app.js).
- Double click on the app.js file in VS Code to open the file.

- To set up EJS in Express.js, you will require an express module to initialise an Express.js
app.
- Then, set ejs as the view engine using the app.set() method.
- In app.js, paste the following code:
```javascript
const express = require('express');
const app = express();
// Setting EJS as the view engine
app.set('view engine', 'ejs');
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```

- After setting the view engine to ejs,
  - create a new folder in the root directory of your project called views and add your EJS
templates there.
- EJS looks for templates in the views folder - always store your .ejs files there.

- A fruits.ejs page in your views folder will be rendered using the following code in a route:
```javascript
                                                                            The res.render('fruits')
// Define a route to render the fruits.ejs page
app.get('/', (req, res) => {  function tells Express to find
    const fruitsList = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];    and render the fruits.ejs file
    res.render('fruits', { fruitsList});
```
});                                                                         from the views folder using
the configured view engine.
- Add the highlighted code in app.js

### Rendering a .ejs file

- Write your first ejs file:
- In the views folder, create a new file named fruits.ejs.
```html
<html>
<head>
    <title>Fruits</title>
</head>
<body>
    <ul>
        <% for(let i = 0; i < fruitsList.length ; i++) { %>
             <li>
                 <%= fruitsList[i] %>
             </li>
         <% } %>
    </ul>
</body>
</html>
```
- Save the file

### How are the 2 files linked?

- Notice how the array name and file name matches in the 2 files
- Try changing the file name in res.render to fruits1.ejs. Run the file and see what happens?
app.js
fruits.ejs

### Run your EJS in Express.js app

- Open the terminal in VS Code
- Run your app by typing the following command in your terminal: node app.js
- You should see the message “Server running at http://localhost:3000/”

### L07 Deliverables

- Create a simple Express app that displays a Travel Packing List page using EJS.
- The page should show two lists: clothes and toiletries.
- Your task:
- Set up an Express project in your L07 folder.
- Create two arrays: clothesList and toiletriesList with sample items.
- Set up a route to render an EJS template.
- Pass both arrays to the template as variables.
- Display the lists in two separate table columns.
- Sample Screenshot:

### L07 Deliverables - Challenge

- Add a form below your list that allows users to:
  - Enter a new item (e.g., "Socks")
  - Choose a category: clothes or toiletries
- Set up a POST route to handle the form submission.
- Use req.body to:
  - Get the item name
  - Get the selected category
  - Add the item to the correct list (clothesList or toiletriesList)
- After submission, re-render the page with the updated lists.
- See sample screenshot in next slide.

- Sample Screenshots:

### L07 Deliverables – Using AI

- Important Rules
  - Do not copy the AI code directly.
  - You must:
    - Read and understand the code
    - Modify the layout or content
    - Ensure the website runs correctly
- After Completing the Activity
  - Complete the Activity Reflection Journal: L07 Activity Reflection Journal.docx
  - Fill in the journal to demonstrate that you understand the code you used.

### Deliverables

- Activities
  - 
- L07 - Activity Reflection Journal.docx
- Upload all deliverables to POLITEMall before the next lesson.

### What have you learnt?

- Template Engines – Embedded JavaScript (EJS)
- Why EJS?
- How does EJS work?
- Setting up EJS in Express Environment


## Lesson 08 — Form processing in node.js with express and ejs


### Before we start

- Open Visual Studio Code and install the EJS Language Support extension.
- This extension will allow VS Code to do syntax highlighting for EJS. The EJS tags will be
highlighted with a different color to stand out for easier viewing.

### Another useful extension

- Install the GitHub Copilot extension.
- You can get GitHub Copilot for free ( https://github.com/education/students )
- Requires verification:
  - Upload your student ID
  - Approval may take some time
- Apply early if you want to use it for your lessons

### Passing Data to EJS Templates <%= %>

- EJS displays dynamic content using data.
- Data is passed to the template as an object in res.render()
- For instance, you want to pass a variable called name to your index.ejs template:
- You can use the variable in your index.ejs template in this way.
- When the template is rendered, the variable name is replaced with the actual value (e.g.,
'Peter') passed in via res.render().

### Setting up EJS in Express.js

- Open Visual Studio Code
- Launch VS Code on your laptop
- Create a New Folder:
- Create a L08 folder in your C237 folder
- Create a new folder (e.g. “EJSTemplateExercise”) in L08 Folder

- Open the folder which you just created in VS Code:
- Open VS Code and use the "File" menu to open your newly created folder.
- Open a terminal within VS Code (Terminal > New Terminal).
- Run the following commands in sequence to initialize your project and install the required
packages:
1. npm init –y
      - creates a package.json file
2. npm install express
      - installs the express framework
3. npm install ejs
      - Installs EJS templating engine for your project

### Activity 1

- Copy the files and folder located in the provided L08 Resources folder to the
EJSTemplateExercise folder you created earlier.

- You should now see the app.js file and views folder in Visual Studio.
- Edit app.js to include another variable “age” to be passed to the index.ejs page

- Edit index.ejs (in views folder) to display “You are age years old” where age is the
number passed in from app.js.
- Sample output:

### Conditional Statements in EJS

- EJS supports if...else logic to control what is shown
- To show or hide content based on data
- For Example:

### Activity 2

- With the folder “EJSTemplateExercise” still open in Visual Studio Code
- Edit index.ejs to display the last statement base on the conditions in the table below:
Age               Statement to display
18 and above              “You are an adult.”
Between 13 to 17          “You are a teenager.”
(inclusive)
12 and below              “You are a child.”
- Sample output:

### Form processing with EJS

- EJS uses JavaScript in HTML to generate dynamic content
- For Example:
submitted.ejs
form.ejs                                                 app.js
- After submitting a form, the data can be shown on another page

- req.body gets data from a form.
- Parsing the Request Body:
- Express cannot read form data by default
- You need to enable it using middleware:
- With this middleware, form data becomes accessible via req.body in your Express routes.

- Accessing Form Data:
- req.body will contain the form data
- Use req.body.name to get the value
OR

### Activity 3

- With the folder “EJSTemplateExercise” still open in Visual Studio Code
- Edit contact.ejs to include more form fields – Contact No. and Comments.
- Sample output:

- With the folder “EJSTemplateExercise” still open in Visual Studio Code
- Update app.js to pass form data to the EJS page
- Edit submitted.ejs to display the information entered by user (form data) in the contact page
- Sample output:

### Reusable Template Components <%- %>

- EJS lets you reuse parts of a page (e.g. header, footer)
- You can include .ejs files to a current template using the <%- include (’file.ejs’) %>
statement.
- For example, if you have a template called header.ejs that you want to include in your
index.ejs template, you can use the following code in your index.ejs template:
header.ejs                                              index.ejs

- This will include the contents of the header.ejs template to that point in the index.ejs
template.
- It is common practice to save templates that you will want to reuse across multiple pages
in a partials subdirectory in the views directory.
- To include the header in your code after doing this, attach the file path to the former syntax:
- The <%- include %> tag makes it simple to reuse common HTML elements across
multiple to preserve a consistent look across your application.

### Activity 4

- With the folder “EJSTemplateExercise” still open in Visual Studio Code
- Edit all ejs pages to include the header (found in the partials folder) to your page.
- Sample output:

### L08 Deliverables

- Build a simple Task Manager web application using Express.js and EJS.
- Your Task:
- Create a web form with the following input fields:
  - Task Title
  - Description
  - Deadline
  - Priority (dropdown: Low, Medium, High)
- When the form is submitted:
  - Redirect the user to a confirmation page
  - Display a “Task Entered” message and all submitted details
- Your app should include a Bootstrap navigation bar for styling and layout.

- Steps to complete the exercise:
- Set up a new Express.js project
- Create EJS templates for the registration form and any additional views
- Implement routes and middleware for handling form submissions and rendering views
- Basic Structure of your Express.js application:

- Sample Screenshot (Home page – index.ejs):

- Sample Screenshot (Task page – taskDetails.ejs):

- Sample Screenshot (Confirmation page – confirm.ejs):

- Sample Screenshot (Contact page – contact.ejs):

- Sample Screenshot (Thank You page – submitted.ejs):

### L08 Deliverables - Challenge

- Extend your app to support in-memory task storage:
- Store all submitted tasks in an array on the server (in-memory).
- Edit the /confirm route to display a list of all submitted tasks.
- Render the task list dynamically using EJS.
- Note: No database is needed — tasks can be stored in an array for now.

- Sample Screenshot (Confirmation page – confirm.ejs):

### L08 Deliverables – Using AI

- Important Rules
  - Do not copy the AI code directly.
  - You must:
    - Read and understand the code
    - Modify the layout or content
    - Ensure the website runs correctly
- After Completing the Activity
  - Complete the Activity Reflection Journal: L08 Activity Reflection Journal.docx
  - Fill in the journal to demonstrate that you understand the code you used.

### Deliverables

- Activities
  - 
- L08 - Activity Reflection Journal.docx
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- EJS Templates
- Passing Data to EJS templates
- Using EJS to Include Reusable Template Components
- Conditional Statements in EJS
- Form processing with EJS


## Lesson 09 — Debugging Fundamentals


### Lesson Overview

- In this lesson, you will:
  - Understand what debugging is and why it is important
  - Learn a step-by-step approach to identify errors

### Why Debugging Matters?

- Your app will NOT work perfectly the first time
- Bugs are normal in development
- Strong developers don’t guess, they debug.
- Debugging is not about fixing fast, it’s about understanding early.

### What is Debugging?

- Debugging is:
- Finding what is wrong
- Understanding why it is wrong
- Fixing it correctly
- NOT random guessing
- NOT copy and paste solutions

### Common Beginner Mistakes

- Changing code randomly
- Not reading error messages
- Skipping understanding

### The 5-Step Debugging Process

1. Understand the problem
- What is it trying to do?
- What should happen?
2. Identify the error
- What is going wrong?
3. Locate the source
- Where is the issue?
4. Analyze the cause
- Why is it happening?
5. Fix and Verify
- Fix and test again
- Debugging is a cycle, not one-time

### Today’s Focus

- We will learn how to:
1. Understand the problem
2. Trace the data flow
3. Identify the bug
4. Fix it correctly

### Debugging Activity instructions

- Group Setup
- Within your group, split into groups of 2 – 3
- Each sub-group will work on ONE debugging set
- Before you start
- Wait for your lecturer to assign your Set (A/B/C)
- Locate your worksheet in the L09 Student Folder
- Do not start until instructed.
- Your Task
- Analyse the given code
- Discuss and identify the bug(s)
- Answer the questions in the Word document together
- Time allocation
- You will have ~30 minutes
- Work together and ensure everyone understands

### Important Rules

- Do NOT rush to code immediately
- For this activity, Do NOT use AI to generate answers or fix the code
  - You may use AI to only clarify concepts (if needed)
  - You must be able to explain our answers without AI
- Focus on understanding the problem first
- Be ready to explain your answer
- Goal
  - Use the 5-step debugging process
    - Understand
    - Identify
    - Locate
    - Analyze
    - Fix

### What Lecturers Will Look For

- Do you understand your code?
- Can you explain your logic clearly?
- Can you identify and fix issues independently?
- IMPORTANT REMINDER
  - Completing your app does not guarantee an ‘A’ grade
  - Understanding your solution is the key to doing well
- In CA1, it’s not only about whether your app works perfectly. It's about whether you
understand how it works and can fix it when it doesn’t.

### Using AI Responsibly

- AI can help you learn and explore ideas
- DO NOT blindly copy and paste
- DO NOT rely on AI to complete your app for you
- You MUST UNDERSTAND and be able to EXPLAIN your code

### CA1 Submission

- All submissions must be uploaded to SA3.0 by 25 May 2026, 2359hrs
- You are required to submit the following items:
  - Complete Web Application Project Folder (zipped)
Your project folder should include all files required to run the Node.js application.
  - Development Reflection Journal
The reflection journal must include a completed table explaining the tasks and features in your
application.
  - Application Demonstration Video (Not more than 6 mins)
Record a video demonstrating your application. Explain key features, user interactions, and main
functionalities, and link your explanation to relevant parts of your code.

### Deliverables

- L09_Debugging Worksheet_Set A/B/C.docx
- Upload all deliverables in a zipped folder to POLITEMall before Saturday, 2359hrs

### What have you learnt?

- Debugging is a step-by-step process, not guessing
- Small mistakes (e.g. naming, routes) can break your app
- Errors are clues to help you find the problem


## Lesson 11 — Application Design & Planning


### Lesson Objectives

- By the end of this lesson, you will be able to:
  - Describe the purpose of application design and planning
  - Plan and design a simple web app
  - Identify and define core features of a simple web application
  - Develop a simple wireframe to represent app layout
  - Use AI tools to generate and refine app ideas (with understanding)

### Application Design & Planning

- In this lesson, you will:
  - Learn how to plan and design a simple web app
  - Practice defining clear and realistic features
  - Create a structured plan before coding

### What You Will Produce

- By the end, you should have:
  - App idea
  - Problem statement
  - 3-5 features
  - Simple Wireframes (2-4 screens)
- You will use this to build your app in the next lesson

### Why Planning Matters

- Prevents confusion when coding
- Helps you stay focused
- Saves time later
- If your plan is messy, your code will be messy.

### Decide on a Simple App

- Requirements:
  - Choose a different app idea from your CA1
  - Keep it simple and realistic
  - Focus on clear planning, not complexity
- Steps to decide:
  - Identify your target user (Who is this for?)
  - Define the problem (What issue are they facing?)
  - Think of a simple solution (What will your app do?)
  - List possible features
  - Select only 3–5 key features
  - Check if it is realistic to build in 2 hours

- Things to note:
  - Build based on what you have already learnt (HTML, CSS, JavaScript, Express, EJS)
  - Keep your app simple and doable within the lesson
  - No database required
  - No authentication (login)
  - No complex features (e.g. live chat, notificatons)
- Example:
  - App: To-do list
  - User: Students
  - Problem: Too many tasks => easy to forget
  - Solution: Track tasks easily
- Start small. A working simple app is better than a complex unfinished one.

### What are Features?

- Features = what your app can do
- Examples:
- Add Item
- View list
- Update Item
- Delete item

### Start Big, Then Reduce

- Step 1:
- List ALL ideas
- Step 2:
- Reality Check: Ask yourself
  - Can I build this in 2 hours?
  - Do I understand how to code this?
  - Did I already learn this in class?
  - If NO, simplify
- Step 3:
- Decide on:
  - Must Haves – Needed for App to work
  - Good to Haves – Extra features (if time allows)
- Step 4
- Keep only 3 – 5 must haves features

### How Will Your App Work?

- Think about:
- What pages do you need?
- What happens when user clicks?
- Example:
- Pages needed
  - Home page
  - Add Task page => goes to page to add a task
  - View Tasks page => shows all tasks list

### What is Wireframe?

- A simple sketch of your app layout
- Shows structure, not design
- Uses boxes and labels only
- Helps plan what goes on each page

### What is Wireframe is NOT?

- NOT final design
- NO colours or styling
- NOT detailed UI
- Wireframes focus on layout, not looks.

### What to Include in a Wireframe?

- Each screen should show:
- Title
- Nav bar
- Buttons
- Input fields
- Other elements
- Example:
- Add Page
  - Input fields
  - Submit buttons
- List page
  - List items
  - Delete/Edit links

### Examples of Wireframe

- Example 1: To-Do List App (Add Task page)

- Example 2: To-Do List App (Edit Task page)

### What to Include?

- You may use AI to help:
- Generate Ideas
- Suggest features
- Example prompt:
- “Suggest a simple web app with 3 -5 features for beginners”
- Then:
- Simplify
- Remove complex features
- Rewrite in your own words

### To complete for submission

- Complete L11 – App Planning Template.docx
- Ensure all sections are filled in:
  - App idea & problem statement
  - Features List
  - App Pages list
  - Wireframes (2–4 screens)
  - Reflection
- Keep your app simple and realistic
- Save and upload the document to PoliteMALL
- Reminder:
  - You will use this document as a starting point to build you app in L12
  - You need to complete this document before L12.

### Final Check

- Can you answer:
- What does your app do?
- What are your main features?
- What pages will you build?

### Deliverables

- Submit to PoliteMall BEFORE Lesson 12
  - L11 – App Planning Template.docx
- In L12, you will:
  - Build your app using Express + EJS
  - Use your features and pages listed in your plan
  - So, your plan needs to be clear

### What have you learnt?

- The importance of planning before coding
- How to define a simple app idea
- How to select key features for your app
- How to keep your app realistic and doable
- How to create basic wireframes for your app


## Lesson 12 — Application Implementation


### Lesson Overview

- In this lesson, you will:
  - Review your app plan from L11
  - Build your web application
  - Implement your key features
  - Use GitHub to manage your code

### Quick Recap

- Think about:
- L11 app planning template (completed version)
  - App idea + problem
  - 3 – 5 features
  - Pages list
  - Wireframes

### From Plan to Code

- Each feature becomes a function in your app
- Each page needs a route and an EJS file
- Each wireframe becomes the layout you will build
- Your plan tells you exactly what to code
  - Follow your plan step-by-step

### Building the App

(~ 60 mins ++)

### How we will build today

1. Set up project
2. Create routes (app.js)
3. Create pages (EJS)
4. Connect forms and data
5. Implement features
- Add form
- Store data in array
- Display data
- Edit/delete if needed

### Quick Recap – Forms and data

- How is data/information passed?
submitted.ejs
form.ejs                                             app.js

### App Requirements (Reminder)

- Your app must:
  - Use Express
  - Use EJS templates
  - Use in-memory array
  - Use GET & POST
  - Have multiple pages

### Introduction to GitHub

- GitHub is a web-based platform for hosting and collaborating on code using version
control (Git).
- Why Github?
- Version control
  - helps teams work together, review updates, and maintain a clean code history.
- Commits record changes, allowing developers to:
  - Track progress
  - Revert to earlier versions
  - Understand how the project evolves

### Publish your app to GitHub

- To initialize and commit your project to GitHub:
  - Open the file “L12 - GitHub_VSCode_Guide.pdf”
  - Locate it in your L12 Students Folder
  - Follow the step-by-step instructions in the guide

### Reflection

- Did your plan help you?
- What was difficult?
- What would you improve?

### Deliverables

- Completed L12 application
- L12 – Activity Reflection Journal.docx
- Upload all deliverables in a zipped folder to POLITEMall before Saturday, 2359hrs

### What have you learnt?

- How to turn a plan into a working app
- How to structure routes and pages
- How to handle user input
- How planning helps development


## Lesson 13 — Enhancing DOM


### L13 Activity - E-Learning

- Instructions:
- Start by reading through the provided slides.
- Then, watch the LinkedIn Learning video (link inside the slides).
- After completing the video, download your Certificate of Completion.
- Finally, submit your certificate to POLITEMall by the end of your lesson day.

### What is the DOM?

- DOM = Document Object Model
- It represents your HTML page as a tree of elements
- Each HTML element becomes an object JavaScript can access
- Think of the DOM as a map of your webpage that JavaScript can read and change.
- HTML → Tree structure (html → body → div → p)

### What does “Enhancing the DOM” mean?

- Using JavaScript to interact with HTML elements
- Make pages more dynamic and interactive
- Examples:
- Change text or styles
- Show/hide elements
- Respond to user actions (clicks, typing)

### Why Learn DOM Manipulation?

- Creates interactive web apps
- Improves user experience
- Foundation for frameworks like React, Vue, Angular
- Builds understanding of JavaScript across frontend & backend (Node.js)
- Used in almost every modern website

### LinkedIn

Learning Video

### Deliverables

- Log in to LinkedIn Learning using your RP email to access the course for free.
- Watch the video titled “JavaScript: Enhancing the DOM”.
  - JavaScript: Enhancing the DOM
- If you're unable to log in, please fill in this form to request access support.
- Once you’ve completed the video, download your Certificate of Completion from
LinkedIn Learning.
- Upload your certificate to POLITEMall. Your activity will only be considered completed
after the certificate has been uploaded.
- This activity must be completed by the end of your lesson day.
  - If your lesson falls on a public holiday, submit it by the end of the following day.
- Your attendance for the lesson day will be based on the successful submission of your
certificate on POLITEMall.


## Lesson 14 — Introduction to Database Integration in Applications


### Lesson Objectives

- By the end of this lesson, you will:
  - Understand how applications connect to database
  - Learn where SQL is used in applications
  - Trace how data flows through an application
  - Read and analyse simple express + SQL Code

### What You Already Know

- You already know:
- SQL Statements
  - SELECT
  - INSERT
  - UPDATE
  - DELETE
- Tables and records
- Today, you will learn about how applications use SQL

### Overview

- Applications do NOT store data themselves.
- Applications handle user interactions
- Database store and retrieve data permanently
L12 (No DB)                                        Database Application
Uses arrays                                              Uses database
Temporary data                                            Permanent data
Lost after restart                                       Stored permanently

### Main Flow

User Action       Application               Database                      Application     User
  - Feature /       • Express                     • SQL                     • Database     • Response
Function          Route                         Query                     Action
1. Feature
2. Express Route
3. SQL Query
4. Database Action
5. Response

### Basic Database Connection

- A database connection allows the application to communicate with the SQL server.
- It tells the SQL server:
  - Which database to use
  - Where the database is located
  - Which user is connecting
- Without a connection, the application cannot:
  - run SQL queries
  - store data
  - retrieve data from the database

### CRUD Operations in Applications

- Now that the application is connected to the database, how does it actually interact with
the data?
CRUD                           Purpose                          SQL
Create                    Add new data                         INSERT
Read                     Retrieve data                        SELECT
Update                      Modify data                        UPDATE
Delete                    Remove data                          DELETE

### CREATE (Adding Data) - INSERT

- Feature: Add a new Task - This operation adds a new record into the database.
POST /addTask
      - Processes form data
      - Executes INSERT query
User submits form
↓
GET /addTask route                                                      Redirect to /tasks
/addTask route handles
Displays Add Task form               request
Updated task list displayed
↓
INSERT query
↓
Database stores task
↓
User Redirected
to /tasks

- Feature: Add a new Task - This operation adds a new record into the database.
Gets user input
User submits form
↓
/addTask route
SQL statement
handles request
to add data
↓
INSERT query
↓
Database stores task
↓
Executes SQL query on database                         User Redirected
to /tasks

### READ (Retrieving Data) - SELECT

- Feature: View Task List - This operation retrieves data from the database and displays it
to the user.
GET /tasks
      - Executes SELECT query
      - Retrieves task records
from database
User requests to view
GET /tasks route                         tasks                                Task List Displayed
User requests to view task list                  ↓                             Retrieved tasks shown to user
/task route handles
request
↓
SELECT query
↓
Database retrieves task
↓
Display task list page

- Feature: View Task List - This operation retrieves data from the database and displays it
to the user.
User requests to
SQL Statement to              view tasks
retrieve all tasks                  ↓
/task route handles
request
↓
SELECT query
Executes SQL query on database                          ↓
Database retrieves
task
↓
Displays retrieved data on webpage                       Display task list page

### UPDATE (Editing Data) - UPDATE

- Feature: Edit Existing Task - This operation updates an existing record in the database.
POST /editTask/:id
      - Processes updated
form data
      - Executes UPDATE query
User submits form to
GET /editTask/:id route              edit tasks                             Redirect to /tasks
Displays Edit Task form                   ↓                              Updated task list displayed
with existing task data         /editTask/:id route
handles request
↓
UPDATE query
↓
Database updates task
↓
Redirect to /tasks

- Feature: Edit Existing Task - This operation updates an existing record in the database.
Gets task ID from URL
Gets updated user input               User submits form
to edit tasks
↓
/editTask/:id route
SQL Statement to          handles request
update existing tasks            ↓
UPDATE query
↓
Database updates
task
Executes SQL query on database                            ↓
Redirect to /tasks

### DELETE (Removing Data) - DELETE

- Feature: Delete Task - This operation removes a record from the database.
GET /deleteTask/:id
      - Executes DELETE query
      - Removes selected task
from database
User requests to delete
User clicks Delete button                       tasks                                      Redirect to /tasks
GET /deleteTask/:id route triggered                  ↓                              Updated task list displayed after deletion
/deleteTask/:id route
handles request
↓
DELETE query
↓
Database removes task
↓
Redirect to /tasks

- Feature: Delete Task - This operation removes a record from the database.
Gets task ID from URL
User requests to
delete tasks
SQL Statement to             ↓
remove tasks       /deleteTask/:id route
handles request
↓
DELETE query
↓
Database removes
Executes SQL query on database
task
↓
Redirect to /tasks

### Putting It All Together:

Full App Walkthrough

### Full App Walkthrough

- During this walkthrough, identify:
  - Pages connect together
  - Routes handles requests
  - SQL queries communicate with the database
  - Data is displayed back to the user
- Walkthrough Steps
User Action       Display Route         Form Submission Route            SQL          Response
View Tasks    /tasks                -                                   SELECT   Display task list
Add Task     (GET) /addTask        (POST) /addTask                     INSERT   Redirect to /tasks
Edit Task    (GET) /editTask/:id   (POST)/editTask/:id                 UPDATE   Redirect to /tasks
Delete Task   /deleteTask/:id       -                                   DELETE   Redirect to /tasks
- Every CRUD feature follows the application flow:
  - User Action → Route → SQL Query → Database → Response

### Developer Vs User

Developers                                                              Users
- Developer Flow for Add Task
Submit form                                1.     Open Add Task Page
↓                                    2.     Fill in the form
Route handles data                            3.     Click “Add Task” button
↓                                    4.     See updated task list
INSERT query executes
↓
Database stores task
↓
Redirect to /tasks
↓
Updated task list displayed
- Developers think about systems and flow
“How does the data move through the application?”                   “I entered my task and the app saved it”

### Activity Worksheet

- Complete the worksheet: L14 – Activity Worksheet.docx
- In this exercise:
  - Identify routes and SQL statements
  - Trace application flow
  - Understand how application communicates with the database
- IMPORTANT REMINDER:
  - This exercise is not about memorizing code
  - Focus on:
    - understanding how the application works
    - identifying how each part connects together
    - recognising the role of SQL in the application

### Deliverables

- L14 – Activity Worksheet.docx
- Upload all deliverables in a zipped folder to POLITEMall before Saturday, 2359hrs.

### What have you learnt?

- How applications communicate with databases
- Why database connections are needed
- How SQL statements are used inside applications
- How CRUD operations work in a web application
- How routes handle requests and execute SQL queries
- How data flows through an application:
- User Action → Route → SQL Query → Database → Response
- How EJS displays data retrieved from the database


## Lesson 15 — Database Integration with Express I


### HTTP Methods

- app.get()
- The GET method is used to request data from a specified resource.
- Purpose: It is used to get information from the server without changing anything. Sending the
same GET request many times should give the same result.
- Example: When you type a website address and press Enter, your browser sends a GET request
to the server to load the page.
- app.post()
- The POST method is used to submit data to be processed to a specified resource.
- Purpose: It is used to send data to the server to create or update something. POST requests
may result in changes to the server’s data.
- Example: Submitting a form sends a POST request.

### Database

Storing Persistent Data

### Why Database?

- Databases store and manage key data.
- Example: User information, Product details, etc
- Provide a structured way to:
- Save Data
- Retrieve Data
- Update Data
- Delete Data
- Help ensure:
- Data reliability
- Long-term storage (persistence)

### Database Integration

with Express

### Steps to create an Express app with database

- Set up database
- Create and initialise your project
- Install Express, MySQL client
- Set up Express
- Create Routes
- Run your application

### Setting up database in MySQL Workbench

- If you recall what you learned in C207, you can use MySQL Workbench to create a new
database or import an existing one.
- TO DO:
- Follow the instructions in the document (Guide_Importing Database in MySQL
WorkBench.doc) found in L15 Activity Files folder to import ‘c237_supermarketapp’ database
in MySQL Workbench.

### Create and initialize your project

- Create a new directory for your project in your L15 folder: SupermarketApp.
- Follow the instructions in the document (Guide_Create a new NodeJS Express EJS app with
database.doc) found in L15 Activity Files folder.

### Create and initialise your project

- Initialize your project: npm init –y
- Install Express:
  - Express is a web application framework for Node.js.
  - Install it using npm: npm install express
- Install EJS:
  - EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
  - Install it using npm: npm install ejs
- Install MySQL client:
  - You need a MySQL client library to interact with the MySQL database from Node.js.
  - You can use mysql2 which is a fast MySQL client: npm install mysql2
- Set up Express:
  - Create an app.js file (or any other name you prefer) in your project directory. This file will contain your
Express application code.

### Update mySQL Connection information

- Update your mySQL Connection information in app.js to the following:
mysql.createConnection()
MySQL
Database
Connected!

### Retrieve all products

from database

### Create Routes

- Update the route in app.js to retrieve and display all products found in the database:
// Define routes
```sql
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM products';
    // Fetch data from MySQL
    connection.query( sql , (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error Retrieving products');
        }
      // Render HTML page with data
      res.render('index', { products: results });
    });
});
```

### Retrieve all products from database

- This handles GET requests to the root URL (‘/’) and runs when a user visits the homepage.

- Inside the route, a MySQL query runs using connection.query(), a method from MySQL2
used in Node.js to work with MySQL databases.

- If there’s no query error, res.render() displays the index.ejs template, passing the
products data for rendering.

### Displaying all products

in page rendered

- Copy the ‘index.ejs’ file found in your L15 Activity Files folder and paste it into the views
folder in your supermarket App.
- Your project folder should look like this:

Database
Table
app.js
index.ejs

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js”
- Open your browser and enter the url http://localhost:3000. You should see the following:

### Displaying remote

images

### Displaying remote images

- Update your index.ejs page with the following code:

- Notice the images we are currently using are online images.
- We will be learning how to upload and display downloaded images in lesson 18.

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js”
- Open your browser and enter the url http://localhost:3000. You should see the following:

### What have you learnt?

- Database with Express and EJS
- Retrieve and display data
- Displaying images


## Lesson 16 — Database Integration with Express I


### Form Element

The action attribute                                    The method attribute determines
form
opening tag
data                                                    POST.
```javascript
<form action=“/endpoint” method=“POST”>
    All the form contents go here
</form>
```
form closing tag – it ends the form

submitted.ejs
form.ejs                         app.js

### Steps to create an Express app with database

- Set up database
- Create and initialize your project
- Install Express, MySQL client
- Set up Express
- Create Routes
- Run your application

### Retrieve product by id

from database

### Create Routes to retrieve ONE product by id

- Open the supermarketApp created in L15 in Visual studio code.
- Add a route in app.js to retrieve and display one product by id from the database:
*Study the code flow shown here.
Then, copy the complete implementation from the next slide
into your application.

```sql
app.get('/product/:id', (req, res) => {
    // Extract the product ID from the request parameters
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE productId = ?';
    // Fetch data from MySQL based on the product ID
    connection.query( sql , [productId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error Retrieving product by ID');
        }
        // Check if any product with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the product data
            res.render('product', { product: results[0] });
        } else {
            // If no product with the given ID was found
            res.send('Product not found');
        }
    });
});
```

### Displaying product info

in page rendered

### Displaying product information

- Copy the ‘product.ejs’ file found in your L16 Activity Files folder and paste it into the views
folder in your supermarket App.
- Your project folder should look like this:

Database
Table
app.js
product.ejs

- Update your index.ejs page with the following code:
- This would make the product name clickable – link to the product info page.

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000. You should see the following:

### Add a new product

- Add a route in app.js to display the addProduct.ejs page and to add the product into the
database.
*Study the code flow shown here.
Then, copy the complete implementation from the next slide
into your application.

```sql
app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});
app.post('/addProduct', (req, res) => {
    // Extract product data from the request body
    const { name, quantity, price, image } = req.body;
    const sql = 'INSERT INTO products (productName, quantity, price, image) VALUES (?,
?, ?, ?)';
    // Insert the new product into the database
    connection.query( sql , [name, quantity, price, image], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding product:", error);
            res.send('Error adding product');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});
```

- Update app.js to enable form processing:

- Copy the ‘addProduct.ejs’ file found in your L16 Activity Files folder and paste it into the
views folder in your supermarket App.
- Your project folder should look like this:

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js”
- Open your browser and enter the url http://localhost:3000 and click on the “Add new product” link in
the navbar. Add a new product. You should the new product added to the inventory list:
* You can search for freely usable images here: Beautiful Free Images & Pictures | Unsplash

### Week 8 Activity

- Create a StudentListApp using Express and EJS.
- The application should have the following functionality:
  - Display all students' details found in the database.
  - Display a form to add new student details into the database
  - Add new student details into the database
  - Your page should include bootstrap navbar.

### Week 8 Activity (Steps to complete exercise)

1. Create a new database (e.g. c237_studentlistapp) in phpMyAdmin (Refer to Step by
Step guide in your L16 Activity Folder)
2. Create a ‘student’ table in the newly created database

3. Enter student data into the newly created table
* You can search for freely usable images here: Beautiful Free Images & Pictures | Unsplash

4. Create a StudentListApp folder in your L16 folder (Refer to Guide)
5. Create EJS templates for the addStudent form and any additional views
6. Implement routes and middleware for handling form submissions and rendering views
7. Basic Structure of your Express.js application:

### Week 8 Activity Sample Screenshots

- View all students (index.ejs)

- Add New Student (addStudent.ejs)

- View all students (index.ejs) – After new student added

### Week 8 Activity – Class Discussion

- Think about the activity you completed today.
- If you had access to AI:
  - At which point could it have been helpful
  - What would you have asked it?
  - How would you verify whether its response was correct?

### Deliverables

- Activity
- 
- Commit and Push your project folder to GitHub
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- Database with Express and EJS
  - Retrieve data by id
  - Add new data
- How to recognize common application patterns
- Adapt solutions to different contexts
- Troubleshoot and test your work
- Use AI responsibly as a support tool rather than a replacement for understanding


## Lesson 17 — Database Integration with Express II – Update & Delete


### Update product details

in database

### Steps to update data in database

1. Display Current Data
- Retrieve and display existing data in a form.
2. User edits form with new data
- User updates the information
3. User Submits Changes
- User clicks “Update” to send changes to the server.
4. Update database
- Server updates the record with the new data.
5. Show Confirmation
- Notify user that the update was successful.

### Update index.ejs page

- Open the supermarketApp created last week in Visual studio code.
- Edit the index.ejs page to display the “edit” and “delete” links.
- Don’t forget to add the headers <th> too.
<!-- Edit Link -->
```html
<td><a href="/editProduct/<%= products[i].productId %>">Edit</a></td>
<!-- Delete Link -->
<td><a href="/deleteProduct/<%= products[i].productId %>"
    onclick="return confirm('Are you sure you want to delete this product?')">Delete</a></td>
```

### Display Current Data in form

- Add a route in app.js to retrieve the existing data from the database.
```sql
app.get('/editProduct/:id', (req,res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE productId = ?';
    // Fetch data from MySQL based on the product ID
    connection.query( sql , [productId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving product by ID');
        }
        // Check if any product with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the product data
            res.render('editProduct', { product: results[0] });
        } else {
            // If no product with the given ID was found, render a 404 page or handle it accordingly
            res.send('Product not found');
        }
    });
});
```

app.js
index.ejs

### Displaying product information

- Copy the ‘editProduct.ejs’ file found in your L17 Activity Files folder and paste it into the
views folder in your supermarket App.
- Your project folder should look like this:

### Display Current Data in form

editProduct.ejs

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000. You should see the following:

### Updating Database

- Add a route in app.js to update the corresponding record in the database with the new
data provided by the user.
*Study the code flow shown here.
Then, copy the complete implementation from the next slide
into your application.

```sql
app.post('/editProduct/:id', (req, res) => {
    const productId = req.params.id;
    // Extract product data from the request body
    const { name, quantity, price } = req.body;
    const sql = 'UPDATE products SET productName = ? , quantity = ?, price = ? WHERE productId = ?';
      // Insert the new product into the database
      connection.query( sql , [name, quantity, price, productId], (error, results) => {
          if (error) {
              // Handle any error that occurs during the database operation
              console.error("Error updating product:", error);
              res.send('Error updating product');
          } else {
              // Send a success response
              res.redirect('/');
          }
      });
});
```

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000. Make some changes and click
on “Update Product”:

### Delete a product

- Add a route in app.js to delete a product from the database.
```sql
app.get('/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE productId = ?';
    connection.query( sql , [productId], (error, results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error deleting product:", error);
            res.send('Error deleting product');
        } else {
            // Send a success response
            res.redirect('/');
        }
    });
});
```

app.js
index.ejs

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and try deleting one of the
product. The product should be removed from the list after you select “ok”.

### Activity

- studentList App
- Include Update and Delete Function to your studentList App.
- Your studentList App should have all CRUD function by the end of today’s lesson.

### Deliverables

- Activity
- 
- Commit and Push your code to GitHub
- Upload all deliverables in a zipped folder to POLITEMall before the next lesson.

### What have you learnt?

- Database with Express and EJS
- Update Data
- Delete Data


## Lesson 18 — Database Integration with Express II – Activity


### Application Flow Summary

- Every CRUD feature follows the application flow:
- User Action → Route → SQL Query → Database → Response
GET Route                          POST Route        Database
User Action                                                                                  Expected Result
(Display)                          (Submit)         Operation
View Products   (GET) /                       -                                 SELECT     Display task list
View Product                                                                               Display product
(GET) /product/:id            -                                 SELECT
Details                                                                                 details
Add Product     (GET) /addProduct             (POST) /addProduct                INSERT     Redirect to /
Edit Product    (GET) /editProduct/:id        (POST)/editProduct/:id            UPDATE     Redirect to /
Delete Product   (GET) /deleteProduct/:id

### Displaying Images

- Update the app.js file to include the following line of code:
// enable static files
app.use(express.static('public'));
- This line of code configures Express.js to serve static files from a directory named
"public".

- express.static() is a built-in middleware function in Express.js.
  - It is used to serve static files, such as images, CSS files, JavaScript files, and other resources,
from a specified directory.
- 'public' is the directory from which the static files will be served.
  - In this case, it's specified as "public", but you can replace it with any directory path relative to the
root directory of your Node.js application.

- Copy the ‘public’ folder found in your L18 Activity Files folder and paste it into your
supermarket App folder.
- Your project folder should look like this:

- Update your index.ejs page with the following code:

- Update the image name in the products table in MySQL Workbench:

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000. You should see the following:

### Steps to upload image to server

- To enable image upload to server, you can use the multer middleware to handle file
uploads.
1. Install Multer package using npm:
npm install multer
2. Set Up Multer:
Configure multer to handle file uploads. Specify the storage location and file naming convention.
3. Update the route:
Update the route to handle both file uploads and form data.

### Set up multer for file upload

- Update app.js to set up multer for file uploads:
// Set up multer for file uploads
```javascript
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
```

### Update the route (/addProduct)

- Update the route /addProduct in app.js to handle file upload:
```javascript
const { name, quantity, price } = req.body;
let image;
if (req.file) {
    image = req.file.filename; // Save only the filename
} else {
    image = null;
}
```
The upload.single('image') middleware function in the multer package is used to handle
single file uploads in an Express.js application.

### Update views (addProduct.ejs)

- Update addProduct.ejs to include file upload input type:
// product name form input
// quantity form input
// price form input

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and try adding a new product.
You should browse for an image from your storage for upload.

### Update the route (/editProduct)

- Update the post route for /editProduct in app.js to handle file upload:
```javascript
let image = req.body.currentImage; //retrieve current image filename
    if (req.file) { //if new image is uploaded
        image = req.file.filename; // set image to be new image filename
    }
```

### Update views (editProduct.ejs)

- Update editProduct.ejs to include file upload input type:
// product name form input
// quantity form input
// price form input
```html
<input type="text" name="currentImage" value = <%= product.image %> readonly><br>
<img src = "/images/<%= product.image %>" width="20%"><br><br>
New Image:<br> <input type="file" id="image" name="image" accept="image/*" value=<%= product.image %> ><br><br>
```

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and try adding a new product.
You should browse for an image from your storage for upload.

### Week 09 Activity

- Update your StudentListApp created in Week 08 to include the update and delete
function.
- The final application should have the following functionality:
  - Display all students’ details found in the database.
  - Display a form to add new student details into the database
  - Add new student details into the database
  - Update student details into database
  - Delete student from database
  - Upload and display a student photo with each student’s details (image upload and display)
  - Your page should include bootstrap navbar.

### Week 09 Activity Sample Screenshots

- View all students (index.ejs)

- Add New Student (addStudent.ejs)

- View all students (index.ejs) – After new student added

- Update student details (updateStudent.ejs)

- Delete Student (index.ejs) – Anne will be removed when “ok” is clicked

### Deliverables

- Activity
- 
- Commit and push your code to GitHub
- Upload all deliverables in a zipped folder to POLITEMall before Saturday, 2359hrs.

### What have you learnt?

- Database with Express and EJS
- Displaying Image
- Image Upload


## Lesson 19 — Authentication and Authorisation


### Registration

- Registration is the process of creating a new user account in the application.
- A registration typically includes:
  - Name
  - Email / Username
  - Password
  - Role (Optional, e.g. user or admin)

### What Happens During Registration?

- User fills in a form
- Server validates the input
  - E.g.
    - Valid Data (e.g. proper email format, password length)
    - Unique (e.g. no duplicate email)
- If okay:
  - Password is hashed
  - Data is stored in the database
  - User redirected to Login Page
- If not okay:
  - User gets an error message
Registration isn't just filling in a form - it triggers a series of server-side actions.

### Let’s Try!

- Create a folder L19 in your C237 folder.
- Copy the folder registrationApp found in your “L19 Activity Files” folder and paste it into
the L19 folder which you created earlier.
- Import your database in MySQL Workbench using the “C237_usersdb.sql” file found in
your “L19 Activity Files” folder.

- Open the registrationApp (the one in your L19 folder) in Visual Studio Code.
- Open terminal and install the required packages:
  - npm init –y
  - npm install express
  - npm install ejs
  - npm install mysql2
  - npm install connect-flash:
    - a middleware for Express applications that shows temporary messages (e.g.
Login Error, Logout Success).
  - npm install express-session:
    - a middleware for managing sessions in Express applications. Sessions allow you
to store login info (session data) between page visits.

### Why do we need Sessions?

- HTTP requests are independent. Without sessions, the server does not automatically
remember that a user has logged in.
- A session allows the server to remember user information across different page visits.

### Set up express-session

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
```javascript
app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
     // Session expires after 1 week of inactivity
     cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));
```
1000 → milliseconds in 1 second
60 → seconds in 1 minute
60 → minutes in 1 hour
24 → hours in 1 day
7 → number of days

### Why do we need Sessions?

- HTTP is stateless. Without sessions, the server forgets the user between requests.

### Server-Side Validation

- Add server-side validation to an existing registration form.
- Steps:
1. Create a middleware function validateForm.
2. Integrate validateForm into the registration route.
3. Test the validation by submitting various forms.

### Step 1: middleware function

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
//******** TODO: Create a middleware function validateRegistration ********//
```javascript
const validateRegistration = (req, res, next) => {
    const { username, email, password, address, contact } = req.body;
     if (!username || !email || !password || !address || !contact) {
         return res.send('All fields are required.');
     }
     if (password.length < 6) {
         req.flash('error', 'Password should be at least 6 or more characters long');
         req.flash('formData', req.body);
         return res.redirect('/register');
     }
     //If all validations pass, the next function is called, allowing the request to proceed to the
     //next middleware function or route handler.
     next();
};
```

### Step 2: Integrate function into route

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
This handles user registration. It validates the input using validateRegistration, then inserts the new user's
data into the database (hashing the password with SHA1). If successful, it flashes a success message and
redirects the user to the login page.

### Step 3: Test the validation

- Run your app and try to create a new user.
- Try entering a password shorter than 6 characters and see what happens.

- Run your app and try to create a new user.
- Enter all the information correctly and you should see a “Cannot Get /login” error. This is
ok as we have not defined the /login route yet.
- Check your database and you should see the new user record inserted.

### Authentication Vs

Authorisation

### Authentication Vs Authorisation

Authentication                                       Authorisation
Who are you?
Login with email/password
Creates session
Example: John logs in

### Authentication

- Authentication is the process of verifying the identity of a user.
- Involves verifying a username and password.
- If the login info is correct:
  - The server knows you are a real user
  - It creates a session so you stay logged in while using the app

### Implementing Basic Authentication

- Steps to implement login function:
1. Set up express-session for session management. (Done earlier)
2. Create login routes.
3. Create logout route.
4. Test the authentication process by logging in users.

### 2. Create login routes.

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
//******** TODO: Insert code for login routes to render login page below ********//
```javascript
app.get('/login', (req, res) => {
    res.render('login', {
        //retrieve success and error messages from the flash middleware and
        //pass them to the login view for display.
        messages: req.flash('success'),
        errors: req.flash('error')
    });
});
```

### 2. Create login routes                                                  //******** TODO: Insert code for login routes for form submission below ********//

```sql
                                                                        app.post('/login', (req, res) => {
                                                                              const { email, password } = req.body;
• Open app.js (RegistrationApp) in
  Visual studio code and add in the  if (!email || !password) {
                                                                                    req.flash('error', 'All fields are required.');
  code.  return res.redirect('/login');
   Get Form Data  }
                                                                              const sql = 'SELECT * FROM users WHERE email = ? AND password = SHA1(?)';
   -   Retrieves Login Details submitted from form  db.query(sql, [email, password], (err, results) => {
                                                                                    if (err) {
   Check Database  throw err;
                                                                                    }
   -   checks whether the email and password match  if (results.length > 0) {
       // Successful login
                                                                                         req.session.user = results[0]; // store user in session
   Store Session
                                                                                         req.flash('success', 'Login successful!');
                                                                                         res.redirect('/');
   -   If login is successful, the first user record row
                                                                                    } else {
   -   E.g.
                                                                                         req.flash('error', 'Invalid email or password.');
                                                                                         res.redirect('/login');
                                                                                    }
                                                                              });
                                                                        });
```

### Login Routes

app.js – / route
index.ejs
app.js – /login route

### 3. Create logout route.

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
//******** TODO: Insert code for logout route ********//
```javascript
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
```
- req.session.destroy(); – Ends the user session and clears all session data (e.g., login info).
- res.redirect('/'); – Sends the user back to the home page (or another route).

### Let’s test it out

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and test the authentication
process by registering, logging in and logging out users.

### Sample Screenshots (Register)

Mary Tan inserted into database

### Sample Screenshots (Login)

Login Failed
Login Success

### Authorisation

- Authorisation
- Is the process of granting access to resources based on user roles.
- Ensures data integrity and user experience.
- Example: Role-Based Access Control (RBAC)
- Different access levels for admin and regular users.
- E.g.
- req.session.user.role = “user”;
- Can this user access /admin?

### Let’s Try

- Implement role-based access control in your Registration App.
1. Define roles and permissions
2. Create middleware for checking authentication and roles
3. Protect routes using middleware
4. Test with different user roles.
Logged in                         Role                                Can Access
-                              Login Page only
User                                 Dashboard
Admin                            Dashboard + Admin Page

### Step 1: Define roles and permissions

- Update your database table in MySQL Workbench:
- Add an additional table column to your users table
(Alter table -> Add role column -> Apply -> Finish)

- Update your database table in MySQL Workbench:
- Update the roles for your users who are already in the database and click “Apply”

- Open the registrationApp (created in L19) in Visual Studio Code.
- Update your registration form
  - Open your register.ejs file and add another select input for User/Admin
```sql
<div class="form-group">
    <label for="role">Role:</label>
    <select id="role" name="role" class="form-control" required>
          <option value="user" <% if (formData && formData.role === 'user') { %> selected <% } %>>User</option>
          <option value="admin" <% if (formData && formData.role === 'admin') { %> selected <% } %>>Admin</option>
    </select>
</div>
```

- Run your app. Your updated register form should look like this:

- Open app.js (RegistrationApp) in Visual studio code and update the register route:

### Step 2: Create middleware for checking

authentication and roles
- Open app.js (RegistrationApp) in Visual studio code and add in (near the top of app.js
page) the code below:
```javascript
const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'Please log in to view this resource');
        res.redirect('/login');
    }
};
```

authentication and roles
- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
```javascript
const checkAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
        return next();
    } else {
        req.flash('error', 'Access denied');
        res.redirect('/dashboard');
    }
};
```

### Step 3: Protect routes using middleware

- Open app.js (RegistrationApp) in Visual studio code and add in the code below:
```javascript
app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});
app.get('/admin', checkAuthenticated, checkAdmin, (req, res) => {
    res.render('admin', { user: req.session.user });
});
```

- Open app.js (RegistrationApp) in Visual studio code and update the /login route:

### Let’s Test it out!

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and test the authentication
process by registering and logging in users.

### Sample Screenshots (Register)

Inserted into database

### Sample Screenshots (Login)

Admin Login
User Login


## Lesson 20 — Deployment


### Software Development

Life Cycle (SDLC)

### What is SDLC?

- Software Development Life Cycle (SDLC) is a structured process that guides the
planning, development, testing, deployment, and maintenance of software applications.
- Why use SDLC:
- Improves software quality
- Helps teams work in an organized manner
- Reduces errors and rework
- Makes projects easier to manage

### Key Phases of SDLC

- Planning:
- Decide the purpose, target users and features of the application.
- Design:
- Plan the pages, user interface, database and application flow.
- Development
- Build the application by writing and integrating code.
- Testing:
- Check that the application works correctly and fix any issues.
- Deployment:
- Publish the application so that users can access it online.
- Maintenance:
- Improve the application by fixing bugs and adding enhancements.

SDLC Phase                                                 In C237
Planning
Design
Development                                       Build Express & MySQL app
Testing
Deployment
Maintenance

### Why Deployment Matters?

- Makes your application accessible online so others can use it.
- Allows users to access your application from anywhere, not just your own computer.
- Makes it easier to test and demonstrate your application
- Prepares your application for real-world use and future enhancements.

### 3-Tier Architecture

- Separates a web application into three layers, each with a different responsibility.
Presentation Layer               Logic Layer                          Data Layer
(User Interface –            (Business Logic –                      (Database –
EJS, Bootstrap, HTML, CSS)   Express routes, JS, Sessions)                 MySQL)
Client                          Server                           Database
- Each layer has its own responsibilities
- Benefits:
  - Keeps the user interface, application logic and database separate.
  - Makes the application easier to develop and debug.
  - Allows each layer to be modified independently.

### Localhost vs Remote host

Localhost                                                     Remote Host
Runs on your own computer                            Runs on another computer or server
Can be accessed by other users over the
Only you can access it
Internet
Used during development                                          Used after deployment
Example: http://localhost:3000                                        Example: Render, Azure
- During development, you use localhost.
- After deployment, users access your application through a remote host.
- In C237
- Render hosts your web application
- Azure MySQL hosts your database.

### Committing a project To

GitHub

### GitHub

- GitHub is a web-based platform for hosting and collaborating on code using version
control (Git).
- Why Github?
- Version control
  - helps teams work together, review updates, and maintain a clean code history.
- Commits record changes, allowing developers to:
  - Track progress
  - Revert to earlier versions
  - Understand how the project evolves

### Publish RegistrationApp to GitHub

- Create a folder L20 in your C237 folder.
- Copy the registrationApp folder from your “L20 Activity Files” and paste it into the L20
folder you created earlier.(Alternatively, if your registrationApp from L19 is working
correctly, you may use that instead.)
- Open registrationApp in VS Code.
- You have initialized and commit a Node.js application project folder on GitHub before. If
you need reference, you may refer to L12 - GitHub_VSCode_Guide.pdf in L12.

### What is Database Hosting?

- Database hosting is a service that provides a server or cloud platform for storing and
managing databases online.
- Microsoft Azure MySQL is the recommended database hosting platform for this module.
It allows your application to connect to an online MySQL database from anywhere.
- Alternative Hosting Options
- If you prefer, you may also use other MySQL hosting providers such as filess.io or similar free
hosting services. However, please note that free services may have limitations such as reduced
reliability, storage limits, or service availability.

### Let’s try - Database Hosting

- To host your database on Azure, follow the guide provided in your L20 Activity Folder.
- Refer to Student Guide to connect to Azure MySQL using MySQL Workbench.pdf found in
your L20 Activity Folder.
- Connection Details
Field                                                     What to enter
Connection Name         C237 Database
Connection Method       Standard (TCP/IP)
Hostname
Port                    3306
Username
Password

### Database Hosting

- Now that you are done with hosting your database online, let’s update your app.js
database connection credentials.
- Open your registrationApp folder in VS Code and update your app.js connection
credentials:
3306

### Test your connection

- Save all your files.
- Open your terminal and enter “npx nodemon app.js” (if your server is not already
running.)
- Open your browser and enter the url http://localhost:3000 and test database connection by:
  - Registering 2 new users (1 admin, 1 user)
  - Login to both users and make sure they are directed to their respective pages
    - Admin should be directed to admin dashboard
    - User should be directed to user dashboard.

### Database Hosting

- After updating the database credentials, a notification icon with the number 1 should
appear in your source control tab.
- Click on the Source Control tab, then click on the filename ‘app.js’. You should see the
updates you made.
- In the message box above the commit button, enter "Database Credentials Updated".
- Click on the “Commit & Push” Button.

- You can verify that your updates have been successfully committed by checking on
GitHub.

### What is Web Hosting?

- Web hosting allows your web application to be accessible online
- It stores your application on a server so users can access it through a web browser
- In this module, Render is the recommended platform for hosting your Node.js application.
- After deployment, anyone with the URL can access your application (subject to your
application's permissions)
Web
Hosting
Website                                                                     Website
Internet                                        Web
Users                                                                       Files
Server

### Web Hosting Companies

- Some examples of hosting companies using cloud infrastructure:
  - Amazon Web Services (AWS)
  - Google Cloud Platform (GCP)
  - Heroku
  - Microsoft Azure
  - Render
- Most providers offer multiple pricing tiers
- Ranges from:
  - Basic plans (for personal projects & small websites)
  - To advanced plans (for high-traffic or enterprise-level apps)

### Web Hosting on Render

- Easy-to-use platform for hosting web apps, including Node.js
- Simplifies deployment – no need to manage servers manually
- Supports multiple languages and frameworks (not just Node.js)
- Offers a free tier:
  - Great for hobby projects and student apps
  - Sufficient for testing and basic development

### Hosting a NodeJS App on Render

- Deploying to Render
- Open “Guide to hosting a NodeJS app on Render.pdf” (in your L20 Activity Files folder)
- After deployment, click the URL on the top left of your Render dashboard
- Congrats! Your registration app project is now live

### L20 Activity – Supermarket App Setup

- Copy the SupermarketApp folder from your L20 Activity Files
→ Paste it into your own L20 folder
- Import database
→ Use supermarketdb.sql in localhost MySql Workbench
- Open your SupermarketApp in VS Code.
- Run Supermarket App
→ enter “npx nodemon app.js” (if your server is not already running.)
- Launch App
→ http://localhost:3000

### L20 Activity – Test the App

- Register 2 new users
  - 1 admin,
  - 1 user
- Login and check. Make sure they are directed to their respective pages
  - Admin should be directed to Inventory Page
  - User should be directed to Shopping Page
- The SupermarketApp is currently running on localhost with local database.

### L20 Activity - Deployment

1. Commit and Push to GitHub
- 
2. Deploy MySQL to Azure
  - Open MySQL Workbench and connect to Azure
  - Create a new MySQL database on Azure – e.g c237_0XX_team1supermarketdb
  - Import the supermarketdb.sql file into your own team’s database (remember to remove the
Create database statements)
3. Deploy to Render
- 
- 
- 
4. Update DB Connection in app.js
5. Commit and Push updated code to GitHub

### CA2 Reminder

- Full Assignment Specification was uploaded to PoliteMall in Week 9.
- Please refer to the full CA2 specification PDF for complete instructions and requirements
- You should start working on your CA2 with your teammates now.
- Decide on your application idea
- Start planning and developing your application
- Be prepared to show your work to your lecturer in L21
- Due: By 24 Jul 2026, 2359hrs
- Submit to: SA3.0

### Deliverables

1. Supermarket app Render
2. CA2 Interim Submission Check
- Add your lecturer as one of your github collaborator: <email given by lecturer>
- Team Development Journal
  - Section A – Team Information and
  - Section C - Team Contributon Record
Upload all deliverables to POLITEMall before Saturday, 2359hrs

### What have you learnt?

- Software Development Life Cycle (SDLC)
- What is SDLC?
- Key Phases of SDLC
- Deployment
- Why Deployment?
- Deploying a Project
- GitHub
- Repositories and Version Control
- Commits and Change Tracking
- Database Hosting
- Web Hosting