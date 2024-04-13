## Table of Contents

## Download

### GitHub HTTPS

```bash
   https://github.com/Bartek-Figat/TradeKeeper.git
```

### GitHub Cli

```bash
   gh repo clone Bartek-Figat/TradeKeeper
```

## Installation

Use the following script to install modules in the front-end and back-end directory

```bash
  yarn install
```

The command will start the front-end and back-end

```bash
  yarn dev
```

## Gitflow

- Checkout a new branch in your repo, use folder before, accordingly to branch intentions and the key after slash.

```bash
   git checkout -b hotfix/FE#1
```

- Available folders names:

  - hotfix
  - feature
  - develop

  - When committing changes to your branch, use the key at the beginning of your commit message.

### Font-end

```bash
   git commit -m "FE#1 some message"
```

### Back-end

```bash
   git commit -m "BE#1 some message"
```

- Merging with main branch. For example:

```bash
  git checkout main
```

```bash
  git merge hotfix/FE#1
```
