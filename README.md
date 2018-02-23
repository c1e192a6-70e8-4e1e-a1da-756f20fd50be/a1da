# SOME Dummy Project

## ENV:
- Node.js @latest LTS

## Just Serving:
- 1. `yarn` or `npm install` at `/server/`
- 2. `yarn start` or `npm start` at `/server/` then go http://localhost:3000/

## Build Method:
- Being minimal for build phase in the Project.
- Not required if just running dev.
- FrontEnd build by Webpack handeled by `create-react-app`.
- Type `yarn build` or `npm run build` at `/app/` to build the front-end.


## Assumptions :
- Modern UI/UX is desired.
- Minimal BackEnd implementation is desired.
- For prototype purpose, dummy data is created when necessary.
- `Expert` is simply something gerenic.
- `Rapid prototype mode`
    - Priority: Overall UI/UX > Code Quality > Coding Speed > Build Configurations 
    - Unit test only when necessary.

### Minimal FrontEnd Paths:
- `/` Login Page
- `/signup` SignUp Page
- `/dashboard` List of `new|pending|expired` Projects
- `/project/:projectId` Project Detail / Project Editing Page

### Minimal Backend API required (For fully Client-Side-Rendering)
- User:
    - SignUp
    - Login
- Project:
    - FindAll
    - FindById
    - FindByIdAndUpdate
- Expert:
    - FindAll

### Minimal Models
- User  
```js
{
    id: ObjectId,
    email: String,
    password
}
```
- Project
```js
{
    id: ObjectId,
    title: String,
    status: String, // enum: 'new', 'unfinished', 'finished'
    experts: {
        related: [ObjectId],
        approved: [ObjectId],
        rejected: [ObjectId],
    },
    ownerId: ObjectId // User's ID
}
```
- Expert  
```js
{
    id: ObjectId,
    name: String,
}
```
### Choose of solutions:
- Deisgn:
    - Materail Design
    - Minimal Layout
- FrontEnd:
    - React
    - Single Page Application
- BackEnd:
    - RESTFUL API
    - Sentry error reporting
    - Express (As requirement)
    - Mongoose (As requirement)

