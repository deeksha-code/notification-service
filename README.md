**Notification Service using Node.js**

**Overview**

This project implements a scalable notification service using Node.js. It supports instant notifications, scheduled notifications, rate limiting, asynchronous processing using queues, and real-time delivery using Web Push. The system is designed to simulate a production-like architecture with separate services for API handling and background processing.

**Architecture**

The system follows a distributed architecture:

Frontend (React)  
→ Backend API (Node.js with Express)  
→ Redis (Rate Limiting)  
→ RabbitMQ (Message Queue)  
→ Worker Service (Background Processor)  
→ Web Push Service  
→ Browser Notification  

**Technologies Used**

Node.js with Express  
MongoDB for data storage  
Redis for rate limiting  
RabbitMQ for asynchronous message queue  
Web Push for sending notifications  
React for frontend  
Server-Sent Events (SSE) for real-time updates  

**Features**

4.1 Instant Notifications  
If no scheduleAt field is provided, notifications are processed immediately.  

4.2 Scheduled Notifications  
Notifications with a scheduleAt timestamp are stored in MongoDB and processed later by a scheduler.  

4.3 Rate Limiting  
Redis is used to limit each user to a maximum of 5 notifications per minute. If exceeded, the API returns HTTP 429.  

4.4 Asynchronous Processing  
RabbitMQ is used to queue notification jobs. A separate worker service consumes and processes them.  

4.5 Retry Mechanism  
If sending a notification fails, the system retries up to three times.  

4.6 Dead Letter Queue  
After three failed attempts, the job is moved to a dead-letter queue for further inspection.  

4.7 Web Push Notifications  
Notifications are delivered using the Web Push protocol based on user subscription data stored in MongoDB.  

4.8 Real-Time Updates  
Server-Sent Events (SSE) allow clients to receive real-time updates via the /notifications/stream endpoint.  

**API Endpoints**

5.1 POST /notifications  
Creates a notification  

Request Body:  
{
"userId": "user1",
"message": "Hello from React",
"scheduleAt": "optional ISO timestamp"
}

5.2 POST /notifications/save-subscription  
Stores the push subscription object for a user  

5.3 GET /notifications/stream/:userId  
Subscribes the client to real-time updates using SSE  

**Setup Instructions**

6.1 Install dependencies  
Run npm install in both backend and frontend directories  

6.2 Start required services  

MongoDB:  
mongod  

Redis:  
redis-server  

RabbitMQ:  
rabbitmq-server  

6.3 Run backend  
node app.js  

6.4 Run worker  
node queue/worker.js  

6.5 Run frontend  
npm start  

**Workflow**

The frontend registers a service worker and generates a push subscription  

The subscription is sent to the backend and stored in MongoDB  

The user triggers a notification request via the frontend  

The backend validates the request using Redis rate limiting  

The notification job is pushed to RabbitMQ  

The worker consumes the job from the queue  

The worker retrieves the user subscription from MongoDB  

The notification is sent using Web Push  

The browser displays the notification  

**Notes**

User identification is simulated using a generated userId stored in localStorage  

In a production system, authentication and user management would be implemented  

The system is designed to be scalable and can handle multiple users  
