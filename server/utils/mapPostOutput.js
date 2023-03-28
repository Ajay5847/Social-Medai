const mapPostOutput = async (post, userId) => {
    return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
            _id: post.owner._id,
            name: post.owner.name,
            avatar: post.owner.avatar,
        },
        likes: post.likes.length,
        isLiked: post.likes.includes(userId)
    }
}

module.exports =  {
    mapPostOutput
}