import type { Question } from "./questions";

const q = (
  id: number,
  lecture: string,
  prompt: string,
  options: string[],
  correct: number[]
): Question => ({
  id,
  lecture,
  topic: lecture,
  prompt,
  options,
  correct,
});

const cloudQuestionExplanations: Record<number, string> = {
  1: "On-demand self-service lets customers provision resources automatically whenever they need them.",
  2: "A cloud auditor independently checks service performance, operations, and security.",
  3: "An Availability Zone is an isolated location with separate data centres and redundant infrastructure.",
  4: "Customers configure and patch their guest OS, firewall rules, and applications; the provider manages the underlying cloud.",
  5: "A private cloud is dedicated to one organisation, giving more control but requiring more cost and management.",
  6: "Least privilege means an identity receives only the permissions required for its task, not broad default access.",
  7: "An IAM role is assumed temporarily by a trusted user or service and provides a controlled permission set.",
  8: "Security Groups are stateful and allow return traffic automatically; NACLs are stateless and need both directions.",
  9: "Metrics are numerical measurements such as CPU, memory, and disk IOPS.",
  10: "Federation lets one trusted identity access applications across different security domains.",
  11: "Rehost is lift-and-shift: the workload moves with little or no code change.",
  12: "The 12-factor approach keeps configuration in the execution environment, separate from source code.",
  13: "Warehouses hold structured data for analytics; lakes retain large volumes of raw data in native formats.",
  14: "Redis supports rich data structures, persistence, and replication, making it suitable for advanced caching.",
  15: "Retire means shutting down an application that no longer provides business value.",
  16: "Microservices can be developed, deployed, and scaled independently instead of scaling the whole application.",
  17: "Namespaces isolate processes and cgroups limit and account for their resource usage.",
  18: "Copy-on-Write shares unchanged image layers and creates a writable layer only when changes occur.",
  19: "A Pod is Kubernetes' smallest deployable unit and can contain one or more co-located containers.",
  20: "Terraform and CloudFormation define and provision infrastructure through code.",
};

export const cloudQuestions: Question[] = [
  q(1, "Basic Cloud Concepts", "Which cloud characteristic lets consumers provision computing resources automatically without human interaction from the provider?", ["Broad network access", "On-demand self-service", "Resource pooling", "Measured service"], [1]),
  q(2, "Basic Cloud Concepts", "Which NIST cloud actor performs independent assessments of cloud service operations, performance, and security?", ["Cloud broker", "Cloud carrier", "Cloud auditor", "Cloud provider"], [2]),
  q(3, "Basic Cloud Concepts", "Which AWS global infrastructure component isolates failures and contains one or more discrete data centres?", ["Edge location", "Availability Zone", "Region", "VPC subnet"], [1]),
  q(4, "Basic Cloud Concepts", "In the AWS Shared Responsibility Model, which item is primarily the customer’s responsibility?", ["Physical data-centre security", "AWS hardware and global infrastructure", "Guest OS configuration, patches, and firewall rules", "Host virtualization software"], [2]),
  q(5, "Basic Cloud Concepts", "Which deployment model is dedicated to a single organization and usually offers greater control at a higher management cost?", ["Public cloud", "Private cloud", "Community cloud", "Edge cloud"], [1]),
  q(6, "Security, IAM & Monitoring", "What does the Principle of Least Privilege require?", ["Everyone receives root access", "Users receive only the minimum permissions needed", "Policies change once a year", "Passwords never expire"], [1]),
  q(7, "Security, IAM & Monitoring", "Which IAM component is a logical set of permissions that can be assumed temporarily by users or services?", ["User group", "IAM role", "Access key ID", "Network ACL"], [1]),
  q(8, "Security, IAM & Monitoring", "What is the key difference between a stateful Security Group and a stateless Network ACL?", ["Security Groups are stateless", "NACLs automatically allow return traffic", "Security Groups track return traffic, while NACLs require rules in both directions", "NACLs apply to individual network interfaces"], [2]),
  q(9, "Security, IAM & Monitoring", "Which monitoring telemetry records numerical values such as CPU load, memory usage, and disk IOPS?", ["Audit logs", "Metrics", "System events", "Stack traces"], [1]),
  q(10, "Security, IAM & Monitoring", "What does Federated Identity Management allow?", ["A different password for every application", "One verified identity to access applications across security domains", "Login without encryption", "Offline authentication without an identity provider"], [1]),
  q(11, "Cloud Migration & Cloud-Native", "Which AWS migration strategy is known as lift-and-shift?", ["Refactor", "Replatform", "Rehost", "Repurchase"], [2]),
  q(12, "Cloud Migration & Cloud-Native", "According to the 12-factor methodology, where should application configuration be stored?", ["Hardcoded in source code", "In the execution environment", "Inside immutable image layers", "In plain-text HTTP headers"], [1]),
  q(13, "Cloud Migration & Cloud-Native", "What is the fundamental difference between a data warehouse and a data lake?", ["A lake stores only structured data", "A warehouse stores structured analytics data while a lake stores raw data in its native format", "A warehouse stores raw unstructured data", "They are identical"], [1]),
  q(14, "Cloud Migration & Cloud-Native", "Which in-memory cache supports advanced data structures, persistence, and master-replica replication?", ["Memcached", "Redis", "Amazon EBS", "Amazon S3"], [1]),
  q(15, "Cloud Migration & Cloud-Native", "Which migration strategy completely turns off redundant applications with no continuing business value?", ["Retain", "Retire", "Rehost", "Replatform"], [1]),
  q(16, "Microservices, Containers & IaC", "What is a major advantage of microservices?", ["All components must deploy together", "Services can be independently developed, deployed, and scaled", "They remove the need for monitoring", "They require one shared database"], [1]),
  q(17, "Microservices, Containers & IaC", "Which Linux features provide process and resource isolation for containers?", ["Hypervisors and BIOS", "Namespaces and cgroups", "DNS and DHCP", "Threads and sockets"], [1]),
  q(18, "Microservices, Containers & IaC", "Which mechanism lets container image layers share unchanged data efficiently?", ["Copy-on-Write", "Full duplication", "Static linking", "Database replication"], [0]),
  q(19, "Microservices, Containers & IaC", "What is the smallest deployable unit in Kubernetes that can contain one or more co-located containers?", ["Node", "Pod", "Cluster", "Service account"], [1]),
  q(20, "Microservices, Containers & IaC", "Terraform and AWS CloudFormation are examples of what?", ["Message queues", "Infrastructure as Code tools", "Container runtimes", "Identity providers"], [1]),
].map((question) => ({
  ...question,
  explanation: cloudQuestionExplanations[question.id],
}));

