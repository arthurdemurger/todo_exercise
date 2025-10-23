# Database & ORM Questions

Q1. Database Choice Explain the difference between SQL and NoSQL databases. In what scenarios would you choose one over the other? Give a concrete example for each.

Answer :

Q2. ORM Understanding What is an ORM (Object-Relational Mapping)? What are the main advantages and potential drawbacks of using an ORM like Prisma or TypeORM in a Node.js application?

Answer :

Q3. Database Relations In the context of our TODO application, imagine we want to add "Categories" where each TODO belongs to one category, but each category can have multiple TODOs. What type of database relationship is this? How would you structure this in a relational database?

Answer :

# API Design Questions

Q4. RESTful Principles Explain what makes an API "RESTful". What are the key principles of REST architecture? In our TODO API, why did we use different HTTP methods (GET, POST, PUT, DELETE)?

Answer :

Q5. API Status Codes For each of the following scenarios, what HTTP status code would you return and why?





Successfully creating a new TODO

Answer :

Requesting a TODO that doesn't exist

Answer :

Trying to update a TODO with invalid data

Answer :

Server encounters an unexpected error

Answer :

Q6. API Versioning Why is API versioning important? Describe at least two different approaches to versioning an API (e.g., /api/v1/todos vs /api/todos).

Answer :

# Frontend Concepts

Q7. State Management Explain the difference between local component state (useState), global state management (Context API, Redux), and server state management (React Query). When would you use each?

Answer :

Q8. React Query Benefits Why did we choose React Query for this exercise instead of using regular fetch calls with useEffect? List at least 3 specific benefits.

Answer :

Q9. Component Design What is the difference between a "controlled" and "uncontrolled" component in React? Which approach did you use for your TODO form and why?

Answer :

# Server-Side vs Client-Side Rendering

Q10. SSR vs CSR Explain the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR). What are the advantages and disadvantages of each approach?

Answer :

Q11. Next.js Rendering In Next.js App Router, what is the difference between a Server Component and a Client Component? When would you use 'use client' directive and why?

Answer :

Q12. Hydration What is "hydration" in the context of React and Next.js? Why is it important for SSR applications?

Answer :

# Performance & Best Practices

Q13. Code Splitting What is code splitting and why is it important for web application performance? How does Next.js handle code splitting automatically?

Answer :

Q14. TypeScript Benefits You were required to use TypeScript for this exercise. Explain 3 specific benefits TypeScript provides compared to plain JavaScript, especially in a team environment.

Answer :

Q15. Security Considerations Imagine our TODO API is now public and accessed by a web frontend. What are 3 security concerns you would need to address? (Think about authentication, data validation, CORS, etc.)

Answer :