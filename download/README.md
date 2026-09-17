# LedgerLearn — Downloads

## Deployment guides

| Guide | When to use | Cost | Time |
|---|---|---|---|
| **[VERCEL-DEPLOYMENT-GUIDE.md](./VERCEL-DEPLOYMENT-GUIDE.md)** ⭐ | Simplest path. Vercel + Neon Postgres + Firebase Auth. Auto-deploy from GitHub. | $0/month | 20–30 min |
| **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** | Firebase App Hosting + Neon Postgres + Firebase Auth. Pick this if you're already in the Google Cloud ecosystem. | $0/month | 30–45 min |

Both guides use the same Neon database + same Firebase Auth setup — only the host changes.

## Preview screenshots

- `dashboard-preview.png` — Dashboard view with stats, charts, recent activity
- `practice-preview.png` — Interactive Practice Lab with live T-accounts
- `quiz-preview.png` — Quiz view with MCQ options

## Quick decision matrix

| Your situation | Pick |
|---|---|
| I want the fastest deploy | **Vercel** |
| I want auto-deploy from every Git push | **Vercel** (built-in) |
| I'm already using Google Cloud / Firebase | **Firebase App Hosting** |
| I want one bill from one vendor | **Firebase App Hosting** |
| I want zero cold starts | **Vercel** (always warm on Hobby) |
| I want native Next.js feature parity | **Vercel** (Vercel = Next.js company) |
| I want enterprise-grade scaling | Either (both scale to millions) |
| I'm a university student/hobbyist | **Vercel** (simpler) |

## Common setup (both paths)

Regardless of which host you pick, you'll need:

1. **Neon Postgres** — free tier, Singapore region → `DATABASE_URL`
2. **Firebase project** with Google sign-in enabled → 6 public env vars + 3 server secrets
3. **Prisma schema swap** — `provider = "sqlite"` → `provider = "postgresql"`

After that, follow the specific guide for your chosen host.

---

**Built for accounting students in Malaysian universities.**
**Selamat belajar! Happy learning!**
