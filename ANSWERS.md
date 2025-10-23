# Database & ORM Questions

### Q1. Database Choice 
#### Explain the difference between SQL and NoSQL databases. In what scenarios would you choose one over the other? Give a concrete example for each.

SQL databases use standardized language and structure. NoSQL is way more flexible, different languages, ...
I would use choose SQL if I want a structured and reliable database for important data and NoSQL for a more flexible project, it is also faster to use. 

---

### Q2. ORM Understanding
#### What is an ORM (Object-Relational Mapping)? What are the main advantages and potential drawbacks of using an ORM like Prisma or TypeORM in a Node.js application?
It's a way to manipulate a relational DB with OO code without writing SQL request directly. I have never used this in a Node.js application, I can't really answer the question.

---

### Q3. Database Relations
#### In the context of our TODO application, imagine we want to add "Categories" where each TODO belongs to one category, but each category can have multiple TODOs. What type of database relationship is this? How would you structure this in a relational database?
I would use a One-to-Many relation : 
- 2 differents tables => Todos & Categories
- Todos with a FK to a Category ID
  
---

# API Design Questions
---

### Q4. RESTful Principles
#### Explain what makes an API "RESTful". What are the key principles of REST architecture? In our TODO API, why did we use different HTTP methods (GET, POST, PUT, DELETE)?

A RESTful API use the standards HTTP methods to manipulate resources and return data in formats like JSON. It must also be stateless (no state management in server side).
We used this differents methods because they are the main methods to manipulate resources in a database (CRUD).

---

### Q5. API Status Codes
#### For each of the following scenarios, what HTTP status code would you return and why?

Successfully creating a new TODO : 201

Requesting a TODO that doesn't exist : 404

Trying to update a TODO with invalid data : 400

Server encounters an unexpected error : 500

---

### Q6. API Versioning
#### Why is API versioning important? Describe at least two different approaches to versioning an API (e.g., /api/v1/todos vs /api/todos).
Because API are meant to be used and reused in the time. So, it's a way to follow the good version and not misusing the provided functions.

---

# Frontend Concepts

### Q7. State Management
#### Explain the difference between local component state (useState), global state management (Context API, Redux), and server state management (React Query). When would you use each?

The local _useState_ is used in a component, it informs the browser when the state of a variable has changed to re render it.
The global state management is used to share data inside the project between different components.
The server state management is used to manipulate resources that come from server side and that the front has to render, synchronize, ...

---

### Q8. React Query Benefits
#### Why did we choose React Query for this exercise instead of using regular fetch calls with useEffect? List at least 3 specific benefits.
- Cache using + automatic refetch
- Mutation management => optimistic updates
- Unification of the fetches in a minimal way
  
---

### Q9. Component Design
#### What is the difference between a "controlled" and "uncontrolled" component in React? Which approach did you use for your TODO form and why?
Controlled component is one where the state is used via useState (=> easy to control, validate and React manages everything)
An uncontrolled composed lets the DOM manage the form state 

---

# Server-Side vs Client-Side Rendering

---

### Q10. SSR vs CSR
#### Explain the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR). What are the advantages and disadvantages of each approach?
CSR lets the browser interpret JS to render an HTML page. => dynamic and interactive user experience
SSR send directly a full HTML page. => faster but more server load and complexity

---

### Q11. Next.js
#### Rendering In Next.js App Router, what is the difference between a Server Component and a Client Component? When would you use 'use client' directive and why?

Depends on if you want to render something in the client side or in the server side before sending it to the client side. 

---

### Q12. Hydration
#### What is "hydration" in the context of React and Next.js? Why is it important for SSR applications?

Idk

---

# Performance & Best Practices

---

### Q13. Code Splitting
#### What is code splitting and why is it important for web application performance? How does Next.js handle code splitting automatically?
Each route gets its own JS, so the browser only loads the code needed for the current page
Next.js performs automatic route-based code

---

### Q14. TypeScript Benefits
#### You were required to use TypeScript for this exercise. Explain 3 specific benefits TypeScript provides compared to plain JavaScript, especially in a team environment.

Typed variables => safer, better readability and maintainability

---

### Q15. Security Considerations
#### Imagine our TODO API is now public and accessed by a web frontend. What are 3 security concerns you would need to address? (Think about authentication, data validation, CORS, etc.)

- Authentication + Authorization
- Input validation and robustness
- CORS + browser security
