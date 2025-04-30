import Redis from 'ioredis';


const redisClient = new Redis({
    host: "redis-15467.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 15467,
    password: "sjAw65CmTOzrx3mjhEIHReYqG1Ltqhp4",
});


redisClient.on('connect', () => {
    console.log('Redis connected');
})

export default redisClient;