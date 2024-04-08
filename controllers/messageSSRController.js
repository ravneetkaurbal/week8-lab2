const Message = require("../models/messageModel");

// Render Controller: Render index.html with messages using EJS
const renderMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.render("index", { messages }); // Render index.ejs with messages data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderMessages
};
