const PATH = "./data.json"
const fs = require('fs')

class Post {

    get() {
        return this.readData();
    }

    getIndividualPost(postId) {
        const posts = this.readData()
        const post = posts.find((p) => p.id === postId)
        console.log(post);
        return post
    }

    add(newPost) {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData() {
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData)
        return posts;
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData)
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;