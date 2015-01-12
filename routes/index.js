var express = require('express');
var moment = require('moment');
var router = express.Router();
var db = require('mongojs').connect('mongodb://kuldipweb:showcommentdb@ds031611.mongolab.com:31611/heroku_app33150239', ['posts']);
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
			res.send('sent');
		}
	})
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
