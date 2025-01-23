# freshcells-app

**freshcells-app** A simple application built with React and GraphQL to demonstrate technical skills. Includes a login page and displays user details..

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Commands](#development-commands)
  - [Formatting](#formatting)
  - [Linting](#linting)
- [Folder Structure](#folder-structure)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
  - [Project Dependencies](#project-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Ensure the following tools are installed with the specified minimum versions:

- **Node.js**: `>= 20.11.0`
- **Bun**: `>= 1.1.37`
- **npm**: `>= 10.8.2`

## Getting Started

To install all dependencies:

```bash
bun install
```

## Development Commands

### Development server

To run development server to see UI features.

```bash
bun run dev
```

### Production mode preview

To see all UI features on local server after building the application.

```bash
bun run build
bun run preview
```

### Formatting

To format the codebase using Prettier:

```bash
bun run format
```

### Linting

To check for code quality issues based on the rules defined in `eslint.config.js`:

```bash
bun run lint
```

### GraphQL Query Generation

To generate GraphQL queries based on the remote URL, use the `bun run api-gen` command:

```bash
bun run api-gen
```

## Folder Structure

The project is organized as follows:

```
src/
├── components/    # Utility components
├── assets/        # To keep asset entities
├── config/        # Configurations for apollo, api-gen, i18 and etc.
├── models/        # Global type and interfaces
├── pages/         # Special folder to manage pages - authentication, login, dashboard, profile
├── services/      # Custom services - Storage, GraphQL - auto generated
├── utils/         # Utility functions - helpers and etc.
```

Each page is situated under pages folder

## Tools and Technologies

This project uses:

- **React**: A JavaScript library for building user interfaces.
- **Mantine Dev**: A UI framework for React applications.
- **TypeScript**: A typed superset of JavaScript.
- **SCSS Modules**: For modular, scoped styling.
- **RsBuild**: For efficient bundling, tree-shaking, nd fast development
- **Bun**: A fast all-in-one JavaScript runtime.
- **ESLint**: For enforcing code quality rules.
- **Prettier**: For consistent code formatting.
- **CommitLint**: For consistent and standard commit messages.
- **Husky**: For managing Git hooks - pre-commit, commit-msg.
- **React Testing Library**: Tools for testing React components by simulating user interactions and verifying their behavior in a predictable and isolated environment.
- **Apollo + Apollo Client**: For managing GraphQL apis.
- **React i18 Next**: For localization.

## Dependencies

## Project Dependencies

The project includes the following dependencies:

```json
   "@apollo/client": "^3.12.7",
   "@mantine/core": "^7.16.1",
   "@mantine/form": "^7.16.1",
   "@mantine/hooks": "^7.16.1",
   "@mantine/notifications": "^7.16.1",
   "@tabler/icons-react": "^3.29.0",
   "classnames": "^2.5.1",
   "graphql": "^16.10.0",
   "i18next": "^24.2.1",
   "react": "^19.0.0",
   "react-dom": "^19.0.0",
   "react-error-boundary": "^5.0.0",
   "react-i18next": "^15.4.0",
   "react-route": "^1.0.3",
   "react-router": "^7.1.3"
}
```

## Contributing

To contribute:

1. Clone the repository.
2. Install dependencies using `bun install`.
3. Follow the code formatting and linting rules.

## License

This project is licensed under the [MIT License](LICENSE).
