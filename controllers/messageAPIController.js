const Message = require("../models/messageModel");

// get all Messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Message
const addMessage = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Message by ID
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getMessages,
  addMessage,
  getMessage,
  deleteMessage
};
