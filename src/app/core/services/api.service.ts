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
  createBlankProject(presets: any) {
    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)
    //   .set('Content-Type', 'application/json');
    const result = this.http.post<any>(
      `${environments.development.apiUrl}/projects/create`,
      presets
      // { headers }
    );

    return firstValueFrom(result);
  }
  createProjectByUpload(file: File) {
    const image = new FormData();
    console.log(file);
    image.append('image', file);
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.tokenService.getAccessToken()}`
    // );
    const result = this.http.post<any>(
      `${environments.development.apiUrl}/projects/upload`,
      image
    );
    return firstValueFrom(result);
  }
  updateProject() {}
  getLayers(projectId: string) {
    const result = this.http.get<any>(
      `${environments.development.apiUrl}/projects/${projectId}/layers`
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
  deleteProject(projectId: string) {
    return firstValueFrom(
      this.http.delete(
        `${environments.development.apiUrl}/projects/${projectId}`
      )
    );
  }

  saveProject() {}

  layerViaCopy(projectId: string, layerId: string, points: number[]) {
    const data = {
      points,
    };
    return firstValueFrom(
      this.http.post(
        `${environments.development.apiUrl}/layers/${projectId}/${layerId}/selection/layer-via-copy`,
        data
      )
    );
  }
}
