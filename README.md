#Notion Clone

#Backend

what are api of the notion clone

#Auth

POST /api/auth/register → create new user
POST /api/auth/login → login, returns JWT token
GET /api/auth/me → get logged in user info (protected)

#Workspaces

GET /api/workspaces → get all workspaces of the user
POST /api/workspaces → create a workspace
PUT /api/workspaces/:id → rename a workspace
DELETE /api/workspaces/:id → delete a workspace

#Pages

GET /api/pages → get all pages in a workspace
POST /api/pages → create a new page
GET /api/pages/:id → get a single page with its blocks
PUT /api/pages/:id → update page title or metadata
DELETE /api/pages/:id → delete a page

#Blocks

GET /api/blocks/:pageId → get all blocks of a page
POST /api/blocks/:pageId → add a block to a page
PUT /api/blocks/:id → edit a block's content
DELETE /api/blocks/:id → delete a block
PATCH /api/blocks/reorder → reorder blocks (drag and drop)

# flow of the project

#backend
I created the folder structue - MVC
then made the connection to mongodb cause it will help to make model
created model to describe how the data will look
4 types of models to take input of 4 types
they are user , workspace , pages ,blocks

user - > it is made to store that data of the user

we use ref and populate here to connect models to each other

workspace -> it contains the name of the project and pages inside it

pages -> it contains the blocks

blocks -> it contains all the information that is stored in the page

#Auth

1. User sends email + password to POST /api/auth/login
2. Server finds user by email in database
3. Server uses bcrypt to compare incoming password with stored hash
4. If match → server creates a JWT containing the userId
5. JWT is sent back to the frontend
6. Frontend stores JWT (in memory or httpOnly cookie)
7. Every subsequent request sends JWT in the Authorization header
8. Server verifies JWT on every protected route
9. If valid → request goes through
10. If invalid or expired → 401 Unauthorized


** why use bcryptjs over bcrypt **

cause bcrypt is not full in js and parts are in cpp so in deploying it will cause problems


# Now we will make workplaces controllers

* getWorkspaces
* createWorkspaces
* updateWorkspaces
* deleteWorkspaces  

# did the same with page and block controller

# forgot password

1. User clicks "Forgot Password"
2. Enters their email
3. Backend generates a secure random token
4. Stores that token (hashed) in DB with an expiry — usually 10-15 minutes
5. Sends an email with a reset link containing that token
6. User clicks link → goes to reset password page
7. Frontend sends new password + token to backend
8. Backend finds user by token, checks expiry
9. Hashes new password, saves it, clears the token
10. User logs in with new password