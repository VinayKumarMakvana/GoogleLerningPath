export const eng_09_linux = {
  LINUX_RUNTIME_INTERNALS: {
    title: 'Linux & Runtime Internals',
    description: 'Understand how the OS actually executes your code: Processes, Threads, Memory Virtualization, and File Descriptors.',
    difficulty: 'EXPERT',
    estimatedLearnTime: 60,
    prerequisites: ['Performance Engineering'],
    learningContent: `
# Linux & Runtime Internals

Your code does not run in a vacuum; it runs on an Operating System. Understanding Linux internals explains why certain bugs exist and how containers (Docker) actually work.

## 1. Processes vs Threads
- **Process:** An isolated execution environment. It has its own memory space, its own Process ID (PID), and cannot directly read the memory of another process. If a process crashes (segfault), it doesn't crash the OS.
- **Thread:** The unit of execution *within* a process. Multiple threads inside the same process **share the exact same memory space**. This is why thread concurrency requires Mutexes (to prevent race conditions on shared memory). If one thread crashes due to an unhandled exception, the entire Process dies.

## 2. Virtual Memory & Paging
When your Python app allocates a list, it thinks it is writing to RAM address \`0x123\`. It isn't.
- The OS gives every Process the illusion that it owns all the RAM in the computer via **Virtual Memory**.
- The CPU's MMU (Memory Management Unit) translates the fake Virtual Address into a real Physical Address in RAM dynamically.
- **Swapping:** If the OS runs out of physical RAM, it takes chunks of memory (Pages) belonging to idle processes and writes them to the Hard Drive (Swap space). If the process wakes up, the OS reads it back from Disk. (This causes massive latency spikes).

## 3. File Descriptors (Everything is a file)
In Linux, almost everything is treated as a file: text files, network sockets, keyboards, USB drives.
When your app opens a network connection to Postgres, the OS gives your app an integer called a **File Descriptor (FD)**. 
- *The "Too many open files" error:* Linux imposes a limit on how many FDs a process can hold open concurrently (usually 1024 by default). If you have a memory leak that opens DB connections and never closes them, you will hit this limit, and your server will completely refuse to accept any new HTTP requests (because an incoming HTTP connection requires an FD).
`,
    fullNotes: `
# Detailed Notes: Linux Internals

- **User Space vs Kernel Space:** User Space is the restricted sandbox where your application code runs. It cannot directly touch hardware (Disk, Network card). To read a file, your app must execute a **System Call (syscall)**. This triggers a context switch, pausing your app, handing control to the Kernel Space (the core OS), which reads the disk securely, and hands the data back to User Space. Syscalls are expensive.
- **Namespaces and cgroups (How Docker works):** 
  - *Namespaces* trick a process into thinking it is the only process on the machine, giving it a fake isolated filesystem and network stack.
  - *cgroups (Control Groups)* limit how much CPU and RAM a process can use. 
  - A Docker container is simply a standard Linux process wrapped in Namespaces and cgroups. It is not a Virtual Machine.
`,
    shortNotes: `
- Process: Isolated memory space. Heavyweight.
- Thread: Shares memory space with other threads in the process. Lightweight.
- Virtual Memory: The OS lies to processes, giving them fake memory addresses mapped to real RAM.
- File Descriptors (FD): Pointers to open files or network sockets.
- The "Too many open files" error happens when you leak network connections.
- Syscalls: How a User Space app asks the Kernel to touch hardware (read disk/network).
- Docker containers are just Linux Processes using Namespaces (isolation) and cgroups (resource limits).
`,
    cheatSheet: `
### Common Linux Limits
- \`ulimit -n\`: Shows the max File Descriptors your process can open.
- \`OOM Killer\`: The Linux Out Of Memory Killer. If RAM is completely exhausted, the OS will violently kill the process using the most memory to save the system from crashing.
`,
    interviewQuestions: [
      { question: 'What is a File Descriptor, and what does the error "Too many open files" indicate in a backend server?', answerHint: 'In Linux, everything is treated as a file, including network connections (sockets). A file descriptor is an integer reference to an open file/socket. The OS imposes a strict limit on how many FDs a process can have open simultaneously. If a backend server throws this error, it almost always indicates a connection leak (e.g., opening database connections or HTTP requests but failing to close them), causing the process to hit the FD limit and become incapable of accepting new network traffic.', type: 'TECHNICAL' },
      { question: 'At a high level, what is the difference between a Virtual Machine and a Docker Container?', answerHint: 'A Virtual Machine requires a Hypervisor and boots a completely separate, full Guest Operating System (Kernel + User Space) on top of the Host OS, making it heavy and slow to start. A Docker container does not have its own OS kernel; it shares the Host Linux Kernel. It is simply a standard Linux process that has been isolated using kernel features like Namespaces (for filesystem/network isolation) and cgroups (for CPU/RAM limitation).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'BOOK', priority: 'S', source: 'Remzi H. Arpaci-Dusseau', isOfficial: true }
    ]
  }
};
