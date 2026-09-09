/**
 * CoordiFlow Frontend API Service Client
 * Connects React frontend to Node.js/Express backend on http://localhost:5000/api
 */

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCurrentAlert = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/current`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.alert;
  } catch (err) {
    console.warn('Backend API unavailable, using local state fallback');
    return null;
  }
};

export const postImpactAnalysis = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/impact-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.alert;
  } catch (err) {
    console.warn('Backend API unavailable, using local state fallback');
    return null;
  }
};

export const patchNotifyStakeholder = async (impactId, stakeholderName) => {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/notify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ impactId, stakeholderName })
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const patchReassignTask = async (impactId, newAssignee, note) => {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/reassign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ impactId, newAssignee, note })
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchProjectMemory = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.memory;
  } catch (err) {
    return null;
  }
};

export const postProjectMemory = async (actionText, type) => {
  try {
    const res = await fetch(`${API_BASE_URL}/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionText, type })
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.memoryItem;
  } catch (err) {
    return null;
  }
};
