# API Reference - Backend Example (Message Board)

Base URL: http://localhost:3000

All responses are JSON with the shape:

Success:
{
  "success": true,
  "data": { ... }
}

Error:
{
  "success": false,
  "error": "message"
}

Endpoints

- POST /api/messages
  - Create a new message
  - Body (application/json): { "author": "string", "text": "string", "isRead": boolean }
  - Response 201: { success: true, data: { message: 'Message created successfully', messageData: { ... } } }

- GET /api/messages
  - Get all messages
  - Response 200: { success: true, data: { messages: [ ... ], count: number } }

- GET /api/messages/:id
  - Get a message by MongoDB ObjectId
  - Response 200: { success: true, data: { message: { ... } } }

- PUT /api/messages/:id
  - Update a message by MongoDB ObjectId
  - Body: any updatable fields (author, text, isRead)
  - Response 200: { success: true, data: { message: 'Message updated successfully', messageData: { ... } } }

- DELETE /api/messages/:id
  - Delete a message by MongoDB ObjectId
  - Response 200: { success: true, data: { message: 'Message with ID <id> deleted successfully', deletedId: '<id>' } }

Notes

- Use the `.env.example` as a template to create a `.env` file in the project root. The app uses `MONGODB_URI` and `PORT`.
- IDs are MongoDB ObjectIds. Passing an invalid id will return 400 with "Invalid message ID".
- Validation errors return 400 with the mongoose error message.
