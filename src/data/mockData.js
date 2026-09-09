/**
 * CoordiFlow Mock Data & MongoDB Schema Specifications
 * 
 * BACKEND INTEGRATION GUIDE (Node.js + Express + MongoDB/Mongoose):
 * -------------------------------------------------------------
 * Below are the primary data models that map directly to MongoDB collections:
 * 
 * 1. Projects Collection (`/api/projects`)
 *    Schema: { _id, title: String, status: String, code: String, activeTasks: Number, deadline: Date }
 * 
 * 2. ChangeEvents Collection (`/api/alerts/cascade`)
 *    Schema: {
 *      _id,
 *      eventTitle: String,        // e.g. "Project Deadline Changed: 20 Sept → 25 Sept"
 *      triggeredBy: { name: String, role: String, avatar: String },
 *      oldDate: String,
 *      newDate: String,
 *      projectCode: String,
 *      createdAt: Date,
 *      impacts: [
 *        {
 *          id: String,
 *          severity: "HIGH" | "MEDIUM" | "LOW",
 *          taskName: String,      // e.g. "Login API & Auth Service"
 *          statusNote: String,    // e.g. "Delayed"
 *          stakeholder: { name: String, role: String, email: String },
 *          notified: Boolean,
 *          reassigned: Boolean,
 *          reassignedTo: String
 *        }
 *      ]
 *    }
 * 
 * 3. ProjectMemory Collection (`/api/memory`)
 *    Schema: {
 *      _id,
 *      timestamp: String,         // e.g. "12:20 PM"
 *      author: String,            // e.g. "Pushkar"
 *      actionText: String,        // e.g. "uploaded 'Testing_Guidelines.pdf'"
 *      type: "file" | "status" | "task" | "alert",
 *      createdAt: Date
 *    }
 */

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "E-Commerce Platform",
    code: "ECOMM",
    status: "Active",
    deadline: "2026-09-25",
    description: "Multi-vendor retail platform with authentication and payment gateway integration.",
    tasksCount: 17,
    teamCount: 6,
    progress: 68,
  },
  {
    id: "proj-2",
    name: "Hospital App",
    code: "HOSP",
    status: "Active",
    deadline: "2026-10-15",
    description: "Patient management and appointment scheduling mobile app.",
    tasksCount: 12,
    teamCount: 4,
    progress: 42,
  },
  {
    id: "proj-3",
    name: "Portfolio Portal",
    code: "PORT",
    status: "Active",
    deadline: "2026-11-01",
    description: "Interactive architecture showcase dashboard.",
    tasksCount: 5,
    teamCount: 3,
    progress: 85,
  }
];

export const INITIAL_KPI_STATS = {
  activeProjects: 3,
  pendingTasks: 17,
  alerts: 1,
  completedThisWeek: 24,
};

export const INITIAL_CHANGE_ALERT = {
  id: "alert-101",
  eventTitle: "Project Deadline Changed: 20 Sept → 25 Sept",
  triggeredBy: "Aman (Manager)",
  triggerRole: "Manager",
  triggerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  timestamp: "Today, 09:45 AM",
  reason: "Material supply chain delay & Scope adjustments",
  project: "E-Commerce Platform",
  impacts: [
    {
      id: "imp-1",
      severity: "HIGH", // 🔴 HIGH
      taskName: "Login API & Auth Service (Delayed)",
      affectedStakeholder: "Pushkar",
      stakeholderRole: "Tester",
      stakeholderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      notified: false,
      reassigned: false,
      assignedTo: "Pushkar (Tester)",
      impactDetails: "Blocked backend automated regression suite. End-to-end integration delayed by 3 days.",
      actionButtons: ["Notify Pushkar", "Re-assign"]
    },
    {
      id: "imp-2",
      severity: "MEDIUM", // 🟡 MEDIUM
      taskName: "User Profile UI & Documentation",
      affectedStakeholder: "Saksham",
      stakeholderRole: "Designer",
      stakeholderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      notified: false,
      reassigned: false,
      assignedTo: "Saksham (Designer)",
      impactDetails: "Figma wireframe sync required to match new API authentication flow endpoints.",
      actionButtons: ["Notify Saksham"]
    }
  ]
};

export const INITIAL_PROJECT_MEMORY = [
  {
    id: "mem-1",
    timestamp: "12:20 PM",
    user: "Pushkar",
    role: "Tester",
    action: "uploaded 'Testing_Guidelines.pdf'",
    type: "file", // file upload
    meta: "Size: 2.4 MB • Section: QA Guidelines",
    iconType: "file",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: "mem-2",
    timestamp: "11:15 AM",
    user: "Saksham",
    role: "Designer",
    action: "changed task status 'Login UI' to In-Progress",
    type: "status",
    meta: "Sprint 4 • UI Components",
    iconType: "clock",
    badgeColor: "bg-amber-100 text-amber-700"
  },
  {
    id: "mem-3",
    timestamp: "10:30 AM",
    user: "Yash",
    role: "Dev",
    action: "created a new task 'User Registration API'",
    type: "task",
    meta: "Backend Services • Priority: High",
    iconType: "plus",
    badgeColor: "bg-emerald-100 text-emerald-700"
  }
];

export const TEAM_MEMBERS = [
  {
    id: "team-1",
    name: "Yash",
    role: "Dev",
    email: "yash.dev@coordiflow.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    status: "Online",
    activeTasks: 5,
    completedTasks: 34
  },
  {
    id: "team-2",
    name: "Aman",
    role: "Manager",
    email: "aman.manager@coordiflow.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Online",
    activeTasks: 2,
    completedTasks: 52
  },
  {
    id: "team-3",
    name: "Pushkar",
    role: "Tester",
    email: "pushkar.qa@coordiflow.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    status: "Busy",
    activeTasks: 4,
    completedTasks: 28
  },
  {
    id: "team-4",
    name: "Saksham",
    role: "Designer",
    email: "saksham.ui@coordiflow.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "Away",
    activeTasks: 6,
    completedTasks: 41
  }
];

export const TASKS_LIST = [
  {
    id: "task-1",
    title: "Login API & Auth Service",
    assignee: "Pushkar (Tester)",
    impact: "HIGH",
    status: "Delayed",
    dueDate: "2026-09-25",
    category: "Backend API"
  },
  {
    id: "task-2",
    title: "User Profile UI & Documentation",
    assignee: "Saksham (Designer)",
    impact: "MEDIUM",
    status: "In-Progress",
    dueDate: "2026-09-23",
    category: "Frontend UI"
  },
  {
    id: "task-3",
    title: "User Registration API",
    assignee: "Yash (Dev)",
    impact: "LOW",
    status: "In-Progress",
    dueDate: "2026-09-24",
    category: "Backend API"
  },
  {
    id: "task-4",
    title: "Testing Guidelines PDF Review",
    assignee: "Pushkar (Tester)",
    impact: "LOW",
    status: "Review",
    dueDate: "2026-09-22",
    category: "QA Documentation"
  }
];
