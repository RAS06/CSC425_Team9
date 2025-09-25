const Message = require('../models/Message');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };
  
  if (success && data !== null) {
    response.data = data;
  }
  
  if (!success && error) {
    response.error = error;
  }
  
  return res.status(statusCode).json(response);
};

// POST /api/messages → Create a new message
const createMessage = async (req, res) => {
  try {
    const { author, text, isRead } = req.body;

    // Basic validation
    if (!author || !text) {
      return sendResponse(res, 400, false, null, 'Author and text are required');
    }

    const newMessage = await Message.create({ author, text, isRead });

    return sendResponse(res, 201, true, { message: 'Message created successfully', messageData: newMessage });
  } catch (error) {
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      return sendResponse(res, 400, false, null, error.message);
    }
    console.error('createMessage error:', error);
    return sendResponse(res, 500, false, null, 'Failed to create message');
  }
};

// GET /api/messages → Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    return sendResponse(res, 200, true, { messages, count: messages.length });
  } catch (error) {
    console.error('getAllMessages error:', error);
    return sendResponse(res, 500, false, null, 'Failed to retrieve messages');
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    // Validate ObjectId
    if (!Message.isValidObjectId && !/^[0-9a-fA-F]{24}$/.test(id)) {
      // If Message model doesn't expose isValidObjectId, fall back to regex check
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    const message = await Message.findById(id);
    if (!message) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, { message });
  } catch (error) {
    console.error('getMessageById error:', error);
    return sendResponse(res, 500, false, null, 'Failed to retrieve message');
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    // Validate ObjectId (simple regex fallback)
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    // Only allow certain fields to be updated
    const allowed = ['author', 'text', 'isRead'];
    const toUpdate = {};
    allowed.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(updateData, field)) {
        toUpdate[field] = updateData[field];
      }
    });

    const updated = await Message.findByIdAndUpdate(id, toUpdate, { new: true, runValidators: true });
    if (!updated) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, { message: 'Message updated successfully', messageData: updated });
  } catch (error) {
    console.error('updateMessage error:', error);
    if (error.name === 'ValidationError') {
      return sendResponse(res, 400, false, null, error.message);
    }
    return sendResponse(res, 500, false, null, 'Failed to update message');
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, { message: `Message with ID ${id} deleted successfully`, deletedId: id });
  } catch (error) {
    console.error('deleteMessage error:', error);
    return sendResponse(res, 500, false, null, 'Failed to delete message');
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};