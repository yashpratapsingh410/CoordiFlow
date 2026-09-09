import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_PROJECTS,
  INITIAL_KPI_STATS,
  INITIAL_CHANGE_ALERT,
  INITIAL_PROJECT_MEMORY,
  TEAM_MEMBERS,
  TASKS_LIST
} from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(INITIAL_PROJECTS[0]);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [kpiStats, setKpiStats] = useState(INITIAL_KPI_STATS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Intelligent Change Alert Hero State
  const [changeAlert, setChangeAlert] = useState(INITIAL_CHANGE_ALERT);
  
  // Project Memory Vertical Timeline State
  const [projectMemory, setProjectMemory] = useState(INITIAL_PROJECT_MEMORY);
  
  // Tasks and Team State
  const [tasks, setTasks] = useState(TASKS_LIST);
  const [teamMembers] = useState(TEAM_MEMBERS);
  
  // Modals & Notifications
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [impactToReassign, setImpactToReassign] = useState(null);
  const [simulateModalOpen, setSimulateModalOpen] = useState(false);
  const [architectureModalOpen, setArchitectureModalOpen] = useState(false);
  
  // Notification Bell Badge & Dropdown
  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Deadline Shift Alert',
      message: 'Aman changed E-Commerce deadline to 25 Sept',
      time: '10 min ago',
      read: false
    }
  ]);
  
  // Toasts Queue
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Action: Notify Stakeholder (e.g. Priya or Rahul)
  const notifyStakeholder = (impactId, stakeholderName) => {
    setChangeAlert((prev) => ({
      ...prev,
      impacts: prev.impacts.map((imp) =>
        imp.id === impactId ? { ...imp, notified: true } : imp
      )
    }));

    // Log to Project Memory timeline
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMemoryItem = {
      id: `mem-${Date.now()}`,
      timestamp: timeStr,
      user: 'Yash',
      role: 'Dev',
      action: `sent coordination alert to ${stakeholderName}`,
      type: 'alert',
      meta: `Impact Alert #${impactId} • Automated Notification Sent`,
      iconType: 'send',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    };

    setProjectMemory((prev) => [newMemoryItem, ...prev]);
    addToast(`Notification sent successfully to ${stakeholderName}!`, 'success');
  };

  // Action: Open Re-assign Modal
  const openReassignModal = (impactItem) => {
    setImpactToReassign(impactItem);
    setReassignModalOpen(true);
  };

  // Action: Submit Re-assignment
  const submitReassignment = (impactId, newAssignee, note) => {
    setChangeAlert((prev) => ({
      ...prev,
      impacts: prev.impacts.map((imp) =>
        imp.id === impactId
          ? {
              ...imp,
              reassigned: true,
              assignedTo: newAssignee,
              reassignedTo: newAssignee
            }
          : imp
      )
    }));

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMemoryItem = {
      id: `mem-${Date.now()}`,
      timestamp: timeStr,
      user: 'Yash',
      role: 'Dev',
      action: `re-assigned task '${impactToReassign?.taskName || 'Task'}' to ${newAssignee}`,
      type: 'task',
      meta: note ? `Reason: ${note}` : 'Reassigned via Coordination Intelligence',
      iconType: 'user',
      badgeColor: 'bg-purple-100 text-purple-800'
    };

    setProjectMemory((prev) => [newMemoryItem, ...prev]);
    setReassignModalOpen(false);
    setImpactToReassign(null);
    addToast(`Task successfully re-assigned to ${newAssignee}`, 'success');
  };

  // Action: Add new memory note
  const addProjectMemoryItem = (actionText, type = 'status') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMemoryItem = {
      id: `mem-${Date.now()}`,
      timestamp: timeStr,
      user: 'Yash',
      role: 'Dev',
      action: actionText,
      type: type,
      meta: 'Manual entry • CoordiFlow Activity Log',
      iconType: type === 'file' ? 'file' : type === 'task' ? 'plus' : 'clock',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    };

    setProjectMemory((prev) => [newMemoryItem, ...prev]);
    addToast('Activity logged into Project Memory!', 'info');
  };

  // Action: Simulate a new change event
  const simulateNewChangeEvent = (eventData) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      eventTitle: eventData.eventTitle || 'Project Deadline Changed: 20 Sept → 25 Sept',
      triggeredBy: eventData.triggeredBy || 'Aman (Manager)',
      triggerRole: 'Manager',
      triggerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      reason: eventData.reason || 'Schedule Adjustments & Resource Shift',
      project: selectedProject.name,
      impacts: [
        {
          id: `imp-${Date.now()}-1`,
          severity: 'HIGH',
          taskName: eventData.highTask || 'Login API & Auth Service (Delayed)',
          affectedStakeholder: 'Pushkar',
          stakeholderRole: 'Tester',
          stakeholderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          notified: false,
          reassigned: false,
          assignedTo: 'Pushkar (Tester)',
          impactDetails: 'Backend regression block requires immediate test script rerun.',
          actionButtons: ['Notify Pushkar', 'Re-assign']
        },
        {
          id: `imp-${Date.now()}-2`,
          severity: 'MEDIUM',
          taskName: eventData.medTask || 'User Profile UI & Documentation',
          affectedStakeholder: 'Saksham',
          stakeholderRole: 'Designer',
          stakeholderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          notified: false,
          reassigned: false,
          assignedTo: 'Saksham (Designer)',
          impactDetails: 'UI specs sync needed for updated form validation flow.',
          actionButtons: ['Notify Saksham']
        }
      ]
    };

    setChangeAlert(newAlert);
    setSimulateModalOpen(false);
    addToast('Simulated new Intelligent Change Alert!', 'warning');
  };

  const markNotificationRead = (id) => {
    setUnreadNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProject,
        setSelectedProject,
        projects,
        kpiStats,
        searchQuery,
        setSearchQuery,
        changeAlert,
        projectMemory,
        tasks,
        teamMembers,
        reassignModalOpen,
        setReassignModalOpen,
        impactToReassign,
        simulateModalOpen,
        setSimulateModalOpen,
        architectureModalOpen,
        setArchitectureModalOpen,
        unreadNotifications,
        markNotificationRead,
        toasts,
        addToast,
        removeToast,
        notifyStakeholder,
        openReassignModal,
        submitReassignment,
        addProjectMemoryItem,
        simulateNewChangeEvent
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
