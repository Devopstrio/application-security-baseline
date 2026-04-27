-- Devopstrio Application Security Baseline
-- Enterprise Central Metadata Schema
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Governance Hierarchy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Developer', -- DevSecOps, Auditor, AppOwner, Developer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    repository_url VARCHAR(512),
    criticality_tier INT DEFAULT 3, -- 1=Low, 5=Mission Critical Data
    owner_id UUID REFERENCES users(id),
    pci_in_scope BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Core Security Findings (SAST, DAST, SCA)
CREATE TABLE IF NOT EXISTS findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    finding_type VARCHAR(50) NOT NULL, -- SAST, DAST, SCA, Secrets
    severity VARCHAR(50) NOT NULL, -- CRITICAL, HIGH, MEDIUM, LOW
    identifier VARCHAR(255), -- CVE-2021-44228, CWE-79
    description TEXT,
    remediation_guidance TEXT,
    file_path VARCHAR(512),
    line_number INT,
    status VARCHAR(50) DEFAULT 'Open', -- Open, Resolved, Ignored, Risk-Accepted
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS secret_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID REFERENCES applications(id),
    scanner VARCHAR(100), -- TruffleHog, GitGuardian
    secret_type VARCHAR(100), -- AWS_KEY, AZURE_PAT, RSA_PRIVATE
    file_path VARCHAR(512),
    commit_hash VARCHAR(100),
    is_active_on_cloud BOOLEAN, -- Verified if token is actually active
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Policy As Code Engine
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    engine VARCHAR(50) NOT NULL, -- OPA, Checkov, Kyverno
    rule_definition TEXT NOT NULL,
    is_blocking BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Mapping
CREATE TABLE IF NOT EXISTS compliance_controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    framework VARCHAR(100) NOT NULL, -- SOC2, OWASP
    control_id VARCHAR(50) NOT NULL, -- CC7.1, ASVS-2.1
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS compliance_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID REFERENCES applications(id),
    control_id UUID REFERENCES compliance_controls(id),
    status VARCHAR(50) NOT NULL, -- Pass, Fail, Partial
    evidence_payload JSONB,
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for rapid dashboard aggregation
CREATE INDEX idx_findings_app ON findings(app_id, status);
CREATE INDEX idx_findings_severity ON findings(severity, status);
CREATE INDEX idx_compliance_app ON compliance_results(app_id);
