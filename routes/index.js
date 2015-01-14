var express = require('express');
var moment = require('moment');
var router = express.Router();
var db = require('mongojs').connect('mongodb://kuldipweb:showcommentdb@ds031611.mongolab.com:31611/heroku_app33150239', ['posts']);
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "GandiMail",
   auth: {
       user: "query@kuldipraj.com",
       pass: "22@SendQuery"
   }
});
var comments = 0, commentList = [];

// post a comment
router.get('/postComment', function (req, res) {
	function verifyEmail(element) {
		var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailReg.test(element)) {
			return false;
		} else {
			return true;
		}
	}
	if (req.query.emails == '') {
		if (req.query.name == '' || req.query.email == '' || req.query.comments == '') {
			res.end('Please fill all details');
		} else if (!verifyEmail(req.query.email)) {
			res.end('Please enter valid email!');
		} else {
			var postComment = {
				name : req.query.name,
				email : req.query.email,
				comments: req.query.comments,
				date : moment().format('DD/MM/YYYY'),
				saveDate: moment().format()
			};
			db.posts.save(postComment, function (err, post) {
				if (err) {
					console.log(err);
					res.end('Internal Server error occured!');
				} else {
					res.end('sent');
				}
			})
		}
	}
});

// show Comments
router.get('/showComment', function (req, res) {
	commentList = [];
	comments = 0;
	db.posts.find(function (err, post) {
		if (err) {
			console.log(err);
			res.end('Internal Server error occured!');
		} else {
			for (comments = 0; comments < post.length; comments++) {
				commentList.push({
					'name': post[comments].name,
					'date': moment(post[comments].saveDate).fromNow(),
					'comments': post[comments].comments
				});
			}
			res.send(commentList);
		}
	})
});

// Send Query
router.get('/sendQuery', function (req, res) {
	var isNameAvailable = (req.query.name == undefined || req.query.name == '') ? false : true;;
	var isEmailAvailable = (req.query.email == undefined || req.query.email == '') ? false : true;;
	var isMessageAvailable = (req.query.message == undefined || req.query.message == '') ? false : true;
	if (isMessageAvailable && isNameAvailable && isEmailAvailable && req.query.emails == '') {
		var subject = req.query.name+ '[ email: ' +req.query.email+ ', website: '+req.query.website+']' + ' has sent you Message';
		smtpTransport.sendMail({
	   		from:'query@kuldipraj.com', // sender address
	   		to:'kuldip@kuldipraj.com',
	   		//cc:'kuldipinfotech@gmail.com',
	   		subject: subject, // Subject line
	   		text: req.query.message // plaintext body
			}, function(error, response){
	   			if(error){
	       			console.log('error:' + error);
	       			res.end('error');
	   			}else{
	       			console.log("Message sent: " + response.message);
	       			res.end('sent');
	   			}
			}
		);
	} else {
		res.end('errors');
		res.send('Wrong url');
	}
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kuldip Raj Website', className: 'homePage' });
});
router.get('/easytabs', function(req, res) {
  res.render('easyTabs', { title: 'Kuldip Raj Website - EasyTabs', className: 'easyTabPage'  });
});
router.get('/contactme', function(req, res) {
  res.render('contactme', { title: 'Kuldip Raj Website - Contact Me', className: 'contactMePage'  });
});
router.get('/aboutme', function(req, res) {
  res.render('aboutme', { title: 'Kuldip Raj Website - About Me', className: 'aboutMePage'  });
});
router.get('/resume', function(req, res) {
  res.render('resume', { title: 'Kuldip Raj Website - My Resume', className: 'resume'  });
});
router.get('/*', function(req, res) {
  res.render('error', { title: 'Kuldip Raj Website - Error Page', className: 'errorPage'  });
});

module.exports = router;
