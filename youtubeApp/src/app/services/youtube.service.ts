import { YoutubeResponse, Video } from './../models/youtube.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAsAcNgXrdKIxsFUKfDaxO1x9C2-Jub_tY';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('maxResults', '10')
      .set('pageToken', this.nextPageToken)
      .set('playlistId', this.playList);

    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((response) => {
          this.nextPageToken = response.nextPageToken;
          return response.items;
        }),
        map((items) => {
          return items.map((video) => video.snippet);
        })
      );
  }
}


