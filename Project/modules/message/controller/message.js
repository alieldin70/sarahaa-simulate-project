const messageModel = require("../../../DB/model/message")
const userModel = require("../../../DB/model/User")
const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { messageBody } = req.body;
        const user = await userModel.findById(id).select("name");
        if (!user) {
            res.status(400).json({ message: "in-valid reciver id" });
        } else {
            const message = await messageModel.insertMany({ messageBody, reciverId: id, senderId: req.query.senderId });
            const user = await userModel.findOneAndUpdate({ _id: id }, { $push: { messagesId: message[0]._id } }, { new: true });

            res.status(200).json({ message: "Done", message });
        }
    } catch (error) {
        res.status(500).json({ message: "Catch-Error", error });
    }
}
const userMessages = async (req, res) => {
    try {
        const message = await messageModel.find({ reciverId: req.user.id });
        if (message) {
            res.status(200).json({ message: "Done", message });

        } else {
            res.status(400).json({ message: "NO messages" });
        }

    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}
const userSendedMessages = async (req, res) => {
    try {
        const message = await messageModel.find({ senderId: req.user.id }).populate([{

            path: 'reciverId',
            select: 'name email'
        }, {
            path: 'senderId',
            select: "name email"
        }]);
        res.status(200).json({ message: "Done", message });
    } catch (error) {
        res.status(500).json({ message: "catch error", error });
    }
}
const deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.deleteOne({ id: req.params.id, reciverId: req.user.id });
        const user = await userModel.deleteOne({ _id: req.user.id }, { $pull: { messagesId: req.params.id } });
        if (message.deletedCount) {
            res.status(200).json({ message: "Deleted", message });
        } else {
            res.status(400).json({ message: "ethir message id in-valid or u not auth" });
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error });

    }

}
module.exports = {
    sendMessage,
    userMessages,
    userSendedMessages,
    deleteMessage
};