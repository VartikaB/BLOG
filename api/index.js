const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10);
const secret ='hjjjjjjjjjjdskfvsdf654sd6f4g65df4gs58df4vgs5fg45sd4f354!#gh4j5d4ghhhhhj15d64ghj5d4hg5j478dg4j789y298h54'
const jwt =require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const multer = require('multer')
const uploadMiddleware=multer({dest:'uploads/'});
const fs=require('fs')
const Post=require('./models/Post')
const app = express();
app.use(express.json())
//Cookie parser to read the cookies
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://blog:blog@cluster0.zcc5mb4.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.post('/register', async(req, res) => {
  const { username, password } = req.body;
// const username="kkd"
// const password="dhhf"
try{
  const userDoc=await User.create({
    username,
    password:bcrypt.hashSync(password,salt)
  });
  res.json(userDoc);
}
  catch(e){
    res.status(400).json(e);

  }
  

 
});
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.findOne({username});
    //compare password
    const passOk=bcrypt.compareSync(password, userDoc.password);
    // res.json(passOk)
    if(passOk){
      //user is logged in
      jwt.sign({username,id:userDoc._id},secret, {} ,(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json({
          id:userDoc._id,
          username,
        });

      })


    }
    else {
        res.status(400).json('wrong credentials');
    }
    
})
app.get('/profile',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{
    if(err) throw err
    res.json(info)

  })
  
})
app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
})
app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
  const { originalname, path } = req.file;
  // To change file with extension .webpeg 
  // To rename the file we will use fs library
  const parts = originalname.split('.');
  const ext = parts[parts.length-1];
  const newPath=path+'.'+ext;
  fs.renameSync(path,newPath);
  const {token}=req.cookies;
  jwt.verify(token,secret,{},async (err,info)=>{
    if(err) throw err
    const{title,summary,content}=req.body;
  const postDoc=await Post.create({
    title,
    summary,
    content,
    cover:newPath,
    author : info.id

  })
  res.json(postDoc);

  })
  

});
app.get('/post',async (req,res)=>{
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
})
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})


app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
