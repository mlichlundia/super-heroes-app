import { Injectable } from '@angular/core';
import { Power } from 'src/app/interfaces/power.interface';

@Injectable({
  providedIn: 'root',
})
export class PowerUpsService {
  private _powerUps: Power[] = [
    {
      title: 'Captain America shield',
      powerStatsName: 'durability',
      powerStatsValue: '10',
      usesLeft: 5,
      image:
        'https://pngimg.com/uploads/captain_america/captain_america_PNG85.png',
      isSpent: false,
    },
    {
      title: 'Mjolnir',
      powerStatsName: 'power',
      powerStatsValue: '10',
      usesLeft: 5,
      image: 'https://i.dlpng.com/static/png/6783321_preview.png',
      isSpent: false,
    },
    {
      title: 'Ironman nano armor',
      powerStatsName: 'combat',
      powerStatsValue: '10',
      usesLeft: 5,
      image:
        'https://imagensemoldes.com.br/wp-content/uploads/2020/05/Figura-Reator-Homem-de-Ferro-PNG.png',
      isSpent: false,
    },
    {
      title: "Dr. Strange's cloak",
      powerStatsName: 'intelligence',
      powerStatsValue: '10',
      usesLeft: 5,
      image:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf853092-d54d-4bd0-842b-1facd2b89c32/deor5vy-1ed1f627-7178-4f60-b18a-f426fa8eb91a.png/v1/fill/w_836,h_956,strp/doctor_strange_supreme__what_if_____png_by_iwasboredsoididthis_deor5vy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY0NiIsInBhdGgiOiJcL2ZcL2JmODUzMDkyLWQ1NGQtNGJkMC04NDJiLTFmYWNkMmI4OWMzMlwvZGVvcjV2eS0xZWQxZjYyNy03MTc4LTRmNjAtYjE4YS1mNDI2ZmE4ZWI5MWEucG5nIiwid2lkdGgiOiI8PTY2ODYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.gckGROhskqwB-aFI1KbG2NdaOtZVr4oqH-SxyYh2-qI',
      isSpent: false,
    },
    {
      title: "Green lantern's ring",
      powerStatsName: 'strength',
      powerStatsValue: '10',
      usesLeft: 5,
      image:
        'https://i.pinimg.com/originals/fe/67/cb/fe67cbe55bdff0623f482f872eeae833.jpg',
      isSpent: false,
    },
    {
      title: 'Flash boots',
      powerStatsName: 'speed',
      powerStatsValue: '10',
      usesLeft: 5,
      image:
        'http://cdn.shopify.com/s/files/1/0060/0218/0196/products/Barry_Allen_The_Flash_Season_6_red_Cosplay_Boots.jpg?v=1577068520',
      isSpent: false,
    },
  ];

  constructor() {
    this._setPower();
  }

  private _setPower(): void {
    localStorage.setItem('power-ups', JSON.stringify(this._powerUps));
  }

  public getPower(): Power[] {
    return JSON.parse(localStorage.getItem('power-ups')!);
  }
}
