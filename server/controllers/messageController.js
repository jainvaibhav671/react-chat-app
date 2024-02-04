const Message = require("../model/messageModel")

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: message,
      sender: from,
      receiver: to
    });

    if (data) {
      return res.json({ msg: "Message added successfully.", status: true })
    }
    
    return res.json({ msg: "Failed to add message", status: false })

  } catch (ex) {
    next(ex)
  }
}

const getAllMessages = async (req, res, next) => {
  try {

    const { from, to } = req.body;
    const sentMessages = await Message.find({
      sender: from,
      receiver: to
    }).sort({ updatedAt: 1 })

    const receivedMessages = await Message.find({
      sender: to,
      receiver: from
    }).sort({ updatedAt: 1 })

    const messages = sentMessages.concat(receivedMessages)
    // Sort the combined messages array based on updatedAt time
    const sortedMessages = messages.sort((a, b) => a.updatedAt - b.updatedAt);

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message
      }
    })

    console.log(messages)
    console.log(projectedMessages)
    return res.json(projectedMessages)

  } catch (ex) {
    next(ex)
  }
}

module.exports = { addMessage, getAllMessages }