export type RubricCriterion = {
  label: string;
  keywords: string[];
  marks: number;
};

export type StructuredQuestion = {
  id: string;
  title: string;
  prompt: string;
  marks: number;
  rubric: RubricCriterion[];
};

export type CloudPaperSection = {
  id: string;
  title: string;
  scenario?: string;
  questions: StructuredQuestion[];
};

export const cloudPaperSections: CloudPaperSection[] = [
  {
    id: "concepts",
    title: "Question 1 · Basic Cloud Concepts & Core Services",
    scenario: "MedTech Solutions runs an on-premises patient-management system with long hardware procurement cycles, high cooling costs, and wasted capacity at night.",
    questions: [
      { id: "q1a", title: "a) On-premises inefficiencies", prompt: "Explain three financial or operational inefficiencies that could be reduced by migrating to a cloud service provider.", marks: 6, rubric: [
        { label: "High capital expenditure", keywords: ["capital expenditure", "capex", "upfront cost", "hardware cost"], marks: 2 },
        { label: "Rigid procurement or scaling", keywords: ["procurement", "scaling", "provision", "months", "lead time"], marks: 2 },
        { label: "Capacity or maintenance waste", keywords: ["over-provision", "under-provision", "capacity", "cooling", "maintenance", "pay as you go"], marks: 2 },
      ] },
      { id: "q1b", title: "b) Public vs private cloud", prompt: "Contrast Public Cloud and Private Cloud by discussing two characteristics and the security trade-offs of each.", marks: 6, rubric: [
        { label: "Public cloud characteristics", keywords: ["public cloud", "multi-tenant", "pay as you go", "shared"], marks: 2 },
        { label: "Private cloud characteristics", keywords: ["private cloud", "single tenant", "dedicated", "exclusive"], marks: 2 },
        { label: "Security and cost trade-off", keywords: ["security", "control", "compliance", "cost", "management overhead"], marks: 2 },
      ] },
      { id: "q1c", title: "c) Shared responsibility for a database PaaS", prompt: "Explain how security responsibilities shift when MedTech uses a managed relational database such as Amazon RDS or Azure SQL.", marks: 8, rubric: [
        { label: "Provider protects the cloud", keywords: ["provider", "physical", "data center", "hardware", "infrastructure"], marks: 2 },
        { label: "Provider manages platform", keywords: ["patch", "operating system", "database engine", "managed"], marks: 2 },
        { label: "Customer protects data", keywords: ["customer", "data", "classification", "schema", "backup"], marks: 2 },
        { label: "Customer manages access and network", keywords: ["iam", "identity", "credential", "firewall", "network"], marks: 2 },
      ] },
    ],
  },
  {
    id: "security",
    title: "Question 2 · Security, IAM & Monitoring",
    questions: [
      { id: "q2a", title: "a) Software Defined Security", prompt: "Define Software Defined Security and explain two ways it automates compliance and threat protection in dynamic cloud networks.", marks: 5, rubric: [
        { label: "Definition", keywords: ["software defined security", "software-based security", "automated security"], marks: 2 },
        { label: "Automated controls", keywords: ["access control", "firewall", "segmentation", "policy"], marks: 1 },
        { label: "Continuous detection or response", keywords: ["monitoring", "threat", "intrusion", "automated response", "compliance"], marks: 2 },
      ] },
      { id: "q2b", title: "b) Banking MFA workflow", prompt: "Design a banking portal authentication workflow using three distinct MFA factors.", marks: 5, rubric: [
        { label: "Something you know", keywords: ["password", "pin", "know"], marks: 2 },
        { label: "Something you have", keywords: ["token", "phone", "otp", "authenticator", "have"], marks: 2 },
        { label: "Something you are", keywords: ["biometric", "fingerprint", "face", "iris", "are"], marks: 1 },
      ] },
      { id: "q2c", title: "c) OLTP vs OLAP", prompt: "Compare OLTP and OLAP based on query patterns, normalization, and response-time expectations.", marks: 5, rubric: [
        { label: "OLTP workload", keywords: ["oltp", "transaction", "small", "sub-second", "normalized"], marks: 2 },
        { label: "OLAP workload", keywords: ["olap", "analytical", "historical", "complex", "denormalized"], marks: 2 },
        { label: "Clear comparison", keywords: ["response time", "reporting", "normalization"], marks: 1 },
      ] },
      { id: "q2d", title: "d) Cloud monitoring", prompt: "Explain the value of Metrics, Events, and Logs, and how threshold alerts help avoid outages.", marks: 5, rubric: [
        { label: "Metrics", keywords: ["metrics", "cpu", "memory", "numerical"], marks: 1 },
        { label: "Events and logs", keywords: ["events", "logs", "activity", "troubleshoot"], marks: 2 },
        { label: "Threshold alerts", keywords: ["threshold", "alert", "notification", "outage", "remediation"], marks: 2 },
      ] },
    ],
  },
  {
    id: "migration",
    title: "Question 3 · Cloud Migration & Cloud-Native Applications",
    questions: [
      { id: "q3a", title: "a) Migration phases", prompt: "Define cloud migration and outline the discovery, planning, and validation phases.", marks: 4, rubric: [
        { label: "Definition", keywords: ["cloud migration", "move", "assets", "workloads"], marks: 1 },
        { label: "Discovery and planning", keywords: ["discovery", "inventory", "dependency", "planning", "design"], marks: 2 },
        { label: "Validation", keywords: ["validation", "test", "verify", "performance"], marks: 1 },
      ] },
      { id: "q3b", title: "b) Replatforming vs refactoring", prompt: "Compare replatforming with refactoring/re-architecting and give a suitable business scenario for each.", marks: 6, rubric: [
        { label: "Replatforming", keywords: ["replatform", "lift-tinker", "minor", "rds"], marks: 2 },
        { label: "Refactoring", keywords: ["refactor", "re-architect", "microservices", "serverless"], marks: 2 },
        { label: "Business scenarios and trade-off", keywords: ["scenario", "cost", "risk", "performance", "scalability"], marks: 2 },
      ] },
      { id: "q3c", title: "c) Cloud-native applications", prompt: "Explain the core principles of cloud-native applications and why organizations use distributed microservices.", marks: 5, rubric: [
        { label: "Cloud-native principles", keywords: ["cloud-native", "elastic", "resilient", "scalable", "automated"], marks: 3 },
        { label: "Microservices benefit", keywords: ["microservices", "independent", "deploy", "scale"], marks: 2 },
      ] },
      { id: "q3d", title: "d) Redis caching", prompt: "Evaluate how Redis caching reduces database bottlenecks and latency during traffic spikes.", marks: 5, rubric: [
        { label: "In-memory cache", keywords: ["redis", "cache", "in-memory", "memory"], marks: 2 },
        { label: "Lower latency", keywords: ["latency", "fast", "sub-millisecond", "response"], marks: 1 },
        { label: "Protects database under load", keywords: ["database", "read", "traffic", "bottleneck", "load"], marks: 2 },
      ] },
    ],
  },
  {
    id: "containers",
    title: "Question 4 · Microservices, Containers & Infrastructure as Code",
    questions: [
      { id: "q4a", title: "a) Containers vs virtual machines", prompt: "Compare containers and VMs in terms of operating-system isolation, resource use, portability, and startup time.", marks: 5, rubric: [
        { label: "VM isolation", keywords: ["virtual machine", "guest operating system", "hypervisor"], marks: 2 },
        { label: "Container isolation", keywords: ["container", "kernel", "namespace", "cgroup"], marks: 2 },
        { label: "Efficiency and startup", keywords: ["lightweight", "portable", "fast", "startup"], marks: 1 },
      ] },
      { id: "q4b", title: "b) Architecture under a deadline", prompt: "Recommend a starting architecture for a product with a tight delivery deadline and explain how it can evolve later.", marks: 5, rubric: [
        { label: "Pragmatic starting choice", keywords: ["monolith", "monolithic", "simple", "deadline", "faster"], marks: 2 },
        { label: "Evolution path", keywords: ["refactor", "microservices", "evolve", "modular"], marks: 2 },
        { label: "Trade-off", keywords: ["scaling", "bottleneck", "traction", "maintenance"], marks: 1 },
      ] },
      { id: "q4c", title: "c) Kubernetes orchestration", prompt: "Explain how Kubernetes Deployments and Services help operate containerized applications.", marks: 5, rubric: [
        { label: "Deployment desired state", keywords: ["deployment", "desired state", "replica", "scaling"], marks: 3 },
        { label: "Service networking", keywords: ["service", "load balancer", "network", "pod"], marks: 2 },
      ] },
      { id: "q4d", title: "d) Infrastructure as Code", prompt: "Define IaC and explain its benefits for configuration consistency, version control, and environments.", marks: 5, rubric: [
        { label: "Definition", keywords: ["infrastructure as code", "iac", "code files", "provision"], marks: 2 },
        { label: "Consistency and version control", keywords: ["consistent", "version control", "git", "history"], marks: 2 },
        { label: "Repeatable environments", keywords: ["automated", "testing", "staging", "production", "repeatable"], marks: 1 },
      ] },
    ],
  },
];

