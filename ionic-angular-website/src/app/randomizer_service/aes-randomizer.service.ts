import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AesRandomizerService {
  private _CytU = CryptoJS.enc.Utf8;
  private _CytUPs = CryptoJS.enc.Utf8.parse;
  private _CytHPs = CryptoJS.enc.Hex.parse;
  private _CytMode = CryptoJS.mode.CBC;
  private _CytPad = CryptoJS.pad.Pkcs7;
  private _CytE = CryptoJS.AES.encrypt;
  private _CytD = CryptoJS.AES.decrypt;
  private keySize = 32;

  private ky = this._CytHPs(
    process.env['AES_KEY'] || '0123456789ABCDEFGHIJKLMNOPQRSTUV'
  );
  private iv = this._CytHPs(
    process.env['AES_IV'] || '0123456789ABCDEFGHIJKLMNOPQRSTUV'
  );

  // below values changes with change in AES key
  public static pnkyStr: string = '3pRxuMzQA6VYUrqPVH0muA==';  // 'PSTpin'
  public static emptyStr: string = 'MoZJct4882q5xtkXPcCZzA==';

  constructor() {}

  applyRandomizer(normalStr: string): string {
    var randomizedStr = this._CytE(this._CytUPs(normalStr), this.ky, {
      keySize: this.keySize,
      iv: this.iv,
      mode: this._CytMode,
      padding: this._CytPad,
    });
    return randomizedStr.toString();
  }

  applyRandomizerWithKey(normalStr: string, hexky: string): string {
    var randomizedStr = this._CytE(
      this._CytUPs(normalStr),
      this._CytHPs(hexky),
      {
        keySize: this.keySize,
        iv: this.iv,
        mode: this._CytMode,
        padding: this._CytPad,
      }
    );
    return randomizedStr.toString();
  }

  removeRandomizer(randomizedStr: string): string {
    var normalValue = this._CytD(randomizedStr, this.ky, {
      keySize: this.keySize,
      iv: this.iv,
      mode: this._CytMode,
      padding: this._CytPad,
    });
    return normalValue.toString(this._CytU);
  }

  removeRandomizerWithKey(randomizedStr: string, hexky: string): string {
    var normalValue = this._CytD(randomizedStr, this._CytHPs(hexky), {
      keySize: this.keySize,
      iv: this.iv,
      mode: this._CytMode,
      padding: this._CytPad,
    });
    return normalValue.toString(this._CytU);
  }
}
