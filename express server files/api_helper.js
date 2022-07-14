const request = require('request')

module.exports = {
    /*
    ** This method returns a promise
    ** which gets resolved or rejected based
    ** on the result from the API
	  */
    make_API_call : function(url,method,body){
        return new Promise((resolve, reject) => {
            request({
  					url: url,
  					method: method,
  					json: body.body
					},
	    		(err, res, body) => {
              if (err) reject(err)
              resolve(body)
            });
        })
    }
}