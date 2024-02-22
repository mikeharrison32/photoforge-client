import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Project, ProjectPreset } from 'src/app/types/project';
import { environments } from 'src/environments/environments';
import { Observable, firstValueFrom } from 'rxjs';
import { IPixel } from 'src/app/types/pixel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  getProjects() {
    // let projects: Project[] = [];
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.tokenService.getAccessToken()}`
    // );
    const RETRY_COUNT = new HttpContextToken(() => 3);
    const result = this.http.get(
      `${environments.development.apiUrl}/projects`,
      { context: new HttpContext().set(RETRY_COUNT, 5) }
    );
    return firstValueFrom(result);
  }
  createBlankProject(presets: ProjectPreset): Observable<any> {
    const body = presets;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)
      .set('Content-Type', 'application/json');
    return this.http.post<any>(
      `${environments.development.apiUrl}/projects/create-blank`,
      JSON.stringify(body),
      { headers }
    );
  }
  createProjectByUpload(file: File): Observable<any> {
    const image = new FormData();
    image.append('File', file);
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.tokenService.getAccessToken()}`
    // );
    return this.http.post<any>(
      `${environments.development.apiUrl}/projects/upload`,
      image
    );
  }
  updateProject() {}
  getLayers() {
    const result = this.http.get<any>(
      `${environments.development.apiUrl}/layers`
    );
    return firstValueFrom(result);
  }
  layerFromSelectionViaCopy(
    layerId: string,
    projectId: string,
    pixels: IPixel[]
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const result = this.http.post<any>(
      `${environments.development.apiUrl}/layers/${projectId}/${layerId}/selection/layer-via-copy`,
      JSON.stringify({
        Pixels: pixels,
      }),
      { headers }
    );
    console.log({ Pixels: pixels });
    return firstValueFrom(result);
  }
  layerFromSelectionViaCut(
    layerId: string,
    projectId: string,
    pixels: IPixel[]
  ) {
    const result = this.http.post<any>(
      `${environments.development.apiUrl}/layers/selection/layer-via-cut`,
      {
        layerId: layerId,
        projectId: projectId,
        pixels: pixels,
      }
    );
    return firstValueFrom(result);
  }
  createBlankLayer(projectId: string) {
    const result = this.http.post<any>(
      `${environments.development.apiUrl}/layers/${projectId}/create-blank`,
      {}
    );
    return firstValueFrom(result);
  }
  deleteProject() {}
}
