var ejs = require("ejs");
var mysql = require('./mysql');

var category;
var person = "abc";
var i = 0;
var allrev;
var selectCategory;
var selectedname = "abc";
var loginTime;
function signin(req, res) {

	ejs.renderFile('./views/signin.ejs', {
		"user" : person
	}, function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

// when click on login
function signUp(req, res) {

	ejs.renderFile('./views/login.ejs', function(err, result) {
		if (!err) {
			res.end(result);

		} else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};
// first called function from signin.ejs
function afterSignIn(req, res) {
	ejs.renderFile('./views/signup.ejs', function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}

	});
};
function register(req, res) {

	var inputFirstname = req.param("inputFirstname");
	var inputLastname = req.param("inputLastname");
	var inputUsername = req.param("inputEmail");
	var inputPassword = req.param("inputPassword");
	var getUser = "INSERT INTO test.users (Name,emailid,password,Lastname)"
			+ "VALUES " + "(" + "'" + req.param("inputFirstname") + "'" + ","
			+ "'" + req.param("inputEmail") + "'" + "," + "'"
			+ req.param("inputPassword") + "'" + "," + "'"
			+ req.param("inputLastname") + "'" + ");";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			res.end(err);

		}

		else {

			ejs.renderFile('./views/login.ejs', function(err, result) {
				if (!err) {
					res.end(result);

				} else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, getUser);
};

// login function

function login(req, res) {

	var currentdate = new Date();
	var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
			+ "/" + currentdate.getFullYear() + " ::" + currentdate.getHours()
			+ ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

	var getpswrd = req.param("inputUsername");
	loginTime = "abc";

	var catequery = "SELECT DISTINCT type FROM test.category";
	var allreview = "select type, writer,Cname, review  from test.category ";
	var getUser = "select * from test.users where emailid='"
			+ req.param("inputUsername") + "'" + "and password = " + "'"
			+ req.param("inputPassword") + "'";
	var firstname = "select Name,Time from test.users where emailid='"
			+ req.param("inputUsername") + "'";
	var loginTimes = "select Time from test.users where emailid='"
			+ req.param("inputUsername") + "'";
	var updatetime = "UPDATE test.USERS SET TIME = " + "'" + datetime + "'"
			+ " where emailid  ='" + req.param("inputUsername") + "'";

	console.log(datetime + req.param("inputUsername"));

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}

		else {

			category = results;
		}
	}, catequery);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}

		else {

			allrev = results;
		}
	}, allreview);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {

				i = 1;
				mysql.fetchData(function(err, getresults) {

					if (err) {
						throw err;
					} else {
						if (getresults.length > 0) {

							person = getresults[0].Name;
							loginTime = getresults[0].Time;

							res.cookie("sess", req.param("inputUsername") + ","
									+ req.param("inputPassword") + ","
									+ getresults[0].Name);

							ejs.renderFile('./views/home.ejs', {
								"user" : person,
								"category" : category,
								"allrev" : allrev,
								"loginTime" : loginTime
							}, function(err, getresults) {
								// render on success
								if (!err) {

									res.end(getresults);
								}
								// render or error
								else {

									res.end('An error occurred');
									console.log(err);
								}
							});
						}
					}
				}, firstname);

			} else {

				ejs.renderFile('./views/login.ejs', {
					"user" : person
				}, function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
		}
	}, getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}

		else {

			console.log("time updated")
		}
	}, updatetime);
}

function getCategory(req, res) {
	var i = 0;
	var cat = "abc";
	var cat = req.param("categories");
	selectCategory = cat;
	res.cookie("selectCategory", selectCategory);
	var getUser = "select * from test.category where type = '" + cat + "';";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {

			ejs.renderFile('./views/category.ejs', {
				"user" : person,
				"review" : results,
				"allrev" : allrev,
				"typereview" : "abc",
				"category" : category,
				"loginTime" : loginTime
			}, function(err, result) {
				// render on success
				if (!err) {

					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});

		}
	}, getUser);

};

