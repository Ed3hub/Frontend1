# Contributing to ED3Hub

Thank you for your interest in contributing to ED3Hub! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Strategy](#branch-strategy)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Code Review](#code-review)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Git installed
- Python 3.11+ (for Backend)
- Node.js 20+ (for Frontend)
- A GitHub account
- Familiarity with Django and Next.js

### Fork and Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button

2. **Clone your fork** to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/ed3hub.git
cd ed3hub
```

3. **Add upstream remote** to keep your fork synced:
```bash
git remote add upstream https://github.com/wisteen/ed3hub.git
```

4. **Verify remotes**:
```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/ed3hub.git (fetch)
# origin    https://github.com/YOUR_USERNAME/ed3hub.git (push)
# upstream  https://github.com/wisteen/ed3hub.git (fetch)
# upstream  https://github.com/wisteen/ed3hub.git (push)
```

### Setup Development Environment

Follow the setup instructions in [README.md](README.md) to set up your local development environment.

---

## 🔄 Development Workflow

### 1. Sync Your Fork

Before starting work, sync your fork with the upstream repository:

```bash
# Fetch upstream changes
git fetch upstream

# Switch to development branch
git checkout development

# Merge upstream changes
git merge upstream/development

# Push to your fork
git push origin development
```

### 2. Create a Feature Branch

Always create a new branch for your work:

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description

# Or for documentation
git checkout -b docs/documentation-update
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new features
- Update documentation as needed
- Test your changes thoroughly

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add user profile avatar upload"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Select `development` as the base branch
4. Fill out the PR template
5. Submit the pull request

---

## 🌿 Branch Strategy

We use a **Git Flow** branching model:

### Main Branches

- **`main`** - Production-ready code. Only merge from `development` after thorough testing.
- **`development`** - Integration branch for features. All feature branches merge here first.

### Supporting Branches

- **`feature/*`** - New features (branch from `development`, merge back to `development`)
- **`fix/*`** - Bug fixes (branch from `development`, merge back to `development`)
- **`hotfix/*`** - Critical production fixes (branch from `main`, merge to both `main` and `development`)
- **`release/*`** - Release preparation (branch from `development`, merge to both `main` and `development`)

### Workflow Example

```bash
# Start a new feature
git checkout development
git pull upstream development
git checkout -b feature/add-video-upload

# Work on your feature
# ... make changes ...
git add .
git commit -m "feat: implement video upload functionality"

# Keep your branch updated
git fetch upstream
git rebase upstream/development

# Push to your fork
git push origin feature/add-video-upload

# Create PR to development branch
```

---

## 📝 Coding Standards

### Backend (Django/Python)

- Follow [PEP 8](https://pep8.org/) style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused
- Use type hints where appropriate

**Example:**
```python
def calculate_course_progress(enrollment_id: int) -> float:
    """
    Calculate the completion percentage for a course enrollment.
    
    Args:
        enrollment_id: The ID of the enrollment
        
    Returns:
        Float representing completion percentage (0-100)
    """
    # Implementation here
    pass
```

### Frontend (Next.js/TypeScript)

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

**Example:**
```typescript
interface CourseCardProps {
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
}

/**
 * CourseCard component displays course information
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  thumbnail,
  instructor
}) => {
  // Implementation here
};
```

### General Guidelines

- Write self-documenting code
- Avoid code duplication (DRY principle)
- Keep functions under 50 lines when possible
- Use consistent indentation (2 spaces for JS/TS, 4 spaces for Python)
- Remove commented-out code before committing
- No console.log() or print() statements in production code

---

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

### Examples

```bash
# Feature
git commit -m "feat(courses): add video upload functionality"

# Bug fix
git commit -m "fix(auth): resolve login redirect issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Multiple changes
git commit -m "feat(quiz): add timer functionality

- Add countdown timer to quiz interface
- Store timer state in localStorage
- Auto-submit quiz when timer expires"
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 50 characters
- Capitalize the subject line
- Don't end subject line with a period
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Explain what and why, not how

---

## 🔀 Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes from `development`:
```bash
git fetch upstream
git rebase upstream/development
```

2. **Run tests** to ensure nothing is broken:
```bash
# Backend tests
cd Backend
python manage.py test

# Frontend tests
cd Frontend
npm test
```

3. **Check code quality**:
```bash
# Python linting
flake8 .

# TypeScript checking
npm run type-check
```

### PR Title Format

Use the same format as commit messages:
```
feat(courses): add video upload functionality
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- List of changes made
- Another change
- Yet another change

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] Any dependent changes have been merged
```

### Review Process

1. **Automated checks** will run (tests, linting)
2. **Code review** by maintainers
3. **Address feedback** if requested
4. **Approval** from at least one maintainer
5. **Merge** into development branch

### Updating Your PR

If changes are requested:

```bash
# Make the requested changes
git add .
git commit -m "fix: address review comments"

# Push to your branch
git push origin feature/your-feature-name
```

The PR will automatically update.

---

## 🧪 Testing

### Backend Testing

```bash
cd Backend

# Run all tests
python manage.py test

# Run specific app tests
python manage.py test courses

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Testing

```bash
cd Frontend

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Writing Tests

**Backend (Django):**
```python
from django.test import TestCase
from courses.models import Course

class CourseModelTest(TestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="Test Course",
            description="Test Description"
        )
    
    def test_course_creation(self):
        self.assertEqual(self.course.title, "Test Course")
```

**Frontend (React):**
```typescript
import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';

describe('CourseCard', () => {
  it('renders course title', () => {
    render(<CourseCard title="Test Course" />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });
});
```

---

## 👀 Code Review

### As a Contributor

- Be open to feedback
- Respond to comments promptly
- Ask questions if something is unclear
- Don't take criticism personally
- Learn from the review process

### As a Reviewer

- Be respectful and constructive
- Explain the "why" behind suggestions
- Approve when ready, request changes when needed
- Focus on code quality, not personal preferences
- Acknowledge good work

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Verify it's reproducible
3. Collect relevant information

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this feature solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
What other solutions did you consider?

## Additional Context
Any other relevant information
```

---

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: hello@educeptis.name.ng

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

---

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

## 📄 License

By contributing to ED3Hub, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ED3Hub! 🚀**
