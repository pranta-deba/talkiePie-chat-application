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
  } catch (error) {
    console.error("Error get message:", error);
    res
      .status(500)
      .send({ success: false, message: "something went wrong!", error });
  }
};
