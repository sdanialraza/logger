# 💻 Logger

[![CI Tests](https://github.com/sdanialraza/logger/actions/workflows/tests.yml/badge.svg)](https://github.com/sdanialraza/logger/actions/workflows/tests.yml)
[![npm version](https://img.shields.io/npm/v/@sdanialraza/logger.svg?maxAge=3600)](https://www.npmjs.com/package/@sdanialraza/logger)

## 📄 About

A simple and lightweight logger.

## 📦 Installation

<!-- prettier-ignore-start -->
```bash
npm install -D @sdanialraza/logger
yarn add -D @sdanialraza/logger
pnpm add -D @sdanialraza/logger
bun add -D @sdanialraza/logger
```
<!-- prettier-ignore-end -->

## Usage

### Importing

<!-- prettier-ignore-start -->
```javascript
// CommonJS
const { Logger } = require('@sdanialraza/logger');
// ES Modules
import { Logger } from '@sdanialraza/logger';
```
<!-- prettier-ignore-end -->

### Creating a Logger instance

<!-- prettier-ignore-start -->
```javascript
const logger = new Logger();
```
<!-- prettier-ignore-end -->

### Logging

<!-- prettier-ignore-start -->
```javascript
// Using your logger instance
logger.critical('Hello, world!');
logger.debug('Hello, world!');
logger.error('Hello, world!');
logger.log('Hello, world!');
logger.info('Hello, world!');
logger.warn('Hello, world!');

// Passing in options
logger.log('Hello, world!', {
    logsFilePath: "test.log",
    timestamp: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
});

// Using static methods
Logger.critical('Hello, world!');
Logger.debug('Hello, world!');
Logger.error('Hello, world!');
Logger.log('Hello, world!');
Logger.info('Hello, world!');
Logger.warn('Hello, world!');
```
<!-- prettier-ignore-end -->

## 🤝 Contributing

Pull requests are welcome, and very much appreciated. But before you start working on a pull request, please make sure to open an issue first, so that we can discuss the changes you want to make.

## ⚖️ License

This project is licensed under the [MIT License](LICENSE).
