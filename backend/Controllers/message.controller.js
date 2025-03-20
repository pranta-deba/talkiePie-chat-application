import { Conversation } from "../Models/conversation.model.js";
import { Message } from "../Models/message.model.js";

export const sentMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
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
      chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(), newMessages.save()]);

    // SOCKET.IO FUNCTIONS
    res.status(200).send({
      success: true,
      message: "Outgoing Message....",
      data: newMessages,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!chats) {
      return res
        .status(209)
        .send({ success: true, message: "No conversations found!", data: [] });
    }
    const messages = chats.messages;
    res
      .status(200)
      .send({ success: true, message: "Messages fetched!", data: messages });
  } catch (error) {
    console.error("Error get message:", error);
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};
