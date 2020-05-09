const express = require('express');/*importing express*/
const path = require('path');/*path is an inbuilt module in node*/
const port = 8000;
const app = express();
/*the express app will be fired using this command*/
/*This app has all the functionality
of express library which are needed to run the server*/

/*after INSTALLING ejs in the current directory*/
 /*we have just set the view engine = ejs in the app i.e 
 setting the value for a property we can use this because we
 have requre express in line 1 and can use its its functionality
 using app because of line 4*/
app.set('view engine' , 'ejs');

/*we are telling that where are we setting the views*/
/*(__dirname,'views')=> __dirname this will give the current path and views will be the folder inside that path*/
app.set('views',path.join(__dirname,'views'));

/*middleware 1*/
/*
app.use(function(req,res,next){
//this function by default have 3 argument 1. req, 2.res 3.next
    console.log('middleware1 called');
    next();
    // next(); =it passed the control to next middlewere if there is a middleware after this 
    //if there is no middleware next to it then it goes on to the controller
});*/

app.use(express.urlencoded());
/*it reads the form data and not the params which we pass in the controller app.get('./delete-contact/:phone'*/
/*parser will be in the middle before the controler access the data*/
/*when the data is sent from the form to the server it is incoded and is in the form a string
to analyse it and decode it in the form of an object where i can see the key and value
we need a parser. app.use(express.urlencoded()); since req is a object so parser read data and create a key body
 in the req object and put the data resived i.e key and value inside that body object*/
/* here {body{name:"nameInForm",phone:"phoneNumberInForm"}} this object will be added in req object */

app.use(express.static('assets'));
/* static('filename') here  filename is the folder do we need to access static file in
 In above line static('assets') it is assets folder from where we will access static file*/


var contactList = [
    {
        name:"Toni Stark",/*key value pair*/
        phone:"9693727335"/*key value pair*/
    },
    {
        name: " Bhakua airtel",/*key value pair*/
        phone: "9570018853"/*key value pair*/
    },
    {
        name: "Bania jio",/*key value pair*/
        phone:"8298042196"/*key value pair*/
    }
]

/*app.get instead of multiple switch cases earlier*/
/*1.get type request means i want to fetch some data from the db*/
/*2. post type request whenever i want to send some data and it make some changes in
 db and then gives the response */
 /*3.put type request there is something already present in the db
 and some data are missing then we use put request */
 /*4.delete request is used when we want to delete some data*/
app.get('/',function(req,res){
    //console.log(__dirname);/*this will print the current directory in console*/

    /*res.send is similar to earlier res.end*/
    //res.send('<h1>Yup It Is Running<h1>');

    /*return res.render('home'); will go inside the views folde find the home file and give it to browser*/
   // return res.render('home');/*this means we are rendering from the view whith file name home in the views folder*/ 
    return res.render('home',{
        title: "contact list",/*key value pair*/
        /*the title and contact_list will be sent to home.ejs in views folder home.ejs*/
        contact_list:contactList 
        /*key value pair*/
    });
});

app.get('/practice',function(req,res){
    
    return res.render('practice',{
        title: "Lets play with ejs"
        /*key value pair*/
    })
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    contactList.push(req.body);
   //res.redirect('./')
   res.redirect('back');
   /* because it is comming to same page*/
});


/*:phone => means phone is comming over*/
/* we can use string param part using href="/delete-contact/<%= i.phone%>" in a tag in  ejs and it will be visible in url
     using it like  for deleting the contact  */
/*this is how we do with string param when href in h tag is passed through ejs file*/
/*app.get('./delete-contact/:phone',function(req,res){
    //req.params is an object ,express is reading it
    console.log(req.param);
    let phone = req.params.phone;
});*/


/* we can use query param, using href="/delete-contact/?phone=<%= i.phone%> & name=<%=i.name%>"> in a tag in  ejs and it will be visible in url
     for using it like we did in above controller for deleting the contact*/
/*this is how we do with query param when passed through ejs file*/
app.get('/delete-contact/',function(req,res){
    // console.log(req.query);
    let phone = req.query.phone;
    /*in the array of contactList findIndex in the js function it will iterate over each item in the array here contact mentioned below Will be each item
    one by one and contact.phone==phone will find the index when it matches and return the index if it matches if not then it will return -1 */
    let contacIndex = contactList.findIndex(contact=>contact.phone==phone);

/*Brief explanation about arrow function below

const smartPhones = [
  { name:'iphone', price:649 },
  { name:'Galaxy S6', price:576 },
  { name:'Galaxy Note 5', price:489 }
];

// ES5
var prices = smartPhones.map(function(smartPhone) {
  return smartPhone.price;
});
console.log(prices); // [649, 576, 489]

// ES6
const prices = smartPhones.map(smartPhone => smartPhone.price);
console.log(prices); // [649, 576, 489]\

Both are same */

    if(contacIndex!=-1){
        contactList.splice(contacIndex,1);
    }
    return res.redirect('back');
});




/*as the server is running it is listening the req and and 
sending back res so the function here is named accordingly 
so it is app.listen*/
/*we are telling our app to listen to this port*/
app.listen(port,function(err){
    if(err){
        console.log('Error in Running the server', err);
    }
    console.log('server is up and running on port: ',port);
});