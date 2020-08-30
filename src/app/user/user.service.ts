import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../shared/constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { createRequestOption } from '../shared/helper/request.util';
import { User } from '../shared/models/user.model';

type EntityResponseType = HttpResponse<User>;
type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({ providedIn: 'root' })
export class UserService {
    private resourceUrl = `${SERVER_API_URL}/user`;

    constructor(private http: HttpClient) { }

    create(user: User): Observable<EntityResponseType> {
        return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: User): Observable<EntityResponseType> {
        return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<User>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<User>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    authenticate(username: string, password: string): Observable<EntityResponseType> {
        // tslint:disable-next-line:max-line-length
        return this.http.post<User>(`${this.resourceUrl}/authenticate`, { username, password }, { observe: 'response' });
    }

    changePassword(user: User): Observable<EntityResponseType> {
        // tslint:disable-next-line:max-line-length
        return this.http.post<User>(`${this.resourceUrl}/changepassword`, user, { observe: 'response' });
    }
}
