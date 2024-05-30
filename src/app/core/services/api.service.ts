import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Project, ProjectPreset } from 'src/app/types/project';
import { environments } from '../../../../environments';
import { Observable, firstValueFrom } from 'rxjs';
import { IPixel } from 'src/app/types/pixel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getProjects() {
    let projects: Project[] = [];
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.tokenService.getAccessToken()}`
    );
    return this.http.get(`${environments.apiUrl}/projects`, {
      headers,
    });
  }

  getProject(id: string) {
    const result = this.http.get(`${environments.apiUrl}/projects/${id}`);
    return firstValueFrom(result);
  }

  uploadLayer(projectId: string, file: File) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.tokenService.getAccessToken()}`
    );
    const formData = new FormData();
    formData.append('image', file);
    const result = this.http.post(
      `${environments.apiUrl}/layers/upload/${projectId}`,
      formData,
      { headers }
    );
    return firstValueFrom(result);
  }
  getTemplates() {
    const result = firstValueFrom(
      this.http.get(`${environments.apiUrl}/templates`)
    );
    return result;
  }
  createBlankProject(presets: any) {
    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)
    //   .set('Content-Type', 'application/json');
    const result = this.http.post<any>(
      `${environments.apiUrl}/projects/create`,
      presets
      // { headers }
    );

    return firstValueFrom(result);
  }
  createProjectByUpload(file: File) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.tokenService.getAccessToken()}`
    );
    const image = new FormData();
    image.append('image', file);

    return this.http.post<any>(
      `${environments.apiUrl}/projects/upload`,
      image,
      { headers }
    );
  }
  updateProject() {}
  getLayers(projectId: string) {
    const result = this.http.get<any>(
      `${environments.apiUrl}/projects/${projectId}/layers`
    );
    return firstValueFrom(result);
  }

  createBlankLayer(projectId: string) {
    const result = this.http.post<any>(
      `${environments.apiUrl}/layers/create/${projectId}`,
      {}
    );
    return firstValueFrom(result);
  }
  deleteProject(projectId: string) {
    return firstValueFrom(
      this.http.delete(`${environments.apiUrl}/projects/${projectId}`)
    );
  }

  saveProject() {}

  layerViaCopy(projectId: string, layerId: string, points: number[]) {
    const data = {
      points,
    };
    return firstValueFrom(
      this.http.post(
        `${environments.apiUrl}/layers/${projectId}/${layerId}/selection/layer-via-copy`,
        data
      )
    );
  }
}
