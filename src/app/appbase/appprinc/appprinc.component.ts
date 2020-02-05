import { Component} from '@angular/core';


@Component({
    selector: 'app-princroot',
    templateUrl: './appprinc.component.html'
})
export class AppprincComponent  {

    constructor() {
    }

    sidebarActive: boolean;

    onMenuButtonClick(event: Event) {
        this.sidebarActive = !this.sidebarActive;
        event.preventDefault();
    }


    onMaskClick(event: Event) {
        this.sidebarActive = !this.sidebarActive;
        event.preventDefault();
    }

}
