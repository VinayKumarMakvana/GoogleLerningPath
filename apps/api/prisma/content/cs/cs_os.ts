import { TopicContent } from '../types';

export const cs_os: Record<string, TopicContent> = {
  os_1: {
    title: 'Operating Systems',
    learningContent: `
# Operating Systems Basics
An Operating System (OS) is software that manages computer hardware and software resources, providing common services for computer programs. It acts as an intermediary between the user and the computer hardware.

## Core Functions of an OS
1. **Process Management:** Allocating CPU time, creating and terminating processes.
2. **Memory Management:** Keeping track of RAM, allocating/deallocating memory.
3. **Storage Management:** File systems, disk scheduling.
4. **I/O Management:** Handling drivers and device interactions.
5. **Security & Protection:** Ensuring processes cannot interfere with each other or access unauthorized data.

## Types of Operating Systems
*   **Batch OS:** Jobs with similar needs are batched together.
*   **Time-Sharing OS:** Allows multiple users to share resources simultaneously (Multitasking).
*   **Distributed OS:** Manages a group of independent computers and makes them appear to be a single computer.
*   **Real-Time OS (RTOS):** Strict time constraints for processing data as it comes in.

## Kernel vs. User Space
*   **Kernel Space:** Where the core of the OS runs. Has unrestricted access to all hardware.
*   **User Space:** Where user applications run. Must use System Calls to request hardware access from the kernel.

## System Calls
System calls provide the interface between a process and the OS. When a user program needs to read a file, it executes a system call (like \`read()\`), transitioning from user mode to kernel mode.
`,
    fullNotes: `
# Operating Systems - Detailed Notes

## Architecture
Modern OS architecture is typically divided into user space and kernel space to protect the system from rogue applications.
- **Monolithic Kernel:** All OS services run in kernel space (Linux). Fast but large and prone to crashes if a driver fails.
- **Microkernel:** Only essential services (IPC, basic scheduling, memory management) run in kernel space. Other services (file system, networking) run in user space. Slower due to IPC overhead but more stable (Mach, QNX).

## Interrupts
An interrupt is a signal to the processor emitted by hardware or software indicating an event that needs immediate attention.
- **Hardware Interrupt:** e.g., A key is pressed, or a disk read finishes.
- **Software Interrupt (Trap):** e.g., Division by zero, or a system call instruction.

## Interview Relevance
*   **Q:** What is the difference between a Monolithic kernel and a Microkernel?
    *   **A:** Monolithic puts everything in kernel space for speed. Microkernel puts only the bare minimum in kernel space for stability.
*   **Q:** Explain User Mode vs Kernel Mode.
    *   **A:** Dual-mode operation prevents user programs from directly accessing hardware or critical OS structures. A system call triggers a mode switch via a trap.
`,
    shortNotes: `
*   **OS:** Manager of hardware and software resources.
*   **Functions:** Process, Memory, Storage, I/O, Security.
*   **Kernel Mode:** Privileged, full access.
*   **User Mode:** Restricted, uses system calls.
*   **System Call:** Interface between user program and OS.
*   **Interrupt:** Signal demanding immediate CPU attention.
`,
    cheatSheet: `
| Concept | Description |
|---|---|
| OS | Intermediary between hardware and user |
| Kernel | Core component, always resident in memory |
| User Space | Where applications run |
| System Call | API for OS services (e.g., \`open\`, \`read\`, \`fork\`) |
| Interrupt | Hardware/software signal halting normal execution |
`,
    resources: [
      {
        title: 'Operating System Concepts (Silberschatz)',
        type: 'BOOK',
        priority: 'S',
        description: 'The definitive textbook for OS fundamentals.',
        status: 'PUBLISHED'
      },
      {
        title: 'OSTEP: Operating Systems: Three Easy Pieces',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        type: 'ARTICLE',
        priority: 'A',
        description: 'Free, highly recommended OS textbook.',
        status: 'PUBLISHED'
      }
    ]
  },

  os_2: {
    title: 'Processes & Threads',
    learningContent: `
# Processes and Threads

## What is a Process?
A process is a program in execution. It is the unit of work in a modern time-sharing system.
A process consists of:
*   **Code Segment (Text):** The executable instructions.
*   **Data Segment:** Global and static variables.
*   **Heap:** Dynamically allocated memory at runtime.
*   **Stack:** Temporary data (function parameters, return addresses, local variables).
*   **Process Control Block (PCB):** Data structure the OS uses to manage the process (PID, state, registers, PC).

## What is a Thread?
A thread is the basic unit of CPU utilization. It is a "lightweight process".
*   Threads within the same process share the **Code, Data, and Heap** segments, and OS resources (open files).
*   Each thread has its own **Thread Control Block (TCB)**, **Program Counter (PC)**, **Registers**, and **Stack**.

## Process vs. Thread
*   **Creation:** Creating a process is heavy (requires allocating memory for all segments). Creating a thread is light.
*   **Context Switching:** Switching between processes is expensive (flushing cache/TLB). Switching between threads in the same process is fast.
*   **Isolation:** If a process crashes, it doesn't affect others. If a thread crashes (e.g., segfault), it brings down the entire process.
*   **Communication:** Inter-Process Communication (IPC) is complex (pipes, sockets, shared memory). Inter-Thread Communication is trivial (they share memory).
`,
    fullNotes: `
# Processes and Threads - Detailed

## Process States
1.  **New:** Being created.
2.  **Ready:** Waiting to be assigned to a processor.
3.  **Running:** Instructions are being executed.
4.  **Waiting (Blocked):** Waiting for some event (I/O completion).
5.  **Terminated:** Finished execution.

## Context Switching
The process of saving the state of the old process (or thread) and loading the saved state for the new process. This is pure overhead (no useful work is done during the switch).
For processes, this involves updating the PCB, saving registers, and changing memory maps (flushing the TLB).
For threads, the memory map remains the same, making the switch faster.

## Multi-threading Models
*   **Many-to-One:** Many user-level threads mapped to one kernel thread (No true concurrency).
*   **One-to-One:** Each user-level thread maps to a kernel thread (True concurrency, expensive).
*   **Many-to-Many:** Multiplexes many user-level threads to a smaller or equal number of kernel threads.
`,
    shortNotes: `
*   **Process:** Program in execution. Heavyweight. Has its own memory space.
*   **Thread:** Unit of execution within a process. Lightweight.
*   **Shared by Threads:** Code, Data, Heap, Files.
*   **Unique to Threads:** Stack, Registers, PC.
*   **Context Switch:** Saving/loading state. Process switch is slow; thread switch is fast.
*   **States:** New -> Ready -> Running -> Waiting -> Terminated.
`,
    cheatSheet: `
| Feature | Process | Thread |
|---|---|---|
| Memory | Isolated | Shared (Code, Data, Heap) |
| Creation Overhead | High | Low |
| Context Switch | Slow (Flush TLB) | Fast |
| Reliability | Highly isolated | One crash kills all |
| Communication | IPC (Pipes, Sockets) | Direct memory access |
`,
    resources: [
      {
        title: 'GeeksforGeeks: Difference between Process and Thread',
        url: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/',
        type: 'ARTICLE',
        priority: 'A',
        status: 'PUBLISHED'
      }
    ]
  },

  os_3: {
    title: 'CPU Scheduling',
    learningContent: `
# CPU Scheduling
In a multiprogramming system, multiple processes reside in memory. When one process has to wait (e.g., for I/O), the OS takes the CPU away and gives it to another process.

## Schedulers
1.  **Long-term Scheduler (Job Scheduler):** Selects processes from the pool and loads them into memory for execution (Controls degree of multiprogramming).
2.  **Short-term Scheduler (CPU Scheduler):** Selects from among the processes that are ready to execute and allocates the CPU to one of them. (Runs very frequently).
3.  **Medium-term Scheduler:** Swaps processes out of memory to disk to reduce the degree of multiprogramming.

## Preemptive vs. Non-Preemptive
*   **Non-Preemptive:** Once a process gets the CPU, it keeps it until it terminates or switches to a waiting state.
*   **Preemptive:** The OS can interrupt a running process and give the CPU to another process (used in modern OS like Windows, Linux, macOS).

## Common Scheduling Algorithms
1.  **First-Come, First-Served (FCFS):** Simple FIFO queue. Non-preemptive. Can cause the "Convoy Effect" (short processes waiting for a long one).
2.  **Shortest Job First (SJF):** Chooses the process with the smallest next CPU burst. Optimal for average waiting time, but cannot be implemented practically (we can't predict the future).
3.  **Round Robin (RR):** Each process gets a small unit of CPU time (time quantum). Preemptive. Excellent for time-sharing systems.
4.  **Priority Scheduling:** Processes are assigned a priority. Highest priority runs first. Can suffer from starvation (solved by aging).
5.  **Multi-level Feedback Queue:** Processes can move between various priority queues based on their behavior (CPU-bound vs I/O-bound).
`,
    fullNotes: `
# CPU Scheduling Criteria
To compare algorithms, we use these metrics:
*   **CPU Utilization:** Keep the CPU as busy as possible (0-100%).
*   **Throughput:** Number of processes completed per time unit.
*   **Turnaround Time:** Time from submission to completion.
*   **Waiting Time:** Time spent waiting in the ready queue.
*   **Response Time:** Time from submission until the first response is produced (crucial for interactive systems).

## The Convoy Effect
Occurs in FCFS when one CPU-bound process holds the CPU, causing many I/O-bound processes to wait in the ready queue. This leads to low CPU and I/O device utilization.

## Starvation and Aging
*   **Starvation:** A low-priority process never gets the CPU because higher-priority processes keep arriving.
*   **Aging:** A solution to starvation where the OS gradually increases the priority of processes that wait in the system for a long time.
`,
    shortNotes: `
*   **Short-term Scheduler:** Picks next ready process for CPU.
*   **Preemptive:** OS can forcibly take CPU away.
*   **FCFS:** First in, first out. Suffers from Convoy Effect.
*   **SJF:** Shortest job next. Optimal average wait time, but impractical.
*   **Round Robin:** Time slicing. Good response time.
*   **Priority:** Highest priority runs. Can cause Starvation.
*   **Aging:** Solves starvation by boosting priority over time.
`,
    cheatSheet: `
| Algorithm | Preemptive? | Pros | Cons |
|---|---|---|---|
| FCFS | No | Simple | Convoy effect, high avg wait time |
| SJF | Both | Optimal wait time | Requires predicting burst time |
| Round Robin | Yes | Fair, good response time | Overhead if quantum is too small |
| Priority | Both | Important tasks run first | Starvation |
`,
    resources: [
      {
        title: 'OSTEP: Scheduling Introduction',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf',
        type: 'ARTICLE',
        priority: 'S',
        status: 'PUBLISHED'
      }
    ]
  },

  os_4: {
    title: 'Synchronization & Concurrency',
    learningContent: `
# Synchronization & Concurrency
When multiple threads or processes execute concurrently and share resources, their execution order becomes unpredictable, leading to race conditions.

## The Critical Section Problem
A Critical Section is a segment of code where a process modifies shared variables, tables, or files. The OS must ensure that when one process is in its critical section, no other process can enter its critical section.

Requirements for a valid solution:
1.  **Mutual Exclusion:** Only one process can be inside the critical section at a time.
2.  **Progress:** If no process is in the critical section, one of the waiting processes must be allowed to enter.
3.  **Bounded Waiting:** There must be a limit on how many times other processes can enter before a waiting process is allowed in.

## Mutexes (Mutual Exclusion Locks)
A boolean variable used to protect a critical section. A process must \`acquire()\` the lock before entering and \`release()\` it after exiting.
*   Typically implemented using hardware instructions like Test-and-Set or Compare-and-Swap.
*   If a process fails to get the lock, it may spin (Spinlock) or go to sleep (Blocking lock).

## Semaphores
An integer variable used to control access to a common resource by multiple processes.
*   **wait() / P():** Decrements the semaphore. If the value becomes negative, the process blocks.
*   **signal() / V():** Increments the semaphore. Wakes up a blocked process if the value is <= 0.
*   **Binary Semaphore:** Value is 0 or 1 (similar to a Mutex).
*   **Counting Semaphore:** Unrestricted domain, used for managing a pool of identical resources.
`,
    fullNotes: `
# Advanced Synchronization

## Spinlocks vs. Blocking Mutexes
*   **Spinlock:** The waiting thread continuously loops, checking if the lock is available. Wastes CPU cycles but avoids context switch overhead. Good if the lock will be held for a very short time on a multi-core system.
*   **Blocking Mutex:** The waiting thread is put to sleep and added to a wait queue. Saves CPU cycles but incurs context switch overhead. Good for locks held for longer periods.

## Monitors
A high-level synchronization construct provided by programming languages (like Java's \`synchronized\` keyword). A monitor encapsulates shared variables, the procedures that operate on them, and synchronization within a single construct. Only one thread can be active inside a monitor at a time.

## Condition Variables
Used in conjunction with Mutexes or Monitors. They allow a thread to sleep (wait) until a specific condition becomes true.
Operations: \`wait(cond, mutex)\`, \`signal(cond)\`, \`broadcast(cond)\`.
`,
    shortNotes: `
*   **Race Condition:** Output depends on unpredictable thread execution timing.
*   **Critical Section:** Code modifying shared data.
*   **Mutex:** Lock protecting a critical section (ownership).
*   **Semaphore:** Counter for resource management (signaling).
*   **Spinlock:** Busy-waiting lock. Avoids context switch, wastes CPU.
*   **Condition Variable:** Lets threads wait for a specific state change.
`,
    cheatSheet: `
| Tool | Description | Best For |
|---|---|---|
| Mutex | Binary lock with ownership concept | Exclusive access to shared data |
| Semaphore | Counter, no ownership | Signaling, managing N resources |
| Spinlock | Busy-waits until lock is free | Very short critical sections |
| Monitor | Language-level encapsulation | Simplified OOP synchronization |
`,
    resources: [
      {
        title: 'Mutex vs Semaphore',
        url: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/',
        type: 'ARTICLE',
        priority: 'A',
        status: 'PUBLISHED'
      }
    ]
  },

  os_5: {
    title: 'Deadlocks',
    learningContent: `
# Deadlocks
A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

## The Coffman Conditions (Four Necessary Conditions)
For a deadlock to occur, ALL four of these conditions must hold simultaneously:
1.  **Mutual Exclusion:** At least one resource must be held in a non-sharable mode.
2.  **Hold and Wait:** A process holding at least one resource is waiting to acquire additional resources held by other processes.
3.  **No Preemption:** Resources cannot be forcibly taken from a process; they must be released voluntarily.
4.  **Circular Wait:** A set of processes {P0, P1, ..., Pn} exists such that P0 is waiting for a resource held by P1, P1 waiting for P2, ..., Pn waiting for P0.

## Deadlock Handling Strategies
1.  **Deadlock Ignorance (Ostrich Algorithm):** Ignore the problem and assume it never occurs. (Most common approach in Windows/Linux!).
2.  **Deadlock Prevention:** Ensure at least one of the four necessary conditions cannot occur.
3.  **Deadlock Avoidance:** The OS dynamically checks resource requests to ensure the system never enters an unsafe state (e.g., Banker's Algorithm).
4.  **Deadlock Detection and Recovery:** Let deadlocks happen, run an algorithm to detect them, and then recover (e.g., kill a process or preempt a resource).
`,
    fullNotes: `
# Deep Dive: Deadlock Avoidance

## Banker's Algorithm
Used in banking systems to ensure that allocating cash to a customer does not leave the bank unable to satisfy the needs of all customers.
The OS needs to know in advance the maximum number of resources of each type that every process may request.
When a process requests a resource, the OS simulates the allocation. If the resulting state is "Safe", it grants the request. If "Unsafe", the process must wait.
*   **Safe State:** There exists a sequence of processes such that every process can finish.

## Deadlock Prevention Techniques
*   **Eliminate Mutual Exclusion:** Impossible for resources like printers.
*   **Eliminate Hold and Wait:** Require processes to request all resources at once before execution. (Inefficient).
*   **Eliminate No Preemption:** If a process asks for a resource it can't get, forcefully take away its current resources and restart it.
*   **Eliminate Circular Wait:** Impose a total ordering of all resource types, and require processes to request resources in increasing order of enumeration. (Very practical and widely used in software engineering).
`,
    shortNotes: `
*   **Deadlock:** Cyclic waiting where no process can proceed.
*   **4 Conditions:** Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
*   **Ostrich Algorithm:** Ignore deadlocks (used by standard OS).
*   **Prevention:** Break one of the 4 conditions (e.g., lock ordering breaks Circular Wait).
*   **Avoidance:** Banker's Algorithm (simulate allocations to ensure safe state).
`,
    cheatSheet: `
| Condition | How to break it (Prevention) |
|---|---|
| Mutual Exclusion | Spooling (e.g., print spooler) |
| Hold and Wait | Request all resources upfront |
| No Preemption | Forcibly revoke resources |
| Circular Wait | Enforce strict lock ordering |
`,
    resources: [
      {
        title: 'OSTEP: Concurrency Bugs',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf',
        type: 'ARTICLE',
        priority: 'S',
        status: 'PUBLISHED'
      }
    ]
  },

  os_6: {
    title: 'Virtual Memory',
    learningContent: `
# Virtual Memory
Virtual memory is a technique that gives an application the illusion that it has contiguous working memory, while in reality it may be physically fragmented or even overflow onto disk storage.

## Why Virtual Memory?
1.  **Isolation:** Processes cannot access each other's physical memory directly.
2.  **Size:** Programs can be larger than physical RAM (using Swap/Pagefile).
3.  **Relocation:** The OS can load a program anywhere in physical memory.

## Paging
The most common implementation of virtual memory.
*   **Logical Memory** is divided into fixed-size blocks called **Pages**.
*   **Physical Memory** is divided into fixed-size blocks called **Frames**.
*   Page size = Frame size (typically 4KB).

When a process runs, its Pages are loaded into available physical Frames. The mapping from Virtual Address to Physical Address is maintained in a **Page Table**.

## Page Faults
When the CPU tries to access a virtual address whose corresponding page is NOT currently in physical RAM, a Page Fault occurs.
1.  OS traps the error.
2.  OS finds a free physical frame (or evicts an old one using Page Replacement Algorithms).
3.  OS reads the required page from disk (Swap) into the frame.
4.  OS updates the Page Table.
5.  CPU restarts the instruction.
`,
    fullNotes: `
# Virtual Memory - Advanced

## TLB (Translation Lookaside Buffer)
Because the Page Table is stored in RAM, translating a virtual address requires a memory access, doubling the time of every instruction!
The TLB is a small, ultra-fast hardware cache inside the CPU (MMU) that stores recent Virtual-to-Physical page mappings.
*   **TLB Hit:** Physical address found immediately.
*   **TLB Miss:** Must walk the Page Table in RAM, then load it into the TLB.

## Thrashing
If a system does not have enough physical RAM for the active working sets of all running processes, the OS spends all its time swapping pages in and out of disk rather than executing instructions. The system grinds to a halt.

## Page Replacement Algorithms
When RAM is full, which page do we evict to disk?
1.  **FIFO:** First in, first out. Suffers from Belady's Anomaly (giving it more frames can cause *more* page faults).
2.  **Optimal:** Evict the page that will not be used for the longest time in the future (Theoretical only).
3.  **LRU (Least Recently Used):** Evict the page that hasn't been used for the longest time. Excellent performance, but expensive to implement perfectly.
4.  **Clock Algorithm (Second Chance):** An approximation of LRU using a reference bit.
`,
    shortNotes: `
*   **Virtual Memory:** Illusion of large, contiguous, isolated memory.
*   **Pages:** Chunks of logical memory.
*   **Frames:** Chunks of physical memory (RAM).
*   **Page Table:** Maps virtual pages to physical frames.
*   **Page Fault:** Occurs when requested page is on disk, not in RAM.
*   **TLB:** Hardware cache for the Page Table to speed up translation.
*   **Thrashing:** System spends more time paging than computing due to low RAM.
`,
    cheatSheet: `
| Term | Definition |
|---|---|
| MMU | Memory Management Unit (hardware doing translation) |
| TLB | Translation Lookaside Buffer (cache for MMU) |
| Swap | Area on hard drive used as extension of RAM |
| LRU | Least Recently Used (common page eviction policy) |
`,
    resources: [
      {
        title: 'OSTEP: Paging Introduction',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf',
        type: 'ARTICLE',
        priority: 'S',
        status: 'PUBLISHED'
      }
    ]
  },
  
  os_7: {
    title: 'Memory Management',
    learningContent: `
# Memory Management
Beyond Paging, the OS and the programming language runtime must manage the heap and track allocations.

## Contiguous Allocation vs. Non-Contiguous
Historically, processes had to be loaded into a single contiguous block of memory. This led to fragmentation. Modern systems use non-contiguous allocation (Paging/Segmentation).

## Fragmentation
*   **External Fragmentation:** Total memory space exists to satisfy a request, but it is not contiguous. (Solved by Paging).
*   **Internal Fragmentation:** Allocated memory is slightly larger than requested memory; the size difference is wasted space. (Occurs in Paging because memory is allocated in fixed 4KB chunks).

## Dynamic Allocation Algorithms (Heap)
When a program calls \`malloc()\`, the allocator searches the free list:
1.  **First-Fit:** Allocate the first hole that is big enough. Fast.
2.  **Best-Fit:** Allocate the smallest hole that is big enough. Leaves tiny, unusable holes.
3.  **Worst-Fit:** Allocate the largest hole. Leaves large holes that can be used later.
`,
    fullNotes: `
# Advanced Memory Allocation

## Segmentation
An alternative/complement to Paging. Logical memory is divided into segments of variable sizes (e.g., Code segment, Data segment, Stack segment).
*   Suffers from External Fragmentation.
*   Many architectures (like x86) historically used Segmentation layered on top of Paging.

## Slab Allocation
Used by the Linux kernel to manage memory for kernel objects (like PCBs or inodes).
Instead of constantly allocating and freeing random sizes, the kernel creates "caches" of pre-allocated objects of the exact size needed. This eliminates internal fragmentation and is extremely fast.

## Buddy System
A memory allocation algorithm that divides memory into partitions to try to satisfy a memory request as suitably as possible. It halves blocks recursively (power of 2) until finding the right size. It makes coalescing (merging) free blocks very fast.
`,
    shortNotes: `
*   **External Fragmentation:** Free memory is scattered in small chunks.
*   **Internal Fragmentation:** Wasted space inside an allocated block (e.g., inside a 4KB page).
*   **Paging:** Solves external fragmentation. Causes internal fragmentation.
*   **Segmentation:** Logical division by segment type. Causes external fragmentation.
*   **First-Fit:** Fastest heap allocation strategy.
`,
    cheatSheet: `
| Allocation | Fragmentation Issue |
|---|---|
| Contiguous | External |
| Paging | Internal |
| Segmentation | External |
`,
    resources: []
  },

  os_8: {
    title: 'File Systems',
    learningContent: `
# File Systems
A File System is the method and data structures that an OS uses to keep track of files on a disk or partition. It organizes data into files and directories.

## File System Components
1.  **File:** A contiguous logical address space storing data.
2.  **Directory:** A special file containing pointers to other files and directories (creating a hierarchical tree).
3.  **Metadata:** Information about the file (size, permissions, timestamps). In Unix/Linux, this is stored in an **inode**.

## Inodes (Index Nodes)
In Unix-like systems, a file's name is just an entry in a directory that maps to an inode number. The inode contains:
*   File type and permissions.
*   Owner and group.
*   Size and timestamps.
*   **Direct Pointers:** Point directly to data blocks on disk.
*   **Indirect Pointers:** Point to blocks containing more pointers (allowing for very large files).
*   *Crucially, the inode does NOT contain the file name!*

## Allocation Methods
How are files stored on the disk?
1.  **Contiguous Allocation:** Each file occupies a set of contiguous blocks. (Fast read, but severe external fragmentation).
2.  **Linked Allocation:** Each file is a linked list of blocks. (No external fragmentation, but very slow random access).
3.  **Indexed Allocation (Inodes):** Brings all pointers into one location (the index block). (Supports direct access, no external fragmentation).
`,
    fullNotes: `
# Advanced File Systems

## Hard Links vs. Soft (Symbolic) Links
*   **Hard Link:** A directory entry that points to the *exact same inode* as another file name. The file's data is only deleted when the reference count drops to 0. You cannot hard link directories (to prevent cycles) or across different file systems.
*   **Soft Link:** A special file whose data is simply the textual path to another file. If the original file is deleted, the soft link becomes broken (dangling). Can link across file systems and to directories.

## Journaling File Systems (ext4, NTFS)
Before writing data to its final location on disk, the OS writes the *intent* to modify the file system into a log (journal). If the system crashes during the write, upon reboot, it reads the journal and finishes or rolls back the transaction. This prevents file system corruption without needing long \`fsck\` scans.
`,
    shortNotes: `
*   **File System:** Manages storage on disk.
*   **Inode:** Unix data structure storing metadata and block pointers (not the file name).
*   **Allocation:** Contiguous (fast, fragments), Linked (no random access), Indexed (inodes, best of both).
*   **Hard Link:** Points directly to the inode. Ref count increases.
*   **Soft Link:** Points to the path name.
*   **Journaling:** Logs changes before committing to prevent corruption on crash.
`,
    cheatSheet: `
| Concept | Details |
|---|---|
| Inode | Metadata and disk block pointers |
| Hard Link | Maps name -> existing inode |
| Soft Link | Maps name -> other path string |
| Journaling | Crash resilience via write-ahead logging |
`,
    resources: []
  },

  os_9: {
    title: 'Linux Fundamentals',
    learningContent: `
# Linux Fundamentals
Linux is a monolithic, Unix-like operating system kernel heavily used in servers, cloud infrastructure, and software development.

## Everything is a File
In Linux, almost everything is treated as a file, meaning you can use standard read/write operations to interact with them.
*   Regular files & Directories.
*   Hardware devices (\`/dev/sda\`).
*   Processes & System info (\`/proc\`).
*   Network sockets.

## Permissions (chmod)
Linux uses a 9-bit permission system.
Read (4), Write (2), Execute (1).
Applied to Owner, Group, and Others.
Example: \`chmod 755 script.sh\`
*   Owner: 7 (4+2+1) = rwx
*   Group: 5 (4+1) = r-x
*   Other: 5 (4+1) = r-x

## Important Directories
*   \`/bin\` & \`/usr/bin\`: Essential user binaries (commands like \`ls\`, \`cat\`).
*   \`/etc\`: System-wide configuration files.
*   \`/home\`: User home directories.
*   \`/var\`: Variable data (logs, databases).
*   \`/tmp\`: Temporary files (cleared on reboot).
`,
    fullNotes: `
# Linux CLI and Process Management

## Standard Streams and Redirection
*   **stdin (0):** Standard input.
*   **stdout (1):** Standard output.
*   **stderr (2):** Standard error.
*   **\>** Redirect stdout to a file (overwrite).
*   **\>\>** Redirect stdout to a file (append).
*   **2>** Redirect stderr.
*   **| (Pipe):** Pass stdout of one command as stdin to the next command.

## Process Management
*   \`ps aux\`: List all running processes.
*   \`top\` or \`htop\`: Real-time interactive process viewer.
*   \`kill <pid>\`: Sends the TERM signal (15) to a process, asking it to terminate gracefully.
*   \`kill -9 <pid>\`: Sends the KILL signal (9), forcing the OS to terminate the process immediately.

## Bash Scripting Basics
A shell script is a text file containing a sequence of commands. It starts with a shebang \`#!/bin/bash\` telling the OS which interpreter to use.
`,
    shortNotes: `
*   **Philosophy:** Everything is a file.
*   **Permissions:** r(4), w(2), x(1). User, Group, Other. (755 = rwx, r-x, r-x).
*   **Streams:** stdin(0), stdout(1), stderr(2).
*   **Piping (|):** Chains commands. Output of A becomes Input of B.
*   **kill:** Sends signals to processes. -15 (TERM) is graceful, -9 (KILL) is forceful.
`,
    cheatSheet: `
| Command | Action |
|---|---|
| \`ls -la\` | List all files with details |
| \`grep\` | Search text using regex |
| \`chmod\` | Change permissions |
| \`chown\` | Change ownership |
| \`ps aux\` | List processes |
`,
    resources: []
  },

  os_10: {
    title: 'Computer Architecture',
    learningContent: `
# Computer Architecture Fundamentals
Computer Architecture describes the functionality, organization, and implementation of computer systems. 

## Von Neumann Architecture
The foundation of modern computers. It consists of:
1.  **CPU (Central Processing Unit):** Contains the ALU and Control Unit.
2.  **Memory:** Stores both data AND the program instructions (Stored-Program Concept).
3.  **I/O Devices.**
4.  **Buses:** Pathways connecting these components (Data Bus, Address Bus, Control Bus).

Because data and instructions share the same bus, the CPU can only fetch one or the other at a time. This is known as the **Von Neumann Bottleneck**.

## The CPU Instruction Cycle
1.  **Fetch:** Retrieve the next instruction from memory (using the Program Counter).
2.  **Decode:** Determine what the instruction means.
3.  **Execute:** The ALU performs the operation.
4.  **Writeback:** Store the result in a register or memory.

## Pipelining
To speed up execution, modern CPUs overlap the instruction cycle. While instruction 1 is executing, instruction 2 is being decoded, and instruction 3 is being fetched.
*   **Hazards:** Situations that prevent the next instruction from executing (Data hazard, Control/Branch hazard).
`,
    fullNotes: `
# Instruction Set Architecture (ISA)
The ISA is the interface between hardware and software. It defines the machine code instructions the CPU can understand.

## CISC vs. RISC
*   **CISC (Complex Instruction Set Computer):** e.g., x86. Large number of complex instructions. One instruction can perform multiple operations (like memory-to-memory copy). Variable instruction length. Emphasizes reducing code size.
*   **RISC (Reduced Instruction Set Computer):** e.g., ARM, MIPS. Small number of highly optimized, simple instructions. Fixed instruction length. Emphasizes executing instructions in exactly one clock cycle. Relies on Load/Store architecture (only specific instructions access memory; others only use registers).

## Branch Prediction
When a pipeline encounters an \`if\` statement, it doesn't know which path to fetch next. CPUs use hardware branch predictors to guess the path. If it guesses wrong, the pipeline must be flushed (huge performance penalty).
`,
    shortNotes: `
*   **Von Neumann:** Data and instructions share memory/bus. Causes bottleneck.
*   **CPU Cycle:** Fetch -> Decode -> Execute -> Writeback.
*   **Pipelining:** Overlapping instruction execution for speed.
*   **RISC:** Simple, fixed-length instructions, Load/Store (ARM).
*   **CISC:** Complex, variable-length instructions (x86).
*   **Branch Prediction:** CPU guesses \`if/else\` outcomes to keep pipeline full.
`,
    cheatSheet: `
| Concept | Description |
|---|---|
| ALU | Arithmetic Logic Unit (does the math) |
| PC | Program Counter (holds address of next instruction) |
| RISC | ARM / Apple Silicon |
| CISC | Intel / AMD x86 |
`,
    resources: []
  },

  os_11: {
    title: 'CPU, Cache & Memory Hierarchy',
    learningContent: `
# The Memory Hierarchy
CPUs are incredibly fast, but RAM is relatively slow. To prevent the CPU from constantly waiting for data (stalling), computer systems use a memory hierarchy based on cost and speed.

## The Hierarchy (Fastest/Smallest to Slowest/Largest)
1.  **CPU Registers:** Inside the CPU core. Instant access.
2.  **L1 Cache:** Inside the CPU core. Dedicated to Data or Instructions. (Small, ~64KB).
3.  **L2 Cache:** Usually dedicated per core. (Medium, ~512KB).
4.  **L3 Cache:** Shared across all cores on the CPU chip. (Large, ~10s of MB).
5.  **Main Memory (RAM):** Outside the CPU. Takes hundreds of cycles to access.
6.  **Secondary Storage (SSD/HDD):** Persistent, extremely slow compared to CPU.

## Locality of Reference
Why do caches work? Because programs tend to exhibit two types of locality:
1.  **Temporal Locality:** If a memory location is accessed, it is highly likely to be accessed again soon (e.g., a loop variable).
2.  **Spatial Locality:** If a memory location is accessed, nearby memory locations are highly likely to be accessed soon (e.g., iterating through an array).
`,
    fullNotes: `
# Cache Internals and Concurrency

## Cache Lines (Blocks)
Data is moved between RAM and Cache not byte-by-byte, but in chunks called Cache Lines (typically 64 bytes). When you read an integer from memory, the CPU pulls the entire 64-byte block containing that integer into the cache. (This is why iterating arrays is faster than linked lists—spatial locality!).

## Cache Coherence (MESI Protocol)
In multi-core systems, each core has its own L1/L2 cache. If Core 1 modifies variable X, and Core 2 also has X in its cache, Core 2's cache is now invalid.
Hardware uses protocols like MESI (Modified, Exclusive, Shared, Invalid) to snoop the bus and ensure all cores see a consistent view of memory.

## False Sharing
A performance issue in multithreaded programming. If Thread A and Thread B are modifying *different* variables, but those variables happen to reside on the *same 64-byte cache line*, the cache coherence protocol will constantly invalidate the cache line across cores, causing massive performance degradation, even though there is no logical race condition.
`,
    shortNotes: `
*   **Hierarchy:** Registers > L1 > L2 > L3 > RAM > Disk.
*   **Temporal Locality:** Accessing the same data repeatedly.
*   **Spatial Locality:** Accessing adjacent data in memory (Arrays).
*   **Cache Line:** Data moves in 64-byte blocks.
*   **Cache Coherence:** Hardware protocols keeping multi-core caches synced.
*   **False Sharing:** Independent multithreaded variables on the same cache line causing sync overhead.
`,
    cheatSheet: `
| Level | Access Time | Size |
|---|---|---|
| L1 Cache | ~1 ns | 64 KB |
| L2 Cache | ~4 ns | 256 KB |
| L3 Cache | ~15 ns | 30 MB |
| Main Memory | ~100 ns | 16 GB |
`,
    resources: []
  }
};
