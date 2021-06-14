import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponseInterface } from '../../interfaces/responses/search-response.interface';
import { environment } from '../../../../../environments/environment.prod';
import {RawQueryInterface} from '../../interfaces/requests/raw-query.interface';


@Injectable({providedIn: 'root'})
export class QueryService {

  baseUrlSearch: string = environment.hostname + environment.rawQueryBaseUrl + environment.rawQueryVersion;

  private queryBasedStudyUrl = this.baseUrlSearch + environment.rawQueryStudyUrl;
  private queryBasedObjectUrl = this.baseUrlSearch + environment.rawQueryObjectUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  getRawQueryStudies(searchParams: RawQueryInterface){
    return this.http.post<SearchResponseInterface>(this.queryBasedStudyUrl, searchParams);
  }

  getRawQueryObjects(searchParams: RawQueryInterface){
    return this.http.post<SearchResponseInterface>(this.queryBasedObjectUrl, searchParams);
  }

}
