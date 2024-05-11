import  { Request, Response } from 'express';
import { sqs } from '../config/aws';
require('dotenv').config();

// const createNotification = async (req: Request, res: Response) => {
//     try {
//         const { message, email } = req.body;
//         if (!message || !email) {
//             throw new Error("Message is required");
//         }
//         const params = {
//             MessageBody: message as string,
//             QueueUrl: process.env.SQS_URL as string,
//             MessageGroupId: "notification",
//             MessageAttributes: {
//                 "Email": {
//                     DataType: "String",
//                     StringValue: email as string
//                 },
//                 "Date": {
//                     DataType: "String",
//                     StringValue: new Date().toISOString()
//                 }
//             },
//             MessageDeduplicationId: crypto.randomUUID(), // Provide a unique deduplication ID
//         };
//         await sqs.sendMessage(params, (err, data) => {
//             if (err) {
//                 throw new Error(err.message);
//             }
//             console.log(`Message sent: ${data.MessageId}`);
//         }).promise();
//         res.status(200).send("Notification sent");
//     }
//     catch (error: any) {
//         res.status(400).send(error.message);
//     }
// }


const listNotifications = async (req: Request, res: Response) => {
    try {
        const params = {
            QueueUrl: process.env.SQS_URL as string
        };
        const data = await sqs.receiveMessage(params).promise();
        if (!data.Messages) {
            return res.status(404).send("No notifications found");
        }
        // delete the message from the queue
        const deleteParams = {
            QueueUrl: process.env.SQS_URL as string,
            ReceiptHandle: data.Messages[0].ReceiptHandle as string
        };
        await sqs.deleteMessage(deleteParams).promise();
        res.status(200).send(data.Messages);
    }
    catch (error: any) {
        res.status(400).send(error.message);
    }
}

export default { listNotifications };