import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ activeProject = null }) => {
  return (
    <aside className="bg-gray-100 w-64 h-full min-h-screen p-4 border-r border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              All Projects
            </NavLink>
          </li>
        </ul>
      </div>

      {activeProject && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Menu</h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to={`/projects/${activeProject.id}`}
                end
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/projects/${activeProject.id}/tasks`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/projects/${activeProject.id}/timeline`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`
                }
              >
                Timeline
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;