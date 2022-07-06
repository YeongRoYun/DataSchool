# Kubernetes
## Concept
| Concept | Means |
| - | - |
| Container | Isolated environment running applications |
| Container Runtime | Tools managing containers |
| Docker | The popular container runtime |
| Kubernetes | The tool that ocastrate containers through a container runtime |
| Ocastration | Managing containers and configures across several servers |

## Deployment paradigm Shift

### Tranditional
- Many application running on a one OS
- Each app interferes with each other

### Virtualized
- One application running on each virtual machine above Hypervisor layer
- Achieve the isolation but heavy
  
### Container
- One application running on each container above container runtime
- The OS is only one
  - Ignore all layers below the container runtime
- Each Container has an independent environment. So, the apps recognize only itself running on OS
  - Virtualization sharing the **KERNEL** 
- If the app make problems affecting OS, they can spread other

| | Tranditional | Virtualized | Container |
| - | - | - | - |
| Computer | One physical | Several VM | Doesn't matter |
| OS | One OS | One for physical, one for each VM | One OS |
| Resource | Sharing | Allocated by Hypervisor | Allocated by OS |
| Isolation | None | Full | Isolated runtime but sharing kernel |
| Problem Transfer | High | Low | Middle |

## Docker
