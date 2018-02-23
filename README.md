# SOME Dummy Project

## ENV:
- Node.js @latest LTS

## Just Serving:
- 1. `yarn` or `npm install` at `/server/`
- 2. `yarn start` or `npm start` at `/server/` then go http://localhost:3000/

## Build/Deploy:
- Being minimal for build phase in the Project.
- Not required if just running dev.
- FrontEnd build by Webpack handeled by `create-react-app`.
- Type `yarn build` or `npm run build` at `/app/` to build the front-end.
- `/app/build/` should be commited into this repo.


## Assumptions :
- Modern UI/UX is desired.
- Minimal BackEnd implementation is desired.
- For prototype purpose, dummy data is created when necessary.
- `Expert` is simply something gerenic.
- `Rapid prototype mode`
    - Priority: Overall UI/UX > Code Quality > Coding Speed > Build Configurations 
    - Unit test only when necessary.
## Use flow:
1. Sign-up user at http://localhost:3000/signup/
2. Dummy data would be generated when user signup

## Additional Design Decisions:
- Design:
    - Material design use color from LYNK logo as Primary Color
    - Show provided LOGO as floating watermark
    - Overal route design follow 'RESTFUL'-inspired
    - `signup` and `login` not visible to authenticated users
    - `dashboard` not visible to unauthenticated users
    - `Project` belongs to `User`.
    - `User` can edit only `Project` they owned.
    - `SignUp` also `login` user.

- FrontEnd:
    - Implements full client-side-rendering
    - build product in repo, and sym-linked to `server/public/`
        - No require extra compile for running the server.

- API:
    - Use http-session for authentication.
    - REST-like
    - Use http errors as possible.
    - Session saved in mongoDB using mongoose's connection.
    - Allows CORS -> FrontEnd can be stand-alone
        - (however suffers serious performance penality due to preflight request)
        - But good for dev & can easily pack as electron app..
- BackEnd:
    - DB connection string can be pass in as env variables 
        - e.g. `DB_CONN_STR=mongodb://127.0.0.1:27017/lynk-demo`.

### Minimal FrontEnd Paths:
- `/` Login Page
- `/signup` SignUp Page
- `/dashboard` List of `new|pending|expired` Projects
- `/project/:projectId` Project Detail / Project Editing Page

### Minimal Backend API required (For fully Client-Side-Rendering)
- User:
    - SignUp
    - Login
    - CheckEmailExistance (For async validation when sign up)
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
    email: String, // Unique index and validation.
    password: String, // Bcrypted before persiste into DB
}
```
- Project
```js
{
    id: ObjectId,
    title: String,
    startDate: Date,
    status: String, // enum: 'new', 'unfinished', 'finished'
    experts: {  // For easy populate or Analytic or Expert find related Project
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
    name: String, // Expert Name
}
```

