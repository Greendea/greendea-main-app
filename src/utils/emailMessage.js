export const getMailMessage = ({ topic, content }) => {
    return `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Idea Submitted</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                }
                h1, h2, h3 {
                    margin-top: 0;
                    font-weight: normal;
                }
                h1 {
                    font-size: 24px;
                }
                h2 {
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                p {
                    margin-bottom: 10px;
                }
                .idea-details {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-bottom: 20px;
                }
                .idea-details h2 {
                    margin-top: 0;
                }
            </style>
        </head>
        <body>
            <h1>New Idea Submitted</h1>
            <p>A new idea has been submitted to the system. The details are as follows:</p>

            <div class="idea-details">
                <h2>Idea Details</h2>
                <p><strong>Idea Topic:</strong> ${topic}</p>
                <p><strong>Idea Description:</strong></p>
                <p>${content}</p>
            </div>

            <p>Please review the idea and take necessary actions.</p>
        </body>
    </html>
    `
}