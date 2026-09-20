export const sd_06_load = {
  LOAD_BALANCING: {
    title: 'Load Balancing & Scalability',
    description: 'Learn how to distribute traffic across multiple servers using Load Balancers and horizontal scaling.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['System Design Fundamentals'],
    learningContent: `
# Load Balancing & Scalability

When one server can no longer handle the traffic (reaching vertical scaling limits), you add more servers (horizontal scaling). But how do clients know which server to talk to?

## What is a Load Balancer (LB)?
A Load Balancer sits between the clients and the servers. It accepts incoming network traffic and distributes it across multiple backend servers to ensure no single server becomes overwhelmed. 
- It prevents single points of failure.
- It performs Health Checks to ensure traffic isn't sent to dead servers.

## Routing Algorithms
1. **Round Robin:** Requests are distributed sequentially across the group of servers.
2. **Least Connections:** Sends the new request to the server with the fewest active connections.
3. **IP Hash:** The client's IP address is hashed to determine which server receives the request. This ensures a specific user is always routed to the same server (Sticky Sessions).

## L4 vs L7 Load Balancing
- **Layer 4 (Transport):** Balances based on IP address and TCP port. Fast, but blind to the content of the request.
- **Layer 7 (Application):** Balances based on the HTTP header, URL, or cookies. Slower, but allows smart routing (e.g., routing \`/video\` traffic to specialized video servers).
`,
    fullNotes: `
# Detailed Notes: Load Balancing

- **Sticky Sessions:** If your application stores session data in local server memory (bad practice for distributed systems), you must use IP Hashing so the user always hits the same server. *Better design:* Store session data in a distributed cache like Redis, making the web servers stateless, allowing Round Robin to work perfectly.
- **Hardware vs Software LBs:** Historically, companies bought expensive hardware LBs (F5). Today, software LBs (NGINX, HAProxy) or Cloud managed LBs (AWS ALB, ELB) are standard.
`,
    shortNotes: `
- LB distributes traffic across multiple servers.
- Essential for Horizontal Scaling and High Availability.
- Algorithms: Round Robin, Least Connections, IP Hash.
- Layer 4 (Network level, fast) vs Layer 7 (HTTP level, smart).
- Always aim for stateless backend servers so any LB algorithm works without sticky sessions.
`,
    cheatSheet: `
### Horizontal vs Vertical Scaling
- **Vertical (Scale Up):** Buying a bigger CPU/RAM. Limited by hardware. Requires downtime.
- **Horizontal (Scale Out):** Adding more commodity servers. Infinite scaling. Requires a Load Balancer.

### Load Balancer Placements
1. Between User and Web Servers.
2. Between Web Servers and Internal Application Servers.
3. Between Application Servers and Databases.
`,
    interviewQuestions: [
      { question: 'What is the difference between a Layer 4 and Layer 7 Load Balancer?', answerHint: 'Layer 4 routes traffic based on network data (IP and Port) without inspecting the payload, making it very fast. Layer 7 inspects the application layer (HTTP headers, URLs, Cookies) allowing for complex routing decisions (like routing /api to one server group and /images to another).', type: 'TECHNICAL' },
      { question: 'Why are Sticky Sessions generally considered an anti-pattern in modern system design?', answerHint: 'They break the statelessness of web servers. If a server goes down, the user loses their session. It also makes it harder to evenly distribute load. The better approach is to store sessions in a distributed cache (like Redis).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'What is Load Balancing?', url: 'https://www.nginx.com/resources/glossary/load-balancing/', type: 'ARTICLE', priority: 'S', source: 'NGINX', isOfficial: true }
    ]
  }
};
