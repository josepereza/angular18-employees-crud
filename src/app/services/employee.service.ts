import { Injectable, signal } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  employees = signal<Employee[]>([]);

  getEmployees() {
    return this.employees();
  }

  addEmployee(employee: Omit<Employee, 'id'>) {
    const newEmployee = { ...employee, id: this.generateId() };
    this.employees.update(employees => [...employees, newEmployee]);
    console.log('Employee added:', newEmployee);
    this.logEmployees();
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employees.update(employees =>
      employees.map(emp => emp.id === updatedEmployee.id ? { ...updatedEmployee } : emp)
    );
    console.log('Employee updated:', updatedEmployee);
    this.logEmployees();
  }
  deleteEmployee(id: number) {
    this.employees.update(employees => employees.filter(emp => emp.id !== id));
  }

  private generateId(): number {
    return this.employees().length > 0
      ? Math.max(...this.employees().map(emp => emp.id)) + 1
      : 1;
  }
  // Debug method
  logEmployees() {
    console.log('Current employees:', this.employees());
  }
}
