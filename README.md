


https://github.com/abhay-2711/zuddl_assignment2/assets/89858857/fde12059-25d1-41fd-9c3d-b9dd4e68c3fd


## Dependencies Used
React Framework
Redux for State Management
@hello-pangea/dnd - for Drag And Drop
React-icons - for icons

## Getting Started

## Step 1:
```bash
npm install
```

## Step 2:
```bash
npm start
```

### How would your tables and apis change for the following scenarios. What tables and api endpoints would you add? Which tables and api endpoints would need to be updated?
### 1. If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed
Tables: I will add a new table(stages) to store the stages for each board. This table will include columns like stage_id, board_id, name, order (to maintain the order of stages).
API Endpoints: I will add endpoints for CRUD operations on stages for a particular board. For example, /boards/{board_id}/stages for getting all stages of a board, /boards/{board_id}/stages/{stage_id} for updating a specific stage, etc.

### 2. If users can comment on tasks
Tables: I will add a new table to store comments on tasks. This table might include columns like comment_id, task_id, user_id, content, created_at, etc.
API Endpoints: I will add endpoints for CRUD operations on comments. For example, /tasks/{task_id}/comments for getting all comments on a task, /tasks/{task_id}/comments/{comment_id} for updating a specific comment, etc.

### 3. How will you do error handling?
 I will implement error handling at the API level to catch and appropriately handle errors. This includes returning meaningful HTTP status codes (e.g., 400 for bad requests, 404 for not found resources, 500 for internal server errors, etc.).
 I will also take care of validation error from wroong user input. And custom error handler.

