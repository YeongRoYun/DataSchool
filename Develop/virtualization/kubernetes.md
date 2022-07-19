# Kubernetes

## Intro
- Leading orchestration developed under the google
- Cloud platforms suporting kubernetes
  - GCP: GKE(Google Kubernetes Engine)
  - Azure: AKS(Azure Kubernetes Service)
  - AWS: EKS(Elastic Container Service for Kubernetes)
- ```kubectl``` : the command line tool for mananging Kubernetes
- To install dashboard, check https://kubernetes.io/ko/docs/tasks/access-application-cluster/web-ui-dashboard/
- To access dashboard, http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login

## Concepts
| Resource | Desc |
| - | - |
| Node | Server running containers |
| Namespace | Virtual cluster in Kubernetes cluster |
| Pod | Smallest container set. Define the rules for running containers |
| ReplicaSet | Manage several Pods |
| Deployment | Manage ReplicaSet |
| Service | Define paths accessing Pods |
| Ingress | Expose services outside Kubernetes cluster |
| ConfigMap | Define configurations and Deliver them to Pods |
| PersistentVolume | Define the storage used by Pods |
| PersistentVolumeClaim | Dynamically allocate volumes |
| StorageClass | Define the types of storages for PersistentVolume |
| StatePoolSet | Manage the equal Pods with same Spec |
| Job | Manage not-resident Pods and Guarantee normal exits |
| CronJop | Job using cron-syntax |
| Secret | Define secret data |
| Role | Define the rules of resouces in namespace |
| RoleBinding | Bind roles and users |
| ClusterRole | Define the rules of resouces in cluster |
| ClusterRoleBinding | Bind ClusterRole and users |
| ServiceAccount | Account used by Pods to control resources |

## Kubernetes Cluster&Node
