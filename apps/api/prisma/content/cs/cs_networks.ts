import { TopicContent } from '../types';

export const cs_networks: Record<string, TopicContent> = {
  net_21: {
    title: 'Computer Networks',
    learningContent: `
# Computer Networks Basics
A computer network is a set of computers sharing resources located on or provided by network nodes. Networks use common communication protocols over digital interconnections to communicate.

## Classifications
*   **LAN (Local Area Network):** Covers a small physical area, like a home, office, or school. Usually high speed and owned by a single organization.
*   **WAN (Wide Area Network):** Covers a large geographical area, such as a country or the world (the Internet is the largest WAN). Uses leased telecommunication circuits.
*   **WLAN:** Wireless LAN (Wi-Fi).
*   **VLAN:** Virtual LAN, logical grouping of devices on a physical LAN.

## Key Network Devices
*   **Switch:** Connects devices on a single computer network by using packet switching to receive and forward data to the destination device (Layer 2).
*   **Router:** Forwards data packets between different computer networks (Layer 3).
*   **Firewall:** Monitors and controls incoming and outgoing network traffic based on predetermined security rules.
*   **Modem:** Modulates and demodulates analog carrier signals to encode and decode digital information.
`,
    fullNotes: `
# Network Topologies
The arrangement of the various elements of a communication network.
*   **Star:** All nodes are connected to a central hub/switch. Easy to install, but the hub is a single point of failure. (Most common today).
*   **Bus:** All nodes share a single communication cable. High collision rate.
*   **Ring:** Nodes form a closed loop. Data travels in one direction.
*   **Mesh:** Every node is connected to every other node. Highly reliable but very expensive to wire.

## MAC vs IP Addresses
*   **MAC Address (Media Access Control):** Physical address burned into the Network Interface Card (NIC) by the manufacturer. Used for local communication on a LAN (Layer 2). 48 bits (e.g., \`00:1A:2B:3C:4D:5E\`).
*   **IP Address (Internet Protocol):** Logical address assigned by the network. Used for global communication across networks (Layer 3).
`,
    shortNotes: `
*   **Network:** Connected devices sharing data.
*   **LAN vs WAN:** Local vs Wide area.
*   **Switch:** Connects devices within a LAN (Uses MAC).
*   **Router:** Connects different networks together (Uses IP).
*   **MAC Address:** Physical hardware address.
*   **IP Address:** Logical network address.
`,
    cheatSheet: `
| Device | Layer | Uses |
|---|---|---|
| Switch | 2 (Data Link) | MAC Addresses |
| Router | 3 (Network) | IP Addresses |
`,
    resources: [
      {
        title: 'Computer Networking: A Top-Down Approach (Kurose/Ross)',
        type: 'BOOK',
        priority: 'S',
        description: 'The standard textbook for learning computer networks.',
        status: 'PUBLISHED'
      }
    ]
  },

  net_22: {
    title: 'OSI & TCP/IP Models',
    learningContent: `
# Networking Models
To standardize network communication, models divide the communication process into logical layers.

## The OSI Model (7 Layers)
A conceptual framework: "Please Do Not Throw Sausage Pizza Away"
7.  **Application:** Network applications (HTTP, FTP, SMTP, DNS).
6.  **Presentation:** Data formatting, encryption, compression (TLS/SSL).
5.  **Session:** Establishing, maintaining, and terminating sessions.
4.  **Transport:** End-to-end communication, reliability, multiplexing (TCP, UDP). Data unit: **Segment**.
3.  **Network:** Routing packets across different networks (IP, ICMP). Data unit: **Packet**.
2.  **Data Link:** Node-to-node data transfer, MAC addressing, error detection (Ethernet, Wi-Fi). Data unit: **Frame**.
1.  **Physical:** Physical transmission of raw bits over cables/radio (Hubs, Cables). Data unit: **Bits**.

## The TCP/IP Model (4 Layers)
The practical model the Internet actually uses.
4.  **Application (Maps to OSI 7, 6, 5)**
3.  **Transport (Maps to OSI 4)**
2.  **Internet (Maps to OSI 3)**
1.  **Network Access / Link (Maps to OSI 2, 1)**
`,
    fullNotes: `
# Encapsulation and Decapsulation
As data moves down the OSI model from the Application layer to the Physical layer on the sender side, each layer adds its own header (and sometimes a trailer) to the data. This is called **Encapsulation**.
*   Data + Transport Header = Segment
*   Segment + Network Header = Packet
*   Packet + Data Link Header/Trailer = Frame

When the receiving device gets the data, it moves up the layers, and each layer strips off its corresponding header. This is **Decapsulation**.

## Why Layering?
*   **Modularity:** You can swap out physical cables (Ethernet to Wi-Fi) without changing how your web browser (HTTP) works.
*   **Troubleshooting:** If a website doesn't load, you can check layers systematically (Is the cable plugged in? Layer 1. Can you ping the IP? Layer 3. Is the port open? Layer 4).
`,
    shortNotes: `
*   **OSI:** 7-layer theoretical model.
*   **TCP/IP:** 4-layer practical model.
*   **Layers (Top to Bottom):** Application, Presentation, Session, Transport, Network, Data Link, Physical.
*   **Encapsulation:** Adding headers as data goes down the stack.
*   **Decapsulation:** Stripping headers as data goes up the stack.
*   **PDU (Protocol Data Unit):** Segment (L4), Packet (L3), Frame (L2), Bit (L1).
`,
    cheatSheet: `
| OSI Layer | Protocol Examples | PDU | Device |
|---|---|---|---|
| 7. Application | HTTP, DNS, SMTP | Data | Gateway |
| 4. Transport | TCP, UDP | Segment | |
| 3. Network | IPv4, IPv6, ICMP | Packet | Router |
| 2. Data Link | Ethernet, 802.11 | Frame | Switch |
| 1. Physical | 100Base-T | Bit | Hub / Cable |
`,
    resources: []
  },

  net_23: {
    title: 'Ethernet & IP',
    learningContent: `
# Ethernet (Layer 2) & IP (Layer 3)

## Ethernet and MAC Addressing
Ethernet is the most widely used LAN technology. It operates at the Data Link layer.
*   Devices are identified by a 48-bit MAC address.
*   Data is packaged into **Frames**.
*   **ARP (Address Resolution Protocol):** Used to map an IP address to a MAC address. When a device wants to send an IP packet to a local IP, it broadcasts an ARP request: "Who has IP 192.168.1.5?". The owner replies with its MAC address.

## Internet Protocol (IP)
IP is responsible for routing packets across network boundaries. It is connectionless and "best-effort" (it doesn't guarantee delivery).
*   **IPv4:** 32-bit address (e.g., 192.168.1.1). Total ~4.3 billion addresses. Exhausted.
*   **IPv6:** 128-bit address. Solves the exhaustion problem.

## IP Subnetting & CIDR
IP addresses are divided into a Network portion and a Host portion using a Subnet Mask.
*   **CIDR Notation:** e.g., \`192.168.1.0/24\`. The \`/24\` means the first 24 bits represent the network, and the remaining 8 bits are for hosts (allowing 256 addresses, minus network and broadcast = 254 usable).
`,
    fullNotes: `
# NAT (Network Address Translation)
Because IPv4 addresses are exhausted, NAT was invented. A router uses a single public IP address to communicate with the Internet, but assigns private IP addresses (e.g., 192.168.x.x or 10.x.x.x) to devices inside the home/office network.
When a device sends a packet out, the router translates the private source IP to its public IP and assigns a unique source port. When the reply comes back, the router translates it back. This allows millions of devices to share a handful of public IPs.

## ICMP (Internet Control Message Protocol)
Used for diagnostics and error reporting. It doesn't use TCP or UDP.
*   **Ping:** Uses ICMP Echo Request and Echo Reply to test reachability.
*   **Traceroute:** Uses IP TTL (Time To Live) field and ICMP "Time Exceeded" messages to map the path to a destination.
`,
    shortNotes: `
*   **Ethernet:** Layer 2 protocol using MAC addresses.
*   **ARP:** Translates IP to MAC address on a local network.
*   **IP:** Layer 3 protocol for routing. Best-effort delivery.
*   **CIDR:** \`/24\` means 24 network bits.
*   **NAT:** Translates private IPs to a public IP to save IPv4 addresses.
*   **ICMP:** Diagnostic protocol (Ping).
`,
    cheatSheet: `
| Protocol | Layer | Purpose |
|---|---|---|
| ARP | 2/3 Boundary | Find MAC address for an IP |
| IP | 3 (Network) | Route packets globally |
| ICMP | 3 (Network) | Ping, errors, diagnostics |
| NAT | Router Function | Private to Public IP translation |
`,
    resources: []
  },

  net_24: {
    title: 'TCP & UDP',
    learningContent: `
# Transport Layer: TCP vs UDP
The Transport layer provides multiplexing using **Ports** (e.g., Port 80 for HTTP, Port 443 for HTTPS) to direct traffic to specific applications on a host. The two primary protocols are TCP and UDP.

## TCP (Transmission Control Protocol)
*   **Connection-Oriented:** Establishes a connection before sending data.
*   **Reliable:** Guarantees delivery of data. If a packet is lost, it retransmits it.
*   **Ordered:** Data is guaranteed to arrive in the exact order it was sent (using sequence numbers).
*   **Heavyweight:** Contains flow control and congestion control mechanisms.
*   **Use cases:** Web browsing (HTTP), Email (SMTP), File transfer (FTP), SSH.

## UDP (User Datagram Protocol)
*   **Connectionless:** Just sends data without establishing a connection.
*   **Unreliable:** "Fire and forget". Packets can be lost.
*   **Unordered:** Packets may arrive out of order.
*   **Lightweight:** Very fast, minimal header overhead.
*   **Use cases:** Live video/audio streaming, Online gaming, DNS, VoIP (where speed is more important than perfect accuracy).
`,
    fullNotes: `
# TCP Deep Dive

## The 3-Way Handshake
How TCP establishes a connection:
1.  **SYN:** Client sends a segment with the SYN (Synchronize) flag set and a random sequence number.
2.  **SYN-ACK:** Server responds with SYN and ACK flags. It acknowledges the client's sequence number and sends its own.
3.  **ACK:** Client acknowledges the server's sequence number. Connection established!

## The 4-Way Teardown
1.  Client sends **FIN**.
2.  Server sends **ACK** (Client can no longer send data, but can still receive).
3.  Server sends **FIN**.
4.  Client sends **ACK**. Connection closed.

## Flow Control vs. Congestion Control
*   **Flow Control (Windowing):** Prevents the sender from overwhelming the *receiver*. The receiver advertises its "Receive Window" size.
*   **Congestion Control:** Prevents the sender from overwhelming the *network*. Uses algorithms like Slow Start and Congestion Avoidance (halving transmission rate when packet loss is detected).
`,
    shortNotes: `
*   **TCP:** Reliable, connection-oriented, ordered, flow/congestion control.
*   **UDP:** Fast, connectionless, unreliable, unordered.
*   **TCP Handshake:** SYN -> SYN-ACK -> ACK.
*   **TCP Teardown:** FIN -> ACK -> FIN -> ACK.
*   **Flow Control:** Sender doesn't overwhelm receiver.
*   **Congestion Control:** Sender doesn't overwhelm network.
`,
    cheatSheet: `
| Feature | TCP | UDP |
|---|---|---|
| Reliability | High (Guaranteed) | Low (Best effort) |
| Speed | Slower (Overhead) | Faster |
| Ordering | Yes | No |
| Connection | 3-Way Handshake | Connectionless |
| Use Case | HTTP, SSH, FTP | DNS, Video, Gaming |
`,
    resources: []
  },

  net_25: {
    title: 'HTTP/HTTPS',
    learningContent: `
# HTTP & HTTPS
HTTP (Hypertext Transfer Protocol) is the application-layer protocol for transmitting hypermedia documents, such as HTML. It runs over TCP (default port 80).

## HTTP Properties
*   **Stateless:** The server does not keep any state between two requests. Every request is completely independent. (State is artificially maintained using Cookies/Tokens).
*   **Request-Response:** Client sends a request, server sends a response.

## HTTP Request Anatomy
1.  **Method:** GET, POST, PUT, DELETE, PATCH, OPTIONS.
2.  **Path:** \`/api/users/1\`
3.  **Headers:** Key-value pairs (e.g., \`Host\`, \`User-Agent\`, \`Authorization\`, \`Content-Type\`).
4.  **Body:** The payload (used in POST/PUT).

## HTTP Response Anatomy
1.  **Status Code:** 200 (OK), 404 (Not Found), 500 (Server Error).
2.  **Headers:** Key-value pairs (e.g., \`Content-Length\`, \`Set-Cookie\`).
3.  **Body:** The response data (HTML, JSON).

## HTTPS (HTTP Secure)
HTTP is plaintext; anyone intercepting the traffic (e.g., on public Wi-Fi) can read passwords. HTTPS encrypts the traffic using TLS (Transport Layer Security). Runs on port 443.
`,
    fullNotes: `
# HTTP Versions and TLS

## HTTP/1.1 vs HTTP/2 vs HTTP/3
*   **HTTP/1.1:** Introduced persistent connections (keep-alive) to reuse TCP connections. Suffers from Head-of-Line (HoL) blocking at the application layer.
*   **HTTP/2:** Binary protocol. Introduced **Multiplexing** (multiple requests/responses concurrently over a single TCP connection), resolving application-layer HoL blocking. Also introduced Header Compression (HPACK) and Server Push.
*   **HTTP/3:** Replaces TCP entirely with **QUIC** (which runs over UDP). This solves TCP-level HoL blocking and makes connection setup much faster, especially for mobile devices switching networks.

## TLS Handshake (How HTTPS works)
1.  Client and server say "Hello" and agree on cipher suites.
2.  Server sends its Digital Certificate (containing its Public Key).
3.  Client verifies the certificate against trusted Certificate Authorities (CAs).
4.  Client generates a symmetric session key, encrypts it with the server's public key, and sends it.
5.  Server decrypts it with its Private Key. Both now share a symmetric key for fast, encrypted communication.
`,
    shortNotes: `
*   **HTTP:** Stateless, application layer, plaintext (Port 80).
*   **HTTPS:** HTTP over TLS. Encrypted (Port 443).
*   **Request:** Method, Path, Headers, Body.
*   **Response:** Status Code, Headers, Body.
*   **HTTP/1.1:** Keep-alive.
*   **HTTP/2:** Multiplexing over one TCP connection.
*   **HTTP/3:** Uses QUIC (over UDP).
*   **TLS Handshake:** Asymmetric encryption to share a Symmetric key securely.
`,
    cheatSheet: `
| HTTP Method | Idempotent? | Typical Use |
|---|---|---|
| GET | Yes | Read data |
| POST | No | Create new data |
| PUT | Yes | Replace data |
| PATCH | No | Partial update |
| DELETE | Yes | Remove data |
`,
    resources: []
  },

  net_26: {
    title: 'DNS',
    learningContent: `
# Domain Name System (DNS)
DNS is the phonebook of the Internet. Humans access information online through domain names, like \`google.com\`. Web browsers interact through IP addresses. DNS translates domain names to IP addresses so browsers can load internet resources.

## The DNS Resolution Process
If you type \`example.com\` into your browser, the resolution happens in steps:
1.  **Browser Cache:** The browser checks if it already knows the IP.
2.  **OS Cache:** The OS checks its local cache (\`/etc/hosts\` or DNS resolver cache).
3.  **Recursive Resolver (ISP):** The OS queries the resolver (usually provided by your ISP, or 8.8.8.8). If it doesn't have it cached, it does the legwork:
4.  **Root Nameserver:** The resolver asks the Root server for the \`.com\` TLD (Top Level Domain) nameserver.
5.  **TLD Nameserver:** The resolver asks the \`.com\` server for the \`example.com\` Authoritative nameserver.
6.  **Authoritative Nameserver:** The resolver asks the Authoritative server (e.g., AWS Route53) for the A record of \`example.com\`. It returns the IP address.
7.  The resolver caches this IP and returns it to the OS/Browser.
`,
    fullNotes: `
# DNS Records
Authoritative servers hold DNS records. The most common types are:
*   **A Record:** Maps a domain name to an IPv4 address.
*   **AAAA Record:** Maps a domain name to an IPv6 address.
*   **CNAME (Canonical Name):** Maps an alias name to a true/canonical domain name (e.g., \`www.example.com\` -> \`example.com\`). You cannot put a CNAME at the root domain.
*   **MX Record (Mail Exchange):** Directs email to a mail server.
*   **TXT Record:** Allows administrators to insert text. Used heavily for email security (SPF, DKIM) and domain ownership verification.
*   **NS Record (Name Server):** Indicates which DNS server is authoritative for that domain.

## DNS Protocol
DNS typically operates over **UDP Port 53**. It uses UDP for speed (no handshake required), as a DNS query fits in a single small packet. If the response is too large, it can fall back to TCP.
`,
    shortNotes: `
*   **DNS:** Translates domains to IPs.
*   **Resolution:** Browser -> OS -> Recursive Resolver -> Root -> TLD -> Authoritative.
*   **A Record:** Domain -> IPv4.
*   **CNAME:** Alias -> Domain.
*   **Protocol:** UDP Port 53 (mostly).
`,
    cheatSheet: `
| Record Type | Purpose |
|---|---|
| A | IPv4 Address |
| AAAA | IPv6 Address |
| CNAME | Domain Alias |
| MX | Email Server Routing |
| TXT | Verification / Metadata |
`,
    resources: []
  },

  net_27: {
    title: 'Routing',
    learningContent: `
# Routing
Routing is the process of selecting a path for traffic in a network or between or across multiple networks. It is performed by Routers operating at Layer 3 (Network Layer) of the OSI model.

## The Routing Table
Every router maintains a routing table. When a packet arrives, the router extracts the destination IP address, consults its table to find the best matching network prefix, and forwards the packet out the specified interface to the next hop.

## Static vs. Dynamic Routing
*   **Static Routing:** Network administrators manually configure the routing tables. Good for small, stable networks. Does not adapt to link failures.
*   **Dynamic Routing:** Routers run protocols to discover the network topology, communicate with other routers, and automatically update their routing tables.

## Autonomous Systems (AS)
The Internet is a network of networks. An AS is a large network or group of networks that has a unified routing policy (e.g., AT&T, Google, Comcast).
`,
    fullNotes: `
# Dynamic Routing Protocols

Routing protocols are divided into two main categories:

1.  **Interior Gateway Protocols (IGP):** Used for routing *within* an Autonomous System.
    *   **Distance Vector (e.g., RIP):** Routers share their entire routing table with immediate neighbors. Uses hop count as the metric. Slow to converge, prone to routing loops. (Bellman-Ford algorithm).
    *   **Link State (e.g., OSPF, IS-IS):** Every router floods the entire network with information about its direct links. Every router builds a complete map (graph) of the network and runs Dijkstra's Shortest Path algorithm locally to build its routing table. Fast convergence, highly scalable.

2.  **Exterior Gateway Protocols (EGP):** Used for routing *between* different Autonomous Systems.
    *   **BGP (Border Gateway Protocol):** The protocol that makes the Internet work. It is a Path Vector protocol. It doesn't just care about the shortest path; it makes routing decisions based on complex business policies, economics, and rules defined by network administrators.
`,
    shortNotes: `
*   **Routing:** Finding paths for packets.
*   **Router:** Layer 3 device using IP addresses.
*   **IGP:** Routing inside an organization (OSPF). Uses Dijkstra's algorithm.
*   **EGP:** Routing between organizations (BGP). The glue of the internet.
*   **Distance Vector:** Shares routing table with neighbors (RIP).
*   **Link State:** Shares link info with everyone, computes graph locally (OSPF).
`,
    cheatSheet: `
| Protocol | Type | Algorithm | Use Case |
|---|---|---|---|
| RIP | IGP | Distance Vector (Bellman-Ford) | Small old networks |
| OSPF | IGP | Link State (Dijkstra) | Large enterprise networks |
| BGP | EGP | Path Vector | The Internet (between ISPs) |
`,
    resources: []
  },

  net_28: {
    title: 'Network Security Fundamentals',
    learningContent: `
# Network Security Fundamentals
Securing data in transit and protecting network infrastructure.

## Cryptography Basics
1.  **Symmetric Encryption:** The same key is used to encrypt and decrypt (e.g., AES). Extremely fast. Problem: How do you share the key securely?
2.  **Asymmetric (Public Key) Encryption:** Uses a mathematical pair of keys: a Public Key (shared with everyone) and a Private Key (kept secret). Data encrypted with the public key can ONLY be decrypted with the private key. (e.g., RSA, Elliptic Curve). Very slow.
3.  **Hashing:** A one-way mathematical function that converts data of any size into a fixed-size string (e.g., SHA-256). Used for verifying integrity and storing passwords.

## How TLS Uses Them Together
Because Asymmetric encryption is slow and Symmetric is fast, TLS (HTTPS) uses Asymmetric encryption during the handshake to securely exchange a temporary Symmetric key. The rest of the communication is encrypted with the fast Symmetric key.
`,
    fullNotes: `
# Security Concepts & Attacks

## Firewalls
A network security system that monitors and controls incoming and outgoing network traffic.
*   **Stateless Firewall:** Examines packets individually against a set of rules (ACLs). Doesn't know if a packet is part of an existing connection.
*   **Stateful Firewall:** Keeps track of the state of active connections. If an internal machine establishes an outbound TCP connection, the firewall automatically allows the inbound return traffic for that connection.

## Common Network Attacks
*   **DDoS (Distributed Denial of Service):** Flooding a target server with traffic from many compromised computers (botnet) to exhaust its resources (bandwidth or CPU).
*   **Man-in-the-Middle (MitM):** An attacker intercepts communication between two parties. Prevented by TLS and strict Certificate Authority verification.
*   **CSRF (Cross-Site Request Forgery):** Tricking an authenticated user's browser into executing an unwanted action on a trusted site. Prevented by Anti-CSRF tokens.
*   **XSS (Cross-Site Scripting):** Injecting malicious JavaScript into a legitimate website, which is then executed by other users' browsers. Prevented by sanitizing inputs and escaping outputs.
*   **SQL Injection:** Injecting SQL commands into input fields to manipulate the database. Prevented by Parameterized Queries / Prepared Statements.
`,
    shortNotes: `
*   **Symmetric:** Fast, one key.
*   **Asymmetric:** Slow, public/private key pair.
*   **Hashing:** One-way, fixed length (Integrity/Passwords).
*   **Stateful Firewall:** Remembers active connections.
*   **DDoS:** Resource exhaustion via botnet.
*   **MitM:** Intercepting traffic (prevented by TLS).
*   **XSS:** Injecting malicious JS.
*   **SQLi:** Injecting malicious SQL.
`,
    cheatSheet: `
| Attack | Target | Prevention |
|---|---|---|
| DDoS | Server Availability | Rate limiting, Cloudflare, Anycast |
| SQLi | Database | Prepared Statements / ORM |
| XSS | Client Browser | Input sanitization, Content Security Policy |
| CSRF | Authenticated Session | Anti-CSRF tokens, SameSite cookies |
`,
    resources: []
  }
};
