import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from '../constants';

@Injectable({ providedIn: 'root' })
export class LocationService {
    private resourceUrl = `${SERVER_API_URL}/locations`;

    private cache$ = {} as any;

    constructor(private http: HttpClient) { }

    getProvinces(): Observable<string[]> {
        const cache = this.getCache();
        if (cache) {
            return of(cache);
        }
        return this.http.post<any>(this.resourceUrl, {}, { observe: 'response' })
            .pipe(
                map(({ body }) => body),
                tap(values => {
                    if (values && values.length > 0) {
                        this.cache$.provinces = values;
                    }
                })
            );
    }

    getMunicipality(targetProvince: string): Observable<string[]> {
        const cacheKey = `${targetProvince}`;
        const cache = this.getCache(targetProvince);
        if (cache) {
            return of(cache);
        }
        return this.http.post<any>(this.resourceUrl, { province: targetProvince }, { observe: 'response' })
            .pipe(
                map(({ body }) => body),
                tap(values => {
                    if (values && values.length > 0) {
                        this.cache$[cacheKey] = values;
                    }
                })
            );
    }

    getBarangay(targetProvince: string, targetMunicipality: string): Observable<string[]> {
        const cacheKey = `${targetProvince}-${targetMunicipality}`;
        const cache = this.getCache(cacheKey);
        if (cache) {
            return of(cache);
        }
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(this.resourceUrl, { province: targetProvince, municipality: targetMunicipality }, { observe: 'response' })
            .pipe(
                map(({ body }) => body),
                tap(values => {
                    if (values && values.length > 0) {
                        this.cache$[cacheKey] = values;
                    }
                })
            );
    }

    private getCache(key?: string) {
        if (key !== undefined) {
            return this.cache$[key];
        } else {
            return this.cache$.provinces;
        }
    }
}
