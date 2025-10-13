import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  getMockPortfolio() {
    return {
      name: 'Pravin Patil',
      role: 'Java Full Stack Developer',
      summary: 'Hands-on experience with Spring Boot and Angular projects.',
      projects: [
        { title: 'Banking Microservices', summary: 'Spring Cloud + Eureka architecture' },
        { title: 'Document Dashboard', summary: 'Angular document generation module' }
      ]
    };
  }
}
