import { Conversation } from "../Models/conversation.model.js";
import { User } from "../Models/user.model.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req?.query?.search || "";
    const currentUserId = req.user._id;

    const users = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: search, $options: "i" } },
            { fullname: { $regex: search, $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentUserId },
        },
      ],
    })
      .select("-password")
      .select("email");

    res.json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    console.error("Error get message:", error);
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};

export const getCurrentChatters = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const currentChatters = await Conversation.find({
      participants: currentUserId,
    }).sort({
      updatedAt: -1,
    });

    if (!currentChatters || currentChatters.length === 0) {
      return res
        .status(200)
        .send({ success: true, message: "No chats found.", data: [] });
    }

    const participantsIDs = currentChatters.reduce((ids, conversation) => {
      const otherParticipants = conversation.participants.filter(
        (id) => id !== currentUserId
      );
      return [...ids, ...otherParticipants];
    }, []);
    const otherParticipantsIDs = participantsIDs.filter(
      (id) => id.toString() !== currentUserId.toString()
    );

    const user = await User.find({ _id: { $in: otherParticipantsIDs } })
      .select("-password")
      .select("-email");

    const users = otherParticipantsIDs.map((id) =>
      user.find((user) => user._id.toString() === id.toString())
    );
    res.json({
      success: true,
      message: "Chatter fetched successfully.",
      data: users,
    });
  } catch (error) {
    console.error("Error get message:", error);
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};
