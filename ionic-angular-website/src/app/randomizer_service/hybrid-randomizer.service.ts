import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { RsaRandomizerService } from './rsa-randomizer.service';
import { AesRandomizerService } from './aes-randomizer.service';

@Injectable({
  providedIn: 'root',
})
export class HybridRandomizerService {
  constructor(
    private rdService: RsaRandomizerService,
    private ardService: AesRandomizerService
  ) {}

  applyRandomizer(normalStr: string): string {
    let cipher = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
    // console.log({ cipher });
    let enc_data = this.ardService.applyRandomizerWithKey(normalStr, cipher);
    let _k = this.rdService.applyRandomizer(cipher);
    let dataWrap = { enc_data, _k };
    return this.ardService.applyRandomizer(JSON.stringify(dataWrap));
  }

  removeRandomizer(randomizedStr: string): string {
    const data = JSON.parse(this.ardService.removeRandomizer(randomizedStr));
    const { enc_data, _k } = data;
    let decr_k = this.rdService.removeRandomizer(_k);
    return this.ardService.removeRandomizerWithKey(enc_data, decr_k);
  }
}
