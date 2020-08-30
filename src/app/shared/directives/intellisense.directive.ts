import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appIntellisense]'
})
export class IntellisenseDirective implements OnChanges {
    @Input() suggestions = [] as string[];

    @Output() changeEmit = new EventEmitter<any>();
    @Output() selectedEmit = new EventEmitter<string>();

    valueChange$ = new Subject<any>();
    isActive = false;

    constructor(private renderer: Renderer2, private e: ElementRef) {
        this.listenToValueChanges();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('suggestions' in changes) {
            if (this.suggestions.length > 0) {
                this.displaySuggestions();
            } else {
                this.removeSuggestionsIfExists();
            }
        }
    }

    @HostListener('focus')
    onFocus() {
        this.isActive = true;
        this.valueChange$.next();
        this.displaySuggestions();
    }

    @HostListener('blur')
    onBlur() {
        setTimeout(() => {
            this.isActive = false;
            this.removeSuggestionsIfExists();
        }, 200);
    }

    @HostListener('window:keyup')
    inputChanges() {
        if (!this.isActive) {
            return;
        }
        this.valueChange$.next();
    }

    private listenToValueChanges() {
        this.valueChange$
            .pipe(debounceTime(200))
            .subscribe(() => this.changeEmit.emit());
    }

    displaySuggestions() {
        if (!this.isActive || !this.suggestions.length) {
            return;
        }

        this.removeSuggestionsIfExists();

        const parent = this.e.nativeElement.parentElement;
        const container = this.renderer.createElement('div');
        this.renderer.appendChild(parent, container);
        this.renderer.addClass(container, 'suggestions-container');

        const ul = this.renderer.createElement('ul');
        this.renderer.appendChild(container, ul);
        this.renderer.addClass(ul, 'suggestions-list');

        this.suggestions.forEach(s => {
            const li = this.renderer.createElement('li');
            this.renderer.appendChild(ul, li);
            this.renderer.addClass(li, 'suggestions-item');

            if (this.e.nativeElement.value === s) {
                this.renderer.addClass(li, 'active');
            }

            li.addEventListener('click', () => {
                this.selectedEmit.emit(s);
            });

            const span = this.renderer.createElement('span');
            this.renderer.appendChild(li, span);
            this.renderer.addClass(span, 'text-center');

            const text = this.renderer.createText(s);
            this.renderer.appendChild(span, text);
        });
    }

    private removeSuggestionsIfExists() {
        const parent = this.e.nativeElement.parentElement;
        const suggestionsContainer = parent.querySelector(`.suggestions-container`);
        if (suggestionsContainer) {
            this.renderer.removeChild(parent, suggestionsContainer);
        }
    }
}
