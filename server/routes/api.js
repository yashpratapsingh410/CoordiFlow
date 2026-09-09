import express from 'express';
const router = express.Router();

// Simulated In-Memory Database fallback if MongoDB Atlas is not yet connected
let memoryProjects = [
  {
    id: "proj-1",
    name: "E-Commerce Platform",
    code: "ECOMM",
    status: "Active",
    deadline: "2026-09-25",
    description: "Multi-vendor retail platform with authentication and payment gateway integration.",
    tasksCount: 17,
    teamCount: 6,
    progress: 68
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
    progress: 42
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
    progress: 85
  }
];

let memoryAlert = {
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
      severity: "HIGH",
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
      severity: "MEDIUM",
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

let memoryTimeline = [
  {
    id: "mem-1",
    timestamp: "12:20 PM",
    user: "Pushkar",
    role: "Tester",
    action: "uploaded 'Testing_Guidelines.pdf'",
    type: "file",
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

// Routes

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', system: 'CoordiFlow Coordination Intelligence API', version: '1.0.0' });
});

// GET /api/projects
router.get('/projects', (req, res) => {
  res.json({ success: true, projects: memoryProjects });
});

// GET /api/alerts/current
router.get('/alerts/current', (req, res) => {
  res.json({ success: true, alert: memoryAlert });
});

// POST /api/alerts/impact-analysis (Simulate new change event & calculate cascade)
router.post('/alerts/impact-analysis', (req, res) => {
  const { eventTitle, triggeredBy, reason, highTask, medTask } = req.body;

  const newAlert = {
    id: `alert-${Date.now()}`,
    eventTitle: eventTitle || "Project Deadline Changed: 20 Sept → 25 Sept",
    triggeredBy: triggeredBy || "Aman (Manager)",
    triggerRole: "Manager",
    triggerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    timestamp: "Just now",
    reason: reason || "Resource Re-allocation",
    project: "E-Commerce Platform",
    impacts: [
      {
        id: `imp-${Date.now()}-1`,
        severity: "HIGH",
        taskName: highTask || "Login API & Auth Service (Delayed)",
        affectedStakeholder: "Pushkar",
        stakeholderRole: "Tester",
        stakeholderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        notified: false,
        reassigned: false,
        assignedTo: "Pushkar (Tester)",
        impactDetails: "Automated regression suite blocked. Requires immediate test script review.",
        actionButtons: ["Notify Pushkar", "Re-assign"]
      },
      {
        id: `imp-${Date.now()}-2`,
        severity: "MEDIUM",
        taskName: medTask || "User Profile UI & Documentation",
        affectedStakeholder: "Saksham",
        stakeholderRole: "Designer",
        stakeholderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        notified: false,
        reassigned: false,
        assignedTo: "Saksham (Designer)",
        impactDetails: "UI wireframe adjustment needed to map new API specs.",
        actionButtons: ["Notify Saksham"]
      }
    ]
  };

  memoryAlert = newAlert;
  res.status(201).json({ success: true, message: "Impact Analysis generated!", alert: memoryAlert });
});

// PATCH /api/alerts/notify
router.patch('/alerts/notify', (req, res) => {
  const { impactId, stakeholderName } = req.body;
  if (memoryAlert && memoryAlert.impacts) {
    memoryAlert.impacts = memoryAlert.impacts.map((imp) =>
      imp.id === impactId ? { ...imp, notified: true } : imp
    );
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newLog = {
    id: `mem-${Date.now()}`,
    timestamp: timeStr,
    user: "Yash",
    role: "Dev",
    action: `sent coordination alert to ${stakeholderName}`,
    type: "alert",
    meta: `Automated REST API Notification • ID ${impactId}`,
    iconType: "send",
    badgeColor: "bg-emerald-100 text-emerald-800"
  };

  memoryTimeline.unshift(newLog);
  res.json({ success: true, message: `Notified ${stakeholderName}`, memoryItem: newLog });
});

// PATCH /api/alerts/reassign
router.patch('/alerts/reassign', (req, res) => {
  const { impactId, newAssignee, note } = req.body;
  if (memoryAlert && memoryAlert.impacts) {
    memoryAlert.impacts = memoryAlert.impacts.map((imp) =>
      imp.id === impactId
        ? { ...imp, reassigned: true, assignedTo: newAssignee }
        : imp
    );
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newLog = {
    id: `mem-${Date.now()}`,
    timestamp: timeStr,
    user: "Yash",
    role: "Dev",
    action: `re-assigned task to ${newAssignee}`,
    type: "task",
    meta: note ? `Reason: ${note}` : "Reassigned via Node.js API",
    iconType: "user",
    badgeColor: "bg-purple-100 text-purple-800"
  };

  memoryTimeline.unshift(newLog);
  res.json({ success: true, message: `Re-assigned to ${newAssignee}`, memoryItem: newLog });
});

// GET /api/memory
router.get('/memory', (req, res) => {
  res.json({ success: true, memory: memoryTimeline });
});

// POST /api/memory
router.post('/memory', (req, res) => {
  const { actionText, type } = req.body;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newLog = {
    id: `mem-${Date.now()}`,
    timestamp: timeStr,
    user: "Yash",
    role: "Dev",
    action: actionText || "updated project log",
    type: type || "status",
    meta: "Logged via Node.js Backend API",
    iconType: "clock",
    badgeColor: "bg-indigo-100 text-indigo-800"
  };

  memoryTimeline.unshift(newLog);
  res.status(201).json({ success: true, memoryItem: newLog });
});

export default router;
