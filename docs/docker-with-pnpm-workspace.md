# Docker + pnpm Workspaces: Complete Guide

This document explains how to properly use **Docker** with a **pnpm workspace** monorepo.  
It covers why mirroring your workspace inside Docker is important, the Prisma issue we solved, how `.dockerignore` works, and a complete Dockerfile example.

---

## 🛠️ Why Mirroring the Workspace Matters

In a pnpm monorepo, the root usually contains:

- `pnpm-workspace.yaml`
- Root `package.json`
- `pnpm-lock.yaml`
- App folders like `/server`, `/client`

Inside Docker, you must **mirror this structure**. Mirroring is the word here.  

### Example
```dockerfile
WORKDIR /src

# Copy root files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy project-specific files
COPY server/package.json ./server/
```
Notice how we kinda mirror like our local workspace? the root is in the /src and everything else in the /server
