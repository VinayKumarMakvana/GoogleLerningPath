export const sd_01_fund = {
  SYSTEM_DESIGN_FUNDAMENTALS: {
    title: 'System Design Fundamentals',
    description: 'Introduction to large-scale distributed systems, client-server architecture, and the system design lifecycle.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# System Design Fundamentals

System Design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It is how you scale a system from 100 users to 100 million users.

## Client-Server Architecture
The foundational model of the internet. 
- **Client:** The device/software requesting resources (Web browser, Mobile app).
- **Server:** The device/software providing resources.

## What happens when you type google.com?
1. **DNS Resolution:** The browser asks the Domain Name System (DNS) to resolve "google.com" to an IP address.
2. **TCP Connection:** The client opens a TCP connection to the server (Three-way handshake).
3. **HTTP Request:** The client sends an HTTP GET request.
4. **Server Processing:** The server processes the request (often hitting a database or cache).
5. **HTTP Response:** The server returns the HTML/JSON.
6. **Browser Rendering:** The client parses the HTML and renders the page.

## Core Concepts to Master
- Scalability (Vertical vs Horizontal)
- Latency vs Throughput
- Availability vs Consistency
`,
    fullNotes: `
# Detailed Notes: Fundamentals

- **Latency:** The time it takes for data to traverse the network from sender to receiver. Measured in milliseconds (ms). High latency = slow response.
- **Throughput:** The amount of data successfully transferred in a given time period. Often measured in Requests Per Second (RPS) or bandwidth (Mbps).
- **Latency vs Throughput:** A highway analogy. Latency is the speed limit (how fast a car gets from A to B). Throughput is the number of lanes (how many cars can travel at once). You can have high latency but high throughput (shipping hard drives via FedEx).
`,
    shortNotes: `
- Client-Server is the standard model.
- DNS = Phonebook of the internet.
- Latency = Time to complete a single request.
- Throughput = Number of requests completed per unit of time (RPS).
- You scale a system to handle higher throughput while maintaining low latency.
`,
    cheatSheet: `
### Latency Numbers Every Programmer Should Know
- L1 cache reference: 0.5 ns
- Branch mispredict: 5 ns
- L2 cache reference: 7 ns
- Mutex lock/unlock: 25 ns
- Main memory reference: 100 ns
- Read 1 MB sequentially from memory: 250 us
- Read 1 MB sequentially from SSD: 1 ms
- Send packet CA->Netherlands->CA: 150 ms
`,
    interviewQuestions: [
      { question: 'What is the difference between latency and throughput?', answerHint: 'Latency is the time it takes for a single request to complete (delay). Throughput is the number of requests the system can handle over a given time period (capacity).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'ARTICLE', priority: 'S', source: 'GitHub', isOfficial: true },
      { title: 'What happens when you type a URL?', url: 'https://github.com/alex/what-happens-when', type: 'ARTICLE', priority: 'A', source: 'GitHub', isOfficial: false }
    ]
  }
};
