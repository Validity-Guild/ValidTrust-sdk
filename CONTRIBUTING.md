# Contributing to ValidTrust SDK

We welcome contributions to the ValidTrust SDK! Follow these guidelines to get started.

## Setup

1. Fork the repo and clone it locally.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Drips and Drips Wave Contribution

This project participates in [Drips](https://drips.network) and [Drips Wave](https://docs.drips.network/wave/).

### Finding Issues to Work On
- Look for issues labeled with:
  - `good first issue` - Great for first-time contributors
  - `help wanted` - Issues that need assistance
  - `drips-wave` - Issues eligible for Drips Wave
  - `bounty-ready` - Issues with potential bounties
  - `sdk` - SDK-specific issues

### Drips Wave Tasks
Issues labeled `drips-wave` are eligible for Drips Wave contribution cycles. These issues typically have:
- Clear acceptance criteria
- Estimated difficulty level
- Expected files or modules to modify
- Testing requirements

## TODO for Contributors

Here are areas where you can help improve the SDK:
- [ ] Support additional contract modules (e.g., Governance, Staking).
- [ ] Improve wallet integrations (add support for Albedo, xBull, etc.).
- [ ] Optimize transaction building by auto-calculating optimal resource fees.
- [ ] Add more comprehensive examples and documentation.

## Submitting Pull Requests

- Keep your code clean and well-documented.
- Write Jest tests for any new features.
- Update `docs/` and `README.md` if the public API changes.
- Submit a PR to the `main` branch.
