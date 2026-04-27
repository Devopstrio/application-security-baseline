<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="85" alt="Devopstrio Logo" />

<h1>Application Security Baseline</h1>

<p><strong>Enterprise DevSecOps Platform: Secure by Design, Default, Pipeline, and Runtime</strong></p>

[![Security](https://img.shields.io/badge/Security-Zero_Trust-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Cloud](https://img.shields.io/badge/Platform-Azure_Native-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](/terraform)
[![Compliance](https://img.shields.io/badge/Compliance-OWASP_%7C_CIS_%7C_SOC2-962964?style=for-the-badge&labelColor=000000)](/apps/compliance-engine)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)

</div>

---

## 🏛️ Executive Summary

![App Security Baseline Architecture](assets/diagram-architecture.png)

The **Application Security Baseline (ASB)** platform is the definitive system for enforcing security across the entire Software Development Life Cycle (SDLC). It transitions security from a reactive "gate" at the end of development into an automated, continuous mesh of preventative guardrails and runtime observability.

### Strategic Business Outcomes
- **Policy as Code (PaC)**: Blocks the deployment of infrastructure or apps lacking mandatory TLS, Private Endpoints, or WAF associations.
- **Automated Compliance**: Maps technical findings directly to high-level compliance frameworks (SOC2, ISO27001, OWASP ASVS).
- **Secrets Management**: Eradicates source code secrets via continuous scanning and automated Azure Key Vault injection mechanisms.
- **Runtime Anomaly Defense**: Ingests WAF signals and container telemetry to identify privilege escalation and Zero-Day exploitation attempts in production.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Architecture
```mermaid
graph TD
    Dev[Developer Commit] --> Git[GitHub Repository]
    Git --> Actions[CI/CD Pipelines]
    Actions --> Scan[Scan Engine (SAST/DAST)]
    Scan --> Policy[Policy Engine (OPA)]
    Policy -->|Pass| AKS[Production AKS]
    Policy -->|Fail| Block[Pipeline Blocked]
    AKS --> Runtime[Runtime Security Engine]
    Scan --> Dash[Executive Dashboard]
    Runtime --> Dash
```

### 2. Secure SDLC Workflow
```mermaid
sequenceDiagram
    participant Dev
    participant Pipeline
    participant SecurityEngine
    participant Compliance
    
    Dev->>Pipeline: Push Code
    Pipeline->>SecurityEngine: Trigger Secrets & SAST Scan
    SecurityEngine-->>Pipeline: Return Scan Findings
    alt High/Critical Findings
        Pipeline--x Dev: Build Failed (Require Remediation)
    else Low/None
        Pipeline->>Compliance: Generate SBOM & Sign Artifact
        Pipeline->>AKS: Deploy Secure Container
    end
```

### 3. Scan Engine Pipeline Flow
```mermaid
graph LR
    Code[Source Code] --> Secret[Secrets Scan (TruffleHog)]
    Code --> SAST[Static Analysis (Sonar)]
    Code --> Dep[Dependency Scan (Snyk/Trivy)]
    Code --> IaC[IaC Scan (Checkov)]
    Secret --> Aggregator[Findings Normalization]
    SAST --> Aggregator
    Dep --> Aggregator
    IaC --> Aggregator
    Aggregator --> DB[(PostgreSQL)]
```

### 4. Secrets Management Lifecycle
```mermaid
graph TD
    Dev[Developer] --> CLI[Local Config (No Secrets)]
    App[Application Pod] --> WorkloadID[Azure Workload Identity]
    WorkloadID --> KV[Azure Key Vault]
    KV --> Engine[Secrets Engine]
    Engine -->|Rotation Schedule| KV
    App -->|Fetch at Runtime| DB[(Database)]
```

### 5. Compliance Evidence Collection
```mermaid
graph TD
    Scan[Trivy Vulnerability Scan] --> Map[Compliance Engine]
    Map --> OWASP[Map to OWASP Top 10]
    Map --> SOC2[Map to SOC2 CC7.1]
    SOC2 --> Report[Automated PDF Export]
    Report --> Auditor[External Auditor]
```

### 6. Security Trust Boundary
```mermaid
graph TD
    Internet --> WAF[Azure Web Application Firewall]
    WAF --> VNet[Private Virtual Network]
    VNet --> AKS[Kubernetes Ingress (mTLS)]
    AKS --> Pod[Application Pod]
    Pod --> PE[Private Endpoint]
    PE --> SQL[(Azure SQL)]
```

### 7. AKS Security Topology
```mermaid
graph TD
    subgraph Kube_System
        Gatekeeper[OPA Gatekeeper]
        Kyverno[Kyverno Policies]
    end
    subgraph App_Namespace
        App[Web Application]
        Sidecar[Envoy Sidecar/mTLS]
    end
    App --> Sidecar
    Gatekeeper -.->|Enforcement| App
```

### 8. API Threat Detection Lifecycle
```mermaid
graph LR
    Attacker --> APIM[API Gateway]
    APIM -->|Signal: SQLi Attempt| EventHub[Azure Event Hubs]
    EventHub --> Runtime[Runtime Engine]
    Runtime -->|Block IP| Firewall[Azure Firewall]
    Runtime --> Alert[Notify SOC Team]
```

### 9. Multi-Tenant Role Model
```mermaid
graph TD
    System[Auth Middleware] --> Role
    Role -->|Platform Eng| Global[View Global Posture]
    Role -->|App Owner| Local[View App Specific Findings]
    Role -->|Auditor| Reports[Generate Compliance Evidence]
```

### 10. Continuous Monitoring Flow
```mermaid
graph TD
    AKS[Runtime Workloads] --> Prom[Prometheus Metrics]
    AKS --> Falco[Falco Security Rules]
    Prom --> Grafana[Security Posture Dashboards]
    Falco --> SIEM[Azure Sentinel]
```

### 11. Findings Remediation Workflow
```mermaid
graph LR
    Scan[Scan Detects CVE] --> Portal[Findings Queue]
    Portal --> Assign[Assign to Dev Team]
    Assign --> PR[Automated PR Generation]
    PR --> Merge[Fix Merged]
    Merge --> Verify[Re-Scan Verifies Fix]
```

### 12. Disaster Recovery Security
```mermaid
graph TD
    Primary[UK South KV] -->|Replication| Secondary[UK West KV]
    PrimaryDB[(Primary PostgreSQL)] -->|CMK Encrypted| SecondaryDB[(Secondary PostgreSQL)]
```

### 13. Policy Drift Detection
```mermaid
graph TD
    Baseline[Approved Terraform State] --> Engine[Policy Engine]
    Cloud[Live Azure Resources] --> Engine
    Engine --> Diff[Calculate Drift]
    Diff -->|Unauthorized Change| Revert[Auto-revert via Pipeline]
```

### 14. Supply Chain Security (SLSA)
```mermaid
graph LR
    Code --> Build[Isolated Build Sandbox]
    Build --> SBOM[Generate SBOM]
    SBOM --> Sign[Cosign Artifact]
    Sign --> Registry[ACR]
    Registry --> Verify[AKS Admision Controller Verifies Signature]
```

### 15. Executive Reporting Subsystem
```mermaid
graph LR
    Engines[Aggregated Engine Data] --> DW[(Data Warehouse)]
    DW --> Report[Reporting Engine]
    Report --> Heatmap[Board Risk Heatmap]
    Report --> SLA[MTTR SLA Tracking]
```

---

## 🛠️ Global Platform Components

| Engine | Directory | Purpose |
|:---|:---|:---|
| **Security Portal** | `apps/security-portal/` | The Next.js SOC / Developer interface for managing risk. |
| **Platform API** | `backend/src/` | Centralized router for ingestion of scan telemetry. |
| **Policy Engine** | `apps/policy-engine/`| OPA/Rego wrapper validating IaC and Kubernetes manifests. |
| **Scan Engine** | `apps/scan-engine/` | Orchestrates parallel SAST, DAST, and container scans. |
| **Compliance Engine** | `apps/compliance-engine/` | Normalizes technical CVEs into business compliance domains. |
| **Runtime Engine** | `apps/runtime-engine/` | Ingests behavioral anomalies to catch zero-day breaches. |

---

## 🚀 Infrastructure Rollout

```bash
cd terraform/environments/prod
terraform init
terraform apply -auto-approve
```

---
<sub>&copy; 2026 Devopstrio &mdash; Securing the Modern Enterprise.</sub>
