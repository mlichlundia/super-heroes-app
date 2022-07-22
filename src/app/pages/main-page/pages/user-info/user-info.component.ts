import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  public categories: string[] = [
    'user heroes list',
    'battles history',
    'power ups',
  ];
  public activeContainer: string = 'user heroes list';

  public setCategory(category: string): void {
    this.activeContainer = category;
  }
}
