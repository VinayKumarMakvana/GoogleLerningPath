export const do_01_linux = {
  LINUX_FUNDAMENTALS: {
    title: 'Linux & Production Environment',
    description: 'Master the Linux command line, file permissions, processes, and basic networking for production servers.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 120,
    prerequisites: [],
    learningContent: `
# Linux & Production Environment

As a DevOps or Cloud Engineer, Linux is your native environment. Almost all production servers run Linux. You must be completely comfortable navigating the filesystem, managing processes, and manipulating text.

## Core Concepts
1. **The Filesystem Hierarchy Standard (FHS):** Everything starts at the root \`/\`. Common directories: \`/etc\` (configs), \`/var\` (variable data like logs), \`/home\` (user directories), \`/usr\` (installed binaries).
2. **Permissions:** Every file and directory is owned by a User and a Group, and has permissions for User, Group, and Others (Read, Write, Execute).
3. **Processes:** Everything running in Linux is a process. \`systemd\` is the init system that manages most of these background services (daemons).
`,
    fullNotes: `
# Detailed Notes: Linux

- **File Permissions:** Represented as \`rwx\` (Read, Write, Execute). Numerically: R=4, W=2, X=1. E.g., \`chmod 755 file.sh\` gives User read/write/execute (7), Group read/execute (5), and Others read/execute (5).
- **Text Manipulation:** \`grep\` (search text), \`awk\` (pattern scanning/processing), \`sed\` (stream editor) are essential tools for parsing log files.
- **SSH (Secure Shell):** How you connect to remote servers securely using asymmetric cryptography (public/private keys).
- **Package Managers:** \`apt\` (Debian/Ubuntu), \`yum/dnf\` (RedHat/CentOS).
`,
    shortNotes: `
- Root directory is \`/\`.
- Permissions: \`chmod\`, \`chown\`. (777 is bad, 644/755 is standard).
- SSH keys (\`~/.ssh/id_rsa.pub\`) are much more secure than passwords.
- Use \`systemctl\` to manage services (start, stop, restart, enable).
- Learn \`grep\`, \`awk\`, \`sed\`, \`tail -f\` for logs.
`,
    cheatSheet: `
\`\`\`bash
# Files and Directories
ls -la        # List all files with details
chmod +x script.sh # Make script executable
chown user:group file.txt

# Process Management
top / htop    # View running processes
kill -9 <PID> # Force kill a process
systemctl restart nginx # Restart a service
journalctl -u nginx # View service logs

# Networking
curl -I https://example.com # Fetch HTTP headers
netstat -tulpn # Show listening ports
\`\`\`
`,
    interviewQuestions: [
      { question: 'What does the command `chmod 644 file.txt` do?', answerHint: 'It sets the file permissions to Read/Write for the owner (6), Read-only for the group (4), and Read-only for others (4).', type: 'TECHNICAL' },
      { question: 'What is the difference between a hard link and a symbolic (soft) link?', answerHint: 'A hard link points directly to the underlying inode of the file (cannot span filesystems). A symbolic link points to the filename/path (can span filesystems, breaks if original is moved).', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'The Linux Command Line (Book)', url: 'http://linuxcommand.org/tlcl.php', type: 'BOOK', priority: 'S', source: 'LinuxCommand.org', isOfficial: true },
      { title: 'Linux Crash Course for Beginners', url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', type: 'VIDEO', priority: 'A', source: 'NetworkChuck', isOfficial: false }
    ]
  }
};
