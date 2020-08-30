import { BaseComponent } from '../../helper/base-component';
import { Input, Component, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent extends BaseComponent implements OnChanges {
    @Input() isLoading = false;
    @Input() data = [] as any[];

    @Input() columnDef = [] as any[];
    @Input() columnActions = [] as any[];

    @Input() collection = {} as any;

    @Input() templates = {} as any;

    @Input() enableCheckbox = true;

    @Output() checkedChangeEmit = new EventEmitter<any>();
    @Output() actionEmit = new EventEmitter<any>();

    checked;
    checkAll = false;

    constructor() {
        super();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        super.ngOnInit();
        this.initChecked();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('data' in changes && this.data && this.data.length > 0) {
            this.initChecked();
            this.setCheckAll();
        }
    }

    private initChecked() {
        if (!this.enableCheckbox || !this.data) { return; }
        this.checked = this.data.reduce((obj, curr) => ({ ...obj, [curr.id]: false }), {});
    }

    selectAll() {
        if (!this.enableCheckbox || !this.data) { return; }
        this.checked = this.data.reduce((obj, curr) => ({ ...obj, [curr.id]: this.checkAll }), {});
        this.emitCheckedChange();
    }

    setCheckAll() {
        if (!this.checked) { return; }
        this.checkAll = !Object.keys(this.checked).some(k => !this.checked[k]);
        this.emitCheckedChange();
    }

    private emitCheckedChange() {
        if (!this.checked) { return; }
        this.checkedChangeEmit.emit(Object.keys(this.checked).reduce((obj, k) => this.checked[k] ? [...obj, k] : [...obj], []));
    }

    emitAction(fn, row) {
        this.actionEmit.emit({ fn, row });
    }

    getFieldValue(row, field, isNested) {
        if (isNested) {
            return field.reduce((obj, key) =>
                (obj && obj[key] !== 'undefined') ? obj[key] : undefined, row);
        } else {
            return row[field];
        }
    }

    countActiveActions(row) {
        return this.columnActions.filter(a => (a.condition && a.condition(row)) || !a.condition).length;
    }
}
