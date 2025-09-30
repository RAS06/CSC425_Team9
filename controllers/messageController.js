const Message = require('../models/Message');
const Appointment = require('../models/Appointment');


//Example Section:

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
    // For now, return placeholder response
    // TODO: Implement database logic
    
    const sampleMessage = {
      id: "placeholder-id-123",
      author: req.body.author || "Sample Author",
      text: req.body.text || "Sample message text",
      timestamp: new Date().toISOString(),
      isRead: false
    };

    sendResponse(res, 201, true, {
      message: "Message created successfully",
      messageData: sampleMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to create message");
  }
};

// GET /api/messages → Get all messages
const getAllMessages = async (req, res) => {
  try {
    // For now, return placeholder response
    // TODO: Implement database logic
    
    const sampleMessages = [
      {
        id: "msg-001",
        author: "John Doe",
        text: "Hello, this is the first message!",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        isRead: false
      },
      {
        id: "msg-002",
        author: "Jane Smith",
        text: "This is another sample message.",
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        isRead: true
      },
      {
        id: "msg-003",
        author: "Bob Johnson",
        text: "Latest message in the system.",
        timestamp: new Date().toISOString(),
        isRead: false
      }
    ];

    sendResponse(res, 200, true, {
      messages: sampleMessages,
      count: sampleMessages.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve messages");
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const sampleMessage = {
      id: id,
      author: "Sample Author",
      text: `This is a sample message with ID: ${id}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    sendResponse(res, 200, true, {
      message: sampleMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve message");
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    const updatedMessage = {
      id: id,
      author: updateData.author || "Updated Author",
      text: updateData.text || "Updated message text",
      timestamp: new Date().toISOString(),
      isRead: updateData.isRead !== undefined ? updateData.isRead : false
    };

    sendResponse(res, 200, true, {
      message: "Message updated successfully",
      messageData: updatedMessage
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to update message");
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // For now, return placeholder response
    // TODO: Implement database logic
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Message ID is required");
    }

    sendResponse(res, 200, true, {
      message: `Message with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete message");
  }
};


//Riz's Section:




const createAppointment = async (req, res) => {
  try {
    const { name, email, date, time, id } = req.body;

    // Basic validation
    if (!name || !email || !date || !time || !id) {
      return sendResponse(res, 400, false, null, "All fields are required");
    }

    const newAppointment = new Appointment({ name, email, date, time, id });
    const savedAppointment = await newAppointment.save();

    sendResponse(res, 201, true, {
      message: "Appointment created successfully",
      appointment: savedAppointment
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to create appointment"); 
  } 
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, "Appointment ID is required");
    }

    // For now, just return success without actual deletion

    return sendResponse(res, 200, true, { message: "Appointment deleted successfully", deletedId: id });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete appointment"); 
  }
};

const getAllAppointments = async (req, res) => {
  try {
    // Return sample appointments instead of querying the database
    const sampleAppointments = [
      {
        id: "appt-001",
        name: "Alice Johnson",
        email: "alice@example.com",
        date: "2025-10-01",
        time: "10:00 AM"
      },
      {
        id: "appt-002",
        name: "Bob Smith",
        email: "bob@example.com",
        date: "2025-10-02",
        time: "2:30 PM"
      },
      {
        id: "appt-003",
        name: "Carol Lee",
        email: "carol@example.com",
        date: "2025-10-03",
        time: "9:15 AM"
      }
    ];

    sendResponse(res, 200, true, {
      appointments: sampleAppointments,
      count: sampleAppointments.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve appointments");
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return sendResponse(res, 400, false, null, "Appointment ID is required");
    }

    // Placeholder updated appointment
    const updatedAppointment = {
      id: id,
      name: updateData.name || "Updated Name",
      email: updateData.email || "updated@example.com",
      date: updateData.date || "2025-10-10",
      time: updateData.time || "11:00 AM"
    };

    sendResponse(res, 200, true, {
      message: "Appointment updated successfully (placeholder)",
      appointment: updatedAppointment
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to update appointment");
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment
};