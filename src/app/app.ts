import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="w-screen h-screen bg-slate-500 p-4">
      <router-outlet/>
    </div>
  `
})
export class App {
}
