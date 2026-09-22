# MongoDB Study Project

A simple Node.js/Express REST API with MongoDB for learning CRUD operations. Features two modules:

- **Users**: Full CRUD with email uniqueness validation
- **Posts**: Full CRUD with author references, plus aggregation to join user data

Built with Express v5, native MongoDB driver v7, and ES Modules. Configured via `.env.dev` / `.env.prod` for development and production environments.

Run with `npm run run:dev` or `npm run run:prod`