export const cloudPaperAnswerSheet: Record<string, string> = {
  q1a: "Key points: high capital expenditure for physical infrastructure; long procurement and installation cycles; over-provisioning wastes capacity during quiet periods while under-provisioning causes bottlenecks during peaks; cooling and maintenance add ongoing cost.",
  q1b: "Public Cloud is provider-operated, multi-tenant, elastic, and pay-as-you-go, but provides less physical control. Private Cloud is dedicated to one organisation and can support tighter control and compliance, but costs more and requires greater management. The trade-off is convenience and elasticity versus control and operational overhead.",
  q1c: "For a managed database PaaS, the provider secures physical facilities, hardware, network infrastructure, host OS, and database-engine patching. The customer remains responsible for data classification, schemas, credentials, IAM permissions, database configuration, firewall rules, and application access. This is a reduced customer burden compared with self-managed IaaS.",
  q2a: "Software Defined Security manages controls such as access, segmentation, firewalls, and detection through software and policy. It can automatically apply compliance rules as resources change and continuously monitor traffic to detect and respond to threats.",
  q2b: "A strong banking flow combines something you know (password or PIN), something you have (authenticator-app OTP, phone, or hardware token), and something you are (fingerprint, face, or iris). The identity provider validates each factor before issuing a session.",
  q2c: "OLTP handles many small operational transactions with simple queries, highly normalised tables, and sub-second response expectations. OLAP supports historical analysis with large, complex queries, often denormalised structures, and longer reporting queries.",
  q2d: "Metrics show numerical behaviour such as CPU, memory, and latency. Events show state changes and significant occurrences. Logs record detailed activity for audit and troubleshooting. Threshold alerts notify operators or trigger remediation when values such as error rate or CPU cross safe limits.",
  q3a: "Cloud migration is the structured movement of IT workloads or assets to cloud services. Discovery inventories workloads and dependencies; planning selects architecture, priorities, risks, and migration waves; validation tests functionality, performance, security, and recovery after migration.",
  q3b: "Replatforming makes limited changes, such as moving a database to RDS, and is faster with lower risk. Refactoring redesigns the application for cloud-native services such as microservices or serverless and gives greater long-term scalability, but costs more and takes longer. Choose based on urgency, technical debt, risk, and expected business value.",
  q3c: "Cloud-native applications are designed for elasticity, automation, resilience, observability, and independent deployment. Distributed microservices allow teams to scale and release parts independently and isolate some failures, although they add networking and operational complexity.",
  q3d: "Redis stores frequently requested data in high-speed memory, reducing repeated reads from the primary database. This lowers latency and absorbs traffic spikes, protecting database connections and compute resources. Cache invalidation, expiry, consistency, and memory limits must still be managed.",
  q4a: "VMs run a complete guest OS on a hypervisor, making them heavier and slower to start. Containers share the host kernel and isolate processes with namespaces and cgroups, so they are lightweight and portable. Copy-on-Write shares unchanged image layers and creates a writable layer only for modifications.",
  q4b: "A monolith is usually faster and simpler for a startup under a tight deadline. It can later be modularised and refactored into microservices when scaling bottlenecks, team boundaries, or independent deployment needs become clear. Immediate microservices offer isolation and independent scaling but introduce distributed-system complexity.",
  q4c: "Kubernetes Deployments declare the desired number and version of replicas and reconcile drift. Pods are the smallest deployable units containing one or more containers. Services provide stable discovery and load balancing to Pods. When a worker node fails, controllers reschedule replacement Pods on healthy nodes and Services continue routing to available replicas.",
  q4d: "IaC provisions infrastructure from version-controlled code instead of manual steps. It can define cloud resources such as networks and databases, OS or host packages and settings, and application deployments and environment configuration. This improves consistency, reviewability, repeatability, and automated promotion across environments.",
};

