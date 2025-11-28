exports.response = (response, type, message, data, code) => {
    let message1 = "";
    switch(type) {
        case 'success': 
            message1 = message || 'success';
            response.status(code || 200).json({ message: message1, code: code || 200, success: true, data: data });
            break;
        
        case 'fail':
            message1 = message || "Something went wrong. Please try again later.";
            response.status(code || 403).json({ message: message1, code: code || 403, success: false, data: data });
            break;
    };
};