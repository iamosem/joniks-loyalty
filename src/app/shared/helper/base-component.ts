import { OnDestroy, OnInit } from '@angular/core';

export class BaseComponent implements OnInit, OnDestroy {
  subscriptions: any[] = [];

  handleSubscription(sub: any) {
    this.subscriptions.push(sub);
  }

  ngOnInit() {
    this.loadScript('../../../assets/js/common.js');
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((item, index, object) => {
        if (item) {
          item.unsubscribe();
          object.splice(index, 1);
        }
      });
    }
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    var scripts = body.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src').includes('common.js')
      ) {
        body.removeChild(scripts[i]);
      }
    }

    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
