import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  public categories = ['user heroes list', 'battles history', 'power ups'];
  public activeContainer = 'user heroes list';

  constructor() {}

  public setCategory(category: string) {
    this.activeContainer = category;
  }
}
