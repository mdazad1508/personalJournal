const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let arr = [];

const homeStartingContent = "A home page is generally the primary web page which a visitor navigating to a website from a search engine will see, and it may also serve as a landing page to attract visitors.[1][2] Thus good home page design is usually a high priority for a website.[3] For example, a news website may present headlines and first paragraphs of top stories, with links to full articles.[4] Usually, the home page is located at the root of the website's domain or subdomain. For example, if the domain is example.com, the home page is likely located at www.example.com/. In some cases, the home page is a site directory, particularly when a website has multiple home pages. Wikipedia, for example, has a site directory at wikipedia.org that links to every language-specific home page, including en.wikipedia.org.";

const aboutContent ="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const aboutContact ="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc";

app.use(express.static('public'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.render("home",{content:homeStartingContent,title:"home",arr:arr});


});

app.get("/about",function(req,res){
    res.render("about",{content:aboutContent});
})

app.get("/contact",function(req,res){
    res.render("contact",{content:aboutContact});
})

app.get("/compose",function(req,res){
    res.render("compose");
})

app.post("/compose",function(req,res){
    const data = {
        composeTitle:req.body.title,
        composeText :req.body.text
    }

    
     arr.push(data);
     res.redirect("/");

})

app.get("/post/:topic",function(req,res){

    const reqTopic = req.params.topic;

    arr.forEach(function(element){
        const title = element.composeTitle;
        if(reqTopic===title){
            res.render("post",{newTitle:element.composeTitle,newPara:element.composeText});
        }
    })
})



app.listen(3000,function(req,res){
    console.log("server is runnning on port 3000");
})
