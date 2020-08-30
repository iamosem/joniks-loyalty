import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent {
  @Input() class = 'inline';
  @Input() mode = 'indeterminate';
  @Input() color = 'warn';

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}
}
