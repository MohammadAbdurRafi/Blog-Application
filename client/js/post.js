const API_BASE_URL = 'http://localhost:4000/'
const API_URL = 'http://localhost:4000/api/post/'

window.onload = () => {
    getPostIdParam()
    getPost()
}

const getPostIdParam = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("id")
}

const getPost = () => {
    const postId = getPostIdParam()
    const url = `${API_URL}${postId}`
    fetch(url, {
        method: "GET"
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        buildPost(data)
    })
}

const buildPost = (post) => {
    const postImage = post.image !== undefined 
        ? `${API_BASE_URL}${post.image.replace("\\", "/")}`
        : "/client/assets/default-post-image.jpg"
    document.querySelector('header').style.backgroundImage = `url(${postImage})`
    document.getElementById('individual-post-title').innerText = post.title
    document.getElementById('individual-post-date').innerText = `Published on ${post.date_created}`
    document.getElementById('individual-post-content').innerText = post.content
}