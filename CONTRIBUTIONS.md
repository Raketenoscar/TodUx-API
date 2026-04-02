# TodUx Api Contributions

Thank you for your interest in contributing to this project! This guide will help you contribute to this Projekt.

## Getting Started

### 1. Fork the Repository

- Navigate to the [main repository](https://github.com/raketenoscar/TodUx-backend)
- Click the **Fork** button in the top right corner
- This creates a copy of the project in your GitHub account

### 2. Clone the Project Locally

```bash
git clone https://github.com/YOUR_USERNAME/TodUx-backend.git
cd TodUx-backend
git remote add upstream https://github.com/raketenoscar/TodUx-backend.git
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy the `.env.example` file to `.env` and fill in all required values.

## Contribution Workflow

### 5. Create a New Branch

```bash
git checkout -b feature/feature-name
```

**Branch Naming Convention:**

- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### 7. Commit Your Changes

```bash
git add .
git commit -m "feat: brief description of changes"
```

**Commit Message Format:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code restructuring

### 8. Push to Your Fork

```bash
git push origin feature/your-feature-description
```

### 9. Create a Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Make sure the **base repository** points to the main project
4. Fill in the PR description:
   - What changed?
   - Why this change?
   - How can it be tested?
5. Click **Create pull request**

## Bug Reports

Create an issue with the following information:

- **Title:** Brief description of the bug
- **Description:** Detailed explanation
- **Steps to Reproduce:** Step-by-step instructions
- **Expected:** What should happen?
- **Actual:** What happens instead?
- **Environment:** Node version, npm version, operating system

## Feature Requests

Create an issue with:

- **Title:** Feature name
- **Description:** Why is this feature useful?
- **Use Case:** Concrete use scenarios
- **Possible Implementation:** If you have ideas

## Testing

### Before submitting a PR:

Test if everything works

```bash
npm run dev
```

## Thank you!
