export const sec_07_network = {
  NETWORK_SECURITY: {
    title: 'Network Security',
    description: 'Understand Firewalls, VPCs, Network Segmentation, DDoS protection, and WAFs.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Database & Data Security'],
    learningContent: `
# Network Security

Network security is the first line of defense in a Defense in Depth strategy. It controls the flow of traffic in and out of your architecture.

## 1. Network Segmentation (VPCs)
A Virtual Private Cloud (VPC) is a logically isolated section of a cloud network.
- **Public Subnet:** Has a route to the internet via an Internet Gateway. Only Load Balancers or NAT Gateways should live here.
- **Private Subnet:** Has NO inbound route from the internet. Application servers and Databases live here. They can only be accessed by the Load Balancer in the public subnet.

## 2. Firewalls & Security Groups
- **Security Groups (AWS) / Firewalls (GCP):** Stateful firewalls applied at the instance level. They act as a strict allowlist.
- *Best Practice:* Do not allow traffic from \`0.0.0.0/0\` (the whole internet) directly to your application servers. The application server's Security Group should ONLY allow inbound traffic from the Load Balancer's Security Group ID.

## 3. Web Application Firewall (WAF)
A traditional firewall operates at Layer 4 (IP/Port). A WAF operates at Layer 7 (HTTP/HTTPS). 
- It inspects the actual content of the web requests.
- It blocks common attacks like SQL Injection, XSS payloads, and bad bots before they ever reach your application code.

## 4. DDoS Protection
Distributed Denial of Service (DDoS) attempts to crash your system by flooding it with massive amounts of garbage traffic.
- **Mitigation:** Use a CDN (like Cloudflare or AWS CloudFront) globally distributed to absorb the massive traffic spikes. Implement strict rate limiting.
`,
    fullNotes: `
# Detailed Notes: Network Security

- **Stateful vs Stateless Firewalls:** 
  - *Stateful (Security Groups):* If you allow inbound traffic on port 443, the firewall automatically remembers the connection and allows the return (outbound) traffic.
  - *Stateless (Network ACLs):* Applied at the subnet level. If you allow inbound traffic on port 443, you MUST explicitly write a rule to allow the outbound response on ephemeral ports (1024-65535).
- **Egress Filtering:** Many companies filter inbound traffic but ignore outbound (egress). If a server is hacked, the hacker will try to download malware from the internet or exfiltrate data. Egress filtering strictly limits what external IPs/Domains your internal servers are allowed to talk to.
`,
    shortNotes: `
- VPCs logically isolate your network.
- Public Subnets touch the internet (Load Balancers).
- Private Subnets are completely hidden from the internet (APIs, Databases).
- Security Groups: Instance-level stateful firewalls (Allowlists).
- WAF: Inspects HTTP traffic to block SQLi and XSS payloads.
- CDN: Absorbs DDoS attacks at the edge before they hit your servers.
- Egress Filtering prevents hacked servers from downloading malware or exfiltrating data.
`,
    cheatSheet: `
### Typical VPC Architecture
1. **Internet** -> 
2. **WAF & CDN** -> 
3. **Public Subnet** (Load Balancer [Port 443]) -> 
4. **Private Subnet 1** (API Servers [Port 8080, Inbound only from LB]) -> 
5. **Private Subnet 2** (Database [Port 5432, Inbound only from APIs]).
`,
    interviewQuestions: [
      { question: 'What is the difference between a traditional Network Firewall and a Web Application Firewall (WAF)?', answerHint: 'A traditional network firewall operates at OSI Layer 3/4, making decisions based on IP addresses, ports, and protocols (e.g., block port 22, allow port 443). A WAF operates at Layer 7, deeply inspecting the actual HTTP payload and headers to detect and block malicious application-level attacks like SQL Injection, XSS, and botnets.', type: 'TECHNICAL' },
      { question: 'Why should a database be placed in a Private Subnet rather than a Public Subnet?', answerHint: 'A public subnet is directly accessible from the internet. Placing a database there exposes it to global port-scanning and brute-force attacks. A private subnet has no direct internet route. By placing the database there, it can only be accessed by specific internal application servers (via Security Groups), drastically reducing the attack surface.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'AWS VPC Architecture Best Practices', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html', type: 'ARTICLE', priority: 'S', source: 'AWS', isOfficial: true }
    ]
  }
};
