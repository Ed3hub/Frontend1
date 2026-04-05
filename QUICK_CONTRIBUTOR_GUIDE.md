# Quick Contributor Guide

## 🚀 Quick Start for Contributors

### 1. Fork and Clone
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ed3hub.git
cd ed3hub
git remote add upstream https://github.com/wisteen/ed3hub.git
```

### 2. Setup Development Environment
```bash
# Backend
cd Backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (new terminal)
cd Frontend
npm install
npm run dev
```

### 3. Create Feature Branch
```bash
git checkout development
git pull upstream development
git checkout -b feature/your-feature-name
```

### 4. Make Changes and Commit
```bash
git add .
git commit -m "feat: your feature description"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
# Go to GitHub and create Pull Request to 'development' branch
```

## 📌 Branch Strategy

- **`main`** - Production code (don't commit directly)
- **`development`** - Integration branch (create PRs here)
- **`feature/*`** - Your feature branches
- **`fix/*`** - Bug fix branches

## ✅ Commit Message Format

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

**Examples:**
```bash
git commit -m "feat(courses): add video upload"
git commit -m "fix(auth): resolve login redirect"
git commit -m "docs(readme): update setup instructions"
```

## 🧪 Before Submitting PR

```bash
# Run tests
cd Backend && python manage.py test
cd Frontend && npm test

# Update your branch
git fetch upstream
git rebase upstream/development

# Push changes
git push origin feature/your-feature-name
```

## 📋 PR Checklist

- [ ] Code follows project standards
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests pass
- [ ] No new warnings
- [ ] Self-reviewed code
- [ ] PR targets `development` branch

## 🔄 Keeping Your Fork Updated

```bash
# Sync with upstream
git fetch upstream
git checkout development
git merge upstream/development
git push origin development
```

## 🐛 Found a Bug?

1. Check if already reported in [Issues](https://github.com/wisteen/ed3hub/issues)
2. Create new issue using bug report template
3. Include steps to reproduce, expected vs actual behavior

## 💡 Have an Idea?

1. Check [Issues](https://github.com/wisteen/ed3hub/issues) for similar requests
2. Create new issue using feature request template
3. Describe the problem it solves and proposed solution

## 📞 Need Help?

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guide
- Check [README.md](README.md) for setup instructions
- Open a [Discussion](https://github.com/wisteen/ed3hub/discussions)
- Email: hello@educeptis.name.ng

## 🎯 Good First Issues

Look for issues labeled `good first issue` to get started!

---

**Happy Contributing! 🎉**
