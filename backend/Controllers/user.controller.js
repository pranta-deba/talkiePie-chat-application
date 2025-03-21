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
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params?.id;
  try {
    const user = await User.findById(userId)
      .select("-password")
      .select("email");
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};

export const updatedUser = async (req, res) => {
  const userId = req.user._id;
  const { fullname, username, gender } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, username, gender },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "something want wrong!", error });
  }
};
