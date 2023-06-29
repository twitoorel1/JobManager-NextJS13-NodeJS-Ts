@echo off
echo Installing regular dependencies...
npm install express bcrypt cors dotenv crypto jsonwebtoken mongoose multer nodemailer yup moment moment-timezone uuid

echo Installing devDependencies...
npm install -D nodemon ts-node typescript @types/uuid @types/express @types/bcrypt @types/cors @types/dotenv @types/jsonwebtoken @types/mongoose @types/multer @types/node @types/yup @types/nodemailer

echo Dependencies installation completed.