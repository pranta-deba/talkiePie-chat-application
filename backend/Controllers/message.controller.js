import { Conversation } from "../Models/conversation.model.js";
import { Message } from "../Models/message.model.js";

export const sentMessage = async () => {
  console.log(req.user);
  try {
    const { message } = request.body;
    const { id: receiverId } = request.params;
    const senderId = req.user._id;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessages = new Message({
      senderId,
      receiverId,
      message,
      conversationId: chats._id,
    });

    if (newMessages) {
      chats.push(newMessages._id);
    }

    await Promise.all([chats.save(), newMessages.save()]);

    // SOCKET.IO FUNCTIONS
    res
      .status(403)
      .send({ success: false, message: "Outgoing Message....", newMessages });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
