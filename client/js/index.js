const API_BASE_URL = 'http://localhost:4000'
const API_URL = 'http://localhost:4000/api/posts'

window.onload = () => {
    getPosts()
}

const getPosts = () => {
    fetch(API_URL, {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        buildPost(data)
    })
}

const buildPost = (posts) => {
    let postContent = ''
    for(post of posts) {
        const postDate = new Date(post.date_created).toDateString()
        const postImage = post.image !== undefined ? `${API_BASE_URL}/${post.image.replace("\\", "/")}`
        : "/client/assets/default-post-image.jpg"
        console.log(postImage);
        const postLink = `/client/post.html?id=${post.id}`

        postContent += 
        `
            <a class="post-link" href ="${postLink}">
                <div class="post">
                    <div class="post-image" style="background-image: url(${postImage})"></div>
                    <div class="post-content">
                        <div class="post-date">${postDate}</div>
                        <div class="post-title"><h4>${post.title}</h4></div>
                        <div class="post-text">${post.content}</div>
                    </div>
                </div>
            </a>
        `
    }
    document.querySelector('.blog-posts').innerHTML = postContent
}