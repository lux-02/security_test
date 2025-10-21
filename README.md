# Next.js Security Test App - SAST & DAST Testing

This repository provides a comprehensive Next.js application that intentionally includes a wide range of security vulnerabilities for testing both **SAST (Static Application Security Testing)** and **DAST (Dynamic Application Security Testing)** tools.

**⚠️ WARNING: This application contains intentional security vulnerabilities. Do NOT deploy this to production or any public environment!**

## Features

### SAST Testing (Static Analysis)
- Custom Semgrep rules for detecting vulnerabilities in source code
- Intentionally vulnerable code patterns for testing security scanners
- API endpoints with security flaws

### DAST Testing (Dynamic Analysis)
- Interactive web interface to test vulnerabilities
- Live exploitation demonstrations
- Comprehensive coverage of OWASP Top 10 vulnerabilities

## Vulnerability Categories

### 💉 Injection Attacks
- **Reflected XSS** (`/xss-reflected`) - User input reflected in HTML response
- **Stored XSS** (`/xss-stored`) - Malicious scripts stored and executed for all users
- **DOM-based XSS** (`/xss-dom`) - Client-side XSS via URL manipulation and unsafe DOM operations
- **SQL Injection** (`/sql-injection`) - Authentication bypass and data extraction
- **Command Injection** (`/command-injection`) - OS command execution via user input

### 🔐 Authentication & Authorization
- **Insecure Authentication** (`/insecure-auth`) - Weak passwords, predictable tokens
- **Broken Session Management** (`/session-management`) - Session fixation, no timeouts
- **Broken Access Control** (`/broken-access`) - IDOR, privilege escalation

### 🌐 Network & Request Vulnerabilities
- **SSRF** (`/ssrf`) - Server-side request forgery
- **CSRF** (`/csrf`) - Cross-site request forgery
- **Open Redirect** (`/open-redirect`) - Unvalidated redirects

### 📁 File & Data Handling
- **Insecure File Upload** (`/file-upload`) - Unrestricted file upload
- **Path Traversal** (`/path-traversal`) - Directory traversal attacks
- **XXE** (`/xxe`) - XML external entity injection

### 🔧 Configuration & Data Security
- **Sensitive Data Exposure** (`/sensitive-data`) - PII, credentials in responses
- **Insecure Deserialization** (`/insecure-deserialization`) - Prototype pollution

## Installation & Usage

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open `http://localhost:3000` to access the vulnerability testing dashboard.

## API Endpoints (for SAST Testing)

- `GET /api/xss-var?message=<script>alert(1)</script>` - XSS via variable
- `GET /api/xss-direct?output=<img src=x onerror=alert(1)>` - Direct XSS
- `GET /api/xss-reflected?q=<payload>` - Reflected XSS
- `GET/POST /api/xss-stored` - Stored XSS with comment system
- `POST /api/insecure-cookie` - Cookie without secure flags
- `GET /api/ssrf` - Internal SSRF endpoint
- `POST /api/ssrf-fetch` - SSRF with URL parameter
- `POST /api/eval` - Code execution via eval()
- `GET /api/api-key-exposure` - Exposed API keys
- `POST /api/sql-injection/login` - SQL injection in login
- `GET /api/sql-injection/user?id=1` - SQL injection in query
- `POST /api/command-injection/ping` - Command injection via ping
- `POST /api/command-injection/read-file` - Command injection via file read
- `POST /api/csrf/change-email` - CSRF vulnerable endpoint
- `POST /api/csrf/transfer` - Money transfer without CSRF protection
- `GET /api/path-traversal?file=../../../etc/passwd` - Path traversal
- `POST /api/xxe/parse` - XXE vulnerability
- And more...

## DAST Testing

### Using OWASP ZAP
```bash
# Spider and scan the application
zap-cli quick-scan --self-contained http://localhost:3000

# Full scan
zap-cli active-scan http://localhost:3000
```

### Using Burp Suite
1. Configure browser proxy to point to Burp (127.0.0.1:8080)
2. Navigate through the application
3. Use Burp Scanner on discovered endpoints

### Using Nikto
```bash
nikto -h http://localhost:3000
```

## SAST Testing

### Using Semgrep
```bash
# Scan with custom rules
semgrep --config .security/semgrep-nextjs.yml .

# Scan with default rules
semgrep --config auto .
```

### Using ESLint Security Plugin
```bash
npm install --save-dev eslint-plugin-security
npm run lint
```

## Testing Examples

### XSS Testing
```javascript
// Reflected XSS
http://localhost:3000/xss-reflected
Input: <img src=x onerror=alert('XSS')>

// DOM XSS
http://localhost:3000/xss-dom#<script>alert('XSS')</script>
```

### SQL Injection
```sql
-- Login bypass
Username: admin' OR '1'='1
Password: anything

-- Data extraction
User ID: 1 OR 1=1
```

### Command Injection
```bash
# Ping command injection
127.0.0.1; ls -la
127.0.0.1 && cat /etc/passwd
```

### SSRF
```
http://127.0.0.1:3000/api/sensitive-data
http://169.254.169.254/latest/meta-data/
```

## Project Structure

```
app/
├── page.tsx                           # Main vulnerability dashboard
├── xss-reflected/                     # Reflected XSS demo
├── xss-stored/                        # Stored XSS demo
├── xss-dom/                           # DOM-based XSS demo
├── sql-injection/                     # SQL injection demo
├── command-injection/                 # Command injection demo
├── ssrf/                              # SSRF demo
├── csrf/                              # CSRF demo
├── insecure-auth/                     # Authentication vulnerabilities
├── session-management/                # Session vulnerabilities
├── broken-access/                     # Access control issues
├── file-upload/                       # File upload vulnerabilities
├── path-traversal/                    # Path traversal demo
├── open-redirect/                     # Open redirect demo
├── sensitive-data/                    # Data exposure demo
├── xxe/                               # XXE injection demo
├── insecure-deserialization/          # Deserialization demo
└── api/                               # Vulnerable API endpoints
```

## Security Testing Tools

### Recommended Tools
- **SAST**: Semgrep, SonarQube, Snyk Code
- **DAST**: OWASP ZAP, Burp Suite, Nikto
- **Secret Scanning**: Gitleaks, TruffleHog
- **Dependency Scanning**: npm audit, Snyk

## Educational Purpose

This application is designed for:
- Security tool testing and validation
- Security training and workshops
- Penetration testing practice
- SAST/DAST tool comparison
- Security awareness demonstrations

## License

This project is for educational and testing purposes only. Use responsibly in controlled environments.
