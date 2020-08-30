import { OnInit, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PAGINATION_PAGE_SIZES } from '../../constants';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input() isLoading = false;

    @Input() page = 0;
    @Input() pageSize = 20;
    @Input() totalPages = 1;
    @Input() position = 'right';

    @Input() totalItems = 0;

    @Output() pageChangeEmit = new EventEmitter<any>();

    paginationSizes = PAGINATION_PAGE_SIZES;

    pageHop;
    size;

    constructor() { }

    ngOnInit() {
        this.pageHop = this.page + 1;
        this.size = this.pageSize;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('page' in changes) {
            this.pageHop = this.page + 1;
        }

        if ('pageSize' in changes) {
            this.size = this.pageSize;
        }
    }

    get Start() {
        return (this.page * this.pageSize) + 1;
    }

    get End() {
        if (this.page === this.totalPages - 1) {
            return this.totalItems;
        } else {
            return (this.page + 1) * this.pageSize;
        }
    }

    get PageHops() {
        const pageHops = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pageHops.push(i);
        }
        return pageHops;
    }

    emitFirstPage() {
        if (this.page === 0) { return; }
        this.pageChangeEmit.emit({ page: 0, size: +this.size });
    }

    emitPreviousPage() {
        if (this.page === 0) { return; }
        this.pageChangeEmit.emit({ page: --this.page, size: +this.size });
    }

    emitNextPage() {
        if (this.page === this.totalPages - 1) { return; }
        this.pageChangeEmit.emit({ page: ++this.page, size: +this.size });
    }

    emitLastPage() {
        if (this.page === this.totalPages - 1) { return; }
        this.pageChangeEmit.emit({ page: this.totalPages - 1, size: +this.size });
    }

    emitPageHop() {
        this.pageChangeEmit.emit({ page: +this.pageHop - 1, size: +this.size });
    }

    emitSizeChange() {
        this.pageHop = 1;
        this.pageChangeEmit.emit({ page: 0, size: +this.size });
    }
}
