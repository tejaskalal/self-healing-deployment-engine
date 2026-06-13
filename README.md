# Self-Healing Deployment Engine

A Kubernetes-based deployment project demonstrating automatic pod recovery and canary releases on AWS EKS, provisioned with Terraform.

---

## Tech Stack

| Layer | Tool |
|---|---|
| App | Node.js + Express |
| Container | Docker (node:22-alpine) |
| Orchestration | Kubernetes (AWS EKS) |
| Progressive Delivery | Argo Rollouts |
| Infrastructure | Terraform + AWS |

---

## Architecture

```
AWS VPC (10.0.0.0/16)
├── Public Subnets  (us-east-1a, us-east-1b) → Internet Gateway
└── Private Subnets (us-east-1a, us-east-1b) → NAT Gateway
                              │
                        EKS Cluster
                              │
                    Node Group (c7i-flex.large)
                              │
              ┌───────────────┴───────────────┐
         Deployment                      Argo Rollout
       (liveness +                    (canary: 20→50→100%)
      readiness probes)
              └───────────────┬───────────────┘
                    LoadBalancer Service (port 80)
```

---

## Project Structure

```
├── app/
│   ├── server.js        # Express app (/, /health, /version)
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   ├── deployment.yml   # Standard deployment with health probes
│   ├── roll-out.yml     # Argo Rollout canary strategy
│   └── service.yml      # LoadBalancer service
└── terraform/
    ├── main.tf          # VPC, subnets, EKS cluster + node group
    ├── providers.tf
    ├── variables.tf
    └── outputs.tf
```

---

## Key Concepts

**Self-Healing** — Kubernetes liveness and readiness probes hit `/health` continuously. Unresponsive pods are restarted automatically.

**Canary Rollout** — Argo Rollouts shifts traffic progressively: 20% → wait 30s → 50% → wait 30s → 100%, limiting blast radius during updates.
