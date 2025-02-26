exports.mailTemp = (url) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh; /* Full height */
                margin: 0;
            }
            .container {
                max-width: 400px;
                padding: 20px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 12px 20px;
                background: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset</h2>
            <p>Click below to reset your password:</p>
            <a href="${url}" class="button">Reset Password</a>
            <p>If you didn’t request this, ignore this email.</p>
        </div>
    </body>
    </html>
    `;
};

