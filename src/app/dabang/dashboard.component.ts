import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initCharts();
  }

  initCharts() {
    new Chart('docsChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Documents',
          data: [30, 45, 28, 60, 50, 75],
          backgroundColor: '#6c63ff'
        }]
      },
      options: { responsive: true }
    });

    new Chart('userChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Active Users',
          data: [120, 150, 170, 140, 180, 200, 220],
          borderColor: '#6c63ff',
          fill: false,
          tension: 0.3
        }]
      },
      options: { responsive: true }
    });
  }
}