export type EssayQuestion = {
  id: string;
  title: string;
  prompt: string;
  marks: number;
  rubric: RubricCriterion[];
};

export type EssaySection = {
  id: string;
  title: string;
  scenario: string;
  questions: EssayQuestion[];
};

export const cloudEssaySections: EssaySection[] = [
  {
    id: "architecture-migration",
    title: "Question 1 · Cloud Architecture, Services & Migration Strategy",
    scenario: "Nexus Retail is a fast-growing e-commerce enterprise with aging on-premises infrastructure. During Black Friday, traffic bottlenecks, high latency, and crashes occur because scalability and availability are limited.",
    questions: [
      { id: "essay-1a", title: "a) On-premises limitations", prompt: "Discuss three critical financial and operational limitations of maintaining on-premises infrastructure during high-demand surges.", marks: 6, rubric: [
        { label: "Capital expenditure", keywords: ["capex", "capital expenditure", "hardware cost", "upfront"], marks: 2 },
        { label: "Capacity and scaling", keywords: ["capacity", "scalability", "over-provision", "under-provision", "traffic"], marks: 2 },
        { label: "Operations and procurement", keywords: ["procurement", "maintenance", "cooling", "downtime", "lead time"], marks: 2 },
      ] },
      { id: "essay-1b", title: "b) 3-tier multi-AZ architecture", prompt: "Explain how a 3-tier architecture deployed across multiple Availability Zones can remove single points of failure and achieve high availability.", marks: 7, rubric: [
        { label: "Three tiers", keywords: ["presentation", "application", "database", "3-tier", "three tier"], marks: 2 },
        { label: "Multiple AZ design", keywords: ["availability zone", "multi-az", "multiple az", "redundant"], marks: 2 },
        { label: "Traffic distribution and failover", keywords: ["load balancer", "failover", "health check", "auto scaling"], marks: 2 },
        { label: "No single point of failure", keywords: ["single point of failure", "high availability", "fault tolerant"], marks: 1 },
      ] },
      { id: "essay-1c", title: "c) AWS 6 R migration strategies", prompt: "Evaluate Rehost, Replatform, and Refactor/Re-architect, then recommend the best strategy for the legacy monolithic database.", marks: 6, rubric: [
        { label: "Rehost", keywords: ["rehost", "lift and shift", "as-is"], marks: 1 },
        { label: "Replatform", keywords: ["replatform", "lift-tinker", "managed database", "rds"], marks: 2 },
        { label: "Refactor", keywords: ["refactor", "re-architect", "microservices", "serverless"], marks: 1 },
        { label: "Reasoned recommendation", keywords: ["recommend", "legacy", "risk", "cost", "migration"], marks: 2 },
      ] },
      { id: "essay-1d", title: "d) Shared Responsibility: IaaS to PaaS", prompt: "Explain how operational and security responsibilities shift from self-managed VMs (IaaS) to a managed database service (PaaS).", marks: 6, rubric: [
        { label: "Provider responsibility", keywords: ["provider", "physical", "hardware", "data center", "database engine", "patch"], marks: 2 },
        { label: "Customer responsibility", keywords: ["customer", "data", "identity", "iam", "access", "firewall"], marks: 2 },
        { label: "Shift from IaaS to PaaS", keywords: ["iaas", "paas", "managed", "operational burden", "responsibility"], marks: 2 },
      ] },
    ],
  },
  {
    id: "security-iam",
    title: "Question 2 · Cloud Security, Identity Management & Monitoring",
    scenario: "As a Cloud Security Engineer at a multinational financial institution, you must overhaul access controls, secure customer data, and implement proactive observability.",
    questions: [
      { id: "essay-2a", title: "a) Principle of Least Privilege and IAM", prompt: "Explain PLOP and discuss how Users, Groups, Roles, and Policies enforce it.", marks: 6, rubric: [
        { label: "Least privilege definition", keywords: ["least privilege", "minimum", "only required", "plop"], marks: 2 },
        { label: "Users and groups", keywords: ["user", "group", "permissions"], marks: 2 },
        { label: "Roles and policies", keywords: ["role", "policy", "temporary", "assume"], marks: 2 },
      ] },
      { id: "essay-2b", title: "b) FIM vs SSO", prompt: "Compare Federated Identity Management and Single Sign-On, giving an ideal corporate use case for each.", marks: 6, rubric: [
        { label: "FIM", keywords: ["federated identity", "security domain", "identity provider", "organization"], marks: 2 },
        { label: "SSO", keywords: ["single sign-on", "one login", "multiple applications"], marks: 2 },
        { label: "Comparison and use cases", keywords: ["compare", "use case", "corporate", "saas"], marks: 2 },
      ] },
      { id: "essay-2c", title: "c) Multi-layered financial-data security", prompt: "Design a strategy using MFA with at least three factors, encryption at rest and in transit, and Software Defined Security.", marks: 7, rubric: [
        { label: "Three MFA factors", keywords: ["password", "pin", "token", "otp", "fingerprint", "biometric", "something you know", "something you have", "something you are"], marks: 3 },
        { label: "Encryption at rest and in transit", keywords: ["at rest", "in transit", "tls", "https", "encryption", "key"], marks: 2 },
        { label: "Software Defined Security", keywords: ["software defined security", "sds", "segmentation", "automated", "threat"], marks: 2 },
      ] },
      { id: "essay-2d", title: "d) Metrics, Events, Logs and alerts", prompt: "Discuss the importance of Metrics, Events, and Logs, and explain how threshold alerts protect against breaches or performance degradation.", marks: 6, rubric: [
        { label: "Metrics", keywords: ["metrics", "cpu", "memory", "latency"], marks: 2 },
        { label: "Events and logs", keywords: ["events", "logs", "audit", "troubleshoot"], marks: 2 },
        { label: "Threshold alerting", keywords: ["threshold", "alert", "notification", "breach", "degradation", "remediation"], marks: 2 },
      ] },
    ],
  },
  {
    id: "microservices",
    title: "Question 3 · Microservices, Containerization & Cloud-Native Architectures",
    scenario: "A fintech startup is designing a payment platform requiring massive concurrency, fast scaling, rapid deployments, and strict fault isolation.",
    questions: [
      { id: "essay-3a", title: "a) Microservices vs monolith", prompt: "Compare the architectures across scalability, deployment complexity, and fault isolation.", marks: 7, rubric: [
        { label: "Scalability", keywords: ["scalability", "independent scale", "scale service", "monolith"], marks: 2 },
        { label: "Deployment complexity", keywords: ["deployment", "deploy", "independent", "complexity", "pipeline"], marks: 2 },
        { label: "Fault isolation", keywords: ["fault isolation", "failure", "blast radius", "resilience"], marks: 2 },
        { label: "Balanced comparison", keywords: ["trade-off", "advantage", "disadvantage"], marks: 1 },
      ] },
      { id: "essay-3b", title: "b) Day-one architecture decision", prompt: "Evaluate starting with microservices immediately versus starting with a monolith and refactoring later, considering time-to-market and client urgency.", marks: 6, rubric: [
        { label: "Monolith benefits", keywords: ["monolith", "faster", "simple", "time-to-market"], marks: 2 },
        { label: "Microservices benefits", keywords: ["microservices", "scale", "independent", "fault"], marks: 2 },
        { label: "Contextual recommendation", keywords: ["recommend", "startup", "urgency", "refactor", "trade-off"], marks: 2 },
      ] },
      { id: "essay-3c", title: "c) Containers vs VMs", prompt: "Explain the differences in OS virtualization, resource overhead, and Copy-on-Write.", marks: 6, rubric: [
        { label: "Operating-system virtualization", keywords: ["kernel", "guest operating system", "hypervisor", "namespace", "container"], marks: 2 },
        { label: "Resource overhead and startup", keywords: ["overhead", "lightweight", "startup", "portable"], marks: 2 },
        { label: "Copy-on-Write", keywords: ["copy-on-write", "cow", "image layer", "shared layer"], marks: 2 },
      ] },
      { id: "essay-3d", title: "d) Kubernetes orchestration", prompt: "Discuss Deployments, Pods, and Services, and explain how Kubernetes maintains desired state and handles worker-node failures.", marks: 6, rubric: [
        { label: "Pods", keywords: ["pod", "container", "smallest"], marks: 2 },
        { label: "Deployments and desired state", keywords: ["deployment", "desired state", "replica", "rolling"], marks: 2 },
        { label: "Services and node failure", keywords: ["service", "load balancer", "node failure", "reschedule", "self-heal"], marks: 2 },
      ] },
    ],
  },
  {
    id: "iac-framework",
    title: "Question 4 · IaC, Well-Architected Framework & Innovation",
    scenario: "An enterprise software firm is modernizing its lifecycle through DevOps automation, cloud-agnostic infrastructure definitions, and multi-cloud integration for global expansion.",
    questions: [
      { id: "essay-4a", title: "a) Barriers to IT innovation", prompt: "Describe three barriers to innovation in traditional corporate environments and explain how cloud computing enables rapid innovation.", marks: 6, rubric: [
        { label: "Traditional barriers", keywords: ["bureaucracy", "risk", "legacy", "budget", "skills", "resistance", "barrier"], marks: 3 },
        { label: "Cloud as enabler", keywords: ["cloud", "rapid", "agility", "prototype", "pay as you go", "scalability"], marks: 3 },
      ] },
      { id: "essay-4b", title: "b) IaC configuration tiers", prompt: "Define IaC and analyze its impact across Cloud Provider, OS/Host, and Application configuration tiers.", marks: 7, rubric: [
        { label: "IaC definition", keywords: ["infrastructure as code", "iac", "code", "provision"], marks: 2 },
        { label: "Cloud provider tier", keywords: ["cloud provider", "network", "vpc", "storage", "compute"], marks: 2 },
        { label: "OS/Host and application tiers", keywords: ["operating system", "host", "application", "configuration"], marks: 2 },
        { label: "Automation and consistency", keywords: ["repeatable", "version control", "consistent", "devops"], marks: 1 },
      ] },
      { id: "essay-4c", title: "c) Well-Architected Framework", prompt: "Evaluate how the Reliability and Cost Optimization pillars help architects build robust cloud workloads.", marks: 6, rubric: [
        { label: "Reliability", keywords: ["reliability", "fault", "recover", "availability", "backup", "multi-az"], marks: 3 },
        { label: "Cost Optimization", keywords: ["cost optimization", "cost", "right-size", "utilization", "pay as you go"], marks: 2 },
        { label: "Balanced workload outcome", keywords: ["robust", "architecture", "trade-off", "monitor"], marks: 1 },
      ] },
      { id: "essay-4d", title: "d) Multi-cloud integration", prompt: "Define Multi-Cloud Integration and discuss two advantages and two challenges of integrating data and applications across providers.", marks: 6, rubric: [
        { label: "Definition", keywords: ["multi-cloud", "multiple cloud", "providers", "integration"], marks: 2 },
        { label: "Advantages", keywords: ["avoid lock-in", "resilience", "availability", "best of breed", "cost"], marks: 2 },
        { label: "Challenges", keywords: ["complexity", "latency", "security", "data transfer", "interoperability", "skills"], marks: 2 },
      ] },
    ],
  },
];

