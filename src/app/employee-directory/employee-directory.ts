import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  branch: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  hireDate: string;
  shift?: string;
  recentActivity?: string[];
}

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.html',
  styleUrls: ['./employee-directory.css'],
  standalone: false
})
export class EmployeeDirectory implements OnInit {
  employees: Employee[] = [
    {
      id: 'EMP-001',
      name: 'Juan Dela Cruz',
      position: 'Head Chef',
      department: 'Kitchen',
      branch: 'SM Megamall',
      email: 'juan.dc@manginasal.com',
      phone: '+63 912 345 6789',
      status: 'Active',
      hireDate: '2020-03-15',
      shift: 'Morning Shift',
      recentActivity: ['Completed inventory check', 'Trained 2 new cooks']
    },
    {
      id: 'EMP-002',
      name: 'Maria Santos',
      position: 'Restaurant Manager',
      department: 'Management',
      branch: 'Robinsons Galleria',
      email: 'maria.s@manginasal.com',
      phone: '+63 917 234 5678',
      status: 'Active',
      hireDate: '2019-08-20',
      recentActivity: ['Updated employee schedule', 'Conducted team meeting']
    },
    {
      id: 'EMP-003',
      name: 'Pedro Reyes',
      position: 'Grill Master',
      department: 'Kitchen',
      branch: 'Trinoma',
      email: 'pedro.r@manginasal.com',
      phone: '+63 918 345 6789',
      status: 'Active',
      hireDate: '2021-05-10',
      shift: 'Evening Shift',
      recentActivity: ['Prepared 150+ chicken orders', 'Maintained grill station']
    },
    {
      id: 'EMP-004',
      name: 'Ana Lim',
      position: 'Cashier',
      department: 'Service',
      branch: 'SM North EDSA',
      email: 'ana.l@manginasal.com',
      phone: '+63 919 456 7890',
      status: 'Active',
      hireDate: '2022-01-15',
      shift: 'Morning Shift',
      recentActivity: ['Processed 200+ transactions', 'Balanced cash drawer']
    },
    {
      id: 'EMP-005',
      name: 'Jose Garcia',
      position: 'Service Crew',
      department: 'Service',
      branch: 'Glorietta 5',
      email: 'jose.g@manginasal.com',
      phone: '+63 920 567 8901',
      status: 'Active',
      hireDate: '2022-06-30',
      shift: 'Evening Shift',
      recentActivity: ['Served 50+ tables', 'Cleaned dining area']
    },
    {
      id: 'EMP-006',
      name: 'Sofia Tan',
      position: 'Sous Chef',
      department: 'Kitchen',
      branch: 'Greenbelt 5',
      email: 'sofia.t@manginasal.com',
      phone: '+63 921 678 9012',
      status: 'On Leave',
      hireDate: '2021-11-05',
      shift: 'Morning Shift',
      recentActivity: ['Prepared special menu items', 'Supervised food prep']
    },
    {
      id: 'EMP-007',
      name: 'Miguel Cruz',
      position: 'Inventory Manager',
      department: 'Management',
      branch: 'SM Mall of Asia',
      email: 'miguel.c@manginasal.com',
      phone: '+63 922 789 0123',
      status: 'Active',
      hireDate: '2020-09-12',
      recentActivity: ['Ordered supplies', 'Conducted inventory audit']
    },
    {
      id: 'EMP-008',
      name: 'Carmen Reyes',
      position: 'Food Server',
      department: 'Service',
      branch: 'Power Plant Mall',
      email: 'carmen.r@manginasal.com',
      phone: '+63 923 890 1234',
      status: 'Inactive',
      hireDate: '2023-02-28',
      shift: 'Evening Shift',
      recentActivity: ['Trained on new POS system']
    }
  ];

  filteredEmployees: Employee[] = [];
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedEmployee: Employee | null = null;

  ngOnInit() {
    this.filteredEmployees = [...this.employees];
  }

  // Get counts by department
  getCountByDepartment(department: string): number {
    return this.employees.filter(e => e.department === department).length;
  }

  // Get avatar URL
  getAvatarUrl(employee: Employee): string {
    if (employee.avatar) {
      return employee.avatar;
    }
    // Generate avatar based on name
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=10B981&color=fff&size=128`;
  }

  // Get department badge class
  getDepartmentBadgeClass(department: string): string {
    switch(department) {
      case 'Kitchen': return 'bg-blue-100 text-blue-800';
      case 'Service': return 'bg-yellow-100 text-yellow-800';
      case 'Management': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  // Search function
  onSearch() {
    this.filterEmployees();
  }

  // Department filter
  onDepartmentFilter() {
    this.filterEmployees();
  }

  // Combined filter function
  filterEmployees() {
    let filtered = [...this.employees];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.branch.toLowerCase().includes(query)
      );
    }

    // Apply department filter
    if (this.selectedDepartment) {
      filtered = filtered.filter(employee => employee.department === this.selectedDepartment);
    }

    this.filteredEmployees = filtered;
  }

  // Clear all filters
  clearFilters() {
    this.searchQuery = '';
    this.selectedDepartment = '';
    this.filteredEmployees = [...this.employees];
  }

  // View employee details
  onViewEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  // Edit employee
  onEditEmployee(employee: Employee) {
    alert(`Edit ${employee.name} - This feature is under development`);
    // In real app, open edit form/modal
  }

  // Delete employee
  onDeleteEmployee(employeeId: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.id !== employeeId);
      this.filterEmployees();
      alert('Employee deleted successfully');
    }
  }

  // Add new employee
  onAddEmployee() {
    alert('Add Employee feature is under development');
    // In real app, open add form/modal
  }
}