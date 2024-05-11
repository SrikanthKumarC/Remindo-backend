import { SQS } from "aws-sdk";

export const sqs = new SQS({
  region: "ap-south-1",
  endpoint: "https://sqs.ap-south-1.amazonaws.com/198923217469/reminderlist.fifo"
});

