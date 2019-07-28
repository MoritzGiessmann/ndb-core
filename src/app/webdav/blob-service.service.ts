import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config';
import webdav from 'webdav';

@Injectable({
  providedIn: 'root'
})
export class BlobServiceService {

  private client: any;
  constructor() {
    // const { createClient } = require("webdav");

    this.client = webdav.createClient(
      AppConfig.settings.webdav.remote_url,
      {
        username: AppConfig.settings.webdav.username,
        password: AppConfig.settings.webdav.password
      }
    );
  }

  public async getDir() {
    try {
      const contents = await this.client.getDirectoryContents('');
      console.log(JSON.stringify(contents, undefined, 4));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Uploads a given image to the nextcloud server.
   * @param imageFile Image to be stored
   * @param path path where the image will be stored
   */
  public async setImage(imageFile: any, path: string) {
    await this.client.putFileContents(path, imageFile,
      {onUploadProgress: progress => {
      console.log(`Uploaded ${progress.loaded} bytes of ${progress.total}`);
      }}
    );
  }

  public async getImage(path: string): Promise<any> {
    return this.client.getFileContents(path);
  }

  /**
   * returns a download link for an image
   * @param path path of the image on server
   */
  public getImageDownloadLink(path: string): string {
    return this.client.getFileDownloadLink(path);
  }
}