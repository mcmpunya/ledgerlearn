#!/usr/bin/env bash
# ============================================================
# LedgerLearn — One-shot Firebase deployment script
# ============================================================
# Prerequisites:
#   1. Firebase CLI installed:  npm i -g firebase-tools
#   2. Logged in:               firebase login
#   3. Project selected:        firebase use --add <your-project-id>
#   4. Secrets set:
#        firebase apphosting:secrets:set DATABASE_URL
#        firebase apphosting:secrets:set FIREBASE_PROJECT_ID
#        firebase apphosting:secrets:set FIREBASE_CLIENT_EMAIL
#        firebase apphosting:secrets:set FIREBASE_PRIVATE_KEY
#   5. Public env vars in apphosting.yaml filled in with real values
#   6. prisma/schema.prisma: provider = "postgresql"
# ============================================================
set -euo pipefail

echo "▸ Building Next.js app..."
bun run build

echo "▸ Pushing Prisma schema to production DB..."
bun run db:push

echo "▸ Deploying to Firebase..."
firebase deploy

echo ""
echo "✅ Deployed successfully."
echo "   Open: https://$(firebase projects:list 2>/dev/null | grep -E 'current project|active' | head -1 | awk '{print $2}').web.app"
echo ""
echo "Don't forget to add the deployed domain to:"
echo "  Firebase Console → Authentication → Settings → Authorized domains"
