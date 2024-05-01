import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient({
    region: process.env.region || "us-east-1",
    convertEmptyValues: true,
    credentials: {
        accessKeyId: process.env.accessKeyId || "",
        secretAccessKey: process.env.secretAccessKey || "",
    },
});

export default dynamodb;
