import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Employee {
  employeeNumber: string;
  fullName: string;
  gender: 'Male' | 'Female';
  email: string;
  employmentStatus: 'Active' | 'Inactive' | 'On Leave';
  salary: number;
  position?: string;
  avatar?: string;
  department?: string;
  branch?: string;
  hireDate?: string;
}

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.html',
  styleUrls: ['./employee-directory.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EmployeeDirectory implements OnInit {
  employees: Employee[] = [
    {
      employeeNumber: 'EMP-2024-001',
      fullName: 'Juan Dela Cruz',
      gender: 'Male',
      email: 'juan.dc@manginasal.com',
      employmentStatus: 'Active',
      salary: 45000,
      position: 'Head Chef',
      department: 'Kitchen',
      branch: 'SM Megamall'
    },
    {
      employeeNumber: 'EMP-2024-002',
      fullName: 'Maria Santos',
      gender: 'Female',
      email: 'maria.s@manginasal.com',
      employmentStatus: 'Active',
      salary: 55000,
      position: 'Restaurant Manager',
      department: 'Management',
      branch: 'Robinsons Galleria'
    },
    {
      employeeNumber: 'EMP-2024-003',
      fullName: 'Pedro Reyes',
      gender: 'Male',
      email: 'pedro.r@manginasal.com',
      employmentStatus: 'Active',
      salary: 35000,
      position: 'Grill Master',
      department: 'Kitchen',
      branch: 'Trinoma'
    },
    {
      employeeNumber: 'EMP-2024-004',
      fullName: 'Ana Lim',
      gender: 'Female',
      email: 'ana.l@manginasal.com',
      employmentStatus: 'Active',
      salary: 25000,
      position: 'Cashier',
      department: 'Service',
      branch: 'SM North EDSA'
    },
    {
      employeeNumber: 'EMP-2024-005',
      fullName: 'Jose Garcia',
      gender: 'Male',
      email: 'jose.g@manginasal.com',
      employmentStatus: 'Inactive',
      salary: 22000,
      position: 'Service Crew',
      department: 'Service',
      branch: 'Glorietta 5'
    },
    {
      employeeNumber: 'EMP-2024-006',
      fullName: 'Sofia Tan',
      gender: 'Female',
      email: 'sofia.t@manginasal.com',
      employmentStatus: 'On Leave',
      salary: 40000,
      position: 'Sous Chef',
      department: 'Kitchen',
      branch: 'Greenbelt 5'
    },
    {
      employeeNumber: 'EMP-2024-007',
      fullName: 'Miguel Cruz',
      gender: 'Male',
      email: 'miguel.c@manginasal.com',
      employmentStatus: 'Active',
      salary: 48000,
      position: 'Inventory Manager',
      department: 'Management',
      branch: 'SM Mall of Asia'
    },
    {
      employeeNumber: 'EMP-2024-008',
      fullName: 'Carmen Reyes',
      gender: 'Female',
      email: 'carmen.r@manginasal.com',
      employmentStatus: 'Active',
      salary: 23000,
      position: 'Food Server',
      department: 'Service',
      branch: 'Power Plant Mall'
    },
    {
      employeeNumber: 'EMP-2024-009',
      fullName: 'Antonio Bautista',
      gender: 'Male',
      email: 'antonio.b@manginasal.com',
      employmentStatus: 'Active',
      salary: 32000,
      position: 'Assistant Manager',
      department: 'Management',
      branch: 'Ayala Center'
    },
    {
      employeeNumber: 'EMP-2024-010',
      fullName: 'Lourdes Mendoza',
      gender: 'Female',
      email: 'lourdes.m@manginasal.com',
      employmentStatus: 'Inactive',
      salary: 21000,
      position: 'Cleaner',
      department: 'Maintenance',
      branch: 'Market Market'
    }
  ];

  filteredEmployees: Employee[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedGender: string = '';
  minSalary: number = 15000;
  maxSalary: number = 100000;

  ngOnInit() {
    this.filteredEmployees = [...this.employees];
  }

  // Data binding: Get counts
  getGenderCount(gender: 'Male' | 'Female'): number {
    return this.employees.filter(e => e.gender === gender).length;
  }

  getTotalSalary(): number {
    return this.employees.reduce((total, emp) => total + emp.salary, 0);
  }

  getFilteredSalaryTotal(): number {
    return this.filteredEmployees.reduce((total, emp) => total + emp.salary, 0);
  }

  // Search function
  onSearch() {
    this.filterEmployees();
  }

  // Filter functions
  onStatusFilter() {
    this.filterEmployees();
  }

  onGenderFilter() {
    this.filterEmployees();
  }

  onSalaryFilter() {
    this.filterEmployees();
  }

  // Combined filter function using conditional logic
  filterEmployees() {
    let filtered = [...this.employees];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(employee =>
        employee.fullName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.employeeNumber.toLowerCase().includes(query) ||
        (employee.position && employee.position.toLowerCase().includes(query))
      );
    }

    // Apply employment status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(employee => 
        employee.employmentStatus === this.selectedStatus
      );
    }

    // Apply gender filter
    if (this.selectedGender) {
      filtered = filtered.filter(employee => 
        employee.gender === this.selectedGender
      );
    }

    // Apply salary filter
    filtered = filtered.filter(employee => 
      employee.salary <= this.maxSalary && employee.salary >= this.minSalary
    );

    this.filteredEmployees = filtered;
  }

  // Clear all filters
  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedGender = '';
    this.maxSalary = 100000;
    this.filteredEmployees = [...this.employees];
  }

  // CRUD operations
  onViewEmployee(employee: Employee) {
    alert(`Viewing: ${employee.fullName}\nEmployee #: ${employee.employeeNumber}\nSalary: ₱${employee.salary.toLocaleString()}`);
  }

  onEditEmployee(employee: Employee) {
    alert(`Editing: ${employee.fullName}\nThis would open an edit form in a real application`);
  }

  onDeleteEmployee(employeeNumber: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.employeeNumber !== employeeNumber);
      this.filterEmployees();
      alert('Employee deleted successfully');
    }
  }

  onAddEmployee() {
    alert('Add Employee form would open here');
    // In real app, this would open a modal/form
  }
}