export const cloudEssayAnswerSheet: Record<string, string> = {
  "essay-1a": "On-premises systems require high upfront CAPEX for servers, networking, cooling, and facilities. Hardware procurement and installation take a long time, so capacity cannot respond quickly to seasonal demand. Organisations must either over-provision for rare peaks or under-provision and suffer latency, outages, and wasted maintenance costs during normal periods.",
  "essay-1b": "Use a presentation tier behind a load balancer, an application tier deployed across at least two Availability Zones, and a database tier using a Multi-AZ managed database with automated failover. Health checks and Auto Scaling distribute traffic and replace unhealthy instances. Because each tier has redundant instances in separate AZs, the failure of one instance or AZ does not create a single point of failure.",
  "essay-1c": "Rehost moves the database as-is and is the fastest, lowest-change option, but preserves many operational limitations. Replatform moves it to a managed service such as Amazon RDS with limited application changes, reducing administration and improving backups and availability. Refactoring or re-architecting redesigns the system for cloud-native services, but costs more and carries greater migration risk. For a legacy monolithic database, replatforming is usually the best first step because it reduces operational burden without the risk of a complete redesign.",
  "essay-1d": "With IaaS, Nexus manages the guest operating system, patches, database software, configuration, access, and data, while the provider protects physical facilities and underlying hardware. With PaaS, the provider also manages the database engine, host operating system, patching, backups options, and much of the availability platform. Nexus still owns its data, identities, IAM policies, schemas, credentials, application queries, and network access rules. The provider secures the cloud; Nexus secures what it puts in the cloud.",
  "essay-2a": "The Principle of Least Privilege grants each identity only the minimum permissions required for its current job. Users represent individual identities, Groups attach common permissions to teams, Roles provide controlled and often temporary permissions for services or trusted users, and Policies define the exact allowed or denied actions on resources. Together they avoid permanent broad access and make permissions easier to review and revoke.",
  "essay-2b": "SSO lets one authenticated user access multiple applications without logging in repeatedly, usually inside one organisation through a central identity provider. FIM extends trust between separate security domains or organisations, allowing an identity from one provider to access another organisation's applications using federation protocols. A company-wide SaaS portal is a good SSO use case; a university or partner organisation accessing a bank or business platform is a good FIM use case.",
  "essay-2c": "Require MFA using something the user knows, such as a password or PIN; something the user has, such as a hardware token or authenticator-app OTP; and something the user is, such as a fingerprint or facial biometric. Encrypt customer records at rest with managed keys and encrypt connections in transit with TLS. Use Software Defined Security for policy-driven segmentation, automated access controls, continuous monitoring, and automated threat response.",
  "essay-2d": "Metrics are numerical measurements such as CPU, latency, memory, and request rate. Events record important state changes, while logs provide detailed audit and troubleshooting evidence. Threshold alerts notify operators or trigger remediation when values cross safe limits, such as high error rate or unusual login activity. Combined telemetry supports early detection of performance degradation, suspicious behaviour, and possible breaches.",
  "essay-3a": "A monolith is deployed as one unit and commonly scales as a whole; microservices scale only the busy service. Monolith deployments are simpler initially but any change may require rebuilding and deploying the entire application, while microservices support independent deployments but require service discovery, CI/CD, observability, and network management. A monolith can have a large failure blast radius, whereas microservices can isolate failures, although distributed systems introduce communication and operational complexity.",
  "essay-3b": "A monolith is usually the practical starting point for a small team under urgent delivery pressure because it is faster to develop, test, deploy, and understand. Immediate microservices can provide independent scaling and fault isolation, but add distributed-system and operations complexity before the product is proven. Start with clear module boundaries in a monolith, then extract high-load or independently changing modules into microservices when real scaling and team needs justify the cost.",
  "essay-3c": "VMs virtualise complete guest operating systems on a hypervisor, so each VM has a larger memory and storage overhead and slower startup. Docker containers share the host kernel and isolate processes with namespaces and cgroups, making them lightweight, portable, and fast to start. Copy-on-Write lets image layers be shared as read-only data; a container creates a private writable layer only when it changes a file, reducing duplication and storage use.",
  "essay-3d": "A Pod is Kubernetes' smallest deployable unit and contains one or more co-located containers. A Deployment declares the desired number and version of Pod replicas and continuously reconciles the cluster to that state, supporting rolling updates and replacement. A Service gives stable networking and load balancing to matching Pods. If a worker node fails, the scheduler and Deployment controller recreate or reschedule replicas on healthy nodes while the Service continues routing traffic.",
  "essay-4a": "Common barriers include bureaucracy and slow approval processes, fear of failure or resistance to change, limited budgets and skills, and dependency on inflexible legacy systems. Cloud computing enables innovation through on-demand self-service, elastic capacity, managed services, rapid experimentation, automation, global reach, and pay-as-you-go pricing. Teams can prototype quickly without waiting for physical infrastructure procurement.",
  "essay-4b": "Infrastructure as Code defines infrastructure in version-controlled, repeatable code rather than manual console steps. At the cloud-provider tier it provisions networks, compute, storage, IAM, and databases. At the OS/host tier it configures images, packages, patches, users, and runtime settings. At the application tier it defines deployments, environment variables, policies, and service configuration. This creates consistent, reviewable, automated environments across development, staging, and production.",
  "essay-4c": "The Reliability pillar designs workloads to recover from failures through multiple AZs or regions, health checks, backups, monitoring, automated recovery, and tested runbooks. Cost Optimization measures usage, removes waste, right-sizes resources, selects suitable pricing models, and uses elasticity so capacity follows demand. Used together, these pillars balance resilience with sustainable spending instead of buying maximum capacity everywhere.",
  "essay-4d": "Multi-Cloud Integration connects applications, identities, networks, and data across two or more cloud providers. Advantages include reduced vendor lock-in, access to best-of-breed services, improved resilience, and geographic flexibility. Challenges include provider-specific APIs and skills, interoperability and governance complexity, cross-cloud latency and data-transfer cost, duplicated security controls, and difficult data consistency and compliance management.",
};
