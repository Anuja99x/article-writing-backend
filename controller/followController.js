const followWriter = require("../model/followSchema");

const saveFollowWriter = (req, resp) => {
  const followWriterDto = new followWriter({
    id: req.body.id,
    readerId: req.body.readerId,
    writerId: req.body.writerId,
    date: new Date(),
  });
  followWriterDto
    .save()
    .then((result) => {
      resp.status(201).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};
/*const updateReaderArticle = (req, resp) => {
  ReaderArticle.updateOne(
    { id: req.body.id },
    {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      profilePic: req.body.profilePic,
      writer: req.body.writer,
      date: new Date(),
      time: req.body.time,
      likes: req.body.likes,
      tags: req.body.tags,
    }
  )
    .then((result) => {
      resp.status(201).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};*/
const getFollowWriter = (req, resp) => {
    followWriter.findOne({ id: req.headers.id })
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const deleteFollowWriterById = (req, resp) => {
  followWriter.deleteOne({ 
    id: req.headers.id
  })
  .then((result) => {
    resp.status(200).json(result);
  })
  .catch((error) => {
    resp.status(500).json(error);
  });
};

const deleteFollowWriter = (req, res) => {
  const { readerId, writerId } = req.body; // Assuming these are passed in the request body.

  // Input validation
  if (!readerId || !writerId) {
      return res.status(400).json({ error: 'Missing readerId or writerId' });
  }

  followWriter.deleteOne({ readerId, writerId })
      .then((result) => {
          if (result.deletedCount === 0) {
              return res.status(404).json({ message: 'No follow relationship found between specified reader and writer' });
          }
          res.status(200).json({ message: 'Follow relationship deleted successfully' });
      })
      .catch((error) => {
          console.error('Error deleting follow relationship:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
};

const getAllFollowWriter = (req, resp) => {
    followWriter.find()
    .then((result) => {
      resp.status(200).json(result);
    })
    .catch((error) => {
      resp.status(500).json(error);
    });
};

const searchFollowWriter = (req, resp) => {
    followWriter.find({
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
  saveFollowWriter,
  deleteFollowWriter,
  getFollowWriter,
  getAllFollowWriter,
  searchFollowWriter,
  deleteFollowWriterById
};
