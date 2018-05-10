'user strict';
exports.DATABASE_URL =
    process.env.DATABSE_URL ||
    global.DATABASE_URL ||
    'mongodb://Tlonist:Chewbacca1@ds031617.mlab.com:31617/fullstack-blog-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
