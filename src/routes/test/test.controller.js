'use strict';

exports.hello = function (req, res) {
	res.status(200).json({message:'Hello World!'});
};
