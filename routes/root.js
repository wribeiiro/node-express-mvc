const express = require('express');
const router = express.Router();
const httpStatus = require('../enum/httpStatus');
//const path = require('path');

router.get('^/$|/index(.html)?', (request, response) => {
    //response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    return response.status(httpStatus.HTTP_OK).json({
        'data': null,
        'message': 'Deu beyblade',
        'status': httpStatus.HTTP_OK
    });
});

module.exports = router;