function finalreview(req, res) {
	selectedname = req.param("nameselected");

	var namequery = "select * from test.category where Cname = '"
			+ selectedname + "';";
	var review = "Select Review";
	var typereview = "abc";
	console.log("selectedname" + selectedname);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;

		}

		else {
			for (i = 0; i < 15; i++) {
				i = i + 1;
			}
			typereview = results;

			ejs.renderFile('./views/category.ejs', {
				"user" : person,
				"review" : results,
				"allrev" : allrev,
				"typereview" : typereview,
				"category" : category,
				"selectedname" : selectedname,
				"loginTime" : loginTime
			}, function(err, result) {
				// render on success
				if (!err) {

					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});

		}
	}, namequery);
};
function postReviews(req, res) {

	var getemail = req.cookies.sess;
	var getEmail = getemail.split(",");
	var email = getEmail['0'];

	var chekquery = "select review from test.category where Cname = '"
			+ selectedname + "'" + "and email =" + "'" + email + "'";

	console.log("Inside post: chekquery " + chekquery);

	var inputRating = req.param("rate");
	var selectCategory = req.cookies.selectCategory;
	var inputReview = req.param("inputReview");
	var typereview = "abc";
	var ifExist = false;

	var updateTable = "UPDATE test.category Set rating =" + "'" + inputRating
			+ "'" + "," + "email =" + "'" + email + "'" + "," + "review=" + "'"
			+ inputReview + "'" + "where type =" + "'" + selectCategory + "'"
			+ "AND Cname =" + "'" + selectedname + "'";

	var insertQuery = "INSERT INTO test.category (type, Cname,rating,email,review,writer) VALUES"
			+ "(" + "'"
			+ selectCategory
			+ "'"
			+ ","
			+ "'"
			+ selectedname
			+ "'"
			+ ","
			+ "'"
			+ inputRating
			+ "'"
			+ ","
			+ "'"
			+ email
			+ "'"
			+ ","
			+ "'"
			+ inputReview + "'" + "'" + person + "'" + ")";

	console.log("InsertDetail" + insertQuery);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}

		else {
			if (results.length > 0) {
				ifExist = true;
				console.log("InsertDetail" + ifExist);
			}

		}
	}, chekquery);

	if ((ifExist)) {
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			}

			else {
				if (results.length > 0) {

					console.log("InsertDetail:::: changed" + insertQuery);
				}

			}
		}, insertQuery);

	} else {

		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;

			}

			else {

				console.log("Inserted");
				ejs.renderFile('./views/category.ejs', {
					"user" : person,
					"review" : results,
					"allrev" : allrev,
					"category" : category,
					"loginTime" : loginTime
				}, function(err, result) {
					// render on success
					if (!err) {

						res.end(result);
					}
					// render or error
					else {
						res.end('An error occurred');
						console.log(err);
					}
				});

			}
		}, updateTable);
	}
};

function editReviews(req, res) {

	var getemail = req.cookies.sess;
	var getEmail = getemail.split(",");
	var email = getEmail['0'];
	console.log("This is retrieved cookie  " + selectedname);

	console.log("Inside post:");

	var inputRating = req.param("rate");
	var selectCategory = req.cookies.selectCategory;
	var inputReview = req.param("inputReview3");
	var typereview = "abc";

	var deletName = "DELETE FROM test.category where type =" + "'"
			+ selectCategory + "'" + "," + "email =" + "'" + email + "'"
			+ "AND Cname =" + "'" + selectedname + "'";

	var updateTable = "UPDATE test.category Set email =" + "'" + email + "'"
			+ "," + "review=" + "'" + inputReview + "'" + "where type =" + "'"
			+ selectCategory + "'" + "AND Cname =" + "'" + selectedname + "'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;

		}

		else {

			console.log("Inserted");
			ejs.renderFile('./views/category.ejs', {
				"user" : person,
				"review" : results,
				"allrev" : allrev,
				"category" : category,
				"loginTime" : loginTime
			}, function(err, result) {
				// render on success
				if (!err) {

					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});

		}
	}, updateTable);
};

function review(req, res) {
	var getselect = req.param("name");
	var i = 0;
	var getUser = "select review from test.category where Cname = '"
			+ getselect + "'";
	console.log("category:" + getselect);
	console.log("selected:" + getselect);
	mysql.fetchData(function(err, results) {
		if (err) {

			throw err;
		}

		else {

			console.log(results);

			ejs.renderFile('./views/catdesr.ejs', {
				"user" : person,
				"review" : results,
				"namereview" : results
			}, function(err, result) {

				// render on success
				if (!err) {
					console.log(results);
					res.end(result);
				}
				// render or error
				else {

					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	}, getUser);

};

function logout(req, res) {
	console.log("logout success");

	res.clearCookie('selectCategory');
	res.clearCookie('selectedname');
	res.clearCookie('email');
	res.clearCookie('person');
	res.clearCookie('password');
	res.clearCookie('firstname');
	ejs.renderFile('./views/signin.ejs', {
		"user" : person
	}, function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end('An error occurred');
			console.log("logout success");
		}
	});

}

exports.editReviews = editReviews;
exports.logout = logout;
exports.postReviews = postReviews;
exports.finalreview = finalreview;
exports.review = review;
exports.getCategory = getCategory;
exports.login = login;
exports.signUp = signUp;
exports.signin = signin;
exports.afterSignIn = afterSignIn;
exports.register = register;