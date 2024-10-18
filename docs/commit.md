### Commit Naming Structure

To maintain consistency and clarity in our commit history, all commit messages should follow a specific structure. This helps the team quickly understand the purpose of each commit and makes it easier to track changes over time.

#### Format:

```
<type>(<scope>): <short description>
```

#### Example:

```
feat(auth): add JWT authentication for login
fix(ui): resolve button alignment issue on mobile
docs(readme): update installation instructions
```

### Commit Types

- **feat**: A new feature or functionality.
- **fix**: A bug fix.
- **docs**: Documentation changes (e.g., README updates).
- **style**: Code style changes (e.g., formatting, missing semi-colons, etc.) that do not affect the logic of the code.
- **refactor**: Code changes that neither fix a bug nor add a feature, but improve the structure or readability of the code.
- **test**: Adding or updating tests.
- **chore**: Routine tasks such as updating dependencies, build tasks, or maintenance work.
- **perf**: Performance improvements.
- **ci**: Changes to CI configuration files and scripts.
- **build**: Changes that affect the build system or external dependencies (e.g., npm, yarn).
- **revert**: Reverts a previous commit.

### Scope

The scope is optional but recommended. It provides additional context about which part of the codebase is affected by the commit. Examples of scopes include:

- **auth**: Authentication-related changes.
- **ui**: User interface changes.
- **api**: Backend API changes.
- **db**: Database-related changes.
- **deps**: Dependency updates.
- **infra**: Infrastructure changes.

### Short Description

The short description should be concise and written in the imperative mood (e.g., "add", "fix", "update", "remove"). It should summarize the change in a way that is easy to understand at a glance.

#### Guidelines:

- Limit the subject line to 50 characters or less.
- Capitalize the first letter of the subject.
- Do not end the subject line with a period.
- Use the imperative mood (e.g., "fix", "add", "update", "remove").

### Commit Body (Optional)

If necessary, you can include a more detailed explanation of the changes in the commit body. This is especially useful for complex changes or when additional context is needed.

#### Guidelines:

- Separate the subject from the body with a blank line.
- Wrap the body at 72 characters.
- Explain the "what" and "why" of the change, not the "how".

#### Example:

```
fix(auth): resolve token expiration issue
The token expiration logic was incorrect, causing users to be logged out prematurely. This commit fixes the issue by adjusting the expiration time calculation.
```

### Footer (Optional)

The footer is used to reference issues, pull requests, or breaking changes. It is also where you can include metadata such as "BREAKING CHANGE" or "Closes #123".

#### Example:

```
BREAKING CHANGE: The API endpoint `/v1/users` has been removed in favor of `/v2/users`.
Closes #456
```
