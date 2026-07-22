# C237 CA2 — Assessment Specification

> AY26/27 Semester 1 · Continuous Assessment 2 · Converted from the official PDF.
> **Deadline: 24 July 2026, 2359hrs** · Submit to **SA3.0**

---

## Introduction

Teams design, build, and deploy a basic web application applying the core skills taught in class:

- CRUD operations with a database
- Server-side development using Node.js and Express
- User authentication and authorization
- Frontend rendering using EJS
- Server-side JavaScript coding

Team size is **5–6 students**. Each student must contribute meaningfully to the coding and is **assessed individually** on their assigned functionality.

---

## Project Objective

Build a web application with:

- A user login system
- A resource that users can **create, view, edit, and delete**
- **At least two user roles** (e.g. admin and regular user) with different access permissions

---

## Choosing an Application Theme

The application must be meaningful, relevant, and based on a real-world scenario. Suggested domains (reference only):

- Event and activity management
- Home and household organization
- Travel and experience planning
- Pet ownership and care

### Personalisation Requirement

Users must be able to personalise the app by managing their own information (expenses, activities, pet information, etc.).

The team must be able to explain during the presentation:

- Why the application theme was chosen
- Who the intended users are
- How the application addresses a genuine user need or problem

---

## Functional Expectations

These describe **what the application should achieve**, not how to implement it.

### 1. User Access and Identity
Support user accounts and distinguish between authenticated and unauthenticated users. Protected features accessible only to authorised users.

### 2. User Roles
At least **two user roles** with different permissions or responsibilities. Each role has access to features appropriate to its privileges.

### 3. Resource Management
Users manage a key resource related to the application's purpose — create, view, update, and delete records where appropriate.

### 4. Finding Information
Provide a way to locate information efficiently: searching, filtering, sorting, or categorisation.

### 5. User Interface and Experience
A clear, organised, user-friendly interface that lets users complete tasks easily.

### 6. Suggested Enhancements

Teams are encouraged to extend beyond the minimum with **meaningful and substantial enhancements**. These differentiate stronger projects and must demonstrate technical understanding, not merely add features.

For each enhancement the team must explain:

- Why the enhancement was introduced
- The user need or problem it addresses
- How it was implemented
- The challenges encountered

A meaningful enhancement involves substantial JavaScript, server-side logic, database interactions, or application design.

**NOT considered meaningful enhancements:**

- Adding database fields without changing application behaviour
- Hardcoded content with little or no application logic
- Cosmetic changes only
- AI-generated features the team cannot explain or justify

---

## Distribution of Responsibilities

- Teams may organise responsibilities based on their application's needs.
- Each student **MUST take ownership of a substantial feature** involving JavaScript and database interactions.
- All students must write JavaScript — **not just HTML/CSS or documentation**.
- **`app.js` must be developed collaboratively**, not by a single team member.

Example distribution (reference only):

| Student | Example Responsibility |
|---|---|
| A | User Registration, Login and Access Control |
| B | Adding New Information to the System |
| C | Viewing and Displaying Information |
| D | Editing Existing Information |
| E | Removing Information from the System |
| F | Searching, Filtering or Organising Information |

### Team Contribution

Complete the **Team Contribution Record (Section C)** in the CA2 Team Development Journal:

- Record each member's primary contributions
- Ensures a clear division of responsibilities
- The completed journal must be included in the final submission
- May be referred to during the presentation

---

## Submission Checklist

**Deadline: 24 July 2026, 2359hrs** · **Where: SA3.0**

- [ ] **Working web app** — entire project folder as `.zip`, containing:
  - The full Node.js project (**excluding `node_modules`**)
  - The MySQL database file in **`.sql`** format
  - Named: `TeamName_ModuleCode_ClassCode_CA2Submission.zip`
    (e.g. `TeamAlpha_C237_005_E66D_CA2Submission.zip`) — TeamName short and unique
- [ ] **CA2 Team Development Journal** (`C237_CA2_Development_Journal.docx`)
- [ ] **Deployed application** (Render or similar)
- [ ] **Online MySQL database** (Azure, https://filess.io, or similar)
- [ ] **GitHub repository** with latest commits pushed

### Presentation

Every team member must explain and justify their assigned features, including implementation, design decisions, and database interactions.

> **Important:** Working code alone is insufficient. Individual marks are based on **both** the implementation **and** each student's ability to explain their contribution.

---

## Use of Artificial Intelligence

AI tools (ChatGPT, Claude, GitHub Copilot) **may be used to support learning**. However:

- AI is a learning aid, not a substitute for individual effort.
- Each student is responsible for **understanding all code** in the project, including AI-generated code.
- AI-generated code must be **reviewed, tested, modified, and adapted** to the team's requirements.
- Students must not rely solely on AI to complete their assigned functionality.
- Submissions that appear largely AI-generated with **minimal evidence of adaptation, contribution, or understanding may receive reduced marks**, even if functional.
- Lecturers may ask questions during the presentation to verify individual understanding.

---

## Timeline

**Before Lesson 23:** Complete the web application and submit to SA3.0 by 24 Jul 2026, 2359hrs.

**Lesson 23 & 24 — Presentation (~20 minutes):**

Live demo. Each member presents the functionality they developed:

- The purpose of the feature
- The application flow: **user action → route → SQL query → database → response**
- Key implementation decisions made
- Challenges encountered and how they were resolved

Lecturers may ask follow-up questions to verify individual understanding and contribution.

Plus a brief **reflection** on what was learned and what challenges were faced.

---

## Hard Rules

- **DO NOT** assign a student to only do documentation or UI styling — everyone MUST code.
- **Code must reflect what was taught in class.**
- Students are **not allowed to use full website templates** from the internet. Significant marks deducted if discovered.
- **No marks are given to features that are hardcoded.**
- Do not wait until the last hour to submit. Make regular backups.
