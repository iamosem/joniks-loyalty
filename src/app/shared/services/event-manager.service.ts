import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventManagerService {
    events = {} as { string: Subject<any> };

    subscribe(event: string, callback, err?) {
        if (!(event in this.events)) {
            this.events[event] = new Subject<string>();
        }
        const evt: Subject<string> = this.events[event];
        return evt.subscribe(() => callback(), (e) => {
            if (err) {
                err(e);
            }
        });
    }

    broadcast(event: string, message) {
        if (event in this.events) {
            const evt: Subject<string> = this.events[event];
            evt.next(message);
        }
    }
}
