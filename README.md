# SOME Dummy Project



## Assumptions :

- Minimal implementation is desired.
- For prototype purpose, dummy data is created when necessary.
- `Expert` is simply something gerenic.

### Minimal FrontEnd Paths:
`/` Login Page
`/signup` SignUp Page
`/dashboard` List of `new|pending|expired` Projects
`/project/:projectId` Project Detail / Project Editing Page

### Minimal Backend API required
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
    pendingExperts: [ObjectId],
    approvedExperts: [ObjectId],
    rejectedExperts: [ObjectId],
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
- FrontEnd:
    - React
    - Create-React-App
- BackEnd:
    - Express (As requirement)
    - Mongoose (As requirement)

