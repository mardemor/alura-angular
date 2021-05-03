import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Component({
    selector: 'app-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    
    private _url: string | undefined | null;

    // SETTER
    @Input() set url(url: string | undefined | null) {        
        if (!url?.startsWith('data')) {
            this._url = API + '/imgs/' + url;           
        }
        else {
            this._url = url;
        }        
    }
    
    // GETTER
    get url(): string | undefined | null {
        return this._url;
    }

    @Input() description = '';
}