<!-- Headings -->

# To_Do_App

### Node js

---

##### Resume

_Hi it's a beginner project.
The proyect which is a todo app whit some modification there is interesting topics_ :

#### Start

### app.js

function of aour Server which is listening

### index.js

Views
Engine
ViewEngine
UrlEncoded
these are important concepts
Go inside Routes we have

### Index.js

**Server/Client** functions:

**get("/")**: response render index.hbs with values retrived of db(firebase)

**post("/new-contact")** add to db new contacts
i create a dinamic model next push in db .

**delete("/delete/:id")** retrieve from req.params.id get this an remove from db.ref

---

> Views and Layouts

### “model-view-controller” paradigm

Server can be rendered by the client everything. For our purposes, we will consider views to be HTML.
Where a view differs from a static resource (like an image or CSS file) is that a view doesn’t necessarily have to be static: the HTML can be constructed on the fly to provide
a customized page for each request.
Express supports many different view engines like :**Handelbars**

> Static Files and Views

The **static** middleware allows you to designate one or more directories as containing
**static** resources that are simply to be delivered to the client without any special handling.
This is where you would put things like images, CSS files, and client-side JavaScript files.

```javascript
app.use(express.static(__dirname + "/public"));
```

> Dynamic Content in Views

The real power of views is that they can contain dynamic information.

---

var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

---

_Modify the view (/views/about.handlebars) to display a fortune_:

`<h1>About Meadowlark Travel</h1>`

`<p>Your fortune for the day:</p>`

`<blockquote>{{fortune}}</blockquote>`

Now modify the route /about to deliver the random fortune cookie:

```javascript
app.get("/about", function (req, res) {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});
```
