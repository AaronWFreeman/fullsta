'user strict';
exports.DATABASE_URL =
    process.env.DATABSE_URL ||
    global.DATABASE_URL ||
    'mongodb://Tlonist:Chewbacca1@ds031617.mlab.com:31617/fullstack-blog-app';
exports.PORT = process.env.PORT || 8080;
