#Notion Clone 


#Backend

what are api of the notion clone 

#Auth

POST   /api/auth/register      → create new user
POST   /api/auth/login         → login, returns JWT token
GET    /api/auth/me            → get logged in user info (protected)

#Workspaces

GET    /api/workspaces         → get all workspaces of the user
POST   /api/workspaces         → create a workspace
PUT    /api/workspaces/:id     → rename a workspace
DELETE /api/workspaces/:id     → delete a workspace

#Pages

GET    /api/pages              → get all pages in a workspace
POST   /api/pages              → create a new page
GET    /api/pages/:id          → get a single page with its blocks
PUT    /api/pages/:id          → update page title or metadata
DELETE /api/pages/:id          → delete a page

#Blocks

GET    /api/blocks/:pageId     → get all blocks of a page
POST   /api/blocks/:pageId     → add a block to a page
PUT    /api/blocks/:id         → edit a block's content
DELETE /api/blocks/:id         → delete a block
PATCH  /api/blocks/reorder     → reorder blocks (drag and drop)

# flow of the project 

  #backend 
  I created the folder structue - MVC 
  then made the connection to mongodb cause it will help to make model
  created model to describe how the data will look 
  4 types of models  to take input of 4 types 
  they are user , workspace , pages ,blocks 
  