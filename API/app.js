const express = require("express");
const { v4: uuid4 } = require("uuid");
const multer = require("multer")
const Post = require("./models/posts");
const postObject = new Post();

// contains destination and filename
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`)
  }
})

const getExtension = (mimeType) => {
  switch(mimeType) {
    case "image/png":
      return ".png"
    case "image/jpeg":
      return ".jpeg"
    case "image/jpg":
      return ".jpg"
  }
}

const app = express();
const upload = multer({storage: storage})

// Middleware
// Allow to access json body data from request
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})
app.use("/uploads", express.static("uploads"))

/**
 * GET: All Post API endpoint
 * http://localhost:4000/api/posts
 */
app.get("/api/posts", (req, res) => {
  res.status(200).json(postObject.get());
});

/**
 * GET: Retrieving a specific post from the API
 * http://localhost:4000/api/post/:post_id
 */
app.get("/api/post/:post_id", (req, res) => {
  const postId = req.params.post_id
  const post = postObject.getIndividualPost(postId)
  if (post) {
    res.status(200).send(post)
  } else {
    res.status(404).send('No post found!')
  }
})

/**
 * POST: Adding a new post API
 * http://localhost:4000/api/post
 */
app.post("/api/post", upload.single("image"), (req, res) => {
  const newPost = {
    id: uuid4(),
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,
    date_created: new Date().toString(),
  };
  postObject.add(newPost);
  res.status(201).send({ message: "Post successfully created", post: newPost });
});

app.listen(4000, () => console.log("API listening on http://localhost:4000"));
