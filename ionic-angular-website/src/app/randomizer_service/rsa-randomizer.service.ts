import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class RsaRandomizerService {
  private publicKey: string = (
    process.env['REQ_PUBLIC_KEY'] || 'REQ_PUBLIC_KEY'
  ).replace(/\\n/g, '\n');
  
  private privateKey: string = (
    process.env['RES_PRIVATE_KEY'] || 'RES_PRIVATE_KEY'
  ).replace(/\\n/g, '\n');

  constructor() {}

  applyRandomizer(normalStr: string): string {
    const rsa_cipher = Forge.pki.publicKeyFromPem(this.publicKey);
    let encrypt = rsa_cipher.encrypt(normalStr, 'RSA-OAEP', {
      md: Forge.md.sha256.create(),
      mgf1: {
        md: Forge.md.sha256.create(),
      },
    });
    // return window.btoa(encrypt);
    return Buffer.from(encrypt, 'binary').toString('base64');
  }

  removeRandomizer(randomizedStr: string): string {
    const rsa_cipher = Forge.pki.privateKeyFromPem(this.privateKey);
    // let encrypt = window.atob(randomizedStr)
    let encryptBuff = Buffer.from(randomizedStr, 'base64').toString('binary');
    let decrypted = rsa_cipher.decrypt(encryptBuff, 'RSA-OAEP', {
      md: Forge.md.sha256.create(),
      mgf1: {
        md: Forge.md.sha256.create(),
      },
    });
    return decrypted;
  }
}
