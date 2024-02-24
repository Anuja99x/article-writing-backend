const ReaderArticle = require('../model/readerArticleSchema')

const saveReaderArticle=(req,resp)=>{
    const readerArticleDto = new ReaderArticle({
       id:req.body.id,
       title:req.body.title,
       content:req.body.content,
       image:req.body.image,
       profilePic:req.body.profilePic,
       writer:req.body.writer,
       date: new Date(),
       time:req.body.time,
       likes:req.body.likes,
    });
    readerArticleDto.save().then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const updateReaderArticle=(req,resp)=>{
    ReaderArticle.updateOne({id:req.body.id},{
        id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        image:req.body.image,
        profilePic:req.body.profilePic,
        writer:req.body.writer,
        date: new Date(),
        time:req.body.time,
        likes:req.body.likes,
    }).then(result=>{
        resp.status(201).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getReaderArticle=(req,resp)=>{
    ReaderArticle.findOne({id:req.headers.id}).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
       resp.status(500).json(error);
    });

}
const deleteReaderArticle=(req,resp)=>{
    ReaderArticle.deleteOne({id:req.headers.id}).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}
const getAllReaderArticle=(req,resp)=>{
    ReaderArticle.find().then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}

const searchReaderArticle=(req,resp)=>{
    ReaderArticle.find({
        $or: [
            {content:{$regex:req.headers.text, $options:'i' }},
            {title:{$regex:req.headers.text, $options:'i' }},
            {writer:{$regex:req.headers.text, $options:'i' }},
        ]
    }).then(result=>{
        resp.status(200).json(result);
    }).catch(error=>{
        resp.status(500).json(error);
    });
}

module.exports= {
    saveReaderArticle,
    updateReaderArticle,
    deleteReaderArticle,
    getReaderArticle,
    getAllReaderArticle,
    searchReaderArticle
}