import mongoose from 'mongoose';
import 'dotenv/config';
import Project from './models/Project.js';
import ChangeEvent from './models/ChangeEvent.js';
import ProjectMemory from './models/ProjectMemory.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coordiflow';

export const seedDatabase = async () => {
  try {
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      console.log('🌱 Seeding initial CoordiFlow MongoDB datasets...');

      await Project.insertMany([
        {
          code: "ECOMM",
          name: "E-Commerce Platform",
          status: "Active",
          deadline: "2026-09-25",
          description: "Multi-vendor retail platform with authentication and payment gateway integration.",
          tasksCount: 17,
          teamCount: 6,
          progress: 68
        },
        {
          code: "HOSP",
          name: "Hospital App",
          status: "Active",
          deadline: "2026-10-15",
          description: "Patient management and appointment scheduling mobile app.",
          tasksCount: 12,
          teamCount: 4,
          progress: 42
        },
        {
          code: "PORT",
          name: "Portfolio Portal",
          status: "Active",
          deadline: "2026-11-01",
          description: "Interactive architecture showcase dashboard.",
          tasksCount: 5,
          teamCount: 3,
          progress: 85
        }
      ]);

      await ChangeEvent.create({
        eventTitle: "Project Deadline Changed: 20 Sept → 25 Sept",
        triggeredBy: "Aman (Manager)",
        triggerRole: "Manager",
        triggerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
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
      });

      await ProjectMemory.insertMany([
        {
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
          timestamp: "10:30 AM",
          user: "Yash",
          role: "Dev",
          action: "created a new task 'User Registration API'",
          type: "task",
          meta: "Backend Services • Priority: High",
          iconType: "plus",
          badgeColor: "bg-emerald-100 text-emerald-700"
        }
      ]);

      console.log('✅ MongoDB database successfully seeded with initial CoordiFlow data!');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};
