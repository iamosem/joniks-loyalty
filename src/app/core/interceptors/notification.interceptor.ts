import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationDialogComponent } from 'src/app/layouts/notification/notification-dialog.component';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

    constructor(private router: Router, private modalService: NgbModal) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const arr = event.headers.keys();
                        let type = null;
                        let message = null;
                        let time = null;
                        let template = null;
                        let obj = null;
                        arr.forEach(entry => {
                            if (entry.toLowerCase().endsWith('app-alert-type')) {
                                type = event.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-alert-message')) {
                                message = event.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-alert-time')) {
                                time = event.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-template')) {
                                template = event.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-object')) {
                                obj = event.headers.get(entry);
                            }
                        });
                        if (type && message) {
                            if (typeof type === 'string' && typeof message === 'string') {
                                this.showDialog(message, type, time, template, obj);
                            }
                        }
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        const arr = err.headers.keys();
                        let type = null;
                        let message = null;
                        let time = null;
                        let template = null;
                        let obj = null;
                        arr.forEach(entry => {
                            if (entry.toLowerCase().endsWith('app-alert-type')) {
                                type = err.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-alert-message')) {
                                message = err.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-alert-time')) {
                                time = err.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-template')) {
                                template = err.headers.get(entry);
                            } else if (entry.toLowerCase().endsWith('app-object')) {
                                obj = err.headers.get(entry);
                            }
                        });
                        if (type && message) {
                            if (typeof type === 'string' && typeof message === 'string') {
                                this.showDialog(message, type, time, template, obj);
                            }
                        }
                    }
                }
            )
        );
    }

    private showDialog(message: string, type: string, time: any, template: any, obj: any) {
        const modalRef = this.modalService.open(NotificationDialogComponent as Component, {
            size: 'sm',
            backdrop: true
        });
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.type = type;
        modalRef.componentInstance.time = time;
        modalRef.componentInstance.template = template;
        modalRef.componentInstance.obj = obj;
    }
}
