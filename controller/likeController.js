const likeWriter = require("../model/likeSchema");

const saveLikeWriter = (req, resp) => {
  const likeWriterDto = new likeWriter({
    id: req.body.id,
    readerId: req.body.readerId,
    writerId: req.body.writerId,
    date: new Date(),
  });
  likeWriterDto
    .save()
    .then((result) => {
      resp.status(201).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const getLikeWriterById = (req, resp) => {
    likeWriter
    .findOne({ id: req.headers.id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const getLikeWriter = (req, resp) => {
  const readerId = req.body.readerId;
  const writerId = req.body.writerId;
  console.log(readerId + "," + writerId);
  // Input validation
  if (readerId == "" || writerId == "") {
    return resp.status(400).json({ error: "Missing readerId or writerId" });
  }

  likeWriter
    .findOne({
      readerId,
      writerId,
    })
    .then((result) => {
      if (!result) {
        return resp
          .status(404)
          .json({
            error:
              "No follow relationship found between specified reader and writer",
          });
      }
      resp.status(200).json(result);
    })
    .catch((error) => {
      console.error("Error retrieving follow relationship:", error);
      resp.status(500).json({ error: "Internal server error" });
    });
};

const deleteLikeWriterById = (req, resp) => {
    likeWriter
    .deleteOne({
      id: req.headers.id,
    })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const deleteLikeWriter = (req, res) => {
  const { readerId, writerId } = req.body; // Assuming these are passed in the request body.

  // Input validation
  if (!readerId || !writerId) {
    return res.status(400).json({ error: "Missing readerId or writerId" });
  }

  likeWriter
    .deleteOne({ readerId, writerId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({
            message:
              "No follow relationship found between specified reader and writer",
          });
      }
      res
        .status(200)
        .json({ message: "Follow relationship deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting follow relationship:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getAllLikeWriter = (req, resp) => {
    likeWriter
    .find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const searchLikeWriter = (req, resp) => {
    likeWriter
    .find({
      $or: [
        { readerId: { $regex: req.headers.text, $options: "i" } },
        { writerId: { $regex: req.headers.text, $options: "i" } },
      ],
    })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};


module.exports = {
  saveLikeWriter,
  deleteLikeWriter,
  getLikeWriter,
  getAllLikeWriter,
  searchLikeWriter,
  deleteLikeWriterById,
  getLikeWriterById,
};
