// Devopstrio Application Security Baseline - Core Infrastructure

targetScope = 'subscription'

param location string = 'uksouth'
param prefix string = 'asb'
param env string = 'prd'

resource rgPlatform 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-platform-${env}'
  location: location
}

resource rgStorage 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-data-${env}'
  location: location
}

resource rgSecurity 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${prefix}-secops-${env}'
  location: location
}

// 1. Secrets Management (Key Vault Backed)
module keyvault './modules/keyvault.bicep' = {
  scope: rgSecurity
  name: 'keyvaultDeploy'
  params: {
    location: location
    kvName: 'kv-${prefix}-sec-${env}'
  }
}

// 2. Continuous Findings Database (PostgreSQL)
module db './modules/database.bicep' = {
  scope: rgStorage
  name: 'dbDeploy'
  params: {
    location: location
    serverName: 'psql-${prefix}-meta-${env}'
  }
}

// 3. Central Web Application Firewall (Global WAF via Front Door)
module waf './modules/waf.bicep' = {
  scope: rgSecurity
  name: 'wafDeploy'
  params: {
    location: location
    profileName: 'afd-${prefix}-${env}'
  }
}

// 4. Runtime Threat Analytics Fabric (AKS + Falco Hub)
module platform './modules/platform.bicep' = {
  scope: rgPlatform
  name: 'platformDeploy'
  params: {
    location: location
    clusterName: 'aks-${prefix}-host-${env}'
  }
}

output asbDashboardUrl string = platform.outputs.dashboardUri
