const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title} <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`
  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  res.send(`
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
     <div class="news-list">
     <header><img src="/logo.png"/>Wizard News</header>
      <p>
       ${post.title}
      <small>(by ${post.name})</small>
      <p>
    ${post.date}| ${post.content}
     </div>
    </body>
  </html>`)
});

app.get('/post/:id', (req, res) => {
  const id = req.params.id;
  const post = find(id);
  if(!post.id) {
    throw new Error(`Looks like you've wandered too far into the woods`);
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
